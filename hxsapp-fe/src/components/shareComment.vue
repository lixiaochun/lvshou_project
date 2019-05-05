
<template>
	<div class="content-container">
        <div class="content-title">
            <div class="collect" @click="showPopupDownLoadCall"></div>
            <ol class="comment-related clearfix" v-if="commentData">
                <li @click="showPopupDownLoadCall">
                    <span></span>
                    <em>{{commenTotal}}</em>
                </li>
                <li @click="showPopupDownLoadCall">
                    <span class="zan"></span>
                    <em>{{dynamicThumb}}</em>
                </li>
            </ol>
        </div>
        <div class="contentTitle" v-if="hotCommentData &&  hotCommentData.length>0">热门评论</div>
        <ul v-if="hotCommentData &&  hotCommentData.length>0">
          <li v-for="(data, index) in hotCommentData" :key="index" v-if="commentData.length > 0" @click="showPopupDownLoadCall()">
              <div class="all-info">
                  <div class="img-box">
                    <span :style="{background:'url(' + data.head_img + ') center center /140% no-repeat'}"></span>
                  </div>
                  <div class="info">
                      <div class="name">{{ data.nickname }}</div>
                      <span>{{ data.create_time.substring(5,16) }}</span>
                  </div>
                  <div class="methods">
                      <div class="content-nun" @click="showPopupDownLoadCall">
                          <i></i>
                          <em>{{data.commentChildren.data.length}}</em>
                      </div>
                      <div class="give-good" @click="showPopupDownLoadCall">
                          <i></i>
                          <em>{{ data.commend_num }}</em>
                      </div>
                  </div>
              </div>
              <div class="content-msg">
                  <p class="discuss">{{ data.content }}</p>
                  <div class="delete-box">
                      <em>删除</em>
                  </div>
                  <div class="new_cont_reply" v-if="data.admin_reply">
                      <div class="new_reply_content">
                          <span><i></i>好享瘦小编回复:</span><em>{{data.admin_reply}}</em>
                      </div>
                  </div>
                  <div class="reply-comment" v-if="data.commentChildren.data.length > 1" @click="showPopupDownLoadCall">
                      <p v-for="(data, index) in data.commentChildren.data" :key="index">
                        <span>
                          {{data.nickname}}
                        </span>
                        <em v-if="data.reply_nickname">回复</em>
                        <span v-if="data.reply_nickname">
                          {{data.reply_nickname}}
                        </span>
                        <span>
                          :
                        </span>
                        <em>{{data.content}}</em>
                      </p>
                      <a href="javascript:;" v-if="data.commentChildren.total >= 3">查看全部回复({{ data.commentChildren.total }}) >></a>
                  </div>
              </div>
              <div class="solid"></div>
          </li>
        </ul>
        <div class="contentTitle">最新评论</div>
		<ul
		  	v-infinite-scroll="loadMore"
		  	infinite-scroll-disabled="loading"
		  	infinite-scroll-distance="0"
		  	infinite-scroll-immediate-check="true">
            <li v-for="(data, index) in commentData" :key="index" v-if="commentData.length > 0" @click="showPopupDownLoadCall()">
                <div class="all-info">
                    <div class="img-box">
                    	<span :style="{background:'url(' + data.head_img + ') center center /140% no-repeat'}"></span>
                    </div>
                    <div class="info">
                        <div class="name">{{ data.nickname }}</div>
                        <span>{{ data.create_time.substring(5,16) }}</span>
                    </div>
                    <div class="methods">
                        <div class="content-nun" @click="showPopupDownLoadCall">
                            <i></i>
                            <em>{{data.commentChildren.data.length}}</em>
                        </div>
                        <div class="give-good" @click="showPopupDownLoadCall">
                            <i></i>
                            <em>{{ data.commend_num }}</em>
                        </div>
                    </div>
                </div>
                <div class="content-msg">
                    <p class="discuss">{{ data.content }}</p>
                    <div class="delete-box">
                        <em>删除</em>
                    </div>
                    <div class="new_cont_reply" v-if="data.admin_reply">
                        <div class="new_reply_content">
                            <span><i></i>好享瘦小编回复:</span><em>{{data.admin_reply}}</em>
                        </div>
                    </div>
                    <div class="reply-comment" v-if="data.commentChildren.data.length > 1" @click="showPopupDownLoadCall">
                        <p v-for="(data, index) in data.commentChildren.data" :key="index">
                          <span>
                            {{data.nickname}}
                          </span>
                          <em v-if="data.reply_nickname">回复</em>
                          <span v-if="data.reply_nickname">
                            {{data.reply_nickname}}
                          </span>
                          <span>
                            :
                          </span>
                          <em>{{data.content}}</em>
                        </p>
                        <a href="javascript:;" v-if="data.commentChildren.total >= 3">查看全部回复({{ data.commentChildren.total }}) >></a>
                    </div>
                </div>
                <div class="solid"></div>
            </li>
		</ul>
    <div class="none_tip" v-if="noneTipShow">快发表评论成为第一个发表评论的人吧</div>
		<div class="loadTip" v-if="loadTip">{{loadTipText[loadTipTextIndex]}}</div>
    <popupDownHxsLinkedMe  v-if="linkedMe && isPopupDownLoad" :linkedMe='linkedMe'></popupDownHxsLinkedMe>
	</div>
