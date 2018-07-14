import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { query, logout } from 'services/app'
import { config, menuList } from 'utils'
import queryString from 'query-string'

export default {

  namespace: 'app',
  state: {
    user: {},
    menu: [],
    navOpenKeys: JSON.parse(window.localStorage.getItem(`navOpenKeys`)) || [],
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
    * query ({
      payload,
    }, { call, put, select }) {
      const data = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)

      if(data && data.user){
        yield put({
          type: 'updateState',
          payload:{
            user: data.user,
            menu: menuList
          }
        })
        if (window.location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: '/',
          }))
        }

      }else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * logout({
      payload,
    },{ call, put, select }){

      yield call(logout, parse(payload))

      yield put({ type: 'updateState', payload: {
        user: {},
        menu: [],
      }})
      yield put({ type: 'query' })
    }

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },

};


