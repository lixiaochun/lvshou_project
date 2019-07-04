<template>
  <div class="member-edit-wrapper">
    <p class="title"><span>会员列表</span></p>
    <list-table title="编辑资料" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-table-wrapper">
        <tag-table title="客户症状">
          <div class="member-eidt">
            <div class="member-eidt-item">
              <span class="label">症状：</span>
              <div class="member-input-item" style="width: 300px">
                <el-checkbox-group v-model="option1" size="mini">
                  <el-checkbox-button v-for="symptom in symptomTypeOptions" :label="symptom" :key="symptom" @change="symptomTypeList">{{symptom}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </div>
            <div></div>
            <div class="member-eidt-item">
              <span class="label">会员类型：</span>
              <div class="member-input-item">
              <el-select v-model="custom.userType" size="mini"  style="width: 234px" placeholder="请选择">
                <el-option
                  v-for="item in userTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
            </div>
          </div>
        </tag-table>
      </div>

      <div class="tag-table-wrapper">
        <tag-table title="基础信息">
          <div class="member-eidt">
            <div class="member-eidt-item">
              <span class="label">会员姓名：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.name" placeholder="请输入姓名"></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">昵称：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.nickName" placeholder="请输入昵称"></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">性别：</span>
              <div class="member-input-item">
                <el-radio size="mini" v-model="custom.gender" :label="0">未知</el-radio>
                <el-radio size="mini" v-model="custom.gender" :label="1">男</el-radio>
                <el-radio size="mini" v-model="custom.gender" :label="2">女</el-radio>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">生日：</span>
              <div class="member-input-item">
                <el-date-picker
                  v-model="custom.birthDate"
                  style="width: 100%;"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">身高：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.height"
                placeholder="范围 100 ~ 220cm"></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">体重：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.weight"
                placeholder="范围 30 ~ 220kg"></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">职业：</span>
              <div class="member-input-item">
                <el-select v-model="custom.career" size="mini"  style="width: 234px" placeholder="请选择">
                  <el-option
                    v-for="item in careerList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">文化程度：</span>
              <div class="member-input-item">
                <el-select v-model="custom.educationLevel" size="mini"  style="width: 234px" placeholder="请选择">
                  <el-option
                    v-for="item in educationLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">城市：</span>
              <div class="member-input-item">
                <el-cascader
                  style="width: 100%"
                  placeholder="请选择省市区"
                  expand-trigger="hover"
                  :options="cityList"
                  v-model="custom.areaList"
                  size="mini"
                  @change="handleChange">
                </el-cascader>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">婚姻：</span>
              <div class="member-input-item">
                <el-select v-model="custom.marriageInfo" size="mini"  style="width: 234px" placeholder="请选择">
                  <el-option
                    v-for="item in marriageInfoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">会员等级：</span>
              <div class="member-input-item">
                <p style="font-size: 12px; color: #606266">{{custom.levelShortname}}</p>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">客户来源：</span>
              <div class="member-input-item">
                <el-select v-model="custom.isBrm" size="mini"  style="width: 234px" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </tag-table>
      </div>

      <div class="tag-table-wrapper">
        <tag-table title="联系方式">
          <div class="member-eidt">
            <div class="member-eidt-item">
              <span class="label">手机号码：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.mobile"
                placeholder="请输入内容" clearable></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">身份证：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.idcardNo"
                placeholder="请输入内容"></el-input>
              </div>
            </div>
            <!-- 1.7.20版本删除微信号和qq号 -->
            <!-- <div class="member-eidt-item">
              <span class="label">微信：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.wechat"
                placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="member-eidt-item">
              <span class="label">QQ：</span>
              <div class="member-input-item">
                <el-input size="mini" v-model="custom.qq"
                placeholder="请输入内容"></el-input>
              </div>
            </div> -->
          </div>
        </tag-table>
      </div>

      <div class="tag-table-button">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" :loading="loading" type="primary" @click="submit">提交</el-button>
      </div>
    </list-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Message, Table, CheckboxGroup, TableColumn, Select, CheckboxButton, Cascader, Option, DatePicker, Radio } from 'element-ui'
import listTable from 'base/list-table/list-table'
import tagTable from 'base/tag-table/tag-table'
import { ERR_SUCCESS } from 'api/config'

import { getAppUserById, updateAppUserInfo } from 'api/user'
import { genderFormat, formatCurrency, recursion } from 'common/js/util'
import CityList from 'common/js/CityList'

