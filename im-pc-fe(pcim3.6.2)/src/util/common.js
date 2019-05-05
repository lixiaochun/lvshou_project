//获取url里面的参数
function getUrlstring(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//判断一个数组里面是否有某个值
function queryArray(arr, key, val) {
    if (!arr.length > 0) return false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
            return {
                isHave: true,
                index: i
            }
        }
    }
    return {
        isHave: false
    };
}
//电话号码中间4个省略号
function centerEllipsisPhone(str){
    var num = null;
    if(str.length == 11) {return num = str.substring(0,3) + '****' + str.substring(7,11);}
    if(str.length > 11) {return num = str.substring(0,4) + '****' + str.substring(8,str.length);}
    if(str.length < 11) {return num = str.substring(0,3) + '**' + str.substring(5,str.length);}
}
//时间展示
function momentJsFn(time, isLeftBar) {
    var dateTime = time * 1000; //后台传递来的时间
    var time = Date.parse(new Date(dateTime));

    var currentTime = Date.parse(new Date());

    //发送消息时间
    var oldTime = new Date(time);
    var y = oldTime.getFullYear();
    var m = oldTime.getMonth() + 1;
    var d = oldTime.getDate();
    var h = oldTime.getHours();
    var mm = oldTime.getMinutes();


    //当前时间
    var nowTime = new Date(currentTime);
    var n_y = nowTime.getFullYear();
    var n_m = nowTime.getMonth() + 1;
    var n_d = nowTime.getDate();
    var n_h = nowTime.getHours();
    var n_mm = nowTime.getMinutes();

    //策略是
    //当前年份-发消息年份 = 0
    //当前月份-发消息月份 = 0
    //当前月份-发消息日份 = 0
    //则是今天

    //当前年份-发消息年份 = 0
    //当前月份-发消息月份 = 0
    //当前月份-发消息日份 = 1
    //则是昨天

    //以此类推



    if (n_y - y != 0 && n_m - m != 0) {
        return toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d) + '-' + toDouble(h) + ':' + toDouble(mm)
    } else if (n_y - y == 0 && n_m - m == 0 && n_d - d == 0) {
        return toDouble(h) + ':' + toDouble(mm);
    } else if (n_y - y == 0 && n_m - m == 0 && (n_d - d != 0 && n_d - d == 1)) {
        return '昨天' + ' ' + toDouble(h) + ':' + toDouble(mm);
    } else if (n_y - y == 0 && n_m - m == 0 && (n_d - d != 0 && n_d - d == 2)) {
        return '前天' + ' ' + toDouble(h) + ':' + toDouble(mm);
    } else if (n_y - y == 0 && n_m - m == 0 && (n_d - d != 0 && n_d - d > 2)) {
        return toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d) + ' ' + toDouble(h) + ':' + toDouble(mm)
    } else {
        return toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d) + ' ' + toDouble(h) + ':' + toDouble(mm)
    }

}

function toDouble(num) { //补零 展示双位数
    return parseInt(num) < 10 ? '0' + num : num;
}

//字符串超出部分显示省略号
function subStlength(str, maxLength = 7, targetLength = 6) {
    if (!str) return null;
    var reg = /^[A-Za-z]+$/;
    var re = /^[0-9a-zA-Z]*$/g;
    if (reg.test(str) || re.test(str)) {
        if (str.length > 2 * maxLength) str = str.substring(0, 2 * targetLength) + '...';
    } else {
        if (str.length > maxLength) str = str.substring(0, targetLength) + '...';
    }

    return str;
}
// 判断是否是在electron 里
function isIpc() {
    if (!window.require) {
        return false
    } else {
        return true;
    }
}

function isPoneAvailable(val) {
    var myreg = /1[34578]\d{9}/g;
    if (!myreg.test(val)) {
        return false;
    } else {
        return true;
    }
}

var common = {
    getUrlstring,
    queryArray,
    momentJsFn,
    subStlength,
    isIpc,
    isPoneAvailable,
    centerEllipsisPhone
}
export default common;