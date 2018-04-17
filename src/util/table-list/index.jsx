import React from 'react'
import 'rc-pagination/dist/rc-pagination.min.css'
export default class TableList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isFirstLosding: true
    }
  }
  componentWillReceviceProps() {
    // 列表只有在第一次挂载的时候，isFirstLoading为true，其他为false
    this.setState({
      isFirstLosding: false
    })
  }
  render() {
    let listBody = this.props.children;
    let tableHeader = this.props.tableHeads.map((tableHead, index) => {
      if(typeof tableHead === 'object') {
        return <th width={tableHead.width} key={index}>{tableHead.name}</th>
      }else if(typeof tableHead === 'string') {
        return <th key={index}>{tableHead}</th>
      }

    });
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          {this.state.isFirstLosding ? '正在加载数据...' : '没有找到相应的结果'          }
        </td>
      </tr>
    );
    let tableBody = listBody.length > 0 ? listBody : listInfo;
    return(
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-border">
              <thead>
                <tr>
                  { tableHeader }
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
}
