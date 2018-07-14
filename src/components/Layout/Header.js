import { Icon, Menu, Dropdown, Layout } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Header.less'

const Header = ({
  user, logout
}) => {

  const HeaderMenu = () => (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{lineHeight:'48px'}}
      className={styles.middleMenu}
    >
      <Menu.Item>
        <Link to={'/' || '#'} >文档下载
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={'/' || '#'} >文档下载2
        </Link>
      </Menu.Item>
    </Menu>
  );

  const DropDownMenu = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to='user/info'>个人信息</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={logout}>退出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <span className={styles['dropdown-link']}>
            <span className={styles['user-name']}>{user.username || 'guest'}</span>
            <Icon type="down" />
        </span>
      </Dropdown>
    )
  }

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.dropdown}>
        <DropDownMenu></DropDownMenu>
      </div>
      <div className={styles.main}>
        <HeaderMenu></HeaderMenu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header
