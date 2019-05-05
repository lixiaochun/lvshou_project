<template>
	<div class="editPersonalInfo">
		<ul class="first">
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">姓名</span>
				<div class="right">
					<input type="text" placeholder="请输入接受检人真实姓名" class="name">
					<span></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">性别</span>
				<div class="right">
					<em class="sex" @click="iosSelect(sexParam, 'sex', '性别')" data-params="sexParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">手机</span>
				<div class="right">
					<input placeholder="请填写下单时的手机号" class="mobile" maxlength="11" type="tel">
					<span></span>
				</div>
			</li>
			<li>
				<span class="left">民族</span>
				<div class="right">
					<input placeholder="请输入" class="nationality" type="text">
					<span></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">年龄</span>
				<div class="right">
					<em class="age" @click="iosSelect(ageParam, 'age', '年龄')" data-params="ageParam">请选择</em>
					<span data-id="25"></span>
				</div>
			</li>
			<li>
				<span class="left">原籍</span>
				<div class="right">
					<input placeholder="请填写原籍" type="text" class="household">
					<span></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">地址</span>
				<div class="right">
					<input placeholder="请填写寄件人地址" type="text" class="address">
					<span></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">电子邮箱</span>
				<div class="right">
					<input placeholder="请填写电子邮箱" type="text" class="email">
					<span></span>
				</div>
			</li>
			<li data-id="1">
				<em class="icon"></em>
				<span class="left">采样日期</span>
				<div class="right">
					<em class="sample_date" @click="selectDate()">请选择采样日期</em>
					<span data-id="20180101"></span>
				</div>
			</li>
			<!-- <li data-id="1"> -->
				<!-- <em class="icon"></em> -->
			<li>
				<span class="left">单号</span>
				<div class="right">
					<input placeholder="收取快递时的快递单号" class="express_num" type="tel">
					<span></span>
				</div>
			</li>
			<li>
				<span class="left">身高</span>
				<div class="right">
					<em class="height" @click="iosSelect(heightParam, 'height', '身高')" data-params="heightParam">请选择</em>
					<span data-id="160"></span>
				</div>
			</li>
			<li>
				<span class="left">体重</span>
				<div class="right">
					<em class="weight" @click="iosSelect(weightParam, 'weight', '体重')" data-params="weightParam">请选择</em>
					<span data-id="90"></span>
				</div>
			</li>
			<li>
				<span class="left">腰围</span>
				<div class="right">
					<em class="waistline" @click="iosSelect(waistParam, 'waistline', '腰围')" data-params="waistParam">请选择</em>
					<span data-id="80"></span>
				</div>
			</li>
			<li>
				<span class="left">胸围</span>
				<div class="right">
					<em class="chestline" @click="iosSelect(bustParam, 'chestline', '胸围')" data-params="bustParam">请选择</em>
					<span data-id="80"></span>
				</div>
			</li>
			<li>
				<span class="left">臀围</span>
				<div class="right">
					<em class="hipline" @click="iosSelect(hiplineParam, 'hipline', '臀围')" data-params="hiplineParam">请选择</em>
					<span data-id="80"></span>
				</div>
			</li>
			<li>
				<span class="left">血型（ABO）</span>
				<div class="right">
					<em class="blood_type" @click="iosSelect(bloodType, 'blood_type', '血型')" data-params="bloodType">请选择</em>
					<span data-id="2"></span>
				</div>
			</li>
			<!-- <li>

				<span class="left">股围</span>
				<div class="right">
					<em class="thigh" @click="iosSelect(thighParam, 'thigh', '股围')">请选择</em>
					<span></span>
				</div>
			</li> -->
		</ul>
		<div class="moreSubject" @click="showOptional">
			<em>点击填写更多信息（选填）</em>
			<span></span>
		</div>
		<ul class="two" v-show="showMore">
		<!-- <ul class="two" v-show="true" > -->
			<li data-type="1">
				<span class="left">1.高血压</span>
				<div class="right">
					<em class="hypertension" @click="iosSelect(isHaveParam, 'hypertension', '高血压')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">收缩压(mmHg)</span>
				<div class="right">
					<input placeholder="请输入" class="systolicPressure" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">舒张压(mmHg)</span>
				<div class="right">
					<input placeholder="请输入" class="diastolicPressure" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">心率(次/分)</span>
				<div class="right">
					<input placeholder="请输入" class="heart" type="tel">
					<span></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">呼吸(次/分)</span>
				<div class="right">
					<input placeholder="请输入" class="breathing" type="tel">
					<span></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">高血压-服药</span>
				<div class="right">
					<em class="ypertensionMedication" @click="iosSelect(isHaveParam, 'ypertensionMedication', '服药')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="1">
				<span class="left">高血压-服药情况</span>
				<div class="right">
					<input placeholder="请输入时间，药名，用量" class="medication" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="2">
				<span class="left">2.高血脂</span>
				<div class="right">
					<em class="hyperlipidemia" @click="iosSelect(isHaveParam, 'hyperlipidemia', '高血脂')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="2">
				<span class="left">高血脂-服药</span>
				<div class="right">
					<em class="hyperlipidemiaMedication" @click="iosSelect(isHaveParam, 'hyperlipidemiaMedication', '服药')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="2">
				<span class="left">高血脂-服药情况</span>
				<div class="right">
					<input placeholder="请输入时间，药名，用量" class="medication_info" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="3">
				<span class="left">3.糖尿病</span>
				<div class="right">
					<em class="diabetes" @click="iosSelect(isHaveParam, 'diabetes', '糖尿病')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="3">
				<span class="left">糖尿病-服药</span>
				<div class="right">
					<em class="diabetes_medication" @click="iosSelect(isHaveParam, 'diabetes_medication', '服药')" data-params="diabetes_medication">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="3">
				<span class="left">空腹血糖(mmol/L)</span>
				<div class="right">
					<input placeholder="请输入" class="diabetes_blood_sugar" type="tel" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="3">
				<span class="left">糖尿病-服药情况</span>
				<div class="right">
					<input placeholder="请输入时间，药名，用量" class="diabetes_medication_info" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="4">
				<span class="left">4.痛风</span>
				<div class="right">
					<em class="gout" @click="iosSelect(isHaveParam, 'gout', '痛风')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="4">
				<span class="left">痛风-服药</span>
				<div class="right">
					<em class="gout_medication" @click="iosSelect(isHaveParam, 'gout_medication', '服药')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="4">
				<span class="left">尿酸(umol/L)</span>
				<div class="right">
					<input placeholder="请输入" class="gout_uric_acid" type="tel" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="4">
				<span class="left">痛风-服药情况</span>
				<div class="right">
					<input placeholder="请输入时间，药名，用量" class="gout_medication_info" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="4">
				<span class="left">痛风-发作情况</span>
				<div class="right">
					<input placeholder="请输入" class="gout_attack" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="5">
				<span class="left">5.肝炎/肝脏疾病史</span>
				<div class="right">
					<em class="liver" @click="iosSelect(isHaveParam, 'liver', '肝炎/肝脏疾病史')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="5">
				<span class="left">肝功能</span>
				<div class="right">
					<em class="liver_fn" @click="iosSelect(liverFnParam, 'liver_fn', '肝功能')" data-params="liverFnParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="5">
				<span class="left">肝炎/肝脏疾病-描述</span>
				<div class="right">
					<input placeholder="请输入" class="liver_describe" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="6">
				<span class="left">6.脂肪肝</span>
				<div class="right">
					<em class="fatty_liver" @click="iosSelect(isHaveParam, 'fatty_liver', '脂肪肝')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="6">
				<span class="left">脂肪肝-服药</span>
				<div class="right">
					<em class="fatty_liver_medication" @click="iosSelect(isHaveParam, 'fatty_liver_medication', '服药')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="6">
				<span class="left">脂肪肝度数</span>
				<div class="right">
					<input placeholder="请输入" class="fatty_liver_degrees" type="tel">
					<span></span>
				</div>
			</li>
			<li data-type="6">
				<span class="left">脂肪肝-服药情况</span>
				<div class="right">
					<input placeholder="请输入时间，药名，用量" class="fatty_liver_medication_info" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="7">
				<span class="left">7.肾脏疾病史</span>
				<div class="right">
					<em class="kidney_disease" @click="iosSelect(kidneyDiseaseParam, 'kidney_disease', '肾功能')" data-params="kidneyDiseaseParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="7">
				<span class="left">肾功能</span>
				<div class="right">
					<em class="kidney" @click="iosSelect(isHaveParam, 'kidney', '肾功能')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="7">
				<span class="left">肾脏疾病史-描述</span>
				<div class="right">
					<input placeholder="请输入" class="kidney_describe" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="8">
				<span class="left">其他病史</span>
				<div class="right">
					<input placeholder="请输入" class="other_medical_history" type="text">
					<span></span>
				</div>
			</li>
			<li data-type="9">
				<span class="left">已知过敏史</span>
				<div class="right">
					<input placeholder="请输入药物和食物和保健品" class="anaphylaxis" type="text">
					<span></span>
				</div>
			</li>
			<li data-type="10">
				<span class="left">将来是否还要小孩</span>
				<div class="right">
					<em class="need_children" @click="iosSelect(needChildrenParam, 'need_children', '是否还要小孩')" data-params="needChildrenParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="11">
				<span class="left">生育情况</span>
				<div class="right">
					<input placeholder="请输入" class="fertility_condition" type="text">
					<span></span>
				</div>
			</li>
			<li data-type="11">
				<span class="left">男-精液质量</span>
				<div class="right">
					<em class="man_semen" @click="iosSelect(manSemenParam, 'man_semen', '男-精液质量')" data-params="manSemenParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="11">
				<span class="left">男-性功能减退</span>
				<div class="right">
					<em class="hypogonadism" @click="iosSelect(isHaveParam, 'hypogonadism', '男-性功能减退')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="11">
				<span class="left">女-月经</span>
				<div class="right">
					<em class="woman_menstruation" @click="iosSelect(womanMenstruationParam, 'woman_menstruation', '月经')" data-params="womanMenstruationParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="11">
				<span class="left">女-性欲望减退</span>
				<div class="right">
					<em class="sexual_desire_drop" @click="iosSelect(sexualDesireDropParam, 'sexual_desire_drop', '女-性欲望减退')" data-params="sexualDesireDropParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<!-- <li data-type="12">
				<span class="left">便秘 甲减 胆结石 胃炎 口打鼾 胆囊切除</span>
				<div class="right">
					<input placeholder="请输入" class="default" type="text">
					<span></span>
				</div>
			</li> -->
			<li data-type="12">
				<span class="left">其他内分泌疾病</span>
				<div class="right">
					<em class="endocrine" @click="iosSelect(isHaveParam, 'endocrine', '其他内分泌疾病')" data-params="isHaveParam">请选择</em>
					<span data-id="1"></span>
				</div>
			</li>
			<li data-type="12">
				<span class="left">其他内分泌疾病-描述</span>
				<div class="right">
					<input placeholder="请输入" class="endocrine_describe" type="text"  style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="13">
				<span class="left">食用保健品情况</span>
				<div class="right">
					<em class="healthProducts" @click="iosSelect(healthProductsParam, 'healthProducts', '食用保健品情况')" data-params="healthProductsParam">请选择</em>
					<span></span>
				</div>
			</li>
			<li data-type="13">
				<span class="left">正在食用产品名称</span>
				<div class="right">
					<input placeholder="请输入" class="health_products_name" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="14">
				<span class="left">家族肥胖史描述</span>
				<div class="right">
					<input placeholder="请输入" class="corpulent_history" type="text" style="width:130px;">
					<span></span>
				</div>
			</li>
			<li data-type="15">
				<span class="left">减肥史描述</span>
				<div class="right">
					<input placeholder="请输入" class="loss_weight_history" type="text">
					<span></span>
				</div>
			</li>
			<li data-type="16">
				<span class="left">减肥药物使用情况描述</span>
				<div class="right">
					<input placeholder="请输入" class="drug_use" type="text" style="width:120px;">
					<span></span>
				</div>
			</li>
			<div class="li">
				<span class="left">初步计算活动量:</span>
			</div>
			<li data-type="17">
				<span class="left">您的工作强度</span>
				<div class="right">
					<em class="workingStrength" @click="iosSelect(workingParam, 'workingStrength', '工作强度')" data-params="workingParam">请选择</em>
					<span></span>
				</div>
			</li>
			<li data-type="18">
				<span class="left">您每周工作时间_天</span>
				<div class="right">
					<input placeholder="请输入" class="workingHours" type="text" style="width:50px;">
					<span></span>
				</div>
			</li>
			<li data-type="18">
				<span class="left">每天坐_小时</span>
				<div class="right">
					<input placeholder="请输入" class="restHours" type="text" style="width:50px;">
					<span></span>
				</div>
			</li>
			<li data-type="19">
				<span class="left">您最近3个月的出行方式主要是</span>
				<div class="right">
					<em class="travelMethod" @click="iosSelect(travelMethodParam, 'travelMethod', '出行方式')" data-params="travelMethodParam">请选择</em>
					<span></span>
				</div>
			</li>
			<li data-type="20">
				<span class="left">您平均每天出行的时间是:_分钟</span>
				<div class="right">
					<input placeholder="请输入" class="travelHours" type="text" style="width:50px;">
					<span></span>
				</div>
			</li>
			<li data-type="21">
				<span class="left">您平均每天做家务的时间: _小时</span>
				<div class="right">
					<input placeholder="请输入" class="homeWorkHours" type="text" style="width:50px;">
					<span></span>
				</div>
			</li>
			<div class="li">
				<span class="left">每日膳食习惯:</span>
			</div>
			<li data-type="22">
				<span class="left">饮食偏好(主食)</span>
				<div class="right">
					<em class="stapleFood" @click="iosSelect(stapleFoodParam, 'stapleFood', '主食')" data-params="stapleFoodParam">请选择</em>
					<span></span>
				</div>
			</li>
			<li data-type="22">
				<span class="left">饮食偏好(辅食)</span>
				<div class="right">
					<em class="solidFood" @click="iosSelect(solidFoodParam, 'solidFood', '辅食')" data-params="solidFoodParam">请选择</em>
					<span></span>
				</div>
			</li>
		</ul>
        <div class="solid_7"></div>
        <div class="buttonBox">
            <a href="https://hxsapp_close" class="cancel">取消</a>
            <a href="javascript:;" class="keep" @click="IntegrationData()">保存</a>
        </div>
	</div>
