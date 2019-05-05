<template> 
    <div id="dietPlanDetail" v-if="planDetail">
        <div class="title">
            <div>
                <!-- <em></em> -->
                <span>{{planDetail.date}}</span>
                <!-- <em></em> -->
            </div>
        </div>
      <div class="content">
        <div class="setMeal">
            <span>{{planDetail.title}}</span>
            <em>{{planDetail.kcal}}</em>
        </div>
        <div class="imgBox">
            <img :src="planDetail.img" alt="">
        </div>
        <div class="setMealInfo">
            <div class="tit">食材</div>
            <ul>
                <li v-for="item in planDetail.detail.food" key="item">
                    <span>{{item.name}}</span>
                    <em>{{item.unit}}</em>
                </li>
            </ul>
        </div>
        <div class="setMealInfo">
            <div class="tit">食材</div>
            <ul class="noSolid">
                <li v-for="item in planDetail.detail.nutrition" key="item">
                    <span>{{item.name}}</span>
                    <em>{{item.unit}}</em>
                </li>
            </ul>
        </div>
        <div class="solid_7"></div>
        <div class="buttonBox">
            <a href="javascript:;" class="changeMeals" @click="setChangPlan">换一组套餐</a>
            <a href="javascript:;" class="addRecord" @click="setSaveRecord">添加记录</a>
        </div>
      </div>
        <preLoading v-show="!dietPlanDetailLoadEnd"></preLoading>
    </div>
</template>
<script>

    import axios from 'axios'
    import { Indicator,Toast } from 'mint-ui';
    import commonJs from '@/util/common.js'
    import preLoading from '@/components/preLoading'

    export default{
        name: 'dietPlanDetail',
        data(){
            return{
                sessToken:null,
                recipesDate:null,//套餐日期
                recipesId:null,//套餐id
                planDetail:null,//详情内容
                dietPlanDetailLoadEnd:false,//页面是否加载请求数据完成
                eatType:null //类型
            }
        },
        mounted(){

            document.title = '饮食计划';

            //获取id 时间参数
            this.getLocationParam();
            //获取sessToken
            this.setSessToken();

            //获取详情内容
            this.getPlanDetail();

        },
        methods:{
            getPlanDetail(){//获取详情内容
                axios.get('https://api.hxsapp.com/slim/LsFood/getPlanDetail',{params:{
                    date:this.recipesDate,
                    recipes_id:this.recipesId,
                    sess_token: this.sessToken,
                    eat_type:this.eatType
                }}).then((res)=>{
                    if(res.data.code == 200){
                        this.planDetail = res.data.data;
                        
                        //加载完成
                        setTimeout(()=>{
                            this.dietPlanDetailLoadEnd = true;
                        },600)
                    }else{
                        Toast({
                           message: res.data.msg,
                           duration: 1000
                        });
                    }
                });
            },
            setSessToken(){//获取sessToken
                this.sessToken = commonJs.getUrlParam('sess_token');
            },
            getLocationParam(){//获取饮食计划的 日期 id
                this.recipesId= this.$route.params.recipes_id;//id
                this.recipesDate =  this.$route.params.recipes_date;//日期
                this.eatType = this.$route.params.recipes_eat_type;
            },
            setSaveRecord(){//保存记录
                axios.get('https://api.hxsapp.com/slim/food/saveRecord',{params:{
                    eat_type: this.eatType,
                    recipes_id:this.recipesId,
                    sess_token: this.sessToken
                }}).then((res)=>{
                    if(res.data.code == 200){};
                    Toast({
                       message: res.data.msg,
                       duration: 1000
                    });
                })
            },
            setChangPlan(){//换一个套餐
                Indicator.open('正在加载中');
                axios.get('https://api.hxsapp.com/slim/LsFood/changPlan',{params:{
                    eat_type: this.eatType,
                    recipes_id: this.recipesId,
                    date: this.recipesDate,
                    sess_token: this.sessToken
                }}).then((res)=>{
                    console.log(res);
                    if(res.data.code == 200){
                        this.planDetail = null;
                        this.planDetail = res.data.data;
                        this.recipesId = this.planDetail.recipes_id;
                    };
                    Indicator.close();
                })
            }
        },
        components:{
            preLoading
        },
        beforeDestroy(){
            document.title = commonJs.config.webTitle;
        }
    }
</script>
<style scoped lang="less">
    #dietPlanDetail{
        .title{
            background: #F5F5F8;
            div{
                width: 40%;
                padding:20px 0;
                height: 14px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                -webkit-justify-content: space-between;
                margin:0 auto;
                em{
                    width:6px;
                    height: 10px;
                    background: red;
                    float:left;
                }
                span{
                    width: 100%;
                    height: 14px;
                    line-height: 14px;
                    float:left;
                    font-size: 16px;
                    color: #4A4A4A;
                    line-height: 14px;
                    text-align: center;
                }
            }
        }
        .content{
            .setMeal{
                height: 24px;
                padding: 20px 16px 16px;
                span{
                    height: 24px;
                    line-height: 24px;
                    font-size: 17px;
                    color: #333333;
                    float: left;
                }
                em{
                    height: 24px;
                    line-height: 24px;
                    font-size: 15px;
                    color: #4A4A4A;
                    float:right;
                }
            }
            .imgBox{
                img{
                    width: 100%;
                }
            }
            .setMealInfo{
                padding-left: 16px;
                .tit{
                    height: 18px;
                    line-height: 18px;
                    font-size: 16px;
                    color: #333333;
                    padding:15px 0 16px;
                }
                ul{
                    border-bottom: 1px solid rgba(129,141,207,0.20);
                    li{
                        height: 18px;
                        padding-right: 16px;
                        padding-bottom: 18px;
                        span{
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            color: #666666;
                            float: left;
                        }
                        em{
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            color: #999999;
                            float:right;
                        }
                    }
                    &.noSolid{
                        border:none;
                    }
                }
            }
            .solid_7{
                width:100%;
                height: 7px;
                background: #F5F5F8;
            }
            .buttonBox{
                height: 35px;
                padding:22px 13% 30px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                -webkit-justify-content: space-between;
                a{   
                    width:46%;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    border-radius:20px;
                    font-size: 15px;
                    &.changeMeals{
                        height: 33px;
                        color: #818DCF;
                        border: 1px solid #818DCF;
                        margin-right:8%;
                    }
                    &.addRecord{
                        color:#fff;
                        background-image:linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
                    } 
                }
            }
        }
    }
</style>