import { query, logout } from 'services/app'
import * as menusService from 'services/menus'
import router from 'umi/router'

export default {

  namespace: 'app',
  state: {
    user: {},
    permissions:{},
    menu: [],
    locationPathname: '',
    locationQuery: {},
  },

  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },

  effects: {
    *query({ payload }, { call, put ,select }) {
      const { success, user } = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)

      if(success && user){

        const list = yield call(menusService.query , payload)
        const { permissions } = user
        let menu = list
        if (permissions.role === 'admin' || permissions.role === 'developer') {
          permissions.visit = list.map(item => item.id)

        } else {
          menu = list.filter((item) => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        console.log(menu);
      }else{
        router.push('/login')
      }

    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};


