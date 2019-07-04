<template>
  <div style="height: 60vh;overflow-y: scroll;">
    <el-form :model="ListenerService" label-width="100px" label-position='left' class="form">
        <el-form-item label="活动名称" class="active">
          <el-input v-model="ListenerService.serviceName" placeholder="请输入收费标准名称，不超过16个字" maxlength="16"></el-input>
          <span>（*必填）</span>
        </el-form-item>
        <div class="line"></div>
        <!-- 文字服务 -->
        <el-form-item label="文字服务" class="active" style="margin-top: 15px;"></el-form-item>
        <!-- <el-form-item label="开启服务: " class="active">
          <el-switch v-model="ListenerService.wordService.switch"></el-switch>
           @input="priceInput(ListenerService.wordService)"
        </el-form-item> -->
        <el-form-item label="设置单价: " class="active">
          <el-input v-model.trim="ListenerService.wordService.price" placeholder="请输入单价" @input="priceInput($event, ListenerService.wordService)" @blur="priceBlur($event.target.value, ListenerService.wordService)" ></el-input>
          <span>元/分钟</span>
          <span>（*必填）</span>
        </el-form-item>
        <el-form-item label="最低服务时长: " class="active">
          <el-select v-model="ListenerService.wordService.duration" placeholder="请选择服务时长">
            <el-option :label="item.label"
                       :value="item.value"
                       v-for="(item, index) in ListenerServiceConfig.wordDuration"
                       v-bind:key="'key' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起步价: " class="active">
          <span>{{(ListenerService.wordService.price * ListenerService.wordService.duration).toFixed(2)}}</span>
        </el-form-item>
        <el-form-item label="有效期: " class="active">
          <span>15天</span>
        </el-form-item>
        <div class="line"></div>
        <!-- 语音服务 -->
        <el-form-item label="语音服务" class="active" style="margin-top: 15px;"></el-form-item>
        <!-- <el-form-item label="开启服务: " class="active">
          <el-switch v-model="ListenerService.voiceService.switch"></el-switch>
        </el-form-item> -->
        <el-form-item label="设置单价: " class="active">
          <el-input v-model="ListenerService.voiceService.price" placeholder="请输入单价" @input="priceInput($event, ListenerService.voiceService)" @blur="priceBlur($event.target.value, ListenerService.voiceService)"></el-input>
          <span> 元/分钟</span>
          <span>（*必填）</span>
        </el-form-item>
        <el-form-item label="最低服务时长: " class="active">
          <el-select v-model="ListenerService.voiceService.duration" placeholder="请选择服务时长">
            <el-option :label="item.label"
                       :value="item.value"
                       v-for="(item, index) in ListenerServiceConfig.voiceDuration"
                       v-bind:key="'key' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起步价: " class="active">
          {{(ListenerService.voiceService.price * ListenerService.voiceService.duration).toFixed(2)}}
        </el-form-item>
        <el-form-item label="有效期: " class="active">
          <el-select v-model="ListenerService.voiceService.validDate" placeholder="请选择有效期">
            <el-option :label="item.label"
                       :value="item.value "
                       v-for="(item, index) in ListenerServiceConfig.validDate"
                       v-bind:key="'key' + index"></el-option>
          </el-select>
        </el-form-item>
        <div class="line"></div>
        <!-- 套餐 -->
        <el-form-item label="套餐服务" class="active" style="margin-top: 15px;"></el-form-item>
        <!-- <el-form-item label="开启服务: " class="active">
          <el-switch v-model="ListenerService.mealServiceSwitch"></el-switch>
        </el-form-item> -->
        <ul v-if="ListenerService.mealService.length">
            <li v-for="(item, index) in ListenerService.mealService" v-bind:key="'key' + index">
                  <el-form-item label="套餐名称: " class="active">
                    <el-input v-model="item.name" placeholder="请输入套餐名称，不超过9个字" maxlength="9"></el-input>
                    <span> </span>
                    <span>（*必填）</span>
                  </el-form-item>
                  <el-form-item label="套餐时间: " class="active">
                    <el-input v-model="item.duration" placeholder="请输入套餐时间"  @input="priceInputTime($event, item, 'duration', index)"></el-input>
                    <span> 分钟</span>
                    <span>（*必填）</span>
                  </el-form-item>
                  <el-form-item label="套餐价格: " class="active">
                    <el-input v-model="item.price" placeholder="请输入套餐价格" @input="priceInput($event, item, 'price', index)" @blur="priceBlur($event.target.value, item, 'price', index)"></el-input>
                    <span> 元</span>
                    <span>（*必填）</span>
                  </el-form-item>
                  <el-form-item label="有效期: " class="active">
                    <el-select v-model="item.validDate" placeholder="请选择有效期">
                      <el-option :label="vitem.label"
                                :value="vitem.value"
                                v-bind:item="JSON.stringify(item)"
                                v-bind:data-label-value="item.validDate + '-' + vitem.label + '-' +vitem.value"
                                v-for="(vitem, vindex) in ListenerServiceConfig.validDate"
                                v-bind:key="'key' + vindex"></el-option>
                    </el-select>
                    <span class="package" @click="deletePackage(index)" v-if="index !== 0">删除套餐</span>
                  </el-form-item>
                  <div style="height: 50px"></div>
            </li>
        </ul>
        <div class="package" @click="addPackage" v-if="ListenerService.mealService.length <= 12">添加套餐</div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message,
  Pagination, Checkbox, Select, Option, Dialog, Form, FormItem
} from 'element-ui'
import { getListenerServiceConfig, saveListenerService, updateListenerService, getListenerServiceById } from 'api/listener'
import { ERR_SUCCESS } from 'api/config'
export default {
  name: 'listener-service-setting',
  data() {
    return {
      ListenerService: {
        serviceName: '',
        wordService: { // 文字
          duration: '15',
          price: '0.00',
          startPrice: 1.00,
          validDate: '15'
        },
        voiceService: { // 语音
          duration: '15',
          price: '0.00',
          startPrice: 1.00,
          validDate: '15'
        },
        // mealServiceSwitch: false, // 是否开启套餐
        // 套餐
        mealService: [
          {
            duration: '',
            name: '',
            price: '0.00',
            validDate: '15'
          }
        ]
      },
      mealService: {
        duration: '',
        name: '',
        price: '0.00',
        validDate: '15'
      },
      ListenerServiceConfig: {
        wordDuration: [],
        voiceDuration: [],
        validDate: []
      }
    }
  },
  created() {
    this.initListenerService = JSON.stringify(this.ListenerService)
    getListenerServiceConfig().then(res => {
      if (res.code === ERR_SUCCESS) {
        this.ListenerServiceConfig = res.data
      } else {
        Message.error(res.msg || '获取收费标准相关项配置 （下拉框数据服务时长、有效期）失败')
      }
    })
  },
  methods: {
    // 初始化
    handlInitListenerService() {
      this.ListenerService = JSON.parse(this.initListenerService)
    },
    addPackage() {
      const mealService = Object.assign({}, this.mealService)
      this.ListenerService.mealService.push(mealService)
    },
    deletePackage(index) {
      this.ListenerService.mealService.splice(index, 1)
    },
    validDate(validDate) {
      let newValidDate = ''
      switch (validDate) {
        case '15分钟':
          newValidDate = '15'
          break
        case '30分钟':
          newValidDate = '30'
          break
        case '45分钟':
          newValidDate = '45'
          break
        case '60分钟':
          newValidDate = '60'
          break
        case '15天':
          newValidDate = '15'
          break
        case '1个月':
          newValidDate = '30'
          break
        case '2个月':
          newValidDate = '60'
          break
        case '3个月':
          newValidDate = '90'
          break
        case '4个月':
          newValidDate = '120'
          break
        case '5个月':
          newValidDate = '150'
          break
        case '6个月':
          newValidDate = '180'
          break
        case '7个月':
          newValidDate = '210'
          break
        case '8个月':
          newValidDate = '240'
          break
        case '9个月':
          newValidDate = '270'
          break
        case '10个月':
          newValidDate = '300'
          break
        case '11个月':
          newValidDate = '330'
          break
        case '1年':
          newValidDate = '365'
          break
      }
      return newValidDate
    },
    dialogServiceSettingEdit(row) {
      getListenerServiceById(row.serviceId).then(res => {
        if (res.code === ERR_SUCCESS) {
          res.data.mealService.forEach(elem => {
            elem.price = parseFloat(elem.price || elem.startPrice || 0).toFixed(2)
            elem.validDate = this.validDate(elem.validDate)
          })
          res.data.voiceService.validDate = this.validDate(res.data.voiceService.validDate)
          res.data.wordService.validDate = this.validDate(res.data.wordService.validDate)
          res.data.voiceService.duration = '' + res.data.voiceService.duration
          res.data.wordService.duration = '' + res.data.wordService.duration
          res.data.voiceService.price = parseFloat(res.data.voiceService.price).toFixed(2)
          res.data.wordService.price = parseFloat(res.data.wordService.price).toFixed(2)
          this.ListenerService = res.data
        } else {
          this.handlInitListenerService()
        }
      }).catch(err => {
        Message.error(err.msg)
        this.handlInitListenerService()
      })
    },
    handlePackage() {
      const { serviceName, wordService, voiceService, mealService } = this.ListenerService
      let bool = true
      const params = Object.create(null)
      params.serviceName = serviceName
      params.serviceId = this.ListenerService.serviceId
      params.serviceItem = []
      // name表示套餐名称，type表示服务类型（1文字，2语音，3套餐），price表示单价,duration表示服务时长，validDate表示有效期
      if (serviceName === '') {
        bool = false
      }
      //  ---
      if (!wordService.price || wordService.price === '' || parseFloat(wordService.price) === 0) {
        bool = false
      }
      wordService.price = parseFloat(wordService.price)
      wordService.startPrice = parseFloat(wordService.price) * parseFloat(wordService.duration)
      params.serviceItem.push(Object.assign({}, { type: 1, isPacket: false }, wordService))
      //  ---
      if (!voiceService.price || voiceService.price === '' || parseFloat(voiceService.price) === 0) {
        bool = false
      }
      voiceService.startPrice = parseFloat(voiceService.price) * parseFloat(voiceService.duration)
      params.serviceItem.push(Object.assign({}, { type: 2, isPacket: false }, voiceService))
      // ---
      mealService.forEach(elem => {
        if (elem.name === '') {
          bool = false
        }
        if (!elem.price || elem.price === '' || parseFloat(elem.price) === 0) {
          bool = false
        }
        if (parseFloat(elem.duration) === 0) {
          bool = false
        }
        params.serviceItem.push(Object.assign({}, { type: 3, isPacket: true }, elem))
      })
      return {
        bool,
        params
      }
    },
    // 保存
    preservation() {
      const { bool, params } = this.handlePackage()
      if (!bool) {
        Message.warning('还有【必填项】未填，请仔细检查！')
        return false
      }
      if (params.serviceId) {
        updateListenerService(params.serviceId, params.serviceName, JSON.stringify(params.serviceItem)).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success(res.msg && res.msg !== 'OK' ? res.msg : '更新成功')
            this.$root.$emit('getAppUserListReset')
            this.$root.$emit('dialogServiceSettingClose')
          } else {
            Message.success(res.msg && res.msg !== 'OK' ? res.msg : '更新失败')
          }
        }).catch(err => {
          Message.error(err.msg)
        })
      } else {
        saveListenerService(params.serviceName, JSON.stringify(params.serviceItem)).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success(res.msg && res.msg !== 'OK' ? res.msg : '新增成功')
            this.$root.$emit('dialogServiceSettingClose')
            this.$root.$emit('getAppUserListReset')
          } else {
            Message.success(res.msg && res.msg !== 'OK' ? res.msg : '新增失败')
          }
        }).catch(err => {
          Message.error(err.msg)
        })
      }
    },
    handlePirceValue(v) {
      v = '' + v
      const len = v.match(/\./g)
      let r = null
      let nv = null
      if (len && v.indexOf('.') !== 0) {
        const va = v.toString().split('.')
        nv = va[0] + '.' + (va[1].length > 2 ? va[1].substring(0, 2) : va[1])
      } else {
        r = /[^0-9]/g
        nv = parseInt(v.replace(r, ''))
      }
      return nv
    },
    priceInput(e, item, name = 'price', index) {
      let value = this.handlePirceValue(e)
      if (isNaN(value)) {
        value = ''
      }
      if (value > 100000000) {
        value = parseInt(value.toString().substring(0, 9))
      }
      setTimeout(() => {
        if (index === 0 || index) {
          this.ListenerService.mealService[index][name] = value
        } else {
          item[name] = value
        }
      }, 20)
    },
    priceBlur(e, item, name = 'price', index) {
      let value
      if (e) {
        value = parseFloat(e).toFixed(2)
      } else {
        value = 0
      }
      setTimeout(() => {
        if (index === 0 || index) {
          this.ListenerService.mealService[index][name] = value
        } else {
          item[name] = value
        }
      }, 20)
    },
    priceInputTime(e, item, name = 'price', index) {
      let value = parseInt(e.replace(/[^0-9]/g, ''))
      if (isNaN(value)) {
        value = ''
      }
      if (value > 100000000) {
        value = parseInt(value.toString().substring(0, 9))
      }
      setTimeout(() => {
        if (index === 0 || index) {
          this.ListenerService.mealService[index][name] = value
        } else {
          item[name] = value
        }
      }, 20)
    }
  },
  watch: {
    allCheck() {
      if (this.allCheck) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
        this.updateDataSelect = this.tableData
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  },
  filters: {
    validDate(value) {
      if (value.indexOf('月') > -1) {
        return parseInt(value) * 30
      } else if (value.indexOf('天') > -1) {
        return parseInt(value)
      }
      return value
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
@import "~common/css/elementCustom"

.form{
  .active{
    .el-input,.el-select{
      width 50%
    }
  }
  .line{
    border-bottom 1px dashed #606266
  }
  .package{
    color: #009DD9;
    cursor: pointer;
  }
  span.package{
    margin-left 10%
  }
}
</style>
