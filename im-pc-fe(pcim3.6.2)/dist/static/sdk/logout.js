//退出
function quitClick() {
    if (loginInfo.identifier) {
        //sdk登出
        webim.logout(
            function(resp) {
    alert(2)
                loginInfo.identifier = null;
                loginInfo.userSig = null;
                // document.getElementById("webim_demo").style.display = "none";
                // var indexUrl = window.location.href;
                // var pos = indexUrl.indexOf('?');
                // if (pos >= 0) {
                //     indexUrl = indexUrl.substring(0, pos);
                // }
                // window.location.href = indexUrl;
            }
        );
    } else {
        alert('未登录');
    }
}



//多终端登录被T

function onMultipleDeviceKickedOut() {
    // document.getElementById("webim_demo").style.display = "none";
    alert("账号被其他人登录了。如确认为你的IM账号，请刷新页面重新登录！");
}