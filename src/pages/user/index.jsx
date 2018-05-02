import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import RcPagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'


const _mm = new MUtil();
const _user = new User();

export default class UserList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }

  }
  componentDidMount() {
    this.loadUserList();
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
        this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg);
    })
  }
  // 页面发生变化的时候
  onChangePageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }
  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      )
    });
    return(
      <div id="page-wrapper">
      <PageTitle title="用户列表"/>
        <div className="row">
          <div className="col-md-12">
            <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
                {listBody}
            </TableList>
            <RcPagination
              current={this.state.pageNum}
              total={this.state.total}
              onChange={pageNum => this.onChangePageNum(pageNum)}/>
          </div>
        </div>
      </div>
    )
  }
}