</template>
<script>

	import axios from 'axios'
	import common from '@/util/common.js'
  import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

	export default {
		name:'shareComment',
		  data(){
		      return{
            commentData: [],
            hotCommentData: [],
            commenTotal: null,
        		childrenData:null,
        		loading:false, 
        		lastId: null, //请求接口的最后一个参数
        		loadTip: false, //下拉加载提示
                loadTipText: ['正在加载中...','没有更多评论了'], //下拉加载或加载完提示
                loadTipTextIndex:0,//下拉加载提示文本的下标
                isPopupDownLoad: false,//下载框显示或隐藏
                isCommentFirst:true,//是否第一次加载内容
                noneTipShow: false,//没有评论提示语
                resultLoading: true//每次下拉加载完毕才可以加载下一次
			 }
		},
        props:{
          commentInfo: { //接收传递过来的参数（//文章类型/文章的id/父评论id/
            type: Object,
            default: function() { }
          },
          dynamicThumb:{
              type: String,
              default: function(){ }
          },
          linkedMe: {
            type: Object,
            default: function() { }
          }
        },
		mounted(){
      console.log(this.linkedMe);
			this.getCommentData();
      this.getHotCommentData();
		},
		methods:{
      getHotCommentData(){
        axios.get('https://api.hxsapp.com/community/userComment/getCommentList',{
          params:{
            type:this.commentInfo.type,
            hot:1,
            data_id: this.commentInfo.data_id
          }
        }).then((res)=>{
          if( res.data.code == 200){
              this.hotCommentData = res.data.data;
          }
        })
      },
			loadMore() {
				this.getCommentData(this.lastId);
			},
			getCommentData(lastId = 0){
				// let json = {
				// 	type:1,
				// 	data_id: 5487,
				// 	last_id: lastId
				// };

        //判断是否加载中 如果是 ，则阻止加载；否则加载
        if(!this.resultLoading){return false}else{this.resultLoading = false;}

        let json = this.commentInfo;

				axios.get('https://api.hxsapp.com/community/userComment/getCommentList',{params:json}).then((res)=>{
				 	if( res.data.code == 200){
            this.commenTotal = res.data.total;
				 		let data = res.data.data;

						if(data.length > 0){//加载回来数据超过一个

							for (let i = 0; i < data.length; i++) {

                //父评论名字省略号
                data[i].nickname = common.subStlength(data[i].nickname);

                //父评论里面的子评论名字省略号
                if(data[i].commentChildren.data.length > 0) {
                  for(let j = 0; j < data[i].commentChildren.data.length; j++){
                      let childrenNickName = data[i].commentChildren.data[j].nickname;
                      data[i].commentChildren.data[j].nickname = common.subStlength(childrenNickName);
                      var childrenReplyNickname = data[i].commentChildren.data[j].reply_nickname;
                      if(childrenReplyNickname){
                        data[i].commentChildren.data[j].reply_nickname = common.subStlength(childrenReplyNickname);
                      }
                  }

                }

								this.commentData.push(data[i]);
                
							}

              //数据返回最后一个数据
							this.lastId = this.commentData[this.commentData.length - 1].id;
              this.commentInfo.last_id = this.lastId;

              //加载个数超过10个显示加载更多,少于10个暂停加载
              if(data.length >= 10) {
                this.loadTip = true
              }

              if(this.isCommentFirst) {
                this.transmitCommentData(data);
                this.isCommentFirst = false;
              }
              
						}else {//个数为0 解除滚动绑定和加载更多隐藏

              this.loading = true;
              this.loadTipTextIndex = data.length <= 10? 1 : 0;

              if(this.isCommentFirst) {
                this.transmitCommentData(data);
                this.noneTipShow = true;
              }
						}
            this.resultLoading  = true;
				 	}
				})
			},
      hidePopupDownLoadCall() {// 显示和异常弹出提示下载层
        this.isPopupDownLoad = false;
      },
      showPopupDownLoadCall() {
        this.isPopupDownLoad = true;
      },
      transmitCommentData(obj){//触发父组件函数,传递请求回来数据 （判断页面加载完毕）
        this.$emit('acceptCommentDateFn', obj)
      }
		},
    components:{
        popupDownHxsLinkedMe
    }
	}
