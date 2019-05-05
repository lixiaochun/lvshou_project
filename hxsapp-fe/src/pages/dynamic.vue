<template>
	<div class="dynamic-container">
        <goSignPage></goSignPage>
		<div class="dynamic-personal">
            <div class="dynamic-personal-bg">
                <div class="img-box"><!-- 
                    <img src="" alt=""> -->
                    <span v-if="userInfoData" :style="{background:'url(' + userInfoData.head_img + ') center center no-repeat',backgroundSize:'160%'}" ></span>
                </div>
                <div class="text"> 
                    <p class="name" v-if="userInfoData">{{ nickname }}</p>
                    <p class="introduce" v-if="userInfoData">{{ userDescr || '这家伙太懒了，撒都没留下' }}</p>
                </div>
                <a href="javascript:;" @click="showPopupDownLoadCall">关注Ta</a>
            </div>
            <div class="info">
                <div>
                    <em>{{ dynamicTotal }}</em>
                    <i>动态</i>
                    <span></span>
                </div>
                <div>
                    <em v-if="userInfoData">{{ userInfoData.fans_num}}</em>
                    <i>粉丝</i>
                    <span></span>
                </div>
                <div>
                    <em v-if="userInfoData">{{ userInfoData.follows_num }}</em>
                    <i>关注</i>
                </div>
            </div>
        </div>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="true" v-if="haveDynamic">
            <div class="dynamicChildren" v-for="(item, ParentIndex) in selfData" :key="ParentIndex" @click="godynamicInfo(item.id)" v-if="item.is_mine == 0 && item.state != 0">
                <div class="yearDate" v-if="hiddenYearDate(ParentIndex)">
                	<em>{{(selfData[ParentIndex].create_time).substring(0,4)}}</em>
                </div>
	            <div class="dynamicChildrenContent">
	                <div class="dynamic-create-data" v-if="hiddenDate(ParentIndex)">
	                    <em>{{ item.create_time.substring(8,10) }}</em>
	                    <i>{{ parseInt(item.create_time.substring(5,7)) }}月</i>
	                </div>
	                <div>   
	                    <p class="">{{ item.content}}</p>
	                    <div class="picture-box" v-if="item.type==1" @click.stop="">
	                        <!-- <div class="once">
	                            <img src="https://hxsupload-oss.hxsapp.com/2017-09-12/5af88a264615c0df0fd13a6b1243c093.jpg" alt="">
	                        </div>  -->
	                        <div class="more clearfix">
	                            <span :key="index" v-for="(img, index) in item.images" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'185%', width: photoStyleWidth, height:photoStyleWidth}" @click="openImgIndexFn(index,ParentIndex)" :class="{once: onePictureStyle}"></span>
	                        </div>
	                    </div>
	                </div>
	                <div class="dynamic-share-detail clearfix" v-if="item.type==2 && item.content_list && (item.state == 2 || item.state == 1 )" @click.stop="goArticleDetail(item.content_list.id)">
	                    <div class="detail-img-box">
	                        <div class="bg" v-if="item.content_list.show_type == 5 || item.content_list.show_type == 6"><span :class="{audio: item.content_list.show_type == 6, video: item.content_list.show_type == 5}"></span></div>
	                        <!-- <img :src="item.content_list.images[0]" alt=""> -->
                            <em :style="{background:'url(' + item.content_list.images[0] + ') center center /150% no-repeat'}"></em>
	                    </div>
	                    <div class="detail-txt" :style="{width:detailTxtWidth}">
	                        <p>{{ item.content_list.title }}</p>
	                        <p>{{ item.content_list.descr }}</p>
	                    </div> 
	                </div>
	                <div class="dynamic-video" v-if="item.type==3" :style="{height:(documentClientWidth - 73)*0.56 + 'px'}">
	                    <div class="bg"></div>
                        <em :style="{background:'url(' + item.type_content_json.images + ') center center /100% no-repeat'}"></em>
	                    <span></span>
	                </div>
	                <div class="dynamic-audio" v-if="item.type==4">
	                    <div :style="{width:90 +'px'}">
	                        <span></span>
	                        <em>{{ item.type_content_json.time }}</em>
	                    </div>
	                </div>
                    <div class="dynamic-detail-delete" v-if="(item && item.type==2) && (item.state != 1 && item.state != 2)">
                        <img src="../assets/images/icon_deleted.png">
                        <div class="detail-delete-tip">
                            <span>抱歉，此文章已被删除。查看帮助:</span>
                            <a href="https://act.hxsapp.com/base/Award/rule/deleteExplain">网页链接</a>
                        </div>
                    </div>
	                <div class="dynamic-date"  @click.stop="">
	                    <span>{{ item.create_time.substring(5,16) }}</span>
	                    <!-- <a href="javascript:;" v-if="false">删除</a> -->
	                    <div class="methods">
	                        <div class="content-nun" @click="showPopupDownLoadCall">
	                            <i></i>
	                            <em>{{ item.comment_num }}</em>
	                        </div>
	                        <div class="give-good" @click="showPopupDownLoadCall">
	                            <i></i>
	                            <em>{{ item.commend_num }}</em>
	                        </div>
	                    </div>
	                </div>
	            </div>
            </div>
        </div>
        <div class="dynamic-none-tip" v-if="!haveDynamic">
            <span></span>
            <em>暂无个人动态</em>
        </div>
        <div class="loadTip" v-if="loadTip">{{ loadTipText[loadTipTextIndex] }}</div>
        <picture-box :dynamicImages="dynamicImages" v-if="pictureShow" @obtain="callBack" :openPictureIndex="openImgIndex"></picture-box>
        <downToLinkedMe v-if="linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
        <popupDownHxsLinkedMe  v-if="linkedMe && isPopupDownLoad" :linkedMe='linkedMe'></popupDownHxsLinkedMe>
        <preLoading v-if="!userInfoData && !selfData.length"></preLoading>
	</div>
