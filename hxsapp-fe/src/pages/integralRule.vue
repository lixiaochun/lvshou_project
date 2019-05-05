<template>
	<div class="wrapper rule">
        <section>
            <h6>1.关于好享瘦积分、勋章、会员等级</h6>
            <div>
                <p>
                积分和勋章是对好享瘦使用用户的奖励，注册用户进行相关操作就能免费获得相应的积分和勋章。</p>
                <p>使用积分，可以换取各种有价值的礼品或权益，针对不同等级的注册用户，好享瘦会不定期推出相应的活动福利。</p>
                <p>累积的积分总额决定会员级别，积分有效期为1年，领取超过1年的积分将清零，会员等级根据剩余积分进行评级。</p>
                <p>会员级别越高，用户在好享瘦获得的福利就越多，购物券、流量卡等奖品拿到手软。</p>
                <p>好享瘦保留对会员规则调整的权力及本规则的最终解释权。</p>
            </div>
        </section>
        <section>
            <h6>2.会员等级说明</h6>
            <div>
                <p>好享瘦会员等级共分为4个等级，分别为：V1、V2、V3、V4。</p>
                <p>会员等级的升降均由系统自动处理，无需申请。</p>
            </div>
        </section>
        <section>
            <h6>3.会员等级规则</h6>
            <div>
                <div class="grade">
                    <span>V1</span>
                    <p>
                        <i></i>
                    </p>
                    <em>0分</em>
                </div>
                <div class="grade">
                    <span>V2</span>
                    <p>
                        <i></i>
                    </p>
                    <em>500分</em>
                </div>
                <div class="grade">
                    <span>V3</span>
                    <p>
                        <i></i>
                    </p>
                    <em>2000分</em>
                </div>
                <div class="grade">
                    <span>V4</span>
                    <p>
                        <i></i>
                    </p>
                    <em>5000分</em>
                </div>
            </div>
        </section>
        <section>
            <h6>4.徽章积分获取规则</h6>
            <!-- <ul class="table_header">
                <li>行为</li>
                <li>积分</li> 
            </ul> -->
            <ul class="table_body">
                <li>
                    <i>第一次使用体脂秤</i>
                    <em>+50</em>
                </li>
                <li>
                    <i>第一次使用基因检测</i>
                    <em>+100</em>
                </li> 
                <li>
                    <i>体脂秤测量</i>
                    <em>+5<b>(每日上限5分)</b></em>
                </li> 
                <li>
                    <i>分享</i>
                    <em>+5<b>(每日上限15分)</b></em>
                </li> 
                <li>
                    <i>运动记录</i>
                    <em>+5<b>(每日上限10分)</b></em>
                </li> 
                <li>
                    <i>饮食记录</i>
                    <em>+5<b>(每日上限15分)</b></em>
                </li> 
                <li>
                    <i>评论</i>
                    <em>+3<b>(每日上限15分)</b></em>
                </li> 
                <li>
                    <i>创建瘦身计划</i>
                    <em>+30<b>(上限30分)</b></em>
                </li>  
                <li>
                    <i>点赞</i>
                    <em>+1<b>(每日上限5分)</b></em>
                </li> 
                <li>
                    <i>收藏</i>
                    <em>+1<b>(每日上限5分)</b></em>
                </li>
                <li>
                    <i>连续3天记录体重</i>
                    <em>+20</em>
                </li>  
                <li>
                    <i>连续7天记录体重</i>
                    <em>+50</em>
                </li>  
                <li>
                    <i>连续14天记录体重</i>
                    <em>+100</em>
                </li>  
                <li>
                    <i>连续21天记录体重</i>
                    <em>+300</em>
                </li>  
                <li>
                    <i>连续3天记录饮食</i>
                    <em>+20</em>
                </li>  
                <li>
                    <i>连续7天记录饮食</i>
                    <em>+50</em>
                </li>  
                <li>
                    <i>连续14天记录饮食</i>
                    <em>+100</em>
                </li>   
                <li>
                    <i>连续21天记录饮食</i>
                    <em>+300</em>
                </li>
                <li>
                    <i>连续3天记录运动</i>
                    <em>+20</em>
                </li>      
                <li>
                    <i>连续7天记录运动</i>
                    <em>+50</em>
                </li>    
                <li>
                    <i>连续14天记录运动</i>
                    <em>+100</em>
                </li>    
                <li>
                    <i>连续21天记录运动</i>
                    <em>+300</em>
                </li>    
                <li>
                    <i>成功减重5斤</i>
                    <em>+50</em>
                </li>      
                <li>
                    <i>成功减重10斤</i>
                    <em>+100</em>
                </li>     
                <li>
                    <i>成功减重20斤</i>
                    <em>+300</em>
                </li>      
                <li>
                    <i>累计消耗1000kcal</i>
                    <em>+50</em>
                </li>      
                <li>
                    <i>累计消耗5000kcal</i>
                    <em>+100</em>
                </li>
                <li>
                    <i>累计消耗10000kcal</i>
                    <em>+300</em>
                </li>  
            </ul>
             
        </section>
       

    </div>
        
</template>
<script>
    import common from '@/util/common.js'
	export default{
		name: 'integralRule',
		mounted(){
			document.title = '积分规则';
		},
		beforeDestroy(){
			document.title = common.config.webTitle;
		}
	}
</script>
<style scoped>
/*成就规则*/
.rule{
	font-size: 13px;
	color: #666;
}
.rule h6{
	font-size:15px;
	height: 18px;
	line-height:44px;
	color:#333;
	padding:0 12px;
	background: #fff;
	padding-bottom: 23px;
}
.rule section>div{
	padding:0 12px;
}
.rule section>div>p{
	line-height:22px;
	margin-top:5px;
	font-size: 13px;
	color: #666;
}
.rule .grade:first-of-type{
	margin-top:13px;
}
.rule .grade{
	position: relative;
	padding-left:26px;
	padding-right:76px;
	height:31px;
	padding-top:4px;
	font-size: 13px;
}
.rule .grade>span{
	position: absolute;
	left: 0;
	top:0;
}
.rule .grade>em{
	position: absolute;
	right: 0;
	top:0;
}
.rule .grade>p{
	height: 6px;
	background: #dedede;
	width:100%;
	border-radius:3px;
	position: relative;
}
.rule .grade>p i{
	height:6px;
	background: #ff668c;
	border-radius:3px;
	position: absolute;
	left: 0;
	top: 0;
}
.rule .grade:nth-of-type(2)>p i{
	width:33.33%;
}
.rule .grade:nth-of-type(3)>p i{
	width:66.66%;
}
.rule .grade:nth-of-type(4)>p i{
	width:100%;
}
.table_header{
	overflow: hidden;
	background: #fcfcfc;
}
.table_header li{
	float: left;
	width: 50%;
	text-align: center;
	height: 44px;
	line-height:44px;
	font-size:16px;
	color:#333333;
}
.table_body{
	height: 44px;
	line-height: 44px;
	padding:0 12px;
}
.table_body li{
	overflow: hidden;
	border-bottom: 1px solid rgba(129,141,207,0.20);
}
.table_body li>*{
	float: left;
	width: 50%;
	color: #666;
	font-size: 13px;
}
.table_body li>em{
	text-align: right;
}
.table_body li>em b{
	color:#666;
	font-weight: normal;
}
</style>