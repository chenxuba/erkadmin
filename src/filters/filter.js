/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function formatDate(time, fmt) {
    if (time === undefined || '') {
        return
    }
    const date = new Date(time)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
/*
 * 解析url参数并获取code
 */
export function getUrlParam(name) { //name为要获取的参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var rrr = decodeURIComponent(window.location.search);
    var r = rrr.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//秒数转换成时分秒
export function formatSeconds(value) {
    var theTime = parseInt(value) // 秒
    var middle = 0 // 分
    var hour = 0 // 小时

    if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (middle > 60) {
            hour = parseInt(middle / 60)
            middle = parseInt(middle % 60)
        }
    }
    var result = '' + parseInt(theTime) + '秒'
    if (middle > 0) {
        result = '' + parseInt(middle) + '分' + result
    }
    if (hour > 0) {
        result = '' + parseInt(hour) + '小时' + result
    }
    return result
}