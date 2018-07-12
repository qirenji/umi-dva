import request from 'utils/request';

export async function query(params){
  return request('/api/admin/menus', {
    method:'GET',
    body: params,
  });
}
