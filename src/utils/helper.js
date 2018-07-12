// Replace Status text
import Cookie from 'js-cookie';
import router from 'umi/router'

export function getUserStatus(status) {
  if (status === 1) {
    return {status: 'success', text: '正常'};
  }
  else {
    return {status: 'default', text: '禁用'};
  }
}

export function getIsAdminStatus(status) {
  if (status === 1) {
    return {status: 'success', text: '是'};
  }
  else {
    return {status: 'default', text: '否'};
  }
}

export function getCookie(name) {
  return Cookie.get(name);
}

export function setCookie(name, value) {
  return Cookie.set(name, value, {expires: 100000, path: '/'})
}

export function removeCookie(name) {
  return Cookie.remove(name)
}

// Operation LocalStorage
export function setLocalStorage(key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule));
}
export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}
export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

/*-- ---------- base64图片切割 ---------- --*/
export function sliceBase64(base) {
  if (typeof base !== 'string') return base;
  return base.replace(/^data:image\/\w+;base64,/, "")
}

/*-- ---------- moment转字符串 ---------- --*/
export function momentToString(moment) {
  if (!moment || moment.constructor.name !== 'Moment') return moment;
  return moment.format('YYYY-MM-DD');
}

/*-- ---------- 判断是否有权限 ---------- --*/
export function hasRole(role) {
  const roles = getCookie('role') || '';
  if (!roles) {
    router.push('/login')
    return false;
  }
  if (roles === '-1') return true; // -1为超级管理员
  return roles.indexOf(role) !== -1;
}
