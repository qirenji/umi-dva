import { Icon, Menu, Layout } from 'antd'
import { Link } from 'dva/router';

const { SubMenu } = Menu;

const Sider = ({
  menu, current, navOpenKeys,onOpenChange
}) => {
  /**
   * 创建子目录
   * @param child
   * @returns {XML}
   */
  const buildMenu = (item) => {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.url || '#'} >
          {item.icon && <Icon type={item.icon} />}
          {item.name}
        </Link>
      </Menu.Item>
    )
  }

  /**
   * 创建目录
   * @param item
   * @returns {*}
   */
  const buildSubMenu = (item) => {
    return (
      <SubMenu key={item.key} title={<span>
        {item.icon && <Icon type={item.icon} />}
         {item.name}</span>}
      >
        { item.children.map((child,i)=>{
          return buildMenu(child)
        })}
      </SubMenu>
    )
  }

  const children = menu.map((item) => {
    if(item.children && item.children.length){
      return buildSubMenu(item)
    }else{
      return buildMenu(item)
    }
  });

  return (
    <Layout.Sider style={{ height: '100vh', overflow: 'scroll'}}>
      <Menu
        mode="inline"
        theme="dark"
        className="left-nav"
        selectedKeys={[current]}
        style={{height:'calc(100vh + 48px)', overflow: 'scroll'}}
      >
        {children}
      </Menu>

    </Layout.Sider>
  )
}

export default Sider