</template>
<script>

    import axios from 'axios'
    import common from '@/util/common.js'
    import picture from '@/components/picture'
    import preLoading from "@/components/preLoading"
    import goSignPage from "@/components/goSignPage"
    import downToLinkedMe from "@/components/downToLinkedMe"
    import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

    export default{
        name:"dynamic",
        data(){
            return{
                selfData: [],//个人动态信息列表
                userInfoData: null,//用户信息列表
                nickname: null, //截取用户的名前6位
                userDescr: null, //截取用户的名前6位
                dynamicTotal:null,//个人动态条数
                userId: null,//用户id
                lastId: 0,  //数据最后一个的id
                onePictureStyle: false, //普通动态单个的样式
                pictureShow: false, //图片查看是否显示
                dynamicImages:null, //图片查看器的图片
                openImgIndex: 0, //当前打开的是第几张图片
                loading: false,//是否使用下滑加载
                loadTip: false, //下滑加载提示
                loadTipText: ['正在加载中...','没有更多动态了'], //下拉加载或加载完提示,
                loadTipTextIndex:0,//下拉加载提示文本的下标
                photoStyleWidth: null, //九宫格图片布局
                isFirst: true, //是否是第一次加载
                haveDynamic: true,//是否有动态
                isPopupDownLoad: false,//app下载提示框是否显示
                isFirst:true, //动态列表加载是否是第一次
        		resultLoading: true,//每次下拉加载完毕才可以加载下一次
        		detailTxtWidth: null,
        		documentClientWidth: null,
                linkedMe:null//接入linkedme在微信打开app
            }
        },
        computed: {
            isLogin: function() {
                return common.isLogin()
            },
            isApp: function() {
                return common.isApp()
            }
        },
        mounted(){
            var _this = this;
            //获取用户id
            let routeParams = this.$route.params;
            this.userId = routeParams.id;

            this.getSelfList();
            this.getUserInfo();
            this.setPhotoStyle();
            this.detailTxtWidthFn();
            this.documentClientWidthFn();

            //埋点
            // common.buriedPoint({
            //     access_occurred_type: 500001,//发生访问的【页面】类型
            //     access_occurred_type_id: _this.userId,//发生访问的【页面】类型ID
            //     previous_event_type_obj: '',//【事件】对象类型
            //     previous_event_type_obj_id: '',//【事件】对象类型ID
            //     previous_content_sort: ''//【事件】事件参数
            // });

        },
        methods:{
            loadMore() {
                this.getSelfList(this.lastId);
            },
            getUserInfo(){
            	var _this = this;
                axios.get('https://api.hxsapp.com/account/UserInfo/getUserInfo', {params:{
                    user_id: this.userId
                }}).then((res) => {
                    if(res.data.code == 200){
                        // debugger
                        if( res.data.data && res.data.data.length == 0 ){
                            
                            return
                        }
                        this.userInfoData = res.data.data[this.userId];
                        
                        this.nickname = common.subStlength(this.userInfoData.nickname);
                        this.userDescr = common.subStlength(this.userInfoData.descr, 13, 11);
                        common.setTitle( this.nickname+ '动态个人主页');

                        //发送微信二次分享参数
                        let inviteCode = common.getUrlParam('inviteCode') || '';
                        common.outSideShare({
                            title: '好享瘦—移动专+减脂平台',
                            desc: '看看我的个人主页，来一起努力一起瘦吧！',
                            link: common.config.prefixUrl + 'dynamic/'+ _this.userId + '?inviteCode=' + inviteCode, 
                            img: _this.userInfoData.head_img
                        });

                        //接入linkedMe在非app浏览器直接打开app
                        this.linkedMe = {
                            params:{
                              "key": 'hxsapp://userInfo/index?uid=' + _this.userId + '&showKeyboard=false'
                            }
                        }
                    }
                })
            },
            getSelfList(lastId = 0){
		        //判断是否加载中 如果是 ，则阻止加载；否则加载
		        if(!this.resultLoading){return false}else{this.resultLoading = false;}
                axios.get('https://api.hxsapp.com/community/userDiary/getSelfList', {params:{
                	user_id: this.userId,
                    last_id: lastId,
					model_idfa: common.config.model_idfa
                }}).then((res) =>{
                   if(res.data.code == 200){
                        this.dynamicTotal = res.data.total;
                        let data = res.data.data;
                        if(data.length > 0){
                            for (let i = 0; i < data.length; i++) {
                                this.selfData.push(data[i]);
                            }
                            //数据最后一个id
                            this.lastId =  this.selfData[ this.selfData.length - 1].id;

                            //加载个数超过10个显示加载更多
                            if(data.length >= 10) this.loadTip = true;

                            //进入这里有动态
                            this.isFirst =false;
                        }else{
                            this.loading = true;
                            this.loadTipTextIndex = data.length <= 10? 1 : 0;

                            //第一次加载没有动态显示没有图标
                            if(this.isFirst) {this.isFirst = false; this.haveDynamic = false};
                        }
                   }
					this.resultLoading = true
                });
            },
            hiddenDate(ParentIndex){
                if(ParentIndex != 0 ){
                    var nowCreateTime = (this.selfData[ParentIndex].create_time).substring(0,10);
                    var prevCreateTime = (this.selfData[ParentIndex-1].create_time).substring(0,10);
                    if(prevCreateTime != nowCreateTime){
                        return true;
                    }else{
                        return false;
                    }
                }else {
                    return true; 
                }
            },
            hiddenYearDate(ParentIndex){
                if(ParentIndex != 0 ){
                    var nowCreateTime = (this.selfData[ParentIndex].create_time).substring(0,4);
                    var prevCreateTime = (this.selfData[ParentIndex-1].create_time).substring(0,4);
                    if(prevCreateTime != nowCreateTime){
                        return true;
                    }else{
                        return false;
                    }
                }else {
                    return false;
                }
            },
            callBack(isBoolean){//接受picture子组件参数
                this.pictureShow = isBoolean;
            },
            openImgIndexFn(index, parentIndex){ //查看图片
                this.dynamicImages = this.selfData[parentIndex].images;
                this.openImgIndex = index;
                this.pictureShow = true;
            },
            setPhotoStyle(){ //九宫格样式
                let Width = (document.documentElement.clientWidth - 73 - 8)/3 + 'px';
                this.photoStyleWidth = Width;
            },
            detailTxtWidthFn(){ //文章类型描述的大小
                let Width = (document.documentElement.clientWidth - 60 - 10 - 15 - 58 - 20) + 'px';
                this.detailTxtWidth = Width;
            },
            documentClientWidthFn(){
            	this.documentClientWidth = document.documentElement.clientWidth;
            },
            goArticleDetail(id){//跳转去文章详情页面
                this.$router.push({path:'/articleDetail/'+ id});
            },
            godynamicInfo(id){//跳转去动态详情页面
                this.$router.push({path:'/dynamicInfo/'+ id});
            },
            hidePopupDownLoadCall() {// 显示和异常弹出提示下载层
                this.isPopupDownLoad = false;
            },
            showPopupDownLoadCall() {
                this.isPopupDownLoad = true;
            }
        },
        components:{
            'picture-box': picture,
            popupDownHxsLinkedMe,
            preLoading,
            goSignPage,
            downToLinkedMe
        },
        beforeDestroy(){
            document.title = common.config.webTitle;
        }
    }
