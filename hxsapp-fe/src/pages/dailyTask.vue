<template>
	<div class="task-container">
		<div class="top" id="dailyTaskRule">
			<a href="javascript:;" @click="goDailyTaskPage"></a>
		</div>
		<ul class="task">
			<!-- <li>
				<p>坚持每天瘦身习惯，点击去称重</p>
				<a href="javascript:;"></a>
			</li>
			<li>
				<p>坚持每天瘦身习惯，点击去称重</p>
				<a href="javascript:;" class="finish"></a>
			</li> -->
		</ul>
		<div class="task-tip"></div>
		<div class="show-prize">
			<div class="show-box">
				<div class="complete">
					<a href="javascript:;" class="long-btn"></a>
					<a href="javascript:;" class="long-btn again"></a>
				</div>
				<div class="no">
					<p></p>
					<img src="">
					<a href="javascript:;" class="long-btn"></a>
					<a href="javascript:;" class="long-btn again"></a>
				</div>
				<!-- <div class="no">
					<p>很遗憾，未中奖</p>
					<img src="img/daily_task/default.png">
					<a href="javascript:;" class="long-btn"></a>
					<a href="javascript:;" class="long-btn again"></a>
				</div> -->
				<div class="yes">
					<p></p>
					<img src="">
					<div class="fn">
						<a href="javascript:;" class="welfare"></a>
						<a href="javascript:;" class="big-btn"></a>
						<a href="javascript:;" class="big-btn again" style="display:none;"></a>
					</div>
				</div>
			</div>
		</div>
		<div class="show-prize-text">完成任务才可以抽哟</div>
		<div class="task-tip task-tip2"></div>
		<div class="zs">
			<div class="zs-ul-box">
				<ul>
				</ul>
			</div>
		</div>
		<div class="zj-box">
			<div class="layer"></div>
			<div class="box" style="-webkit-animation-duration:0.8s; -webkit-animation-delay:0.3s;">
				<img src="">
				<a href="javascript:;" class="share"></a>
				<a href="javascript:;" class="close"></a>
			</div>
		</div>
		<down v-if="downHxs"></down>
		<popupDownLoad v-if="isPopupDownLoad"></popupDownLoad>
        <preLoading v-if="!dailyTaskData"></preLoading>
	</div>
</template>

<script>
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui';
import down from '@/components/down'
import preLoading from '@/components/preLoading'
import popupDownLoad from "@/components/popupDownLoad"

