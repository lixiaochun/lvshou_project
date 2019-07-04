<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>兑换规则设置</span></p>
    <div class="exchange-wapper">
      <p>规则设置</p>
      <div class="rules-content">
        <p>魅力分兑换机制设置</p>
        <div class="rules-set">
            <ul>
              <li>
                <strong></strong>
                <label class="consumption">每消费：</label>
                <div>
                  <el-input size="mini" v-model="rmb.value" class="input-border-radius" style="width: 100px" ></el-input>
                  <span class="unit">元</span>
                  <span class="integral">获取1魅力分</span>
                </div>
              </li>
              <li>
                <strong></strong>
                <label class="consumption">每获得1魅力分：</label>
                <div>
                  <el-input size="mini" v-model="score.value" class="input-border-radius" style="width: 100px"></el-input>
                  <span class="unit">魅力值</span>
                  <span class="conversion">魅力分与魅力值的转换比例</span>
                </div>
              </li>
              <li>
                <!--<strong></strong>-->
                <!--<label class="consumption">每1魅力分：</label>-->
                <!--<div>-->
                  <!--<el-input size="mini" v-model="code" class="input-border-radius" style="width: 100px"></el-input>-->
                  <!--<span class="unit">个壹豆</span>-->
                  <!--<span class="conversion">壹豆与魅力分的转换比例</span>-->
                <!--</div>-->
              </li>
            </ul>
        </div>
      </div>
      <!--<div class="rules-content">-->
        <!--<p>充值提现兑换机制设置</p>-->
        <!--<div class="rules-set">-->
          <!--<ul>-->
            <!--<li>-->
              <!--<strong>充值：</strong>-->
              <!--<label class="consumption">每充值1元可兑换：</label>-->
              <!--<div>-->
                <!--<el-input size="mini" class="input-border-radius" style="width: 100px"></el-input>-->
                <!--<span class="unit">个</span>-->
                <!--<span class="bean">壹豆</span>-->
                <!--<span class="conversion">充值比例</span>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<strong>提现：</strong>-->
              <!--<label class="consumption">每提现1元需扣：</label>-->
              <!--<div>-->
                <!--<el-input size="mini" class="input-border-radius" style="width: 100px"></el-input>-->
                <!--<span class="unit">个</span>-->
                <!--<span class="bean">壹豆</span>-->
                <!--<span class="conversion">提现比例（扣除平台与税率）</span>-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->

        <div class="submit">
          <el-button size="mini" type="primary" @click="submit">提交</el-button>
        </div>
      <!--</div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, Pagination, TableColumn, Switch, Message } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { systemParamsUpdate, systemParamsGetList } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      rmb: {
        code: 'rmb',
        type: 'points_exchange',
        value: ''
      },
      score: {
        code: 'score',
        type: 'points_exchange',
        value: ''
      }
    }
  },
  created() {
    this._systemParamsGetList()
  },
  methods: {
    submit() {
      const { rmb, score } = this
      systemParamsUpdate([rmb, score]).then(res => {
        console.log([rmb, score])
        if (res.code === ERR_SUCCESS) {
          this.dataQuery = res.data
          Message.success('保存成功')
        } else {
          Message.error('保存失败')
        }
      })
    },
    _systemParamsGetList() {
      systemParamsGetList().then(res => {
        if (res.code === ERR_SUCCESS) {
          const list = res.data.list
          list.forEach(item => {
            if (item.code === 'rmb') {
              this.rmb = item
            } else if (item.code === 'score') {
              this.score = item
            }
          })
        } else {
          Message.error('加载失败')
        }
      })
    }
  },
  components: {
    [Switch.name]: Switch,
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .tag-manage-wrapper
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
  .exchange-wapper
    margin  0 15px
    border 1px solid #f2f2f2
    margin-top 20px
    &>p
      height 40px
      line-height 40px
      background #f2f2f2
      padding-left 20px
  .rules-content
    &>p
      margin-left 20px
      height 40px
      line-height 40px
  .rules-set
    margin 20px
    margin-top 0
    padding 20px
    border 1px solid #f2f2f2
    padding-top 60px
    overflow: hidden
    li
      float left
      margin-bottom 10px
      height 30px
      line-height 30px
      font-size 12px
      width 100%
      .consumption
        width 120px
        float left
        text-align right
      .unit
        display inline-block
        padding 0 10px
        margin-left -3px
        background #dcdfe6
        color #333
        height 28px
        line-height 28px
      strong
        float left
        display inline-block
        width 36px
        height 30px
        color #539df9
      .conversion
        color #a7a7a7
        margin-left 60px
      &>div
        margin-left 120px
    ul
      float left
      margin 0 auto
      margin-left 120px
  .submit
    margin-top 80px
    margin-bottom 50px
    text-align center
</style>
