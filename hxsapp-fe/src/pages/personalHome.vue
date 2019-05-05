<template>
	<div class="personalHome-container" v-if="homePageDetail">
        <goSignPage></goSignPage>
		<div class="head-bg":style="{background:'url(' + homePageDetail.head_img + ') center center no-repeat',backgroundSize:'160%'}"></div>
		<div class="main">
			<div class="head">
				<div class="img-box">
          <div class="adv-img">
            <img :src="homePageDetail.head_img" alt="">
          </div>
          <!-- <em :style="{background:'url(' + homePageDetail.head_img + ') center center no-repeat',backgroundSize:'160%'}" ></em> -->
					<span v-if="!isAdviser && homePageDetail.v == '1'"></span>
					<span class="adviser" v-if="isAdviser"></span>
				</div>
				<div class="follow" @click="showPopupDownLoadCall">关注</div>
				<div class="name">{{intercept(homePageDetail.nickname)}}</div>
				<div class="info">
					<div>
						<span>粉丝</span>
						<span>{{homePageDetail.fans_num}}</span>
					</div>
					<div class="last">
						<span>关注</span>
						<span>{{homePageDetail.follows_num}}</span>
					</div>
				</div>
				<div class="abstract" v-if="homePageDetail.descr.length>=30 && !openMore">{{intercept(homePageDetail.descr)}}<em @click="openMoreFn">展开全部</em></div>
				<div class="abstract" v-if="homePageDetail.descr.length < 30 || openMore">{{homePageDetail.descr}}<em @click="openMoreFn" v-if="homePageDetail.descr.length>=30">收起</em></div>

				<div class="medal" v-if="(cheackJson('medal') && homePageDetail.medal.length>0)">
					<span v-for="(item,index) in homePageDetail.medal" :key="index" :style="{background:'url(' + item + ') center center no-repeat',backgroundSize:'160%'}" :class="{last:index == homePageDetail.medal.length-1}"></span>
				</div>
				<div class="career clearfix" v-if="isAdviser">
					<div class="list">
						<span>已服务人数</span>
						<em>{{ homePageDetail.adviser_info.service_num}}</em>
					</div>
					<div class="list" v-if="cheackJson('koubei')">
						<span>口碑</span>
						<div>
							<i v-for="(item,index) in starFn(homePageDetail.koubei.star)" :key="index" :class="{half:item == 0.5, full: item == 1}"></i>
							<a>({{homePageDetail.koubei.score}})</a>
						</div>
					</div>
					<div class="list" v-if="!cheackJson('koubei')">
						<span>口碑</span>
						<div>
							<i v-for="item in starFn('0')" :key="item" :class="{half:item == 0.5, full: item == 1}"></i>
							<a>({{'0'}})</a>
						</div>
					</div>
				</div>
			</div>
			<div class="audio" v-if="isAdviser">
				<div v-if="cheackJson('listen_to_me', homePageDetail.adviser_info)">
					<div class="title" >
						<span></span>
						<em>听我说</em>
						<span class="right"></span>
					</div>
					<div class="audio-main clearfix">
					 	<em :style="{background:'url(' + homePageDetail.head_img + ') center center no-repeat',backgroundSize:'160%'}" ></em>
						<div class="audio-width" @click="showPopupDownLoadCall">
							<span></span>
						</div>
						<div class="time">{{ parseInt(homePageDetail.adviser_info.listen_to_me.time)}}"</div>
					</div>
				</div>
			</div>
			<div class="border_7"></div>
			<div class="photo-wall" v-if="isAdviser && cheackJson('photoWall')">
				<ul class="clearfix" @click="showPopupDownLoadCall()">
					<li class="photo-wall-video" v-for="(item,index) in photoWallArrFn(homePageDetail.photoWall)" :key="index" :style="{width:photoWallSize,height:photoWallSize,background:'url(' + item.images + ') center center no-repeat',backgroundSize:'180%'}" @click="showPopupDownLoadCall()">
						<span v-if="item.type == 2"></span>
					</li>
					<li class="default" v-if="photoWallArrFn(homePageDetail.photoWall).length<3" @click="showPopupDownLoadCall()">
					</li>
				</ul>
			</div>
			<div class="border_7" v-if="isAdviser"></div>
			<div class="information">
				<div class="title">
					<ul>
						<li :class="{active:getType==1}" v-if="userCaseTotal > 0" @click="showPopupDownLoadCall(1)">
							<span>成功案例</span>
							<em>{{userCaseTotal}}</em>
							<i></i>
							<div></div>
						</li>
						<li @click="showPopupDownLoadCall(2)" :class="{active:getType==2}" v-if="isAdviser && homePageDetail.userNoteTotal != '0'">
							<span>客户日记</span>
							<em>{{homePageDetail.userNoteTotal}}</em>
							<i></i>
							<div></div>
						</li>
						<li :class="{active:getType==3}" @click="showPopupDownLoadCall(3)">
							<span>动态</span>
							<em>{{dynamicTotal || 0}}</em>
							<i></i>
							<div></div>
						</li>
						<li @click="showPopupDownLoadCall" v-if="!isAdviser">
							<span>日记</span>
							<em>{{homePageDetail.userNoteTotal}}</em>
							<i></i>
							<div></div>
						</li>
						<li v-if="getType==1 || isAdviser" @click="showPopupDownLoadCall">
							<span>口碑</span>
							<em>{{homePageDetail.koubei2Total}}</em>
							<i></i>
							<div></div>
						</li>
					</ul>
				</div>
				<div class="information-content">
					<ul
					class="case"
					v-infinite-scroll="loadMore"
		            infinite-scroll-disabled="loading"
		            infinite-scroll-distance="0"
		            infinite-scroll-immediate-check="true" v-if="getType==1">
						<li v-for="(item, ParentIndex) in selfData" :key="ParentIndex" @click="jumpDemoDetail(item.info.id)">
							<div class="img-box clearfix">
								<div>
									<img :src="item.info.before" alt="" :style="{width:caseImgSize,height:parseInt(caseImgSize)*1.1 + 'px'}">
									<span>Before&nbsp{{item.info.beforeWeight}}</span>
								</div>
								<div>
									<img :src="item.info.after" alt="" :style="{width:caseImgSize,height:parseInt(caseImgSize)*1.1 + 'px'}">
									<span class="right">After&nbsp{{item.info.afterWeight}}</span>
								</div>
							</div>
							<div class="info"><span></span><em>{{item.plan.name}}</em></div>
							<p class="text" v-html="item.info.content"></p>
							<div class="caseMood clearfix" v-if="item.label.length>0">
								<em></em>
								<span v-for="(labelText,labelIndex) in item.label" :key="labelIndex">{{labelText.labelName}}</span>
							</div>
							<div class="comment">
								<div class="comment-info">
									<div class="mr" @click.stop="showPopupDownLoadCall()">
										<span class="pinglun"></span>
										<em>{{item.community.commentNum}}</em>
									</div>
									<div@click.stop="showPopupDownLoadCall()">
										<span></span>
										<em>{{item.community.commendNum}}</em>
									</div>
								</div>
							</div>
							<div class="border_7"></div>
						</li>
					</ul>
					<div class="dynamic-container">
						<div
				            v-infinite-scroll="loadMore"
				            infinite-scroll-disabled="loading"
				            infinite-scroll-distance="0"
				            infinite-scroll-immediate-check="true" v-if="haveDynamic && getType==3">
				            <div class="dynamicChildren" v-for="(item, ParentIndex) in selfData" :key="ParentIndex" @click="godynamicInfo(item)" v-if="item.is_mine == 0 && item.state != 0">
				                <div class="dynamicChildrenBorder">
					               <div class="dynamicChildrenContent" :class="{dynamicChildrenContentBorder: item.id != lastId}">
					               		<div class="dynamicAuthor">
					               			<span class="dynamicAuthorHead" :style="{background:'url(' + item.head_img + ') center center no-repeat',backgroundSize:'160%'}" ></span>
					               			<div class="dynamicAuthorInfo">
					               				<span class="author">{{ item.nickname }}</span>
					               				<span class="creatTime">{{ item.create_time }}</span>
					               			</div>
					               			<div class="openContent"></div>
					               		</div>
				                        <div v-if="item.data_type=='diary'">
				                            <div v-if="item.content">
				                                <p class="">{{ item.content}}</p>
				                            </div>
				                            <div class="picture-box" v-if="item.type==1" @click.stop="">
				                                <!-- <div class="once">
				                                    <img src="https://hxsupload-oss.hxsapp.com/2017-09-12/5af88a264615c0df0fd13a6b1243c093.jpg" alt="">
				                                </div>  -->
				                                <div class="more clearfix">
				                                    <span :key="index" v-for="(img, index) in item.images" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'185%', width: photoWallSize, height:photoWallSize}" @click="openImgIndexFn(index,ParentIndex)" v-if="item.images.length>1"></span>

				                                    <span :key="index" v-for="(img, index) in item.images" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'185%', width: '200px', height:'155px'}" @click="openImgIndexFn(index,ParentIndex)" v-if="item.images.length==1"></span>
				                                </div>
				                            </div>
				                            <div class="dynamic-share-detail clearfix" v-if="item.type==2 && !isDeleteDynamicFn(item)" @click.stop="goArticleDetail(item.content_list.id)">
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
				                           <div class="dynamic-audio" v-if="item.type==4" :style="{height:(documentClientWidth - 73)*0.56 + 'px'}">
				                                <div class="bg"></div>
				                                <em :style="{background:'url(' + item.type_content_json.images + ') center center /100% no-repeat'}"></em>
				                                <span></span>
				                            </div>
				                            <div class="dynamic-sportsCourse" v-if="item.type==5 && !isDeleteDynamicFn(item)">
				                                <div class="bg" :style="{background:'url(' + item.content_list.images[0] + ') center center /100% no-repeat'}">
				                                    <em>{{ item.content }}</em>
				                                </div>
				                            </div>

				                            <div class="dynamic-shop" v-if="item.type==6  && !isDeleteDynamicFn(item)">
				                                <div class="img-box">
				                                    <span :style="{background:'url(' + item.content_list.images[0] + ') center center /120% no-repeat'}"></span>
				                                </div>
				                                <div class="text">
				                                    <p>{{item.content_list.title}}</p>
				                                    <div>
				                                        <em>{{item.content_list.title}}</em>
				                                        <!-- <span>白色</span> -->
				                                    </div>
				                                </div>
				                            </div>
				                            <div class="dynamic-detail-delete" v-if="isDeleteDynamicFn(item)">
				                                <img src="../assets/images/icon_deleted.png">
				                                <div class="detail-delete-tip">
				                                    <span>抱歉，此文章已被删除。查看帮助:</span>
				                                    <a href="https://act.hxsapp.com/base/Award/rule/deleteExplain">网页链接</a>
				                                </div>
				                            </div>
				                        </div>

				                        <div v-if="item.data_type=='article'" class="userArticle" @click.stop="goArticleDetail(item.id)">
				                            <div class="articleTitle">{{item.title}}</div>
				                            <div class="articleDescr" v-if="item.descr">{{item.descr}}</div>
				                            <div class="articleContent" :style="{height:(documentClientWidth - 73)*0.56 + 'px'}" >
				                                <div class="bg" v-if="item.show_type==5 || item.show_type==6"></div>
				                                <em :style="{background:'url(' + item.images + ') center center /100% no-repeat'}"></em>
				                                <span v-if="item.show_type==5 || item.show_type==6" :class="{audio:item.show_type==6,video:item.show_type==5}"></span>
				                            </div>
				                        </div>

				    	                <div class="dynamic-date"  @click.stop="">
				    	                    <span v-if="item.circle_id == '1'" class="circle">{{ item.circle_info.title }}</span>
				    	                    <span v-if="item.is_location == '1'" style="padding:0 3px; font-size:12px;">·</span>
				    	                    <span v-if="item.is_location == '1'">-{{ item.location_info.city }}</span>
				    	                    <div class="methods">
				    	                        <div class="content-nun" @click="showPopupDownLoadCall">
				    	                            <i></i>
				    	                            <em>{{item.comment_num }}</em>
				    	                        </div>
				    	                        <div class="give-good" @click="showPopupDownLoadCall">
				    	                            <i></i>
				    	                            <em>{{ item.commend_num}}</em>
				    	                        </div>
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
					</div>
					<ul class="diary"
						v-infinite-scroll="loadMore"
			            infinite-scroll-disabled="loading"
			            infinite-scroll-distance="0"
			            infinite-scroll-immediate-check="true" v-if="getType==2">
						<li v-for="(item, ParentIndex) in homePageDetail.userNote.list" :key="ParentIndex" @click="jumpDiaryDetail(item.id)">
							<span class="date" :class="{changeColor:parseInt(item.user_info.diary_number) >= 10 }">{{toDual(item.user_info.diary_number)}}</span>
							<div class="diary-content">
								<div class="diary-title">
									<span>{{intercept(item.user_info.name)}}的第{{toDual(item.user_info.diary_number)}}篇日记</span>
									<em>{{item.createTime}}</em>
									<i></i>
								</div>
								<p class="text">{{intercept(item.content,30,25)}}</p>
								<div class="img-box clearfix" v-if="item.images.length>0" @click.stop="">
				                <span :key="index" v-for="(img, index) in item.images" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'100%', width: diaryWallSize, height:diaryWallSize}" @click="openImgIndexFn(index,ParentIndex)" :class="{once: false}"></span>
								</div>
								<div class="mood clearfix">
									<div v-if="parseInt(item.weight)> 0"><em></em>{{item.weight}}</div>
									<div v-if="parseInt(item.steps)> 0"><em></em>{{item.steps}}</div>
									<span v-if="item.drink == 'true'" class="drink"></span>
									<span v-if="item.sports == 'true'" class="sports"></span>
									<span v-if="item.excretion == 'true'" class="excretion"></span>
									<span v-if="item.diet == 'true'" class="diet"></span>
									<span :class="{emotion0:item.emotion=='0',emotion1:item.emotion=='1',emotion2:item.emotion=='2',emotion3:item.emotion=='3',emotion4:item.emotion=='4'}"></span>
								</div>
								<div class="comment">
									<div class="comment-info">
										<div class="mr">
											<span class="pinglun"></span>
											<em>{{item.commentNum}}</em>
										</div>
										<div>
											<span></span>
											<em>{{item.commendNum}}</em>
										</div>
									</div>
								</div>
								<div class="border_7"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<pictureBox :dynamicImages="dynamicImages" :openPictureIndex="openImgIndex" @obtain="pictrueCallBack" v-if="pictureShow"></pictureBox>
        <downToLinkedMe v-if="linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
        <popupDownHxsLinkedMe  v-if="linkedMe && isPopupDownLoad" :linkedMe='linkedMe'></popupDownHxsLinkedMe>
        <preLoading v-if="!isLoading"></preLoading>
	</div>
