import { routerRedux } from 'dva/router'
import { login } from '../services/service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)

      if (data.user) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/'))
        }
      } else {
        throw data
      }
    },
  },

}
