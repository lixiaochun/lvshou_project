<template>
  <div class="progress-wrapper">
    <div class="line">
      <h4 class="fontSty">申请人 (受检人)</h4>
      <span>{{userName}}</span>
    </div>
    <div class="line" @click="goRouter">
      <h4 class="fontSty">查看信息</h4>
      <i class="arrow"></i>
    </div>
    <div class="step-wrapper" :class="isnewStep ? 'isnewStep' : ''" :style="stepHeight">
      <el-steps direction="vertical" :active="2">
        <el-step
          :title="step.title"
          :description="step.description"
          v-for="(step, key) in stepList"
          :key="key"
          icon="el-icon-edit"
          :status="step.status"
          :style="stepSingleHeight"
        >
          <template slot="icon">
            <i :class="step.status === 'wait' ? 'finishSty' : 'crrentSty'"></i>
            <span :style="step.dateSty">{{step.date}}</span>
          </template>
        </el-step>
      </el-steps>
    </div>

    <div class="fixBottom" v-show="isShowTitle">
      <h5>历史数据暂不支持查看进度</h5>
    </div>
  </div>
</template>

<script>
import LsFetch from 'API/common'
import { urlGet, formatDate, splicingUrl } from 'Utils/common'

export default {
  data() {
    return {
      isnewStep: false, // 是否是旧项目进度 默认是旧项目
      isShowTitle: false, // 是否显示文字
      stepSingleHeight: '',
      stepHeight: '', // step 的高度
      urlParams: {
        express_num: urlGet('report_express_num') || urlGet('agreement_express_num'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        id: urlGet('id'),
        sign: urlGet('sign'),
        check_num: urlGet('check_num') // 用于区分新旧
      },
      userName: '',
      stepList: []
    }
  },
  async mounted() {
    document.title = '检测报告进度'
    !this.urlParams.check_num && this._oldStep() || this.newStep()

  },
  methods: {
    // 新检测进度
    async newStep() {
      this.isnewStep = true
      const data = await LsFetch({
        url: 'https://api.hxsapp.com/slim/Gene/getYMRReportStatus',
        data: this.urlParams,
        type: 'post'
      })
      this.userName = data.username


      // 格式化 step 的数据
      let _stepList = [
        {
          field: 'inputTime',
          status: '',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '客户信息录入',
          description: ''
        },
        {
          field: 'receiveTime',
          status: '',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '样本已接收',
          description: ''
        },
        {
          field: 'checkTime',
          status: 'process',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '正在检测中',
          description: ''
        },
        {
          field: 'replayTime',
          status: '',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '样本重采',
          description: ''
        },
        {
          field: 'finishTime',
          status: '',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '检测完成',
          description: ''
        },
        {
          field: 'reportTime',
          status: '',
          dateSty: 'position: absolute; top: 3px; left: -39px;',
          date: '',
          title: '完成报告',
          description: ''
        }
      ]

      let _formatArr = []

      let _nowTime = new Date()

      // 为了规避forEach 对return continue 无效的 故用for 
      for (let i = 0; i < _stepList.length; i++) {
        let step = _stepList[i]

        // 时间重新定义 避免出现 未来日期
        data[step['field']]
          && Number(formatDate(new Date(data[step['field']] * 1000), 'yyMMdd')) > Number(formatDate(_nowTime, 'yyMMdd'))
          && (data[step['field']] = null)

        if (!data[step['field']]) continue // 如果有时间不存在就跳过
        step['date'] = data[step['field']] ? formatDate(new Date(data[step['field']] * 1000), 'MM-dd') : ''
        step['status'] = 'wait'
        _formatArr.push(step)
      }
      const _formatArrLen = _formatArr.length
      // 最后一位就是status设置为process
      _formatArr[_formatArrLen - 1]['status'] = 'process'

      _formatArr.length < 2 && (this.stepHeight = 'height: 80px;')
      2 < _formatArr.length < 3 && (this.stepHeight = 'height: 180px;', this.stepSingleHeight = 'flex-basis: 30%;')
      _formatArr.length > 3 && (this.stepHeight = 'height: 300px;', this.stepSingleHeight = 'flex-basis: 100%;')

      this.stepList = _formatArr

    },


    // 原有检测进度
    async _oldStep() {
      let data = this.urlParams
      data['app_version'] = '3.7.2'
      data['agreement_id'] = data['id']

      // 接口是否报错
      let isApiError = false

      if (urlGet('version') && urlGet('version') === '3.7.0') { // 如果没有version 字段 默认是3.7.0版本 是不显示进度
        isApiError = true
        this.isShowTitle = true
      }

      const stepData = await LsFetch({
        type: 'post',
        url: 'https://api.hxsapp.com/slim/gene/getReportStatus',
        data
      }).catch(err => isApiError = true)

      const { userName } = stepData
      this.userName = userName

      if (isApiError) {
        this.stepList = []
        return
      }

      // 格式化 step 的数据

      let _stepList = [
        {
          status: '',
          dateSty: 'position: absolute; top: 5px; left: -34px;',
          date: '',
          title: '客户信息录入',
          description: ''
        },
        {
          status: '',
          dateSty: 'position: absolute; top: 5px; left: -34px;',
          date: '',
          title: '样本预计签收',
          description: ''
        },
        {
          status: 'process',
          dateSty: 'position: absolute; top: 5px; left: -34px;',
          date: '',
          title: 'DNA提取与扩增',
          description: '约1个工作日'
        },
        {
          status: '',
          dateSty: 'position: absolute; top: 5px; left: -34px;',
          date: '',
          title: '产物分析',
          description: '约1个工作日'
        },
        {
          status: '',
          dateSty: 'position: absolute; top: 5px; left: -34px;',
          date: '',
          title: '结果分析',
          description: '约1个工作日'
        },
        {
          status: '',
          dateSty: 'position: absolute; top: 5px; left: -35px;',
          date: '',
          title: '完成报告',
          description: ''
        }

      ]


      const _createTime = stepData['createTime'] * 1000
      const _signTime = stepData['signTime'] * 1000
      const _dnaTime = stepData['dnaTime'] * 1000
      const _productTime = stepData['productTime'] * 1000
      const _resultTime = stepData['resultTime'] * 1000
      const _finishTime = stepData['finishTime'] * 1000
      const _nowTime = stepData['nowTime'] * 1000
      Object.keys(stepData).forEach(key => {
        typeof stepData[key] === 'number' && (stepData[key] = stepData[key] * 1000)
        let time = formatDate(new Date(stepData[key]), 'MM-dd')
        const status = formatDate(new Date(), 'MM-dd') !== time ? 'wait' : 'process'
        // const date = stepData[key] ? formatDate(new Date(stepData[key]), 'MM-dd') : ''
        let date = stepData[key] ? formatDate(new Date(stepData[key]), 'MM-dd') : ''
        if (stepData[key] > _finishTime && _finishTime !== 0) {
          date = formatDate(new Date(_finishTime), 'MM-dd')
        }
        let _step = null
        if (key === 'createTime') {
          if (_finishTime == 0) {
            _stepList[0]['status'] = _createTime < _nowTime && _signTime > _nowTime ? 'process' : 'wait'
          } else {
            _stepList[0]['status'] = _createTime < _nowTime && _signTime > _nowTime && _finishTime > _nowTime ? 'process' : 'wait'
          }

          _stepList[0]['date'] = date
        } else if (key === 'signTime') {
          if (_finishTime == 0) {
            _stepList[1]['status'] = _signTime < _nowTime && _dnaTime > _nowTime ? 'process' : 'wait'
          } else {
            _stepList[1]['status'] = _signTime < _nowTime && _dnaTime > _nowTime && _finishTime > _nowTime ? 'process' : 'wait'
          }
          // this.stepList[1]['status'] = _signTime < _nowTime && _dnaTime > _nowTime && _finishTime > _nowTime ? 'process' : 'wait'
          _stepList[1]['date'] = date
        } else if (key === 'dnaTime') {
          if (_finishTime == 0) {
            _stepList[2]['status'] = _dnaTime < _nowTime && _productTime > _nowTime ? 'process' : 'wait'
          } else {
            _stepList[2]['status'] = _dnaTime < _nowTime && _productTime > _nowTime && _finishTime > _nowTime ? 'process' : 'wait'
          }

          _stepList[2]['date'] = date
        } else if (key === 'productTime') {
          if (_finishTime == 0) {
            _stepList[3]['status'] = _productTime < _nowTime && _resultTime > _nowTime ? 'process' : 'wait'
          } else {
            _stepList[3]['status'] = _productTime < _nowTime && _resultTime > _nowTime && _finishTime > _nowTime ? 'process' : 'wait'
          }

          _stepList[3]['date'] = date
        } else if (key === 'resultTime') {
          if (_finishTime == 0) {
            _stepList[4]['status'] = _resultTime < _nowTime && _resultTime > _finishTime ? 'process' : 'wait'
          } else {
            _stepList[4]['status'] = _resultTime < _nowTime && _resultTime > _finishTime && _finishTime > _nowTime ? 'process' : 'wait'
          }

          _stepList[4]['date'] = date
        } else if (key === 'finishTime' && stepData[key]) {
          _stepList[5]['status'] = _finishTime < _nowTime && _finishTime !== 0 ? 'process' : 'wait'
          _stepList[5]['date'] = date
        }
      })

      let _arr = []
      let isInit = true

      for (let i = 0; i < _stepList.length; i++) {
        if (isInit) {
          _arr.push(_stepList[i])
        }

        if ((stepData['signTime'] === '0' || stepData['signTime'] === 0) && i === 0) {
          _arr[i]['status'] = 'process'
          _arr[i].dateSty = 'position: absolute; top: 5px; left: -37px;'
          isInit = false
        }

        if ((stepData['dnaTime'] === '0' || stepData['dnaTime'] === 0) && i === 1) {
          _arr[i]['status'] = 'process'
          _arr[i].dateSty = 'position: absolute; top: 5px; left: -34px;'
          isInit = false
        }

        if ((stepData['productTime'] === '0' || stepData['productTime'] === 0) && i === 2) {
          _arr[i]['status'] = 'process'
          _arr[i].dateSty = 'position: absolute; top: 5px; left: -34px;'
          isInit = false
        }

        if ((stepData['resultTime'] === '0' || stepData['resultTime'] === 0) && i === 3) {
          _arr[i]['status'] = 'process'
          _arr[i].dateSty = 'position: absolute; top: 5px; left: -37px;'
          isInit = false
        }

        if (stepData['signTime'] === '0' || stepData['signTime'] === 0) {
          break
        }

        if (stepData['dnaTime'] === '0' || stepData['dnaTime'] === 0 && i === 1) {
          break
        }

        if (stepData['productTime'] === '0' || stepData['productTime'] === 0 && i === 2) {
          break
        }

        if (stepData['resultTime'] === '0' || stepData['resultTime'] === 0 && i === 3) {
          break
        }

        if (_stepList[i]['status'] === 'process') {
          _arr[i].dateSty = 'position: absolute; top: 5px; left: -34px;'
          isInit = false
        }
      }

      console.log(_arr.length)
      _arr.length < 2 && (this.stepHeight = 'height: 80px;')
      2 < _arr.length < 3 && (this.stepHeight = 'height: 180px;', this.stepSingleHeight = 'flex-basis: 30%;')
      _arr.length > 3 && (this.stepHeight = 'height: 300px;', this.stepSingleHeight = 'flex-basis: 100%;')

      this.stepList = _arr
    },

    // 跳转查看报告单
    goRouter() {
      const params = JSON.parse(JSON.stringify(this.urlParams))
      params['isAdd'] = 0

      let preUrl = 'https://app.hxsapp.com/hxsweb/geneMsg'

      this.urlParams.check_num && (preUrl = 'https://app.hxsapp.com/hxsweb/grilMsg')

      const url = splicingUrl(params, preUrl)
      window.location.href = url
    }
  }
}
</script>

<style lang="less" scoped>
.progress-wrapper {
  .fixBottom {
    position: fixed;
    bottom: 10px;
    width: 100%;
    color: #999999;
    h5 {
      display: block;
      width: 100%;
      text-align: center;
      font-weight: normal;
      font-size: 13px;
    }
  }
  .line {
    position: relative;
    margin-left: 20px;
    padding-right: 20px;
    height: 50px;
    border-bottom: 1px solid rgba(129, 141, 207, 0.2);
    line-height: 50px;
    h4 {
      display: inline-block;
      font-size: 14px;
      font-weight: normal;
      vertical-align: top;
    }
    span {
      margin-top: 2px;
      float: right;
      vertical-align: top;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
    }
    .arrow {
      width: 10px;
      height: 5.8px;
      background: url(./../assets/img/return01-blue@2x.png) no-repeat;
      background-size: 100% 100%;
      -webkit-background-size: 100% 100%;
      transform: rotate(270deg);
      position: absolute;
      right: 15px;
      top: 50%;
      margin-top: -2.9px;
    }
  }
  .step-wrapper {
    margin-top: 20px;
    height: 370px;
    .el-steps {
      position: relative;
      .el-step {
        width: 80%;
        margin-left: 14%;
        font-size: 14px;
        .el-step__head {
        }
      }

      span {
        position: absolute;
        top: 20px;
      }
      .finishSty {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #c1c1c1;
      }
      .crrentSty {
        width: 16px;
        height: 16px;
        background-image: url("../assets/images/icon_selected.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>

<style lang="less">
.isnewStep {
  .el-step__head.is-wait {
    // padding-left: 3px;
    margin-left: 3px;
  }
  .crrentSty {
    margin-left: 8px;
  }
  .el-step.is-vertical .el-step__icon.is-icon {
  }
}
</style>

