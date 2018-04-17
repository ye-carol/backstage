import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

export default class Product {
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: {
        pageNum: pageNum
      }
    })
  }
  // 变更商品销售状态
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
}