</script>
<style scoped>
    .dynamicChildren{
    }
    .dynamicChildrenContent{
        padding: 15px 15px 6px 58px;
        position: relative; 
    }
    .dynamicChildren .yearDate{  
        width: 100%;
        height: 28px;
        line-height: 28px;
        padding-top: 10px;
    }
    .dynamicChildren .yearDate em{
        height: 28px;
        line-height: 28px;
        color: #333;
        font-size: 26px;
        display: block;
        padding-left: 12px;
    }
    .loadTip{
        height: 14px;
        line-height: 14px;
        padding-bottom: 8px;
        font-size: 14px;
        text-align: center;
        color: #666;
        margin-top:10px;
    }
	.dynamic-personal{
      background: #5d5f93;
    }
    .dynamic-personal-bg{
        padding:40px 15px;
        height: 60px;
    }
    .dynamic-personal .img-box{
        float: left;
        margin-right: 12px;
    }
    .dynamic-personal .img-box span{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: block;
    }
    .dynamic-personal .text{
        float: left;
    }
    .dynamic-personal .name,.dynamic-personal .introduce{
    	max-height: 144px;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        color:#fff;
        overflow: hidden;
    }
    .dynamic-personal .name{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .dynamic-personal a{
        width: 60px; 
        height: 26px;
        line-height: 26px;
        color:#fff;
        font-size: 13px;
        float:right;
        border-radius:13px;
        text-align: center;
        background:-webkit-gradient(linear, left top, right top, from(#FF6E8D), to(#FF68B0));
        margin-top: 17px;
    }
    .dynamic-personal .info{
        display: -webkit-flex;
        padding: 9px 0;
        background:#796ebe;
    }
    .dynamic-personal .info div{ 
      -webkit-flex:1;
      position: relative;
    }
    .dynamic-personal .info div span{
        width: 1px;
        height: 16px;
        background: #fff;
        opacity: 0.16;
        position: absolute;
        right:0;
        top:50%;
        margin-top: -8px;
    }
    .dynamic-personal .info div em,.dynamic-personal .info div i{
      color:#fff;
      display: block;
      text-align: center;
    }
    .dynamic-personal .info div em{
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      padding-bottom: 5px;
    }
    .dynamic-personal .info div i{
      height: 15px;
      line-height: 15px;
      font-size: 13px;
      font-weight: bold;
    }
    .dynamicChildren p:nth-of-type(1){
        font-size: 16px;
        color: #595959;
        line-height: 22px;
        margin-bottom: 8px;
        margin-top: 4px;
    }
    .picture-box .more span{
        width: 32.66%;
        height: 100px;
        margin-right: 4px;
        margin-bottom: 4px;
        float: left;
        background-size: 120%;
    }
    .picture-box .more span:nth-of-type(3),.picture-box .more span:nth-of-type(6),.picture-box .more span:nth-of-type(9){
        margin-right: 0;
    }
    .picture-box .more .once{
        width: 130px;
        height: 130px;
    }
    .dynamic-share-detail{
        margin-top: 10px;
        padding: 10px;
        background: #f5f5f5;
        margin-bottom: 14px;
    }
    .dynamic-share-detail .detail-img-box{
        position: relative;
        float: left;
        margin-right: 10px;
    }
    .dynamic-share-detail .detail-img-box span{
        width: 30px;
        height: 30px;
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-15px;
        margin-top:-15px;
    }
    .dynamic-share-detail .detail-img-box .video{
        background: url(../assets/images/fx_shiping2.png) left top no-repeat;
        background-size: 100%;
    }
    .dynamic-share-detail .detail-img-box .audio{
        background: url(../assets/images/fx_yinping.png) left top no-repeat;
        background-size: 100%;
    }
    .dynamic-share-detail .detail-img-box img{
        width: 60px;
        height: 60px;
    }
    .dynamic-share-detail .detail-img-box em{
        width: 60px;
        height: 60px;
        display: block;
    }
    .dynamic-share-detail .detail-img-box .bg,.dynamic-share-detail .detail-img-box .bg2{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: absolute;
        left: 0;
        top:0;
    }
    .dynamic-share-detail .detail-img-box .bg2{
        z-index: 2;
        background: transparent;
    }
    /*.dynamic-share-detail .detail-img-box .audio{
      background: url(../img/fx_yinping.png) left top no-repeat;
      background-size:100%;
    }
    .dynamic-share-detail .detail-img-box .play{
      background: url(../img/fx_shiping.png) left top no-repeat;
      background-size:100%;
    }*/
    .dynamic-share-detail .detail-txt{
        width: 200px;
        float:left;
    }
    .dynamic-share-detail .detail-txt p:nth-of-type(1){
        color: #333;
        height: 16px;
        line-height: 16px;
        font-size:14px;
        overflow: hidden;
        margin-top: 12px;
        margin-bottom: 8px;
    }
    .dynamic-share-detail .detail-txt p:nth-of-type(2){
        height: 14px;
        line-height: 14px;
        color: #666;
        font-size:12px;
        overflow: hidden;
        margin-bottom: 0;
    }
    .dynamic-video{
        width: 100%;
        height: 210px;
        position: relative;
    }
    .dynamic-video img, .dynamic-video em{
        width: 100%;
        height: 100%;
        display: block;
    }
    .dynamic-video .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
    }
    .dynamic-video span{
        width: 50px;
        height: 50px;
        background: url(../assets/images/bf-da-sp.png) left top no-repeat;
        background-size: 100%;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -25px;
        margin-top: -25px;
    }
    .dynamic-audio{
        padding: 10px;
        background: #F5F5F8;
    }
    .dynamic-audio div{
        width: 150px;
        height: 30px;
        border-radius: 5px;
        background: #9AA3D8;
        position: relative;
    }
    .dynamic-audio div span{
        width: 10px;
        height: 16px;
        background: url(../assets/images/sy-fb.png) left top no-repeat;
        background-size: 100%;
        position: absolute;
        left: 7px;
        top: 7px;
    }
    .dynamic-audio div em{
        height: 30px;
        line-height: 30px;
        color:#999;
        font-size:12px;
        position: absolute;
        right: -17px;
        top: 0;
    }
    .dynamic-date{
      height: 26px;
    }
    .dynamic-date span{
      float:left;
      color:#999;
      font-size: 12px;
      height: 26px;
      line-height: 26px;
    }
    .dynamic-date a{
      height: 26px;
      line-height: 26px;
      float:left;
      color:#595959;
      font-size: 14px;
      margin-left: 10px;
    }
    .dynamic-container .methods{
      float: right;
    }
    .dynamic-container .methods i{
      width:15px;
      height: 15px;
      float:left;
      margin-right: 5px;
    }
    .dynamic-container .methods .content-nun{
      float:left;
      margin-right: 10px;
      cursor:pointer;
      padding: 5px 0 5px 5px;
    }
    .dynamic-container .methods .give-good{
      cursor:pointer;
      float:left;
      padding: 5px 0 5px 5px;
    }
    .dynamic-container .methods .content-nun i{
        background: url(../assets/img/pinlun.png) left top no-repeat;
        background-size:100%;
    }
    .dynamic-container .methods .give-good i{
        background: url(../assets/images/zan.png) left top no-repeat;
        background-size:100%;
    }
    .dynamic-container .methods .give-good .yes{
        background: url(../assets/images/zan-hong.png) left top no-repeat;
        background-size:100%;
    }
    .dynamic-container .methods em{
      color:#999;
      font-size: 12px;
      float:left;
    }
    .dynamicChildren{
        position: relative;
    }
    .dynamic-create-data{
      position: absolute;
      left:12px;
      top:12px;
    }
    .dynamic-create-data em{
      font-size: 24px;
      color:#333;
      display: block;
    } 
    .dynamic-create-data i{
      font-size: 13px;
      color:#333;
      display: block;
    }
    .dynamic-none-tip{
        padding-top: 50px;
    }
    .dynamic-none-tip span{
        width: 140px;
        height: 140px;
        background: url(../assets/images/quesheng_kong.png) left top no-repeat;
        background-size: 100%;
        display: block;
        margin:0 auto;
    }
    .dynamic-none-tip em {
        padding-top: 20px;
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color:#333;
        text-align: center;
    }
    .dynamic-detail-delete{
        padding:8px;
        height: 40px;
        background: #F5F5F8;
        margin-bottom: 10px;
    }
    .dynamic-detail-delete img{
        width: 40px;
        height: 40px;
        margin-right: 8px;
        float: left;
    }
    .detail-delete-tip{
        float: left;
        height: 40px;
    }
    .dynamic-detail-delete span{
        font-size: 14px;
        height: 18px;
        line-height: 18px;
        color: #666666;
        margin-top: 3px;
        display: block;
    }
    .dynamic-detail-delete a{
        font-size: 14px;
        height: 18px;
        line-height: 18px;
        color: #818DCF;
    }
</style>