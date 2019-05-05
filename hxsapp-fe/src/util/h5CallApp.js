  // 全局配置信息，方便配置
  // window.hxsHybrid = "hxsHybrid";
  // window.hxsNativeBride = "hxsNativeBride";
  import commonJs from './common.js'

(function(){

  // 全局配置信息，方便配置
  var hxsConfigBridge = {
    globalBridgeName:"hxsHybrid",
    globalBridgeObject:"hxsNativeBride"
  }
  
  window[commonJs.config.hxsBridgeName] =  window[commonJs.config.hxsBridgeName] || {};

  //全局注册唯一的客户端函数，给app端去调用客户端
  function requestHybrid ( params){

    if (! params.tagName ){
      console.log("必须包括tagName");
      return;
    }

    var __str = ( Math.random() + " " ).split(".")[1];
    console.log("__str: "+__str)
    var tt = (new Date().getTime() ) + "_"+ __str + '_';

    var t = commonJs.config.hxsBridgeName +'_'+ params.tagName + '_' + tt;
    
    var tmpFn;

    //处理有回调的情况下
    if( params.callback ){
      tmpFn = params.callback;
      // 后面有用
      params.callbackT = t;

      window[commonJs.config.hxsBridgeName][t] = function (data){
        tmpFn( data)
      }
      
    }
    // 发送数据函数
    bridgePostMsg( params )
  }

  // 拼接处理Url
  function getHybridUrl( params ){
    var k,paramStr = '',
    url = commonJs.config.hxsBridgeName +'://'+params.tagName,
    flag = '?';
    if( params.callback ){
      flag = '&';
      url += '?callback='+ params.callbackT
    }

    if( params.param ){
      if ( typeof params.param == 'object' ){
        paramStr = JSON.stringify(params.param)
      }
      
      url = url + flag +  'param='+ encodeURIComponent(paramStr );
    }

    // hxsHybrid://?callback=callbackId
    return url;
  }

  // 使用iframe发起 url schema 给app端
  function bridgePostMsg ( params){

    console.log( JSON.stringify(params) )

    var url = getHybridUrl( params);

    //兼容ios6 用 iframe
    var ifr = document.createElement('iframe');  
    // debugger
    ifr.id = params.callbackT; 
    ifr.style.width = "1px";
    ifr.style.height = "1px";
    ifr.style.opacity = "0";
    ifr.style.textIndent = "-999999em";
    ifr.src = url;
    ifr.onload = function() {   
      console.log('iframe onload loaded');   
    };
    
    if( navigator.userAgent.indexOf("Android") > -1 ){
      // 安卓发太快 有问题
      setTimeout(function(){
        document.body.appendChild(ifr);  
        console.log("Android-iframe-html:"+ifr.outerHTML)
        
      },10)
    }else{
      document.body.appendChild(ifr);  
      console.log("ios-iframe-html:"+ifr.outerHTML)
    }
    
    setTimeout(function(){
      ifr.remove();
      ifr = null;
    },1000)

  }

  // 封装分享按钮的函数
  window[commonJs.config.hxsBridgeObject] =  window[commonJs.config.hxsBridgeObject] || {};

  window[commonJs.config.hxsBridgeObject].shareBtnInApp = function ( param = {}, callback ) {
    requestHybrid({
      tagName:"shareBtnInApp",
      param:param,
      callback:function(data){
        callback(data)
      }
    })
  }

}())
  
  