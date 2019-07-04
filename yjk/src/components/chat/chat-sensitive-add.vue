<template>
  <c-dialog :title="title" @close="goBack">
    <div class="content-manage-item">
      <ul class="warning-wapper">
        <li>
          <span class="choose">敏感字/词：</span>
          <div>
            <p><el-input type="textarea" size="mini" v-model="word" style="width: 282px"  :maxlength="10"></el-input></p>
            <p class="list-input-tip">长度不能超过10个汉字</p>
          </div>
        </li>
        <li>
          <span class="choose">类型：</span>
          <div>
            <p>
              <el-select v-model="type" size="mini" style="width: 282px" placeholder="请选择">
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
          <span>描述：</span>
          <div>
            <p><el-input type="textarea" size="mini" v-model="remark" class="input-border-radius" style="width: 282px" :maxlength="30"></el-input></p>
            <p class="list-input-tip">长度不能超过30个字</p>
          </div>
        </li>
        <li>
        <li>
          <el-button type="primary" size="mini" style="width: 60px" @click="handleSave" >确定</el-button>
        </li>
      </ul>
    </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Input, Select, Option, Message, Button } from 'element-ui'
import { isNull } from 'common/js/util'
import cDialog from 'base/c-dialog/c-dialog'
import { addSensitiveWord, getSensitiveWordList } from 'api/imRptConsult'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      remark: '',
      word: '',
      title: '新增敏感字/词',
      desc: '',
      sensitiveWord: '',
      wordList: [],
      type: '',
      options: [{
        value: '0',
        label: '禁发'
      }, {
        value: '1',
        label: '提醒'
      }]
    }
  },
  created() {
    this._getWordList()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    _getWordList() {
      getSensitiveWordList({ pageSize: 10000 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const dataList = res.data.dataList
          this.wordList = dataList.map(item => item.word)
        } else {
          Message.error(res.msg)
        }
      })
    },
    handleSave() {
      const { type, word, remark } = this
      if (isNull(word)) {
        return Message.error('敏感字不能为空！')
      }
      if (this.wordList.includes(word)) {
        return Message.error('敏感字重复，请重新输入')
      }
      if (isNull(type)) {
        return Message.error('请选择分类！')
      }
      addSensitiveWord({ type, word, remark }).then((res) => {
        if (res.code === ERR_SUCCESS) {
          Message.success('增加成功')
          this.goBack()
        }
      }).catch((err) => {
        Message.error(err)
      })
    }
  },
  components: {
    [cDialog.name]: cDialog,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
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
      .list-input-tip
        margin-left 100px
        line-height 20px
        color #999
        font-size $font-size-sm

</style>
