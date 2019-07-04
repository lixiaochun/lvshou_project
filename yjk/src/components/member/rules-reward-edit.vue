<template>
  <c-dialog :title="title" @close="goBack">
    <div class="content-manage-item">
      <ul class="warning-wapper">
        <li>
          <span class="choose">任务名称：</span>
          <div>
            <p><el-input size="mini" v-model="dataQuery.taskName" style="width: 200px"></el-input></p>
          </div>
        </li>
        <li>
          <span class="choose">任务类型：</span>
          <div>
            <p>
              <el-select v-model="dataQuery.taskType" size="mini" style="width: 200px" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
        </li>
        <li>
          <span>魅力值：</span>
          <div>
            <p><el-input size="mini" v-model="dataQuery.score" class="input-border-radius" style="width: 170px"></el-input><span class="unit">分</span></p>
          </div>
        </li>
        <li>
          <span>魅力分：</span>
          <div>
            <p><el-input size="mini" v-model="dataQuery.points" class="input-border-radius" style="width: 170px"></el-input><span class="unit">分</span></p>
          </div>
        </li>
        <!--<li>-->
          <!--<span>壹豆：</span>-->
          <!--<div>-->
            <!--<p><el-input size="mini" v-model="dataQuery.ebean" class="input-border-radius" style="width: 170px"></el-input><span class="unit">个</span></p>-->
          <!--</div>-->
        <!--</li>-->
        <li>
          <span>生效日期：</span>
          <div>
            <p>
              <el-date-picker
              v-model="dataQuery.validStart"
              style="width: 198px"
              size="mini"
              type="date"
              placeholder="选择日期">
            </el-date-picker></p>
          </div>
        </li>
        <li>
          <span>启用状态：</span>
          <div style="height: 30px; line-height: 30px">
            <el-radio v-model="dataQuery.isValid" :label="true" style="width: 60px">开启</el-radio>
            <el-radio v-model="dataQuery.isValid" :label="false" style="margin-left: 10px">不开启</el-radio>
          </div>
        </li>
        <li>
          <el-button type="primary" size="mini" style="width: 60px" @click="saveWarning()" >保存</el-button>
          <el-button size="mini"  style="width: 60px" @click="cancelWarning()" >取消</el-button>
        </li>
      </ul>
    </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Radio, Input, Button, DatePicker, Select, Option, Message } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import { getTaskRewardConfigById, updateTaskRewardConfigById } from 'api/user'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      title: '任务编辑',
      dataQuery: {
        taskName: '编辑任务',
        score: '',
        points: '',
        isValid: '',
        validStart: '',
        taskType: '1',
        id: ''
      },
      options: [{
        value: '1',
        label: '新手任务'
      }, {
        value: '2',
        label: '日常任务'
      }]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { id } = this.$route.query
      this._getTaskRewardConfigById(id)
      this.dataQuery.id = id
    },
    goBack() {
      this.$router.go(-1)
    },
    _getTaskRewardConfigById(id) {
      getTaskRewardConfigById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.dataQuery = res.data
          this.dataQuery.taskType = res.data.taskType + ''
        } else {
          Message.error('保存成功')
        }
      })
    },
    saveWarning() {
      const { taskName, score, points, isValid, taskType, id } = this.dataQuery
      if (this.dataQuery.validStart) {
        var validStart = format(this.dataQuery.validStart, '$1-$2-$3')
      }
      updateTaskRewardConfigById({ taskName, score, points, isValid, validStart, taskType, id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
          this.$router.go(-1)
        } else {
          Message.error(res.msg)
        }
      })
    },
    cancelWarning() {
      this.$router.go(-1)
    }
  },
  components: {
    [cDialog.name]: cDialog,
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .content-manage-item
    width 500px
  .warning-wapper
    width 400px
    margin 0 auto
    padding-top 20px
    overflow hidden
    padding-bottom 40px
    li
      float left
      font-size 12px
      margin-bottom 10px
      width 100%
      &:last-child
        text-align center
      .unit
        display inline-block
        padding 0 10px
        margin-left -3px
        background #dcdfe6
        color #333
        height 28px
        line-height 28px
        border-top-right-radius 3px
        border-bottom-right-radius 3px

      .choose
        &:before
          content '*'
          color red
          padding-right 4px
      &>span
        float left
        margin-right 6px
        width 90px
        height 30px
        line-height 30px
        font-size 12px
        text-align right

</style>
