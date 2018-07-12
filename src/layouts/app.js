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
        <Header />
        <Layout>
          <Sider />
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

