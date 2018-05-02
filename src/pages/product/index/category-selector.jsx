import React from 'react'

import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss'

export default class CategorySelector extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            firstCategoryList: [],
            firstCategoryId:  0,
            secondCategoryList: [],
            secondCategoryId: 0,
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryIdChange !== nextProps.parentCategoryIdChange;
        //数据没有发生不变化，直接不处理
        if (!categoryIdChange && !parentCategoryIdChange) {
            return
        }
        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        }else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }
    }
    loadFirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg)
        });
    }
    onFirstCategoryChange(e){
        if(this.props.readOnly || this.props.disabled) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            //更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    //加载二级菜单
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg)
        });
    }
    onSecondCategoryChange(e) {
        if(this.props.readOnly || this.props.disabled) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            this.onPropsCategoryChange();
        })
    }
    //传给父组件选中的结果
    onPropsCategoryChange() {
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId) {
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else {
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }

    render() {
        return (
            <div className="col-md-10">
                <select
                    name="firstCategoryId"
                    className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category, index) => <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                {this.state.secondCategoryList.length ?
                    (<select name=""
                        className="form-control cate-select"
                        value={this.state.secondCategoryId}
                        onChange={(e) => this.onSecondCategoryChange(e)}
                        readOnly={this.props.readOnly}
                        disabled={this.props.disabled}
                    >
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map(
                                (category, index) => <option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>) : null
                }

            </div>
        )
    }
}
