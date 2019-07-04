<template>
  <div class="achievement-page">
    <div class="achievement-page-left">
      <div class="achievement-page-left-content">
        <list-table title="业绩统计">
          <slot slot="query">
            <h3 class="title">数据统计</h3>
            <div class="indicators">
              <span class="queryLabel">指标：</span>
              <el-radio-group v-model="type" size="mini" style="margin-right: 41px;"  @change="timeChange()">
                <el-radio-button label="1">订单总魅力分</el-radio-button>
                <el-radio-button label="2">订单总金额</el-radio-button>
              </el-radio-group>
            </div>
            <div class="indicators">
              <span class="queryLabel">查询时间：</span>
              <el-radio-group v-model="selectData" size="mini" style="margin-right: 41px;"  @change="timeChange()">
                <el-radio-button label="0">今天</el-radio-button>
                <el-radio-button label="1">昨天</el-radio-button>
                <el-radio-button label="7">近7天</el-radio-button>
                <el-radio-button label="30">近30天</el-radio-button>
              </el-radio-group>
            </div>
          </slot>
          <div class="statistics-wrapper">
            <div class="statistics-charts" id="statisticsCharts"></div>
          </div>
        </list-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, RadioButton, Button } from 'element-ui'
import { format } from 'common/js/util'
import { getSalesOrderTotal } from 'api/mall'
import { ERR_SUCCESS } from 'api/config'
import listTable from 'base/list-table/list-table'
export default {
  data() {
    return {
      selectData: '0',
      type: '1',
      startTime: '',
      endTime: ''
    }
  },
  created() {
    this.timeChange()
  },
  methods: {
    _getTime(num) {
      const time = new Date() - (num * 3600 * 24 * 1000)
      this.startTime = format(new Date(time), '$1-$2-$3') + ' 00:00:00'
      if (num === '1') {
        this.endTime = format((new Date() - 3600 * 24 * 1000), '$1-$2-$3') + ' 23:59:59'
      } else {
        this.endTime = format(new Date(), '$1-$2-$3') + ' 23:59:59'
      }
    },
    timeChange() {
      const { selectData } = this
      const that = this
      this._getTime(selectData)
      const { type, startTime, endTime } = this
      getSalesOrderTotal({ type, startTime, endTime }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const { value, time } = res.data
          let newColumns = []
          let newRows = []
          let i = 0
          if (selectData === '0') {
            i = 0
            while (i < 25) {
              newColumns.push(`${i}`)
              newRows.push(0)
              i++
            }
          } else if (selectData === '1') {
            i = 0
            while (i < 25) {
              newColumns.push(`${i}`)
              newRows.push(0)
              i++
            }
          } else {
            let frequency = 32
            const cs = new Date(endTime) - new Date(startTime)
            let _startTime = new Date(startTime).getTime()
            if (selectData === '1') {
              frequency = Math.ceil(cs / 86400000)
            } else {
              frequency = Math.floor(cs / 86400000)
            }
            if (frequency < 31) {
              while (i <= frequency) {
                const nd = new Date(_startTime)
                newColumns.push(format(nd))
                newRows.push(0)
                _startTime += 86400000
                i++
              }
            } else {
              newColumns = value
              newRows = time
            }
          }
          time.forEach((col, index) => {
            const nIndex = newColumns.indexOf(col)
            newRows[nIndex] = value[index]
          })
          that.chartsData(newColumns, newRows)
        }
      })
    },
    chartsData(columns, rows) {
      const titleLeft = format(new Date(this.startTime))
      const titleRight = format(new Date(this.endTime))
      let titleText = titleLeft
      if (titleLeft !== titleRight) {
        titleText = `( ${titleLeft} ~ ${titleRight} )`
      }
      const option = {
        title: {
          text: '业绩变化趋势',
          subtext: titleText,
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: columns
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '营销业绩',
          data: rows,
          type: 'line',
          areaStyle: { color: '#b2d4ff' },
          lineStyle: { color: '#b2d4ff' },
          itemStyle: { color: '#b2d4ff' }
        }]
      }
      if (window.echarts && !this.Chart) {
        this.Chart = window.echarts.init(document.getElementById('statisticsCharts'))
        // 加载表格变化
        this.Chart.setOption(option, true)
        window.addEventListener('resize', this.Chart.resize)
      } else if (window.echarts && this.Chart) {
        this.Chart.setOption(option, true)
      }
    }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Button.name]: Button,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  page-init(achievement)

  .statistics-wrapper
    position relative
    padding 24px 15px 0 15px
    background-color #ffffff
    .statistics-record
      float left
      width 181px
      height 222px
      border-right 1px solid #ccc
      .statistics-title
        margin-top 9px
        padding 15px 0
        height 14px
        line-height 14px
        font-size $font-size-sm
        color #999
      .statistics-text
        font-size 24px
        font-weight 500
        color $color-text
      .statistics-target
        margin-top 10px
        width 100%
        color #ff3333
      .statistics-target-text,.statistics-target-num
        display inline-block
        width 40%
        font-size $font-size-sm
      .statistics-target-text
        color #999
    .statistics-charts
      width 100%
      margin 0 auto
      height 300px
  .achievement-message-list
    position absolute
    top 0px
    right 0px
    width 25%
    height 100%
    padding-left 5px
    padding-right 5px
    box-sizing border-box
  .achievement-table
    margin-top 24px
    padding 0 15px
  .achievement-pagination
    margin 21px 0
    text-align right
    .achievement-pagination-content
      margin-right 20px
      inline-block-top()
</style>
