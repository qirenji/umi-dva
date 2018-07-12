
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '7',
    bpid: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
  },
  {
    id: '3',
    bpid: '1',
    name: 'Request',
    icon: 'api',
    route: '/request',
  },
]

module.exports = {

  [`GET /api/admin/menus`] (req, res) {
    res.status(200).json(database)
  },
}
