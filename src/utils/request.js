import fetch from 'dva/fetch';
import {getCookie} from './helper';
import qs from 'qs';
import {message} from 'antd'
import router from 'umi/router'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  message.error(`请求错误 ${response.status}: ${response.url}`);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {method: 'GET'}) {
  const add_options = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'username': getCookie('username'),
      'role': getCookie('role'),
      'token': getCookie('token'),
      'Content-Type': 'application/json',
    }
  };
  options.method.toLocaleUpperCase();
  if (options.body) {
    if (options.method === 'GET') {
      let query = qs.stringify(options.body);
      delete options.body;
      url = `${url}?${query}`
    } else {
      options.body = JSON.stringify(options.body)
    }
  }
  options = Object.assign({}, add_options, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
        return data;
    })
    .catch(err => {
      const status = err.name;
      if (status === 403) {
        router.push('/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/404');
      }
    });
}