</template>
<script>
	import axios  from 'axios'
    import commonJs from '@/util/common.js'
	import picture from '@/components/picture'
	import downToLinkedMe from '@/components/downToLinkedMe'
    import goSignPage from "@/components/goSignPage"
	import preLoading from '@/components/preLoading'
	import popupDownHxsLinkedMe from '@/components/popupDownHxsLinkedMe'
	export default{
		data(){
			return{
				getType:null,//请求动态，日记，案例，口碑的type
				userId:null,//用户id
				homePageDetail: null,//个人动态总数据
				photoWallSize:null,//动态的图片大小
				selfData: [],//动态或案例的内容数组
				openMore:false,//个人简介判断过长参数
				isAdviser: false,//是不是顾问
				isLoading:false,//页面是否加载文笔
                pictureShow: false, //图片查看是否显示
                dynamicImages:null, //图片查看器的图片
                openImgIndex: 0, //当前打开的是第几张图片
                diaryWallSize:null,
                isPopupDownLoad: false,//app下载提示框是否显示
				haveDynamic: true,//是不是动态
				showDynamic: false,//是否展示动态
				showCase: true,//是否展示案例
				documentClientWidth:null,
        		resultLoading: true,//每次下拉加载完毕才可以加载下一次
                lastId: 0,  //数据最后一个的id
                loading: false,//是否使用下滑加载
                loadTipTextIndex:0,//下拉加载提示文本的下标
                pageDepend:null,//下拉需要的参数
                caseImgSize:null,//案例图片的大小
                dynamicTotal:null,//动态总条数
                userCaseTotal:null,//案例的总条数
                isFirst: true, //是否是第一次加载
                photoStyleWidth: null, //九宫格图片布局
                loadTip: false, //下滑加载提示
        		detailTxtWidth: null,//文章类型有点文字长度
                loadTipText: ['正在加载中...','没有更多内容了'], //下拉加载或加载完提示,
			}
		},
		mounted(){
			//获取用户id
			this.getUserId();
			//动态图片大小
			this.photoWallSizeFn();
			//页面总数据数据请求
            this.getSelfList();

			//动态文章大小
            this.detailTxtWidthFn();

            //window大小
            this.documentClientWidthFn();

            //案例详情的图片大小
            this.caseImgSizeFn();

            //日记详情的图片大小
            this.diaryWallSizeFn();
		},
		methods:{
			toDual(num){
				var n = num;
				if(n=='0'){return n}
				if(parseInt(num) < 10 ){ n = '0' + n}
				return n;
			},
			diaryWallSizeFn(){//日记详情的图片大小
				this.diaryWallSize = (document.documentElement.clientWidth - 79)/3 + 'px';
			},
            pictrueCallBack(isBoolean){//接受picture子组件参数
                this.pictureShow = isBoolean;
            },
            intercept(str,max,min){//个人简介过长截短
            	return commonJs.subStlength(str,max,min);
            },
            getUserId(){//接受picture子组件参数
	            let routeParams = this.$route.params;
	            this.userId = routeParams.id;
            },
			loadMore(){//下拉加载
				this.getSelfList(this.lastId);
			},
            hidePopupDownLoadCall() {// 隐藏提示下载层
                this.isPopupDownLoad = false;
            },
            showPopupDownLoadCall() {// 显示和异常弹出提示下载层
                this.isPopupDownLoad = true;
            },
			caseImgSizeFn(){//案例图片的大小函数
				this.caseImgSize = (document.documentElement.clientWidth - 28 - 4)/2 + 'px';
			},
			photoWallSizeFn(){//动态图片的大小函数
				this.photoWallSize = (document.documentElement.clientWidth - 28 - 9)/3 + 'px';
			},
            isDeleteDynamicFn(item){//当前类型是否被删除 只有2 5 6类型存在删除说明
                let type = item.type;
                if(type == 2 || type  == 5 || type  == 6){
                    if(item.content_list.delExplainUrl){
                        this.isDeleteDynamic = true;
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            godynamicInfo(item){//跳转去动态详情页面
                let type = item.type;
                if(type == 5 || type == 6){
                    window.location.href = item.content_list.link;
                }else{
                    this.$router.push({path:'/dynamicInfo/'+ item.id});
                }
            },
            getSelfList(lastId = 0){//页面总数据数据

		        //判断是否加载中 如果是 ，则阻止加载；否则加载
		        if(!this.resultLoading){return false}else{this.resultLoading = false;}
                axios.get('https://api.hxsapp.com/base/HomePage/getHomePage', {params:{
                	userId: this.userId,
                    page_depend:this.pageDepend,
                    lastId: lastId,
                    type: this.getType
                }}).then((res) =>{
                   if(res.data.code == 200){

						var getData = '';


						if(this.isFirst) {//只在第一次进行的运作
							//页面总数据赋值
							this.homePageDetail = res.data.data;

							//如果有案例 优先请求案例
							if(parseInt(res.data.data.userCaseTotal) > 0){//案列
								getData = res.data.data.userCase.list;
								this.getType = 1;
							}else if(this.cheackJson('adviser_info') && parseInt(res.data.data.userNoteTotal) > 0 ){
								getData = res.data.data.userNote.list;
								this.getType = 2;
							}else {//动态
								getData = res.data.data.userDiary.list;
								this.getType = 3;
							}
							//截取用户名字
							this.homePageDetail.nickname = commonJs.subStlength(this.homePageDetail.nickname);
							//判断总数据里是否有顾问这个字段
							this.isAdviser = this.cheackJson('adviser_info');
	            			//用于动态和日记的总条数
	            			if(this.cheackJson('userCaseTotal')){this.userCaseTotal = parseInt(res.data.data.userCaseTotal);}
	            			if(this.cheackJson('userDiaryTotal')){this.dynamicTotal = parseInt(res.data.data.userDiaryTotal);}


							var _this = this;

							//设置title
							commonJs.setTitle(_this.homePageDetail.nickname + '的好享瘦个人主页');

	 						//发送微信二次分享参数
	                        let inviteCode = commonJs.getUrlParam('inviteCode') || '';
	                        commonJs.outSideShare({
	                            title: '好享瘦—移动专+减脂平台',
	                            desc: '看看我的个人主页，来一起努力一起瘦吧！',
	                            link: commonJs.config.prefixUrl + 'personalHome/'+ _this.userId + '?inviteCode=' + inviteCode,
	                            img: _this.homePageDetail.head_img
	                        });

	                        //接入linkedMe在非app浏览器直接打开app
	                        this.linkedMe = {
	                            params:{
	                              "key": 'hxsapp://userInfo/index?uid=' + _this.userId + '&showKeyboard=false'
	                            }
	                        }
						}

                        if(getData.length > 0){
                            for (let i = 0; i < getData.length; i++) {
                            	getData[i].nickname = commonJs.subStlength(getData[i].nickname)
                                this.selfData.push(getData[i]);
                            }
                            //数据最后一个id
                            this.lastId =  this.selfData[ this.selfData.length - 1].id;

							if(this.getType == 3){
                            	this.pageDepend = res.data.data.userDiary.page_depend;
							}else if(this.getType == 1){
                            	this.pageDepend = res.data.data.userCase.page_depend;
							}


                            //加载个数超过10个显示加载更多
                            if(getData.length >= 10) this.loadTip = true;

                            //进入这里有动态
                            this.isFirst = false;

                        }else{
                            this.loading = true;
                            this.loadTipTextIndex = getData.length <= 10? 1 : 0;

                            //第一次加载没有动态显示没有图标
                            if(this.isFirst) {this.isFirst = false; this.haveDynamic = false};
                        }
                   }
					this.resultLoading = true

					setTimeout(()=>{
						this.isLoading = true;
					},600);
                });
            },
            photoWallArrFn(json){
				var arr = [];
				for(var key in json){
					if(json[key].type == '1'){
						arr.push({images:json[key].src,type:json[key].type});
					}else{
						arr.push({images:json[key].image,type:json[key].type});
					}
				}
				if(arr.length>3){arr.length=3}
				return arr;
            },
            setPhotoStyle(){ //九宫格样式
                let Width = (document.documentElement.clientWidth - 73 - 8)/3 + 'px';
                this.photoStyleWidth = Width;
            },
            godynamicInfo(item){//跳转去动态详情页面
                let type = item.type;
                if(type == 5 || type == 6){
                    window.location.href = item.content_list.link;
                }else{
                    this.$router.push({path:'/dynamicInfo/'+ item.id});
                }
            },
            documentClientWidthFn(){//可视窗口大小
            	this.documentClientWidth = document.documentElement.clientWidth;
            },
            openMoreFn(){
            	this.openMore = !this.openMore;
            },
            goArticleDetail(id){//跳转去文章详情页面
                this.$router.push({path:'/articleDetail/'+ id});
            },
            cheackJson (str,json = this.homePageDetail) {
				// if(JSON.stringify(this.homePageDetail).indexOf(str) !=-1){
				// 	return true;
    // 			};
				for(var key in json){
					if(key == str){
						return true;
					}
				}
				return false;
            },
            intercept(str){//个人简介过长截短
            	return commonJs.subStlength(str,30,25);
            },
			jumpDemoDetail(id){//跳转案列详情页面
	            var inviteCode = commonJs.getUrlParam('inviteCode') || '';
				window.location.href = "https://app.hxsapp.com/hxsweb/demoDetail/" + id + '?inviteCode=' + inviteCode;
			},
			jumpDiaryDetail(id){//跳转案列详情页面
	            var inviteCode = commonJs.getUrlParam('inviteCode') || '';
				window.location.href = "https://app.hxsapp.com/hxsweb/diaryDetail/" + id + '?inviteCode=' + inviteCode;
			},
            detailTxtWidthFn(){ //文章类型描述的大小
                let Width = (document.documentElement.clientWidth - 60 - 10 - 15 - 58 - 20) + 'px';
                this.detailTxtWidth = Width;
            },
            showPopupDownLoadCall(msg = 1000) {//展示app下载框
            	if(this.getType == msg) return;
                this.isPopupDownLoad = true;
            },
            openImgIndexFn(index, parentIndex){ //查看图片
                this.dynamicImages = this.selfData[parentIndex].images;
                this.openImgIndex = index;
                this.pictureShow = true;
            },
			starFn(nun){//函数待优化
				//业务规则详看3.3.0版本 b-1_3_顾问
				let starNun = parseFloat(nun);
				var startArr = [];

		        // if( n <= 1.2 ){
		        //   starNun = 1;
		        // }else if( n <= 1.3 && n <=1.7){
		        //   starNun = 1.5;
		        // }else if(n>= 1.8 && n <=2.2){
		        //   starNun = 2;
		        // }else if(n>= 2.3 && n <=2.7){
		        //   starNun = 2.5;
		        // }else if(n>= 2.8 && n <=3.2){
		        //   starNun = 3;
		        // }else if(n >=3.3 && n <=3.7){
		        //   starNun = 3.5;
		        // }else if(n >=3.8 && n <= 4.2){
		        //   starNun = 4;
		        // }else if(n >=4.3 && n <= 4.7){
		        //   starNun = 4.5;
		        // }else if(n>= 4.8 && n <= 5){
		        //   starNun = 5;
		        // }

				for(var i = 0; i < 5; i++){
					if(starNun-i > 0.5){
						startArr.push(1);
					}else if(starNun-i == 0.5){
						startArr.push(0.5);
					}else if(starNun-i <= 0){
						startArr.push(0);
					}
				}
				return startArr;
			}
		},
        components:{
	        'pictureBox': picture,
	        downToLinkedMe,
	        popupDownHxsLinkedMe,
	        preLoading,
	        goSignPage
        },
        beforeDestroy(){
            document.title = commonJs.config.webTitle;
        }
	}
</script>
<style scpond lang="less">
	.personalHome-container{
		.border_7{
			width: 100%;
			height:7px;
			background:rgba(245,245,248,1);
		}
		position: relative;
		.head-bg{
			width: 100%;
			height: 210px;
			background: url(http://img3.3lian.com/2013/c2/78/d/38.jpg) center center no-repeat;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top:50px;
            filter: blur(5px);
    		-webkit-filter: blur(5px);
		}
		.main{
			position: relative;
			padding-top: 75px;
			.head{
				width: 93%;
				min-height: 200px;
				background:rgba(255,255,255,1);
				box-shadow: 0px 0px 19px 0px rgba(78,79,109,0.06);
				opacity:0.94;
				border-radius: 10px ;
				position: relative;
				margin:0 auto;
				margin-bottom: 10px;
				.img-box{
					position: absolute;
					left: 50%;
					top: -40px;
          margin-left:-40px;
          .adv-img{
            width: 75px;
            height: 75px;
            overflow: hidden;
            border-radius: 50%;
            img{
              width: 100%;
              min-height:75px;
            }
          }
					span{
						width: 18px;
						height: 18px;
						background:url(../assets/img/vip.png) left top no-repeat;
						background-size:100%;
						position: absolute;
						right: 0;
						bottom: 0;
					}
					.adviser{
						width: 18px;
						height: 18px;
						background:url(../assets/images/F_icon_guwen.png) left top no-repeat;
						background-size:100%;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
				.follow{
					height:18px;
					font-size:14px;
					line-height:18px;
					color:rgba(129,141,207,1);
					text-align: right;
					position: absolute;
					right: 10px;
					top:10px;
				}
				.name{
					width: 100%;
					height:26px;
					font-size:18px;
					color:rgba(51,51,51,1);
					line-height:26px;
					text-align: center;
					padding-top: 50px;
				}
				.info{
					width: 100%;
					height: 26px;
				    display: flex;
				    display: -webkit-flex;
				    justify-content: center;
				    -webkit-justify-content: center;
				    align-items: center;
				    -webkit-align-items: center;
					div{
						float: left;
						margin-right: 25px;
						span{
							margin-left: 5px;
							height:26px;
							font-size:13px;
							color:rgba(153,153,153,1);
							line-height:13px;
						}
						&.last{
							margin-right: 0;
						}
					}
				}
				.abstract{
					padding: 10px 20px 0;
					line-height:20px;
					font-size:15px;
					color:rgba(102,102,102,1);
					text-align: center;
					word-break:break-all;
					word-wrap:break-word;
					em{
					height:20px;
					font-size:12px;
					color:rgba(129,141,207,1);
					line-height:20px;
					}
				}
				.medal{
					padding:0 42px;
					height: 26px;
				    display: flex;
				    display: -webkit-flex;
				    justify-content: center;
				    align-items: center;
				    -webkit-justify-content: center;
				    -webkit-align-items: center;
				    padding-top: 17px;
					span{
						width:25px;
						height:25px;
						margin-right: 40px;
						&.last{
							margin-right: 0;
						}
					}
				}
				.career{
					width:100%;
					height: 50px;
					margin-top: 24px;
					padding-top: 11px;
					border-top: rgba(129,141,207,0.16) solid 1px;
					.list{
						width: 50%;
						height: 50px;
						float: left;
						span{
							width: 100%;
							height:16px;
							font-size:11px;
							color:rgba(129,141,207,1);
							line-height:16px;
							text-align: center;
							display: block;
							margin-bottom: 5px;
						}
						em{
							width: 100%;
							height:25px;
							font-size:18px;
							color:rgba(129,141,207,1);
							line-height:25px;
							text-align: center;
							display: block;
						}
						div{
							width: 100%;
							height: 15px;
						    display: flex;
						    display: -webkit-flex;
						    justify-content: center;
						    -webkit-justify-content: center;
						    align-items: center;
						    -webkit-align-items: center;
							i{
								width: 13px;
								height: 13px;
								float: left;
								margin-right: 2px;
								background: url(../assets/images/diaryDetail/B_icon_dstar.png) left top no-repeat;
								background-size: 100%;
								&.full {
									background: url(../assets/images/diaryDetail/F_icon_bys.png) left top no-repeat;
									background-size: 100%;
								}
								background-size: 100%;
								&.half{
									background: url(../assets/images/diaryDetail/F_icon_hbys.png) left top no-repeat;
									background-size: 100%;
								}
							}
							a{
								float: left;
								font-size: 11px;
								height: 13px;
								line-height: 13px;
								margin-left: 3px;
								color:rgba(129,141,207,1);
							}
						}
					}
				}
			}
			.audio{
				.title{
					padding:10px 19px;
				    display: flex;
				    display: -webkit-flex;
				    justify-content: center;
				    -webkit-justify-content: center;
				    align-items: center;
				    -webkit-align-items: center;
					span{
						width: 60px;
						height: 1px;
						float:left;
						background: url(../assets/images/F_line.png) left top no-repeat;
						background-size: 100%;
						&.right{
							transform:rotate(180deg);
							-webkit-transform:rotate(180deg);
						}
					}
					em{
						width:50px;
						height:15px;
						font-size:11px;
						color:rgba(153,153,153,1);
						line-height:15px;
						text-align: center;
					}
				}
				.audio-main{
					padding:0 26px;
					padding-bottom: 20px;
					em{
						width:30px;
						height: 30px;
						border-radius: 50%;
						float: left;
					}
					.audio-width{
						width: 70%;
						height:32px;
						background:-webkit-linear-gradient(274deg, rgba(244,240,254,1), rgba(231,239,254,1));
						background:-o-linear-gradient(274deg, rgba(244,240,254,1), rgba(231,239,254,1));
						background:linear-gradient(4deg, rgba(244,240,254,1), rgba(231,239,254,1));
						border-radius: 20px;
						position: relative;
						float: left;
						margin:0 5px;
						span{
							width: 13px;
							height: 18px;
        					background: url(../assets/images/F_icon_yy_1.png) left top no-repeat;
        					background-size: 100%;
							position: absolute;
							left: 10px;
							top:9px;
						}
					}
					.time{
						height:14px;
						font-size:13px;
						color:rgba(129,141,207,1);
						line-height:14px;
						float: left;
						margin-top: 3px;
					}
				}
			}
			.photo-wall{
				padding-top: 10px;
				ul{
					padding:15px 12px 15px 15px;
					li{
						width: 113px;
						height: 113px;
						float:left;
						margin-right: 3px;
						margin-bottom: 3px;
						&.default{
    						background: url(../assets/images/D_buttum_bsc.png) left top no-repeat;
    						background-size:100%;
						}
						&.photo-wall-video{
							position: relative;
							span{
								width: 43px;
								height: 43px;
								display: block;
								position: absolute;
								left: 50%;
								top: 50%;
								margin-top: -21px;
								margin-left: -21px;
        						background: url(../assets/images/fx_shiping.png) left top no-repeat;
        						background-size:100%;
							}
						}
					}
				}
			}
			.information{
				.title{
					border-bottom: rgba(129,141,207,0.16) solid 1px;
					ul{
						padding-top: 10px;
					    display: flex;
					    display: -webkit-flex;
						li{
							-webkit-flex: 1;
							text-align: center;
					    	position: relative;
							span{
								height:16px;
								font-size:15px;
								color:rgba(153,153,153,1);
								line-height:16px;
								display: block;
							}
							em{
								height:16px;
								font-size:13px;
								color:rgba(153,153,153,1);
								line-height:16px;
								display: block;
								padding:5px 0;
							}
							i{
								width: 15px;
								height:2px;
								background:rgba(153,153,153,1);
								border-radius:2px;
								display: block;
								position: absolute;
								left: 50%;
								bottom:0;
								margin-left: -7px;
								display: none;
							}
							div{
								width:1px;
								height:19px;
								opacity:0.5;
								background: #ccc;
								position: absolute;
								right: 0;
								top:3px;
							}
							&.active{
								span{
									color:rgba(255,102,140,1);
								}
								em{
									color:rgba(255,102,140,1);
								}
								i{
									background:rgba(255,106,157,1);
									display: block;
								}
							}
						}
					}
				}
				.information-content{
					.comment{
						border-top:rgba(129,141,207,0.2) solid 1px;
						height: 13px;
						padding:10px 0;
						padding-right: 15px;
						margin-left: 15px;
						.comment-info{
							float: right;
							div{
								height: 13px;
								float: left;
								span{
									width: 18px;
									height: 18px;
	    							background: url(../assets/img/zan_no.png) left top no-repeat;
	    							background-size:100%;
									float: left;
									margin-right: 5px;
									&.pinglun{
	    								background: url(../assets/img/pinlun.png) left top no-repeat;
	    							    background-size:100%;
									}
								}
								em{
									height: 18px;
									line-height: 18px;
									float:left;
									font-size: 13px;
									color:rgba(153,153,153,1);
								}
							}
							.mr{
								margin-right: 32px;
							}
						}
					}
					.case{
						li{
							padding-top: 15px;
							.img-box{
								padding:0 13px 0 15px;
								margin-bottom: 10px;
								div{
									position: relative;
									margin-right: 2px;
									float:left;
									span{
											width: 75px;
											text-align: center;
											padding:3px;
											border-radius:5px;
											position: absolute;
											bottom: 0;
											right: 0;
											height:13px;
											font-size:13px;
											color:rgba(255,255,255,1);
											line-height:13px;
											background:rgba(114,133,243,0.5);
											&.right{
												left: 0;
												background:rgba(255,102,140,0.5);
											}
										}
									img{
										width: 171px;
										height: 194px;
										overflow: hidden;
									}
								}
							}
							.text{
								height: 40px;
								font-size:15px;
								color:rgba(51,51,51,1);
								line-height:20px;
								padding: 0 15px;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							}
							.info{
								max-width:250px;
								width:115px;
								height:24px;
								margin:10px 0;
								margin-left: 15px;
								background:-webkit-linear-gradient(181deg, rgba(159,138,254,1), rgba(240,147,254,1));
								background:-o-linear-gradient(181deg, rgba(159,138,254,1), rgba(240,147,254,1));
								background:linear-gradient(271deg, rgba(159,138,254,1), rgba(240,147,254,1))	;;
								border-radius: 25px;
								span{
									width: 15px;
									height: 15px;
        							background: url(../assets/images/B_icon_taocan.png) left top no-repeat;
        							background-size:100%;
									float: left;
									margin-right:6px;
									margin-top: 5px;
									margin-left: 10px;
								}
								em{
									height:24px;
									font-size:13px;
									color:rgba(255,255,255,1);
									line-height:24px;
									float: left;
								}
							}
						}
						.caseMood{
							position: relative;
							padding-left: 21px;
							margin: 0 15px 10px;
							em{
								width: 15px;
								height: 15px;
        						background: url(../assets/images/B_icon_tip.png) left top no-repeat;
        						background-size:100%;
								position: absolute;
								left: 0;
								top:5px;
							}
							span{
								height:48px;
								height: 15px;
								background:rgba(245,245,248,1);
								border-radius:4px;
								color:rgba(129,141,207,1);
								font-size:11px;
								line-height: 15px;
								float:left;
								padding:5px;
								border-radius: 4px;
								margin-right: 5px;
								margin-bottom: 5px;
							}
						}
					}
					.diary{
						// display: none;
						li{
							padding-left: 58px;
							position: relative;
							.date{
								position: absolute;
								left: 15px;
								top:15px;
								height:23px;
								font-size:23px;
								color:rgba(153,153,153,1);
								line-height:23px;
								&.changeColor{
									color:#F5A623;
								}
							}
							.diary-title{
								position: relative;
								padding-top: 15px;
								span{
									height:18px;
									font-size:13px;
									color:rgba(102,102,102,1);
									line-height:18px;
									display: block;
								}
								em{
									height:15px;
									font-size:11px;
									color:rgba(153,153,153,1);
									line-height:15px;
									display: block;
									margin-top: 3px;
								}
								i{
									width: 25px;
									height: 25px;
									position: absolute;
									right: 20px;
									top:22px;
									display: none;
								}
							}
							.text{
								font-size:15px;
								color:rgba(51,51,51,1);
								line-height:20px;
								padding: 15px 15px 10px 0;
							}
							.img-box{
								padding-bottom: 12px;
								span{
									width: 98px;
									height: 98px;
									float: left;
									margin-right: 3px;
									margin-bottom: 3px;
								}
							}
							.mood{
								padding-bottom: 10px;
								div{
									min-width: 40px;
									height:20px;
									line-height: 20px;
									padding-left: 24px;
									padding-right: 8px;
									font-size: 13px;
									border-radius:8px;
									position: relative;
									float: left;
									color:rgba(255,255,255,1);
									margin-right: 10px;
									margin-bottom: 5px;
									em{
										width: 15px;
										height: 11px;
										background: url(../assets/images/B_icon_tz.png) left top no-repeat;
										background-size:100%;
										position: absolute;
										left:6px;
										top:3px;
									}
								}
								div:nth-of-type(1){
									background:linear-gradient(-138.1deg,rgba(249,122,202,1),rgba(250,163,202,1));
								}
								div:nth-of-type(2){
									background:linear-gradient(-138.1deg,rgba(91,198,244,1),rgba(133,237,208,1));
									em{
										width: 16px;
										height: 12px;
										background: url(../assets/images/B_icon_bs.png) left top no-repeat;
										background-size:100%;
									}
								}
								span{
									width: 20px;
									height: 20px;
									float: left;
									margin-right: 8px;
									margin-bottom: 5px;
								}
								.drink{
									background: url(../assets/images/diaryDetail/B_icon_xqzs.png) left top no-repeat;
									background-size:100%;
								}
								.sports{
									background: url(../assets/images/diaryDetail/B_icon_yd.png) left top no-repeat;
									background-size:100%;
								}
								.excretion{
									background: url(../assets/images/diaryDetail/B_icon_pb.png) left top no-repeat;
									background-size:100%;
								}
								.diet{
									background: url(../assets/images/diaryDetail/B_icon_ys.png) left top no-repeat;
									background-size:100%;
								}
								.emotion0{
									background: url(../assets/images/emotionImg/B_icon_dk.png) left top no-repeat;
									background-size:100%;
								}
								.emotion1{
									background: url(../assets/images/emotionImg/B_icon_ym.png) left top no-repeat;
									background-size:100%;
								}
								.emotion2{
									background: url(../assets/images/emotionImg/B_icon_yb.png) left top no-repeat;
									background-size:100%;
								}
								.emotion3{
									background: url(../assets/images/emotionImg/B_icon_kx.png) left top no-repeat;
									background-size:100%;
								}
								.emotion4{
									background: url(../assets/images/emotionImg/B_icon_sd.png) left top no-repeat;
									background-size:100%;
								}
							}
						}
					}
	.dynamicAuthor{
		height: 40px;
		position: relative;
		padding-bottom: 13px;
		.dynamicAuthorHead{
			width: 40px;
			height: 40px;
			float: left;
			background: red;
			margin-right: 10px;
			border-radius: 50%;
		}
		.dynamicAuthorInfo{
			padding-top:3px;
			.author{
				height:18px;
				font-size:13px;
				color:rgba(102,102,102,1);
				line-height:18px;
				display: block;
				margin-bottom: 3px;
			}
			.creatTime{
				height:15px;
				font-size:11px;
				color:rgba(153,153,153,1);
				line-height:15px;
				display: block;
			}
		}
		.openContent{
			width: 16px;
			height: 18px;
			position: absolute;
			right: 0;
			top: 5px;
        	background: url(../assets/images/fh-xiao-lan.png) left top no-repeat;
        	background-size: 50%;
			transform:rotate(90deg);
			-webkit-transform:rotate(90deg);
			display: none;
		}
	}
	.userArticle em{
        width:100%;
        height: 100%;
        display: block;
    }
    .userArticle .articleTitle{
        font-size: 15px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 12px;
    }
    .userArticle .articleDescr{
        font-size: 13px;
        color: #666666;
        line-height: 20px;
        margin-bottom: 15px;
    }
    .userArticle .articleContent{
        position: relative;
        margin-bottom: 3px;
    }
    .userArticle span{
        width: 50px;
        height: 50px;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -25px;
        margin-top: -25px;
    }
    .userArticle .audio{
        background: url(../assets/images/fx_yinping.png) left top no-repeat;
        background-size: 100%;
    }
    .userArticle .video{
        background: url(../assets/images/fx_shiping.png) left top no-repeat;
        background-size: 100%;
    }
    .dynamicChildren{
    	padding:0 12px 0 15px;
    }
    .dynamicChildrenBorder{
        padding: 15px 0 0 0;
        position: relative;
    }
    // .dynamicChildrenContent{
    //     padding: 0 15px 7px 5px;
    // }
    .dynamicChildrenContentBorder{
        border-bottom: solid 1px rgba(129, 141, 207, 0.16);
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
	.dynamicChildren p:nth-of-type(1){
        font-size: 16px;
        color: #595959;
        line-height: 22px;
        margin-bottom: 8px;
        display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
    }
    .picture-box .more span{
        width: 32.66%;
        height: 100px;
        margin-right: 3px;
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
    .dynamic-share-detail .detail-img-box .bg,.dynamic-share-detail .detail-img-box .bg2,.userArticle .bg{
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
    .dynamic-video, .dynamic-audio{
        width: 100%;
        height: 210px;
        position: relative;
    }
    .dynamic-video em, .dynamic-audio em{
        width: 100%;
        height: 100%;
        display: block;
    }
    .dynamic-video .bg, .dynamic-audio .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
    }
    .dynamic-video span,.dynamic-audio span{
        width: 50px;
        height: 50px;
        background: url(../assets/images/fx_shiping2.png) left top no-repeat;
        background-size: 100%;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -25px;
        margin-top: -25px;
    }
    .dynamic-audio span{
        background: url(../assets/images/fx_yinping.png) left top no-repeat;
        background-size: 100%;
    }
    .dynamic-sportsCourse{
        width:100%;
        height: 100px;
        position: relative;
        margin-bottom: 15px;
    }
    .dynamic-sportsCourse .bg{
        width:100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        -justify-content: space-between;
        -webkit-justify-content: space-between;
       -webkit-align-items: center;
    }
    .dynamic-sportsCourse .bg em{
        width: 100%;
        text-align: center;
        font-size: 17px;
        color: #FFF;
    }
    .dynamic-shop{
        width:100%;
        height: 80px;
        display: flex;
        display: -webkit-flex;
        -justify-content: space-between;
        background: #E6E6F0;
        margin-bottom: 15px;
    }
    .dynamic-shop .img-box{
        width: 80px;
        height: 80px;
        margin-right: 11px;
        background: #E6E6F0;
    }
    .dynamic-shop .img-box span{
        width: 65px;
        height: 65px;
        background: url(../assets/images/quesheng_kong.png) center center no-repeat;
        display: block;
        margin:7px auto 0;
    }
    .dynamic-shop .text p{
        width: 100%;
        height: 21px;
        line-height: 21px;
        overflow: hidden;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    .dynamic-shop .text div{
        height: 18px;
    }
    .dynamic-shop .text div em{
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #FF668C;
        float: left;
        margin-right: 25px;
    }
    .dynamic-shop .text div span{
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #999999;
        float: left;
    }
    .dynamic-date{
      height: 26px;
    }
    .dynamic-date span{
      	float:left;
		color:rgba(153,153,153,1);
        font-size: 12px;
        height: 26px;
        line-height: 26px;
    }
   .dynamic-date .circle{
   		max-width: 50%;
   		color:#818DCF;
   		overflow: hidden;
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
        height: 15px;
        line-height: 15px;
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


				}
			}
		}
	}
</style>
