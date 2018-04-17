import React from 'react'

export default class PageTitle extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = this.props.title + '- INSIGHT';
  }
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>

    )
  }
}
