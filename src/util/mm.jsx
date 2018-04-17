export default class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          if(res.status === 0) {
            // 数据请求成功
            typeof resolve === 'function' && resolve(res.data, res.msg)
          }else if(res.status = 10) {
            // 没有登录状态，强制登录
            this.doLogin();
          }else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })

  }
  doLogin() {
    window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }
  getUrlParam(name) {
    // 获取URL参数
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null
  }
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对了~')
  }
  // 成功提示
  successTips(Msg) {
    alert(Msg || '操作成功！')
  }
  // 存储
  setStorage(name, data) {
    let dataType = typeof data;
    if(dataType === 'object') {
      // json对象
      window.localStorage.setItem(name, JSON.stringify(data))
    }else if(['number', 'string', 'boolean'].indexOf(dataType)) {
      //基础类型
      window.localStorage.setItem(name, data)
    }else {
      alert('该类型不能用于本地存储')
    }
  }
  // 取出存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
      return JSON.parse(data)
    }else {
      return '';
    }
  }
  // 删除本地操作
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}