</template>
<script>

    import axios from 'axios'
    import IosSelect from 'iosselect'
	import { Toast } from 'mint-ui';
    import commonJs from '@/util/common.js'

	export default{
		name: 'editPersonalInfo',
		data(){
			return{
				sessToken:null,
				heightParam:[],//身高
				sexParam:[], //性别
				waistParam:[],//腰围
				hiplineParam:[],//臀围
				weightParam:[],//体重
				bustParam:[],//胸围
				bloodType:[],//血型
				thighParam:[],//股围
				ageParam:[],//年龄
				firstIntegrationDataJson:{},//第一系列的数据
				twoIntegrationDataJson:{},//第二系列的数据
				workingParam: null, //工作强度
				travelMethodParam:null,//出行方式
				solidFoodParam:null,//辅食
				stapleFoodParam:null,//主食
				healthProductsParam:null,//服用保健品情况
				isHaveParam: null,//是否有无
				kidneyDiseaseParam:[],//肾脏疾病史
				womanMenstruationParam:[],//女子月经
				manSemenParam:[],//男性精液
				sexualDesireDropParam:[],//女-性欲望减退
				needChildrenParam:[],//是否要小孩
				liverFnParam:[],//肝功能
				showMore:false, //选填部分展示或隐藏

			}
		},
		mounted(){
			document.title = '信息登记';
			
			this.setSessToken();//获取sessToken
			this.setSexParam();//性别
			this.setHeightParam();//身高
			this.setWeightParam();//体重
            this.setWaistParam();//腰围
			this.setHiplineParam();//臀围
            this.setBustParam();//胸围
            this.setBloodType();//血型
            this.setAgeParam();//年龄
            this.setThighParam();//股围
            this.setWorkingParam();//工作强度
            this.setTravelMethod();//出行方式
            this.setSolidFood();//辅食
            this.setStapleFood();//主食
            this.setHealthProducts();//服用保健品情况
            this.getIntegrationData(); //获取用户登记信息
            this.setIsHave();//设置是否有无参数
            this.setkidneyDisease();//肾脏疾病史
           	this.setWomanMenstruation();//女子月经
           	this.setSexualDesireDrop//女-性欲望减退
        	this.setManSemen()//男性精液
        	this.sexualDesireDrop()//女性欲望
        	this.needChildren();//是否要小孩
        	this.liverFn();//肝功能

		},
		methods:{
			getIntegrationData(){
				//获取数据
                axios.get('https://api.hxsapp.com/slim/gene/getInformation',{params:{
                    sess_token: this.sessToken
                }}).then((res)=>{
					var data = res.data;
					console.log(data);
					//基本信息填充
					this.auxiliaryFn('.editPersonalInfo .first li', data.data);

					//选填部分填充
					this.auxiliaryFn('.editPersonalInfo .two li', data.data.pathological);

                })
			},
			auxiliaryFn(obj,data){
				var aLi = $(obj);
				for(var key in data){
					var element = $('.' + key);
					var dataParams = element.attr('data-params');

					if(element.is('input')){
						var val = data[key];
						if(val){
							element.val(val);
						}else{
							element.attr('placeholder','请输入');
						}
					}{
						var val = data[key] || '请选择';

						if(this[dataParams]){
							for(var i = 0; i < this[dataParams].length; i++){
								var value = '';
								if(this[dataParams][i].value == data[key]){
									var oSpan = element.parents('.right').find('span');
									oSpan.attr('data-id',this[dataParams][i].id);
									oSpan.text(val);
								}
							}
						}
						if(key == 'sample_date'){//采样日期特殊处理
							var oSpan = element.parents('.right').find('span');
							oSpan.attr('data-id',data[key]);
							oSpan.text(data[key]);
						}
						if(key == 'sex'){//性别特殊处理

							var oSpan = element.parents('.right').find('span');
							if(key == 'sex'){
								var newVal = val == 1?'男':'女';
							}
							oSpan.attr('data-id',data[key]);
							oSpan.text(newVal);
							element.text(newVal);

						}else{//非性别走此渠道
							element.text(val);
						}
					}
				}
			},
			IntegrationData(){
				// this.firstIntegrationDataJson.length = 0;
				// this.twoIntegrationDataJson.length = 0;
				var aLi = $('.editPersonalInfo .first li');
				var aSpan = aLi.find('.right span');

				for(var i = 0; i < aLi.length; i++){
					var json = {};
					var key = '';
					var value = '';
					var oInput = aLi.eq(i).find('input');

					if(oInput.length > 0){//有input，优先input输入内容
						key = oInput.attr('class');
						value = oInput.val();
					}else{
						key = aLi.eq(i).find('.right em').attr('class');
						value = aSpan.eq(i).text();

						if(key == 'sex'){//性别特殊处理
							if(value == '男'){
								value = '1';
							}else{
								value = '0';
							}
						}

						json.id = value;
					}	

					if(aLi.eq(i).attr('data-id')){//验证是必填项
						var tip = aLi.eq(i).find('.left').text();
						if(!(value + '')){
							Toast({
							   message: '请登记' + tip,
							   duration: 1000
							});
							return;
						}

						if(tip == '手机'){//手机验证格式
							let mobile = new RegExp(/0?(13|14|15|17|18)[0-9]{9}/);
							let phoneReg = mobile.test(value);

							if (!phoneReg) {
								Toast({
								   message: '手机号码格式有误，请重新输入',
								   duration: 1000
								});
						    	return;
						    }
						}
					}
					this.firstIntegrationDataJson[key] = value;//key为变量，需要这样拼装
				}

				var aLiTwo = $('.editPersonalInfo .two li');
				var aLiTwoSpan = aLiTwo.find('.right span');
				for(let i = 0; i < aLiTwo.length; i++){
					var dateType = aLiTwo.eq(i).attr('data-type');

					if(dateType){//有类型
						// this.twoIntegrationDataJson.push({});

						var key = '';
						var value = '';
						var oInput = aLiTwo.eq(i).find('input');

						if(oInput.length > 0){//有input，优先input输入内容
							key = oInput.attr('class');
							value = oInput.val();
						}else{
							key = aLiTwo.eq(i).find('.right em').attr('class');
							value = aLiTwoSpan.eq(i).text();
							json.id = value;
						}

						this.twoIntegrationDataJson[key] = value;//key为变量，需要这样拼装

					}
				}
				// this.twoIntegrationDataJson.length = 22;
				console.log(this.twoIntegrationDataJson);
				
				//提交数据
                axios.get('https://api.hxsapp.com/slim/gene/setInformation',{params:{
                    sess_token: this.sessToken,
                    data:this.firstIntegrationDataJson,
                    pathological:this.twoIntegrationDataJson

                }}).then((res)=>{
                	console.log(res);
                    Toast({
                       message: res.data.msg,
                       duration: 1000
                    });
                })

			},
            setAgeParam(){//年龄
                for(var i = 1; i < 140; i++){
                   this.ageParam.push({
                        id: i, 
                        value: i 
                   });
                }
            },
            setHeightParam(){//身高
                for(var i = 50; i < 301; i++){
                   this.heightParam.push({
                        id: i, 
                        value: i+'cm'
                   });
                }
            },
            setSexParam(){//性别
                this.sexParam = [{
                    id: 0, 
                    value: '女'
                },{
                    id: 1, 
                    value: '男'
                }];
            },
            setWaistParam(){//腰围
                for(var i = 1; i < 301; i++){
                    this.waistParam.push({
                      	id: i, 
                      	value: i+'cm'
                    });
                }
            },
            setHiplineParam(){//臀围
                for(var i = 1; i < 301; i++){
                   this.hiplineParam.push({
                      	id: i, 
                      	value: i+'cm'
                   });
                }
            },
			setWeightParam(){//体重
				for(var i = 1; i < 501; i++){
					this.weightParam.push({
						id: i, 
						value: i+'kg'
					});
				}
			},
            setBustParam(){//胸围
                for(var i = 1; i < 301; i++){
                   this.bustParam.push({
                      	id: i, 
                      	value: i+'cm'
                   });
                }
            },
            setThighParam(){//股围
                for(var i = 1; i < 301; i++){
                   this.thighParam.push({
                      	id: i, 
                      	value: i+'cm'
                   });
                }
            },
            setBloodType(){//血型
            	this.bloodType = [
            		{
                      	id: 1, 
                      	value: 'A'
            		},
            		{
                      	id: 2, 
                      	value: 'B'
            		},
            		{
                      	id: 3, 
                      	value: 'O'
            		},
            		{
                      	id: 4, 
                      	value: 'AB'
            		},
            	]
            },
            setWorkingParam(){//工作强度
				this.workingParam = [
            		{
                      	id: 1, 
                      	value: '轻度(75%时间坐或站立，25%时间站着活动，如:办公室工作等)'
            		},
            		{
                      	id: 2, 
                      	value: '中度(25%时间坐或站立，75%时间从事中等强度的职业活动，如:学生日常活动、机动车驾驶等)'
            		},
            		{
                      	id: 3, 
                      	value: '重度(40%时间坐或站立，60%时间从事重强度的特殊职业活动，如:舞蹈、体育活动等)'
            		}
				];
            },
            setTravelMethod(){//出行方式
				this.travelMethodParam = [    
            		{
                      	id: 1, 
                      	value: '步行'
            		},
            		{
                      	id: 2, 
                      	value: '骑自行车'
            		},
            		{
                      	id: 3, 
                      	value: '公共交通'
            		},
            		{
                      	id: 4, 
                      	value: '坐私家车'
            		},
            		{
                      	id: 5, 
                      	value: '其他'
            		}
				]
            },
            setStapleFood(){//主食
				this.stapleFoodParam=[
					{
	                  	id: 1,
	                  	value: '米饭' 
	        		},
					{
	                  	id: 2, 
	                  	value: '面食'
	        		}
        		]
            },
            setSolidFood(){//辅食
            	this.solidFoodParam = [
					{
	                  	id: 1, 
	                  	value: '肉类'
	        		},
					{
	                  	id: 2, 
	                  	value: '蔬菜'
	        		}
        		]
            },
            setHealthProducts(){//服用保健品情况
            	this.healthProductsParam = [
					{
	                  	id: 1,
	                  	value: '从未食用' 
	        		},
					{
	                  	id: 2,
	                  	value: '曾经食用'
	        		}
            	];
            },
            setIsHave(){//服用保健品情况
            	this.isHaveParam = [
					{
	                  	id: 1,
	                  	value: '无' 
	        		},
					{
	                  	id: 2,
	                  	value: '有'
	        		}
            	];
            },
            setkidneyDisease(){//服用保健品情况
            	this.kidneyDiseaseParam = [
					{
	                  	id: 1,
	                  	value: '无' 
	        		},
					{
	                  	id: 2,
	                  	value: '有'
	        		},
					{
	                  	id: 3,
	                  	value: '肾功能不全'
	        		}
            	];
            },
            setWomanMenstruation(){//服用保健品情况
            	this.womanMenstruationParam = [
					{
	                  	id: 1,
	                  	value: '无' 
	        		},
					{
	                  	id: 2,
	                  	value: '有'
	        		},
					{
	                  	id: 3,
	                  	value: '肾功能不全'
	        		}
            	];
            },
            setManSemen(){//男性精液
            	this.manSemenParam = [
					{
	                  	id: 1,
	                  	value: '无' 
	        		},
					{
	                  	id: 2,
	                  	value: '有'
	        		},
					{
	                  	id: 3,
	                  	value: '肾功能不全'
	        		}
            	];
            },
            sexualDesireDrop(){//女性欲望
            	this.sexualDesireDropParam = [
					{
	                  	id: 1,
	                  	value: '无' 
	        		},
					{
	                  	id: 2,
	                  	value: '有'
	        		},
					{
	                  	id: 3,
	                  	value: '多囊卵巢综合征'
	        		}
            	];
            },
            needChildren(){//是否要小孩
            	this.needChildrenParam = [
					{
	                  	id: 1,
	                  	value: '是' 
	        		},
					{
	                  	id: 2,
	                  	value: '否'
	        		}
            	];
            },
            liverFn(){//是否要小孩
            	this.liverFnParam = [
					{
	                  	id: 1,
	                  	value: '好' 
	        		},
					{
	                  	id: 2,
	                  	value: '中'
	        		},
					{
	                  	id: 2,
	                  	value: '差'
	        		}
            	];
            },
            iosSelect(json, name, title){
                var _this = this;
                var dataId = $('.' + name).parents('.right').find('span').attr('data-id');
                var iosSelect = new IosSelect(1,
                       [json],
                       {
                            title:title,
                            oneLevelId: dataId,
                            callback: function(res){
                            	switch(name){
                            		case 'sex':
                            			_this.storeData('.sex', res);
                            		break;
                            		case 'age':
                            			_this.storeData('.age', res);
                            		break;
                            		case 'height':
                            			_this.storeData('.height', res);
                            		break;
                            		case 'weight':
                            			_this.storeData('.weight', res);
                            		break;
                            		case 'waistline':
                            			_this.storeData('.waistline', res);
                            		break;
                            		case 'chestline':
                            			_this.storeData('.chestline', res);
                            		break;
                            		case 'hipline':
                            			_this.storeData('.hipline', res);
                            		break;
                            		case 'blood_type':
                            			_this.storeData('.blood_type', res);
                            		break;
                            		case 'thigh':
                            			_this.storeData('.thigh', res);
                            		break;
                            		case 'solidFood':
                            			_this.storeData('.solidFood', res);
                            		break;
                            		case 'stapleFood':
                            			_this.storeData('.stapleFood', res);
                            		break;
                            		case 'travelMethod':
                            			_this.storeData('.travelMethod', res);
                            		break;
                            		case 'healthProducts':
                            			_this.storeData('.healthProducts', res);
                            		break;
                            		case 'workingStrength':
                            			res.value = (res.value).substring(0,2);
                            			_this.storeData('.workingStrength', res);
                            		break;
                            		case 'hypertension':
                            			_this.storeData('.hypertension', res);
                            		break;
                            		case 'ypertensionMedication':
                            			_this.storeData('.ypertensionMedication', res);
                            		break;
                            		case 'hyperlipidemia':
                            			_this.storeData('.hyperlipidemia', res);
                            		break;
                            		case 'hyperlipidemiaMedication':
                            			_this.storeData('.hyperlipidemiaMedication', res);
                            		break;
                            		case 'diabetes':
                            			_this.storeData('.diabetes', res);
                            		break;
                            		case 'diabetes_medication':
                            			_this.storeData('.diabetes_medication', res);
                            		break;
                            		case 'gout':
                            			_this.storeData('.gout', res);
                            		break;
                            		case 'liver':
                            			_this.storeData('.liver', res);
                            		break;
                            		case 'gout_medication':
                            			_this.storeData('.gout_medication', res);
                            		break;
                            		case 'fatty_liver':
                            			_this.storeData('.fatty_liver', res);
                            		break;
                            		case 'fatty_liver_medication':
                            			_this.storeData('.fatty_liver_medication', res);
                            		break;
                            		case 'kidney':
                            			_this.storeData('.kidney', res);
                            		break;
                            		case 'man_semen':
                            			_this.storeData('.man_semen', res);
                            		break;
                            		case 'kidney_disease':
                            			_this.storeData('.kidney_disease', res);
                            		break;
                            		case 'woman_menstruation':
                            			_this.storeData('.woman_menstruation', res);
                            		break;
                            		case 'hypogonadism':
                            			_this.storeData('.hypogonadism', res);
                            		break;
                            		case 'endocrine':
                            			_this.storeData('.endocrine', res);
                            		break;
                            		case 'sexual_desire_drop':
                            			_this.storeData('.sexual_desire_drop', res);
                            		break;
                            		case 'need_children':
                            			_this.storeData('.need_children', res);
                            		break;
                            		case 'liver_fn':
                            			_this.storeData('.liver_fn', res);
                            		break;

                            	}

                            }
                       }
                );
            },
            storeData(obj, res){
                var oSpan = $(obj).parents('.right').find('span');
                $(obj).text(res.value);
               	oSpan.text(res.value);
               	oSpan.attr('data-id', res.id);
            },
            selectDate(){
	      //       var selectDateDom = $('#selectDate');
			    // var showDateDom = $('#showDate');
			    // 初始化时间
			    var _this = this;
			    var now = new Date();
			    var nowYear = now.getFullYear();
			    var nowMonth = now.getMonth() + 1;
			    var nowMonth = now.getDate();
			    var dataId = $('.sample_date').parents('.right').find('span').attr('data-id');
			    // showDateDom.attr('data-year', nowYear);
			    // showDateDom.attr('data-month', nowMonth);
			    // showDateDom.attr('data-date', nowDate);
			    // 数据初始化
			    function formatYear (nowYear) {
			        var arr = [];
			        for (var i = nowYear - 1; i <= nowYear + 1; i++) {
			            arr.push({
			                id: i + '',
			                value: i + '年'
			            });
			        }
			        return arr;
			    }
			    function formatMonth () {
			        var arr = [];
			        for (var i = 1; i <= 12; i++) {
			            arr.push({
			                id: i + '',
			                value: i + '月'
			            });
			        }
			        return arr;
			    }
			    function formatDate (count) {
			        var arr = [];
			        for (var i = 1; i <= count; i++) {
			            arr.push({
			                id: i + '',
			                value: i + '日'
			            });
			        }
			        return arr;
			    }
			    var yearData = function(callback) {
			        callback(formatYear(nowYear))
			    }
			    var monthData = function (year, callback) {
			        callback(formatMonth());
			    };
			    var dateData = function (year, month, callback) {
			        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
			            callback(formatDate(31));
			        }
			        else if (/^(4|6|9|11)$/.test(month)) {
			            callback(formatDate(30));
			        }
			        else if (/^2$/.test(month)) {
			            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
			                callback(formatDate(29));
			            }
			            else {
			                callback(formatDate(28));
			            }
			        }
			        else {
			            throw new Error('month is illegal');
			        }
			    };
		        // var oneLevelId = showDateDom.attr('data-year');
		        // var twoLevelId = showDateDom.attr('data-month');
		        // var threeLevelId = showDateDom.attr('data-date');
		        var iosSelect = new IosSelect(3, 
		            [yearData, monthData, dateData],
		            {
		                title: '时间选择',
		                oneLevelId: dataId.substring(0,4),
		                twoLevelId: dataId.substring(5,6),
		                threeLevelId: dataId.substring(7,8),
		                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
			                var oSpan = $('.sample_date').parents('.right').find('span');
			                var value = selectOneObj.id + _this.toDouble(selectTwoObj.id) + _this.toDouble(selectThreeObj.id);
			                $('.sample_date').text(value);
			               	oSpan.text(value);
               				oSpan.attr('data-id', value);
		                }
		        });

            },
            showOptional(){
            	this.showMore = !this.showMore;
            },
			setSessToken(){
				this.sessToken = commonJs.getUrlParam('sess_token');
			},
			toDouble(num){
				let number = parseInt(num);
				if(number < 10) number = '0' + number;
				return number;
			}

		},
        beforeDestroy(){
            document.title = commonJs.config.webTitle;
        }
	}