const _CityList = recursion(CityList)
const symptomTypeOptions = ['阳痿', '早泄', '前列腺炎', '性冷淡']
const _careerList = [{
  value: '国家公务员',
  label: '国家公务员'
}, {
  value: '专业技术人员',
  label: '专业技术人员'
}, {
  value: '职员',
  label: '职员'
}, {
  value: '企业管理员工',
  label: '企业管理员工'
}, {
  value: '工人',
  label: '工人'
}, {
  value: '农民',
  label: '农民'
}, {
  value: '学生',
  label: '学生'
}, {
  value: '教师',
  label: '教师'
}, {
  value: '现役军人',
  label: '现役军人'
}, {
  value: '自由职业者',
  label: '自由职业者'
}, {
  value: '个体经营户',
  label: '个体经营户'
}, {
  value: '无业人员',
  label: '无业人员'
}, {
  value: '退离休人员',
  label: '退离休人员'
}, {
  value: '其他',
  label: '其他'
}]
const _marriageInfoList = [{ value: '未婚', label: '未婚' }, { value: '已婚', label: '已婚' }, { value: '丧偶', label: '丧偶' }, { value: '离异', label: '离异' }, { value: '保密', label: '保密' }]
const _educationLevel = [{ value: '小学及以下', label: '小学及以下' }, { value: '初中', label: '初中' }, { value: '高中', label: '高中' }, { value: '中专及技校', label: '中专及技校' }, { value: '大学本科及专科', label: '大学本科及专科' }, { value: '研究生以上', label: '研究生以上' }]
const _userTypes = [{ value: '意向客户', label: '意向客户' }, { value: '保留客户', label: '保留客户' }, { value: '待转客户', label: '待转客户' }, { value: '已成交客户', lable: '已成交客户' }, { value: '新客户', lable: '新客户' }]
export default {
  data() {
    return {
      symptomType: '',
      loading: false,
      option1: [],
      custom: {},
      position: '',
      address: {},
      birthDay: '',
      symptomTypeOptions: symptomTypeOptions,
      cityList: _CityList,
      marriageInfoList: _marriageInfoList,
      educationLevelList: _educationLevel,
      userTypes: _userTypes,
      options: [{
        value: true,
        label: 'brm客户'
      }, {
        value: false,
        label: 'app客户'
      }],
      careerList: _careerList
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      const { i } = this.$route.query
      this._getAppUserById(i)
    },
    handleChange(value) {
      if (value && value.length > 0) {
        this.address.area = value.join('-')
      }
    },
    symptomTypeList(value) {
      const symptomType = this.option1.join(',')
      this.custom.symptomType = symptomType
    },
    _getAppUserById(id) {
      getAppUserById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.custom = res.data.appUser
          const areaList = this.custom.area.split('-')
          this.custom.areaList = areaList
          const option1 = this.custom.symptomType.split(',')
          this.option1 = option1
        } else {
          Message.error(res.msg)
        }
      })
    },
    changeSwitch() {
    },
    _genderFormat(e) {
      return genderFormat(e)
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    submit() {
      const { id, name, qq, userFrom, career, gender, mobile, nickName, wechat, weight, idcardNo, birthDate, educationLevel, userType, symptomType, marriageInfo, height } = this.custom
      const area = this.address.area
      const position = this.custom.area
      // const area = this.custom.areaList
      if (!area) {
        this.position = position
      } else {
        this.position = area
      }
      if (birthDate) {
        this.birthDay = birthDate
      }
      updateAppUserInfo({ id, name, area: this.position, qq, userFrom, career, gender, mobile, nickName, wechat, weight, idcardNo, birthDate: this.birthDay, educationLevel, userType, symptomType, marriageInfo, height }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('保存成功')
          this.$router.go(-1)
        } else {
          Message.error(res.msg)
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/memberEdit') {
        this.init()
      }
    }
  },
  components: {
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [Radio.name]: Radio,
    [CheckboxButton.name]: CheckboxButton,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cascader.name]: Cascader,
    [Select.name]: Select,
    [Option.name]: Option,
    tagTable,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.member-edit-wrapper
  width 100%
  height 100%
  overflow-y auto
  .title
    height 60px
    line-height 60px
    background #f2f2f2
    span
      position relative
      margin-left 8px
      padding-left 10px
      color #666
      font-size 16px
      &:before
        position absolute
        top 2px
        left -2px
        content ""
        width 2px
        display inline-block
        height 14px
        background #00bafa
.tag-table-wrapper
  margin 0 15px 15px 15px
  border 1px solid #dcdcdc
  .member-eidt
    margin 0 auto
    width 680px
    font-size 0
  .member-eidt-item
    width 50%
    height 45px
    line-height 45px
    inline-block-top()
    .label
      float left
      display block
      width 105px
      height 45px
      font-size $font-size-sm
      text-align right
    .member-input-item
      margin-left 105px
      font-size 12px
      height 45px
.tag-table-button
  height 45px
  line-height 45px
  text-align center
  button
    margin-right 20px
    width 120px
</style>
