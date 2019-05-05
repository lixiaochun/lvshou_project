//解决IE8之下document不支持getElementsByClassName方法
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}
//切换应用类型单选按钮事件

function changeAppType(item) {
    var appType = item.value;
    if (appType == 1) { //测试应用
        $('#myself_type_desc').hide();
        $('#demo_type_desc').show();
        $('#sdkAppIdDiv').hide();
        $('#accountTypeDiv').hide();
        $('#accountModeDiv').hide();
    } else if (appType == 0) { //自建应用
        $('#demo_type_desc').hide();
        $('#myself_type_desc').show();
        $('#sdkAppIdDiv').show();
        $('#accountTypeDiv').show();
        $('#accountModeDiv').show();
    }
}
// $("input[name=accountMode]").change(function() {
//     accountMode = $("input[name=accountMode]:checked").val();
//     console.debug(accountMode);
// });
//选择应用类型

function selectApp() {
    var appType = $('input[name="app_type_radio"]:checked').val();
    if (appType == 1) { //测试应用
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = sdkAppID;
        loginInfo.accountType = accountType;
    } else if (appType == 0) { //自建应用
        if ($("#sdk_app_id").val().length == 0) {
            alert('请输入sdkAppId');
            return;
        }
        if (!validNumber($("#sdk_app_id").val())) {
            alert('sdkAppId非法,只能输入数字');
            return;
        }
        if ($("#account_type").val().length == 0) {
            alert('请输入accountType');
            return;
        }
        if (!validNumber($("#account_type").val())) {
            alert('accountType非法,只能输入数字');
            return;
        }
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = $('#sdk_app_id').val();
        loginInfo.accountType = $('#account_type').val();
    }
    //将account_type保存到cookie中,有效期是1天
    webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
    $('#select_app_dialog').modal('hide');

    if (accountMode == 1) {
        //调用tls登录服务
        tlsLogin();
    } else {
        $('#login_dialog').modal('show');
    }
}

//弹出登录框

function showLoginDialog() {
    $('#select_app_dialog').modal('hide');
    //显示登录窗体
    $('#login_dialog').modal('show');
    $("#login_account").focus();
}


//单击图片事件
var _this = this;
function imageClick(imgObj) {
    var imgUrls = imgObj.src;
    var imgUrlArr = imgUrls.split("#"); //字符分割
    var smallImgUrl = imgUrlArr[0]; //小图
    var bigImgUrl = imgUrlArr[1]; //大图
    var oriImgUrl = imgUrlArr[2]; //原图
    var bigPicDiv = document.getElementById('bigPicDiv');
    bigPicDiv.innerHTML = '';
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.overflowX = "scroll";
    div.style.display = "-webkit-box";
    div.style.webkitBoxPack = "center";
    div.style.webkitBoxAlign = "center";
    var close=$("#close-img").attr("src");
    div.innerHTML = '<div class="box"><div class="head2"><img src="'+close+'"></div><div class="img-r" id="img-thumbnail"><div class="shade-box"></div><img  class="img-thumbnail" src="' + bigImgUrl + '" / width="100%;"></div><div class="btn"><span class="big"></span><em class="rotate"></em><span class="small"></span><i style="display:none"></i></div></div>';

    bigPicDiv.insertBefore(div, null);
    $('#bigPicDiv').show();

  
    bigPicDivHide();
  
    setTimeout(function(){

        var div1 = document.getElementById("img-thumbnail");
        div1.onmousedown = function(ev) {
            var oevent = ev || event;

            var distanceX = oevent.clientX - div1.offsetLeft;
            var distanceY = oevent.clientY - div1.offsetTop;

            document.onmousemove = function(ev) {
                var oevent = ev || event;
                div1.style.left = oevent.clientX - distanceX + 'px';
                div1.style.top = oevent.clientY - distanceY + 'px';
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };

        };
    },500)
    var imgWidth = 100;
    var rotate = 45;
    var left = 0;
    $('#bigPicDiv .btn').click(function(ev){
        ev.stopPropagation();
    });
    $('#bigPicDiv span').eq(0).click(function(){//放大
        left = left - 10;
        imgWidth = imgWidth + 20;
        $('.img-thumbnail').css({
            width: imgWidth + '%',
            marginLeft: left + '%'
        })
    });

    $('#bigPicDiv span').eq(1).click(function(){//缩小

        imgWidth = imgWidth - 20;

        if(imgWidth > 20){//图片必须大于20% 不能再放小
            left = left + 10;
            $('.img-thumbnail').css({
                width: imgWidth + '%' ,
                marginLeft: left + '%'
            })
        }else{
            imgWidth = imgWidth + 20;
        }
    })

    $('#bigPicDiv em').eq(0).click(function(){//旋转
        rotate = rotate + 45;
        $('.img-thumbnail').css({
            webkitTransform:'rotate(' + rotate + 'deg)'
        })
        return false;
    }); 

    $('#bigPicDiv i').eq(0).click(function(){//下载图片
      var a = $("<a></a>").attr("href", oriImgUrl).attr("download", "img.png").appendTo("body"); 
      a[0].click(); 
      a.remove(); 
    });
    

}

