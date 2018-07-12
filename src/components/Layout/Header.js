import { Icon, Menu, Dropdown, Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Header.less'

const Header = ({

}) => {

  const HeaderMenu = (
    <Menu>
      <Menu.Item>
      </Menu.Item>
    </Menu>
  );

  const DropDownMenu = (logout,name) => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to='user/info'>个人信息</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={console.log('out')}>退出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <span className={styles['dropdown-link']}>
            <span className={styles['user-name']}>用户名称</span>
            <Icon type="down" />
        </span>
      </Dropdown>
    )
  }


  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.dropdown}>
        {/*<DropDownMenu {...dropDownOption}></DropDownMenu>*/}
        <DropDownMenu ></DropDownMenu>
      </div>
      {/*<div className="main-nav">*/}
        {/*<HeaderMenu {...headerMenuOption}></HeaderMenu>*/}
      {/*</div>*/}
    </Layout.Header>
  )
}

Header.propTypes = {};

export default Header