export default {
	name: 'dailyTask',
	data() {
		return {
			isPopupDownLoad: false,
			downHxs: false,
			dailyTaskData:null

		}
	},

	mounted() {
		!function(){
			function e(){
				var e=document.documentElement.clientWidth, t=document.querySelector("html"), f = e/20;
				window.fontSize=f;
				t.style.fontSize=f+"px"
			}
			e(),window.addEventListener("resize",e);
			document.title = '每日任务';
		}();
		
		this.getTodayTaskData();
	},
	methods: {
		// locationHref: function() {
		// 	let sessToken = common.getUrlParam('sess_token');
		// 	var url = 'https://app.hxsapp.com/html/daily_task.html?sess_token=' + sessToken;
		// 	window.location.replace(url)
		// }


		getTodayTaskData() {
			var that = this;
		    var sessToken = commonJs.getUrlParam('sess_token');
			var CallBack = '?callback=?';
		    $.getJSON('https://api.hxsapp.com/bonus/dailyTask/getTodayTaskData' + CallBack,{sess_token: sessToken}, function(data){
		        if(data.code == 200){
		            console.log(data);
		            var data = data.data;
		            //每日任务
		            var todayTask = data.today_task;
		            var taskHtml = '';
		            $.each(todayTask, function(i){
		                var finish = '';
		                var jump = 'javascript:;';
		                var taskType = '';
		                var dataId = '';

		                if(todayTask[i].is_finish == '1'){
		                    finish = 'finish';
		                }else{
		                    taskType = todayTask[i].task_type;
		                    dataId = todayTask[i].data_id;
		                    jump = protocolFn(taskType);
		                    if(taskType == 5 && dataId == '0' ){
		                       jump =  'https://hxsapp_home_page';
		                    }else if(taskType == 5 && dataId != '0'){
		                        jump = jump + dataId;
		                    }else if(taskType == 10){
		                        jump = jump +  todayTask[i].link + '&sess_token=' + sessToken;
		                    }
		                }
		                taskHtml += [
		                    '<li>',
		                        '<p>' + todayTask[i].name + '</p>',
		                        '<a href="' + jump + '" class="' + finish + '"></a>',
		                    '</li>'
		                ].join('');
		            })
		            $('.task').html(taskHtml);
		              	if(window.location.href.indexOf('sess_token') == -1){
			        		$('.task li a').click(function(event){
			        			that.isPopupDownLoad = true;
			                    return false;
			                });
		        		}
		            //未登录
		            $('.task li a,.long-btn').click(function(event){
		                var token = commonJs.getUrlParam('sess_token');
		                var locationType = window.location.href.indexOf('sess_token');
		                if(token && token.length < 10 || (locationType != -1 && !token)){
			                $('.task li a').attr('href', 'javascript:;')
			                window.location.href = 'https://hxsapp_showloginpage';
			        	}
			        });

		            //中奖名单
		            var awardList = data.award_list;
		            var awardHtml = '';
		            $.each(awardList, function(i){
		                awardHtml += '<li class="swiper-slide">用户' + commonJs.subStlength(awardList[i].user_name,6,5)+ '完成任务刮到' + commonJs.subStlength(awardList[i].award_name,6,5)+ '</li>';
		            })

		            $('.zs ul').html(awardHtml);
					$(".zs ul").RollTitle({ line: 1, speed: 350, timespan: 2000 });

		            //抽奖 
		            window.count = data.task_finish_num - data.award_finish_num;
		            window.useCount = data.award_finish_num;
		            var taskCount = todayTask.length;

		            //window.count = 6;
		            //window.useCount = 0;

		            if(count > 0){
		                $('.complete .long-btn').hide();
		                $('.complete .again').show();
		                $('.show-prize-text').text('您已获得' + count + '次刮奖机会');
		            }else{
		                $('.complete .long-btn').show();
		                $('.complete .again').hide();
		                $('.show-prize-text').text('完成任务才可以抽哟');
		            }

		            if(window.location.href.indexOf('sess_token') !=-1 ){

		                var name = data.user_info.nickname;
		                var head = data.user_info.head_img;

		                $('.complete .again, .show-box .yes .again, .show-box .no .again').click(function(){
		                    luckDraw(taskCount, name, head );
		                });

		                //用户是否抽过奖
		                var isAward = data.user_last_award.is_award;
		                var isWeal = data.user_last_award.is_weal;

		                if(isAward == '1'){
		                    $('.complete').hide();
		                    if(isWeal == '1'){//上一次中奖
		                        $('.show-box .yes').show();
		                        if(count > 0){
		                            $('.show-box .yes .big-btn').hide();
		                            $('.show-box .yes .again').show();
		                        }else{
		                            $('.show-box .yes .big-btn').show();
		                            $('.show-box .yes .again').hide();
		                        }
		                        $('.show-box .yes img').attr('src',data.user_last_award.image);
		                        $('.show-box .yes p').text(data.user_last_award.name);
		                        $('.show-box .yes .welfare').attr('href', 'https://hxsapp_jump_myactivity#1');
		                    }else{//上一次没中奖
		                        $('.show-box .no').show();
		                        if(count > 0){
		                            $('.show-box .no .long-btn').hide();
		                            $('.show-box .no .again').show();
		                        }else{
		                            $('.show-box .no .long-btn').show();
		                            $('.show-box .no .again').hide();
		                        }
		                        $('.show-box .no p').text(data.user_last_award.name);
		                        $('.show-box .no img').attr('src',data.user_last_award.image);
		                    }
		                }
		            }

		            var shareTitle = encodeURIComponent('轻松做任务开心刮大奖');
		            var shareLink = 'https://app.hxsapp.com/hxsweb/dailyTask';
		            var shareImages = 'https://app.hxsapp.com/static/task.jpg';
		            var shareDescr = encodeURIComponent('在好享瘦APP完成今日任务即有机会刮取大奖，快来试试手气吧！');
		            var shareContent = shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + ' '+'#' + ' ' + '#' + ' '+'#'+''+'#'+''+'#'+''+'#'+'';

		            //二次分享
					commonJs.outSideShare({
						title:shareTitle, 
						desc:shareDescr, 
						link:shareLink, 
						img:shareImages
					});

					//埋点
		            commonJs.buriedPoint({
					    access_occurred_type: 110501,//发生访问的【页面】类型
					    access_occurred_type_id: '',//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });

					//底部展示下载banner
		            if(window.location.href.indexOf('sess_token') != -1){
	                    window.hxsapp_visible_share_btn_mar = function(){};
	                    setTimeout(function(){
	                        window.location.href = 'https://hxsapp_visible_share_btn#' + shareContent;
	                    },500) 
		            }else{
		            	that.downHxs = true;
		            }
		        }
		        that.dailyTaskData = true;
		    });
		    
		    function luckDraw(taskCount, name1, head1){
		        var token = commonJs.getUrlParam('sess_token');
		        var locationType = window.location.href.indexOf('sess_token');

		        if(token && token.length < 10 || (locationType != -1 && !token)){
	            	window.location.href = 'https://hxsapp_showloginpage';
		          	return false;
		    	}

		        if(count <= 0){
		            Toast({
					   message: '完成任务才可以抽哟',
					   duration: 1000
					});
		            return;
		        }

		        $('.complete').show();
		        $('.complete .long-btn').hide();
		        $.getJSON('https://api.hxsapp.com/bonus/dailyTask/draw' + CallBack, {sess_token: sessToken}, function(data){
		            console.log(data);
		            useCount ++;
		            count--;
		            if(data.code == 200){

		                var prizeName  = data.data.name;
		                var imgSrc = data.data.image;

		                var Name = name1;
		                var headImg  = head1;

		                if(data.data.is_weal == '1'){

		                    $('.complete').fadeOut('600');
		                    $('.show-box .no').hide();
		                    $('.show-box .yes').show();
		                    $('.show-box .yes p').text(prizeName);
		                    $('.show-box .yes img').attr('src', imgSrc);
		                    $('.show-box .yes .welfare').attr('href', 'https://hxsapp_jump_myactivity#1');

		                    $('.zj-box').show();
		                    $('.zj-box .box').show();
		                    $('.zj-box .layer').show();
		                    $('.zj-box .box').addClass('bounceInDown animated');
		                    $('.zj-box .box img').attr('src',imgSrc);
		                    $('.zj-box .box img').css({
		                        'border':'2px solid #000'
		                    });
		                    if(count > 0){
		                        $('.show-box .yes .big-btn').hide();
		                        $('.show-box .yes .again').show();
		                    }else{
		                        $('.show-box .yes .big-btn').show();
		                        $('.show-box .yes .again').hide();
		                    }

		                    $('.zj-box .box .share').click(function(){
		                        var newHead = headImg;
		                        var newImgSrc = imgSrc;
		                        if(newHead.indexOf('?')!=-1){
		                            newHead = newHead.substring(0,newHead.indexOf('?'));
		                        }
		                        newImgSrc = newImgSrc.substring(0,newImgSrc.indexOf('?'));
		                        // window.location.href = 'https://app.hxsapp.com/hxsweb/taskPrize/' + encodeURIComponent(Name) + '/'+ encodeURIComponent(prizeName) + '/' + encodeURIComponent(newHead) + '/' + encodeURIComponent(newImgSrc);
		                        var __url = 'https://app.hxsapp.com/hxsweb/taskPrize/' + encodeURIComponent(Name) + '/'+ encodeURIComponent(prizeName) + '/' + encodeURIComponent(newHead) + '/' + encodeURIComponent(newImgSrc);
								window.location.href = __url;
		                    });

		                }else{

		                    $('.complete').fadeOut();
		                    $('.show-box .no').show();
		                    $('.show-box .yes').hide();

		                    $('.show-box .no p').text(prizeName);
		                    $('.show-box .no img').attr('src', imgSrc);

		                    if(count > 0){
		                        $('.show-box .no .long-btn').hide();
		                        $('.show-box .no .again').show();
		                    }else{
		                        $('.show-box .no .long-btn').show();
		                        $('.show-box .no .again').hide();
		                    }
		                }

		            }else if (data.code == 401) {

			            Toast({
						   message: data.msg,
						   duration: 1000
						});

			            window.location.href = 'https://hxsapp_showloginpage';
		            }

		            if(data.code != 401){

		                if(count > 0 ){
		                    $('.show-prize-text').text('您还有' + count + '次刮奖机会');
		                }else{
		                    if(useCount >= taskCount ){
		                        $('.show-prize-text').text('今日任务已完成，邀请好友刮大奖。');
		                    }else{

		                        $('.show-prize-text').text('做任务后才可以继续刮奖哦');
		                    }
		                }
		            }
		        })
		    }
		    $('.zj-box .box .close').click(function(){
		        $('.zj-box .box').hide();
		        $('.zj-box').hide();
		        $('.zj-box .layer').hide();
		        $('.zj-box .box').removeClass('bounceInDown animated');
		    });

		    function protocolFn(type){
		        var url = '';

                switch (parseInt(type)) {
                    case 1:
                        url = 'https://hxsapp_jump_weighing';
                        break;
                    case 2:  
                        url = 'https://hxsapp_jump_newdynamic';
                        break;  
                    case 3:  
                        url = 'https://hxsapp_jump_foodrecord';
                        break;
                    case 4:  
                        url = 'https://hxsapp_jump_sportrecord';
                        break;
                    case 5:  
                        url = 'https://hxsapp_new_webview#' + 'https://app.hxsapp.com/hxsweb/articleDetail/';
                        break;
                    case 6:  
                        url = 'https://hxsapp_home_page';
                        break;
                    case 7:  
                        url = 'https://hxsapp_home_page';
                        break;
                    case 8:  
                        url = 'https://hxsapp_jump_slimmingcourselist';
                        break;
                    case 9:
                        url = 'https://hxsapp_jump_dynamiccircle';
                        break;
                    case 10:
                        url = 'https://hxsapp_new_webview#';
                        break;
                }
		        return url;
		    }
			(function($){
				$.fn.extend({ 
					RollTitle: function(opt,callback){ 
					if(!opt) var opt={}; 
						var _this = this; 
						_this.timer = null; 
						_this.lineH = _this.find("li:first").height(); 
						_this.line=opt.line?parseInt(opt.line,15):parseInt(_this.height()/_this.lineH,10); 
						_this.speed=opt.speed?parseInt(opt.speed,10):3000, //卷动速度，数值越大，速度越慢（毫秒 
						_this.timespan=opt.timespan?parseInt(opt.timespan,13):5000; //滚动的时间间隔（毫秒 
						if(_this.line==0) this.line=1; 
							_this.upHeight=0-_this.line*_this.lineH; 
							_this.scrollUp=function(){ 
							_this.animate({ 
							marginTop:_this.upHeight 
							},_this.speed,function(){ 
							for(let i=1;i<=_this.line;i++){ 
							_this.find("li:first").appendTo(_this);
							} 
							_this.css({marginTop:0}); 
							}); 
						} 
						_this.hover(function(){ 
						},function(){ 
						_this.timer=setInterval(function(){_this.scrollUp();},_this.timespan); 
						}).mouseout(); 
					}
				}) 
			})(jQuery); 
		},
        hidePopupDownLoadCall() {// 显示和异常弹出提示下载层
            this.isPopupDownLoad = false;
        },
        goDailyTaskPage(){
        	var dailyTaskPage = 'https://act.hxsapp.com/base/Award/rule/dailyTask';
        	window.location.href = 'https://hxsapp_new_webview#' + dailyTaskPage;
        }
	},
    components:{
        down,
        preLoading,
        popupDownLoad
    },
	beforeDestroy() {
		$(window).off("resize");
		document.title = commonJs.config.webTitle;
	}
}
</script>
<style>
	.task-container{
	  width: 100%;
	  min-width: 100%;
	  background: url(../assets/images/daily_task/bg.png) left top repeat-y #fff6d9;
	  background-size: 100% 100%;
	}
	.task-container .top{
	  width: 100%;
	  min-width: 100%;
	  height:10.1rem;
	  background: url(../assets/images/daily_task/top.png) left top no-repeat;
	  background-size: 100% 100%;
	  margin-bottom:0.88rem;
	}
	.task-container .top a{
	  width: 4.4rem;
	  height:1rem;
	  position:absolute;
	  left: 50%;
	  top:5.9rem;
	  margin-left: -2.2rem;
	}
	.task-container .task li{
		width:18.8rem;
		height:3.3rem;
	    background: url(../assets/images/daily_task/task.png) left top no-repeat;
	    background-size:100%;
	    margin:0 auto;
	    margin-bottom:0.8rem;
	}
	.task-container .task li p{
		width: 13.3rem;
		height:3.3rem;
		line-height: 3.3rem;
	  background-size:100%;
	  margin-left: 0.9rem;
	  color:#333;
	  font-size:0.74rem;
	  float:left;
	  overflow: hidden;
	}
	.task-container .task li a{
		width: 3.6rem;
		height:1.8rem;
	    background: url(../assets/images/daily_task/task-btn-color.png) left top no-repeat;
	    background-size:100%;
	    float:right;
	    margin-right:0.9rem;
	    margin-top:0.8rem;
	}
	.task-container .task li .finish{
	    background: url(../assets/images/daily_task/task-btn.png) left top no-repeat;
	    background-size:100%;
	}
	.task-container .task-tip{
		width: 100%;
		height: 2.8rem;
	    background: url(../assets/images/daily_task/tip1.png) left top no-repeat;
	    background-size:100% 100%;
	    margin-top:2.56rem;
	}
	.task-container .task-tip2{
		height: 3.1rem;
	    background: url(../assets/images/daily_task/tip2.png) left top no-repeat #fff6d9;
	    background-size:100% 100%;
	    margin-top:0;
	}
	.task-container .show-prize{
		width: 18.2rem;
		height: 13rem;
	    background: url(../assets/images/daily_task/kuang.png) left top no-repeat;
	    background-size:100%;
	    margin:0 auto;
	    margin-top:1rem;
	    position: relative;
	}
	.task-container .show-box{
		width: 17.3rem;
		height:12rem;
		position: absolute;
		left: 0.5rem;
		top:0.5rem;
	}
	.task-container .show-box .complete{
		width: 17.3rem;
		height:12rem;
	    background: url(../assets/images/daily_task/complete.png) left top no-repeat;
	    background-size:100%;
	    position: absolute;
	    left: 0;
	    top:0;
	    z-index:9;
	}
	.task-container .complete .again{
	    background: url(../assets/images/daily_task/long-btn-color.png) left top no-repeat;
	    background-size:100%;
	}

	.task-container .show-box .no{
		width: 100%;
		height: 100%;
	    background: url(../assets/images/daily_task/no-complete.png) left top no-repeat;
	    background-size:100%;
	    display: none;
	}
	.task-container .show-box .no p{
		height: 2.9rem;
		line-height: 2.9rem;
		padding-top:0.4rem;
		text-align: center;
		font-size:0.85rem;
		color:#333;
	}
	.task-container .show-box .no .long-btn{
		top:auto;
		bottom:1.8rem;
	}
	.task-container .show-box .no .again{
	    background: url(../assets/images/daily_task/long-btn-color.png) left top no-repeat;
	    background-size:100%;
	}
	.task-container .show-box .no img{ 
		width: 3.97rem;
		height: 3.6rem;
		display: block;
		margin:0 auto;
	}
	.task-container .show-box .yes{
		width: 100%;
		height: 100%;
	    background: url(../assets/images/daily_task/no-complete.png) left top no-repeat;
	    background-size:100%;
		display: none
	}
	.task-container  .show-box .yes p{
		height: 2.9rem;
		line-height: 2.9rem;
		padding-top:0.4rem;
		text-align: center;
		font-size:0.85rem;
		color:#333;
	}
	.task-container .show-box .yes img{ 
		width: 3.46rem;
		height: 3.5rem;
		border-radius: 2px;
		border:solid 4px #343a45;
		display: block;
		margin:0 auto;
	}
	.task-container .show-box .yes .fn{
		width: 100%;
		height: 2.45rem;
		margin-top: 0.85rem;
	}
	.task-container .long-btn{
		width:8.96rem;
		height: 2.45rem;
	    background: url(../assets/images/daily_task/long-btn.png) left top no-repeat;
	    background-size:100%;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left:-4.5rem;
	    margin-top:-1.2rem;
	}
	.task-container .big-btn,.welfare{
		width:7rem;
		height: 2.45rem;
	    background: url(../assets/images/daily_task/big-btn.png) left top no-repeat;
	    background-size:100%;
	    float: left;
	}
	.task-container .big-btn{
	    background: url(../assets/images/daily_task/big-btn.png) left top no-repeat;
	    background-size:100%;
	    margin-left:0.74rem;
	}
	.task-container .welfare{
	    background: url(../assets/images/daily_task/look.png) left top no-repeat;
	    background-size:100%;
	    margin-left:1.2rem;
	}
	.task-container .show-box .yes .again{
	    background: url(../assets/images/daily_task/big-btn-color.png) left top no-repeat;
	    background-size:100%;
	}
	.task-container .show-prize-text{
		width: 100%;
		height: 2.5rem;
		line-height: 2.5rem;
		text-align: center;
	    color:#333;
	    font-size:0.74rem;
	    background:#fff6d9;
	}
	.task-container .zs{
		width: 100%;
		height: 16.6rem;
	    background: url(../assets/images/daily_task/zs.png) left top no-repeat;
	    background-size:100% 100%;
	    margin-top:1.68rem;
	    position: relative;
	}
	.task-container .zs-ul-box{
		width:13.9rem;
		height:5.6rem;
		position:absolute;
		left:50%;
		top:5.3rem;
	  margin-left: -7rem;
		overflow: hidden;
	}
	.task-container .zs ul{
		width:13.9rem;
		height:5.6rem;
		overflow: hidden;
	}
	.task-container .zs ul li{
		width:13.5rem;
		height: 1.4rem;
		line-height:1.4rem;
		text-align: center;
		color:#666;
		font-size:0.69rem;
		overflow: hidden;
		position: relative;
		top:0;
	  overflow: hidden;
	}
	.task-container .zj-box{
		width: 100%;
		height: 100%;
		position:fixed;
		left:0;
		top:0;
		display: none;
	  z-index: 9998;
	}
	.task-container .zj-box .layer{
		width: 100%;
		height: 100%;
		position:absolute;
		left:0;
		top:0;
		background: #000;
		opacity: 0.65;
	  z-index: 9998;
	  display: none;
	}
	.task-container .zj-box .box{
		width:100%;
		height: 24.5rem;
		padding-bottom:4.5rem;
	  background: url(../assets/images/daily_task/zj.png) left -4rem no-repeat;
	  background-size:100% 100%;
	  position: absolute;
	  left: 0;
	  top: 0;
	  z-index: 9999;
	  display: none;
	}
	.task-container .zj-box .box img{
		width: 6rem;
		height: 6rem;
		position:absolute;
		left: 50%;
		margin-left: -3.1rem;
		top:12.8rem;
	  border-radius: 3px;
	}
	.task-container .zj-box .box .share{
		width: 9.1rem;
		height: 2.6rem;
		position:absolute;
		left: 50%;
		margin-left: -4.5rem;
		top:19.3rem;
	}
	.task-container .zj-box .box .close{
		width: 1.8rem;
		height: 1.8rem;
	    background: url(../assets/images/daily_task/close.png) left top no-repeat;
	    background-size:100%;
		position:absolute;
		left: 50%;
		margin-left: -0.9rem;
		bottom:0;
}
</style>