function bigPicDivHide() {
    $('#bigPicDiv .head2 img').click(function() {
        $('#bigPicDiv').hide();
    })
}

//点击登录按钮(独立模式)

function independentModeLogin(fn) {
    // if ($("#login_account").val().length == 0) {
    //     alert('请输入帐号');
    //     return;
    // }
    // if ($("#login_pwd").val().length == 0) {
    //     alert('请输入UserSig');
    //     return;
    // }
    // loginInfo.identifier = $('#login_account').val();
    // loginInfo.userSig = $('#login_pwd').val();
    // $('#login_dialog').modal('hide');
    webimLogin(fn);
}

//初始化demo
// alert(1);
function initDemoApp() {
    // $("body").css("background-color", '#2f2f2f');
    // document.getElementById("webim_demo").style.display = "block"; //展开聊天界面
    // if(loginInfo.headurl){
    //     // document.getElementById("p_my_face").src = loginInfo.headurl;
    //     document.getElementById("p_my_face").src = './img/default_servicer_img.png';
    // }else{
    //     document.getElementById("p_my_face").src = './img/default_servicer_img.png';
    // }
    // if (loginInfo.identifierNick) {
    //     document.getElementById("t_my_name").innerHTML = webim.Tool.formatText2Html(loginInfo.identifierNick);
    // } else {
    //     document.getElementById("t_my_name").innerHTML = webim.Tool.formatText2Html(loginInfo.identifier);
    // }

    // //菜单
    // $("#t_my_menu").menu();

    // $("#send_msg_text").focus();
    // // 初始化我的加群申请表格
    // initGetApplyJoinGroupPendency([]);
    // //初始化我的群组系统消息表格
    // initGetMyGroupSystemMsgs([]);
    // //初始化我的好友系统消息表格
    // initGetMyFriendSystemMsgs([]);
    // //初始化我的资料系统消息表格
    // initGetMyProfileSystemMsgs([]);

    // //初始化好友和群信息
    // initInfoMap(initInfoMapCallbackOK);

}

function initInfoMap(cbOk) {
    //读取我的好友列表
    initInfoMapByMyFriends(
        //读取我的群组列表
        initInfoMapByMyGroups(
            cbOk
        )
    );
}

function initInfoMapCallbackOK() {
    initRecentContactList(initRecentContactListCallbackOK);
}

//初始化我的最近会话列表框回调函数

function initRecentContactListCallbackOK() {
    onSelSess(selType, selToID);

}

//判断str是否只包含数字

function validNumber(str) {
    if (!str) {
        str = str.toString();
        return str.match(/(^\d+$)/g);
    } else {
        return str;
    }
}



function onAppliedDownloadUrl(data) {
    console.debug(data);
}