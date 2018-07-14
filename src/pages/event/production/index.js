import React, { Component } from 'react'
import { connect } from 'dva';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Modal from './components/Modal';

//immutable
import {Map,List,is} from 'immutable';

//自定义组件

class Projection extends Component {
  /**
   * 构造函数
   */
  constructor(){
    super();
    this.state={

    }
  }

  /**
   * 组件挂载
   */
  componentWillMount(){

  }


  /**
   * 组件接收新props
   * @param nextProps
   */
  componentWillReceiveProps(nextProps){

  }

  /**
   * 组件卸载
   */
  componentWillUnmount(){

  }

  /**
   * 渲染函数
   * @returns {XML}
   */
  render() {

    const SearchBarOption = {

    }


    return (
      <div className="context-wrapper">
          <div className="context-body" >
            <SearchBar {...SearchBarOption}/>
            {/*<Table {...TableOption}/>*/}
            {/*<Modal {...ModalOption}/>*/}
          </div>
      </div>
    )
  }
}

function mapStateToProps({ production }) {
  return { production };
}
export default connect(mapStateToProps)(Projection);
