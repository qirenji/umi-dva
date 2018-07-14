module.exports = [{
    key: 'users/list',
    url: '/users/list',
    name: '用户管理',
    icon: 'credit-card'
  }, {
    key: 'rule-engine',
    url: '/rule-engine',
    name: '决策引擎（新）',
  icon: 'credit-card'
  }, {
    key: 'general-manage',
    url: '/general-manage',
    name: '运营服务',
  icon: 'credit-card'
  }, {
    key: 'knowledge-atlas',
    url: '/knowledge-atlas',
    name: '知识图谱',
    icon: 'credit-card',
    children: [{
      key: 'knowledge-atlas/personas-tend',
      url: '/knowledge-atlas/personas-tend',
      name: '画像特征',
      icon: 'credit-card'
    }, {
      key: 'knowledge-atlas/personas-manage',
      url: '/knowledge-atlas/personas-manage',
      name: '画像数据管理',
      icon: 'credit-card'
    }, {
      key: 'knowledge-atlas/case-analyze',
      url: '/knowledge-atlas/case-analyze',
      name: '事件分析',
      icon: 'credit-card'
    }]
  }, {
  key: 'knowledge',
  url: '/knowledge',
  name: '知识图谱',
  icon: 'credit-card',
  children: [{
    key: 'knowledge-atlas/case-analyze',
    url: '/knowledge-atlas/case-analyze',
    name: '事件分析',
    icon: 'credit-card'
  }]
  }
]


