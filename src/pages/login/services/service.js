import request from 'utils/request';

export async function login(params){
  return request('/api/admin/login', {
    method:'POST',
    body: params,
  });
}