</script>
<style>
@import '../../assets/style/iosSelect.css';
	.ios-select-widget-box.olay {
	    position: fixed;
	}
</style>
<style scoped lang="less">
	.editPersonalInfo{
		ul{
			padding-left: 14px;
			li{
				padding: 14px 14px 14px 10px;
				height: 20px;
				border-bottom: 1px solid rgba(129,141,207,0.20);
				position: relative;
				.icon{
					width: 7px;
					height: 7px;
					background: url(../../assets/lvshou/img/point.png) left top no-repeat;
					background-size: 100%;
					position: absolute;
					left: 5px;
					top:50%;
					margin-top: -4px;
				}
				.left{
					line-height: 20px;
					font-size: 15px;
					color: #666666;
					float: left;
					padding-left: 7px;
				}
				.right{
					float:right;
					height: 20px;
					input{
						height: 20px;
						line-height: 20px;
						font-size: 15px;
						color:#333;
						float:left;
						text-align: right;
						&.name{
							width: 165px;
						}
						&.mobile{
							width: 160px;
						}
					}
					em{
						height: 20px;
						line-height: 20px;
						font-size: 15px;
						color:#333;
						float:left;
					}
					span{
						height: 20px;
						line-height: 20px;
						font-size: 15px;
						color:#333;
						float:left;
						display: none;
					}
				}
			}
			.li{
				padding: 14px 14px 14px 10px;
				height: 20px;
				border-bottom: 1px solid rgba(129,141,207,0.20);
				position: relative;
				.left{
					line-height: 20px;
					font-size: 15px;
					color: #666666;
					float: left;
					padding-left: 7px;
				}
			}
		}
		.moreSubject{
			height: 54px;
			line-height: 54px;
			padding-left: 28px;
			padding-right: 14px;
			border-top:#F5F5F8 5px solid;
			em{
				height: 54px;
				line-height: 54px;
				font-size: 15px;
				color:#666;
				float: left;
			}
			span{
				width: 7px;
				height: 11px;
				background: url(../../assets/lvshou/img/right_point.png) left top no-repeat;
				background-size: 100%;
				float: right;
				margin-top: 21px;
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
                    &.cancel{
                        height: 33px;
                        color: #818DCF;
                        border: 1px solid #818DCF;
                        margin-right:8%;
                    }
                    &.keep{
                        color:#fff;
                        background-image:linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
                    } 
                }
            }
	}
</style>