</script>
<style scoped>
.contentTitle{
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  color: #666;
  font-size: 13px;
  background:rgba(248,248,248,1);
}
.loadTip{
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	text-align: center;
	color: #666;
}
.content-container .content-title{
    height: 30px;
    padding:7px 15px;
}
.content-title-border{
    height: 1px;
    margin: 0 15px;
    background: rgba(129,141,207,0.20);
}
.content-container .content-title .collect{
    width:25px;
    height: 25px;
    float: left;
    background: url(../assets/images/sc_db.png) left top no-repeat;
    background-size:100%;
    margin-top: 1px;
}
.comment-related{
    float: right;
}
.comment-related li{
	float:left;
}
.comment-related span{
    width: 20px;
    height:20px;
    background: url(../assets/img/pinlun.png) left top no-repeat;
    background-size:100%;
    float: left;
    margin-top: 5px;
    margin-right: 3px;
}
.comment-related li .zan{
    background: url(../assets/images/zan-db.png) left top no-repeat;
    background-size:100%;
}
.comment-related li em{

    width: 28px;
	color: #999;
	height: 30px;
	line-height: 30px;
	font-size:15px;
    float: left;
}
.content-container ul{
    padding-top:15px;
}
.content-container ul li .all-info{
  height: 42px;
  overflow: hidden;
}
.content-container ul li .img-box{
    float:left;
    margin-right: 11px;
    cursor:pointer;
}
.content-container ul li .img-box span{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:solid 1px #ddd;
    cursor:pointer;
    display: block;
}
.content-container .info{
  float:left;
}
.content-container .info .name{
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  margin-bottom: 3px;
}
.content-container .info span{
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  color: #999;
}
.content-container .none_tip{
  width:100%; 
  height: 110px;
  padding-bottom: 25px;
  color:#666; 
  text-align: 
  center; 
  line-height: 100px;
  font-size: 14px;
  overflow: hidden;
}
.content-container ul li{
  padding:0 15px;
  margin-bottom: 19px;
}
.content-container ul li .methods{
  float: right;
}
.content-container ul li .methods i{
  width:20px;
  height: 20px;
  float:left;
  margin-right: 3px;
}
.content-container ul li .methods .content-nun{
  float:left;
  cursor:pointer;
  padding: 0 0 5px 0;
  display: none;
}
.content-container ul li .methods .give-good{
  cursor:pointer;
  float:left;
  padding: 0 0 5px;
}
.content-container ul li .methods .content-nun i{
    background: url(../assets/img/pinlun.png) left top no-repeat;
    background-size:100%;
}
.content-container ul li .methods .give-good i{
    background: url(../assets/img/zan_no.png) left top no-repeat;
    background-size:100%;
}
.content-container ul li .methods .give-good .yes{
    background: url(../assets/img/zan_yes.png) left top no-repeat;
    background-size:100%;
}
.content-container ul li .methods em{
    width: 28px;
    height: 20px;
    line-height: 20px;
    color:#999;
    font-size: 14px;
    float:left;
    overflow: hidden;
}
.content-container ul li .discuss{
  line-height: 20px;
  color: #333;
  font-size: 15px;
  padding-top: 8px; 
  word-break: break-all;
}
.content-container ul li .discuss span{
  font-size: 16px;
  color:#0091ff;
  word-break: break-all;
}
.content-container ul li .content-msg{
    padding-left: 53px;
    overflow: hidden;
}
.content-container ul li .reply-comment{
  margin-top: 14px;
  padding: 12px 11px 4px;
  background: #f2f2f2;
  cursor: pointer;
}
.content-container ul li .reply-comment p{
  line-height: 20px;
  font-size:13px;
  color:#595959;
  margin-bottom: 8px; 
  word-break: break-all;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.content-container ul li .reply-comment a{
  padding-bottom:5px;
  font-size:13px;
  display: block;
}
.content-container ul li .reply-comment p span,.content-container ul li .reply-comment a{
	color: #818DCF;
}

.content-container ul li .reply-comment p span{
  padding-right: 8px;
}
.content-container ul li .delete-box{
  height: 16px;
  margin-top: 11px;
  cursor: pointer;
  display: none;
}/*
.content-container ul li .delete-box span{
    width: 14px;
    height: 14px;
    background: url(../img/delete.png) left top no-repeat;
    background-size:14px;
    float:left;
    margin-right: 6px;
}*/
.content-container ul li .delete-box em{
  height: 16px;
  line-height:16px;
  font-size: 14px;
  color:#666;
  float:left;
  cursor: pointer;
}
.content-container ul li .solid{
  height: 1px;
  margin-top: 19px;
  border-bottom: solid 1px rgba(129,141,207,0.20);
  margin-left: 53px;
  overflow: hidden;
}
.new_cont_reply{
  padding: 6px 12px;
  margin-top: 13px;
  background: #fefcf2; 
 }
.new_reply_content{
  line-height: 20px;
  color:#595959;
  word-break: break-all;
}
.new_reply_content span{
  font-size: 14px; 
  padding-right:8px;
  color: #818DCF; 
  position: relative;
}
.new_reply_content span i{
  width: 14px; 
  height:14px;  
  position: absolute; 
  left: 0; 
  top:50%; 
  margin-top: -8px;
}
.new_reply_content em{
  font-size: 14px;
  color: #666;
}
</style>