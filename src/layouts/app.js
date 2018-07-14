import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Loader, MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import '../themes/index.less'
import './app.less'

const { Content } = Layout
const { Header, Sider ,Bread, styles } = MyLayout


const { iconFontJS, iconFontCSS, logo } = config

const App = ({
  children, dispatch, app, loading, location,
}) => {
  const { user ,menu ,navOpenKeys } = app;

  const headerProps = {
    user,
    logout () {
      dispatch({ type: 'app/logout' })
    },
  }

  //根据url获取选择的标签
  const currentKey = (() => {
    let currentUrl = location.pathname;
    let selectKey;
    let navSelectKey;
    for(var value of menu){
      if(value.url == currentUrl){
        selectKey = value.key;
      }
      if(value.children&&value.children.length){
        value.children.forEach(function(item){
          if(item.url == currentUrl){
            selectKey = item.key;
            navSelectKey = value.key;
          }
        })
      }
    }
    return {
      selectKey,
      navSelectKey
    }
  })()

  const siderProps = {
    menu,
    current:currentKey.selectKey,
    navOpenKeys:currentKey.navSelectKey,
    changeOpenKeys (openKeys) {
    },

  }


  //登录没有layout单独处理
  if(location.pathname == '/login'){
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']}/>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {/*{iconFontJS && <script src={iconFontJS} />}*/}
        {/*{iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}*/}
      </Helmet>
      <Layout className={styles.dark}>
        <Header {...headerProps}/>
        <Layout>
          <Sider {...siderProps}/>
          <Content>{children}</Content>
        </Layout>
      </Layout>




    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))

