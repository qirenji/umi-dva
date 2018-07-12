import { routerRedux } from 'dva/router'
import { login } from '../service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload)

      if (data && data.success) {
        yield put(routerRedux.push('/'))
      }else{
        throw data
      }
    },
  },

}
