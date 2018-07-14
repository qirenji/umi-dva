import request from 'utils/request';

export async function login(params){
  return request('/api/admin/login', {
    method:'POST',
    body: params,
  });
}

export async function logout (params) {
  return request('/api/admin/logout',{
    method: 'post',
    body: params,
  })
}

export async function query (params) {
  return request('/api/admin/user',{
    method: 'get',
    body: params,
  })
}
