<template>
  <div class="member-info-wrapper">

    <div class="tag-wrapper">
      <tag-table title="基本资料">
        <!-- 头像栏 -->
        <el-row class="row-title">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 custom-right">头像：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 custom-center">
              <div class="custom-info">
                <div class="custom-info-sculpture" style="transform: translateY(10px);">
                  <img :src="custom.portraitUrl" alt>
                </div>
                <!-- <span class="custom-info-text">{{custom.name}}</span>
                <span class="custom-info-text">{{custom.brmid}}</span> -->
                <!-- <span class="custom-info-text">
                  <el-button type="text" icon="el-icon-edit" size="mini" @click="edit">编辑资料</el-button>
                </span> -->
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-white col3"></div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">会员等级：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{formatLevel(custom.levelSequence)||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">称号：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{custom.levelName||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">昵称：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{custom.nickName||'—'}}
            </div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper">
      <tag-table title="健康资料">
        <el-row>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">症状：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{custom.symptomType||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">会员类型：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{custom.userType||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">姓名：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{custom.name||'—'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">性别：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{formatSex(custom.gender)}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">身高：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{custom.height}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">体重：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{custom.weight}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">出生日期：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{custom.birthDate||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">职业：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{custom.career||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">城市：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{custom.area||'—'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">文化程度：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{custom.educationLevel||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">婚姻：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{custom.marriageInfo||'—'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">身份证：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{custom.idcardNo||'—'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">健康史：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-white col2 table-content">
              {{custom.examResult||'—'}}
            </div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper">
      <tag-table title="账户信息">
        <el-row class="table-row-title">
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col1">用户ID</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col2">手机号码</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col3">注册时间</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col4">来源</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="6">
            <div class="grid-content bg-white col1">{{custom.id||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2">{{custom.mobile||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col3">{{custom.createTime||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4">{{custom.isBrm ? 'BRM系统客户' : 'app用户'}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper">
      <tag-table title="账户数据">
        <el-row class="table-row-title">
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col1">订单数量</div>
          </el-col>
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col2">已签收订单</div>
          </el-col>
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col3">消费金额</div>
          </el-col>
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col4">魅力值</div>
          </el-col>
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col5">魅力分</div>
          </el-col>
          <el-col :span="4" class="table-col-title">
            <div class="grid-content bg-white col6">红包金额</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="4">
            <div class="grid-content bg-white col1 blue">{{orderList.orderCount}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-white col2 blue">{{orderList.hasSign}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-white col3 blue">￥{{orderList.money}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-white col4 orange">{{orderList.levelScore}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-white col5 green">{{orderList.levelPoints}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-white col6 green">{{orderList.redPackage}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper">
      <tag-table title="BRM信息">
        <el-row class="table-row-title five-share">
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col1">BRM客户编号</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col2">资料所属人</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col3">被授权人</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col4">分配时间</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col5">授权时间</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content five-share">
          <el-col :span="5">
            <div class="grid-content bg-white col1">{{custom.brmid||'—'}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col2">{{custom.belongMan||'—'}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col3">{{custom.authorizedMan||'—'}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col4">{{custom.allocateTime||'—'}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col5">{{custom.authorizedTime||'—'}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <!-- <div class="tag-wrapper">
      <tag-table title="收货地址">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="收货人姓名"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="region"
            label="所在地区"
            header-align="center"
            width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            header-align="center"
            label="详细地址">
          </el-table-column>
          <el-table-column
            prop="phone"
            header-align="center"
            label="联系方式">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="默认地址">
            <template slot-scope="scope">
              <el-switch
                v-model="tableData[scope.$index].switch">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </tag-table>
    </div> -->

    <div class="tag-wrapper">
      <tag-table title="收货地址">
        <el-table style="width: 100%;" :data="addressList" size="mini">
          <el-table-column label="收货人姓名" width="140" prop="receiver" align="center"></el-table-column>
          <el-table-column label="所在地区" prop="area" align="center"></el-table-column>
          <el-table-column label="详细地址" prop="address" align="center"></el-table-column>
          <el-table-column label="联系方式" width="140" prop="mobile" align="center"></el-table-column>
          <el-table-column label="默认地址" width="80" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @click.native.prevent="changeSwitch( addressList, scope.$index )"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </tag-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import {
  Button,
  Message,
  Table,
  TableColumn,
  Switch,
  Row,
  Col
} from 'element-ui'
import tagTable from 'base/tag-table/tag-table'
import { ERR_SUCCESS } from 'api/config'
// eslint-disable-next-line no-unused-vars
import { getAppUserById, updateAppUserDefaultAddress } from 'api/user'
import { genderFormat, formatCurrency, isNull } from 'common/js/util'

export default {
  data() {
    return {
      custom: {},
      orderList: {},
      statistics: [],
      addressList: [],
      tableData: [{
        name: '张大年',
        region: '广东省 广州市 天河区',
        address: '中山大道999号 A大楼 401',
        phone: '13588660009',
        switch: true
      }, {
        name: '张三仙',
        region: '广东省 广州市 天河区',
        address: '中山大道999号 A大楼 401',
        phone: '13588660009',
        switch: false
      }, {
        name: '张三丰',
        region: '广东省 广州市 天河区',
        address: '中山大道999号 A大楼 401',
        phone: '13588660009',
        switch: false
      }],
      switchVal: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      if (isNull(this.custom.portraitUrl)) {
        this.custom.portraitUrl = this.config.customPortraitUrl
      }
    })
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    init() {
      this.custom = {}
      const { i } = this.$route.query
      this._getAppUserById(i)
    },
    edit() {
      const { i } = this.$route.query
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/member/memberEdit', query: { i }})
    },
    formatBirth(str) {
      if (str) {
        return str.slice(0, 10)
      }
      return ''
    },
    _getAppUserById(id) {
      getAppUserById({ id }).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          const { order, appUser, addressList } = res.data
          this.custom = appUser
          this.orderList = order
          this.addressList = addressList
          this.addressListClone = addressList
          console.log(this.custom)
          console.log(this.addressListClone)
          const {
            orderCount,
            money,
            levelSequence,
            levelScore,
            levelPoints,
            ebean
          } = order
          this.statistics = [
            { orderCount, money, levelSequence, levelScore, levelPoints, ebean }
          ]
          if (isNull(this.custom.portraitUrl)) {
            this.custom.portraitUrl = this.config.customPortraitUrl
          }
        } else {
          Message.error(res.msg)
        }
      })
    },
    changeSwitch(addressList, index) {
      const { status, id } = addressList[index]
      const appUserId = this.custom.id
      updateAppUserDefaultAddress({ status, appUserId, addressId: id }).then(
        res => {
          if (res.code === ERR_SUCCESS) {
            let newAdd = []
            if (status === 1) {
              for (const add of addressList) {
                if (add.id === id) {
                  add.status = status
                } else {
                  add.status = 0
                }
                newAdd.push(add)
              }
            } else {
              newAdd = addressList
            }
            this.addressList = newAdd
            this.addressListClone = newAdd
            Message({
              message: '修改默认地址成功！',
              type: 'success'
            })
          } else {
            Message.error(res.msg)
            this.addressList = this.addressListClone
          }
        }
      )
    },
    _genderFormat(e) {
      return genderFormat(e)
    },
    _genderGender(e) {
      switch (e) {
        case 1:
          return 'brm客户'
        case 2:
          return 'app客户'
      }
    },
    _formSymptomType(e) {
      return e
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    formatLevel(level) {
      switch (level) {
        case 1:
          return 'VIP1'
        case 2:
          return 'VIP2'
        case 3:
          return 'VIP3'
        case 4:
          return 'VIP4'
        case 5:
          return 'VIP5'
      }
    },
    // 处理性别
    formatSex(num){
      switch (num) {
        case 1:
          return '男'
        case 2:
          return '女'
        default:
          return '未知'
      }
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/memberInfo') {
        this.init()
      }
    }
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Row.name]: Row,
    [Col.name]: Col,
    tagTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';

.member-info-wrapper {
  position: relative;
  width: 100%;
  font-size: 0;
  inline-block-top();

  .title {
    height: 60px;
    line-height: 60px;
    background: #f2f2f2;

    span {
      position: relative;
      margin-left: 8px;
      padding-left: 10px;
      color: #666;
      font-size: 16px;

      &:before {
        position: absolute;
        top: 2px;
        left: -2px;
        content: '';
        width: 2px;
        display: inline-block;
        height: 14px;
        background: #00bafa;
      }
    }
  }

  .member-custom {
    margin: 0 20px;
  }

  .custom-info {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .custom-form {
    margin-left: 200px;
    border-left: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
  }

  .custom-form-item {
    width: 33.2%;
    border-right: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    color: $color-text;
    box-sizing: border-box;
    inline-block-top();

    .label, .text {
      height: 40px;
      line-height: 40px;
      font-size: $font-size-sm;
    }

    .label {
      float: left;
      padding-right: 10px;
      width: 80px;
      text-align: right;
      border-right: 1px solid #dcdcdc;
      inline-block-top();
    }

    .text {
      display: block;
      margin-left: 100px;
      no-wrap();
    }
  }

  .custom-info-sculpture {
    position: relative;
    margin: 0 auto;
    width: 80px;
    height: 80px;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .custom-info-vip {
    position: absolute;
    top: 3%;
    right: 40px;
    color: #FF6347;
    font-size: $font-size-sm;
    font-weight: 500;
    text-align: center;
    z-index: 10;

    img {
      width: 95px;
      height: 95px;
    }
  }

  .custom-info-text {
    display: block;
    line-height: 16px;
    color: $color-text;
    font-size: $font-size-sm;
    text-align: center;
  }
}

.tag-wrapper {
  margin: 0 15px 35px;
}

.statistics-text {
  display: block;
  margin: 10px 0;
  font-size: $font-size-mg;
  font-weight: 500;

  &.blue {
    color: #3388FF;
  }

  &.orange {
    color: #FF6633;
  }

  &.greed {
    color: #1ABC9C;
  }
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
  &.row-title{
    .el-col{
      .grid-content{
        min-height: 105px;
        line-height: 105px;
      }
    }
  }
  &.row-content{
    .el-col{
      .grid-content{
        border-top: none;
      }
    }
  }
  &.table-row-title{
    .el-col{
      .grid-content{
        text-align: center;
      }
    }
  }
  &.table-row-content{
    .el-col{
      .grid-content{
        text-align: center;
        min-height: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
        border-top: none;
      }
      .blue{
        color: #38f;
        font-weight: bold;
        font-size: 20px;
      }
      .orange{
        color: #f63;
        font-weight: bold;
        font-size: 20px;
      }
      .green{
        color: #1abc9c;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
  &.five-share{
    .el-col{
      width: 20%;
    }
  }
  .table-col-title{
    .grid-content{
      background-color: #f2f2f2;
    }
  }
  .el-col {
    .grid-content {
      min-height: 40px;
      border: 1px solid #dcdcdc;
      border-radius: 0;
      font-size: 14px;
      line-height: 40px;
    }

    .col2, .col3, .col4, .col5, .col6 {
      border-left: none;
    }
    .custom-right,.table-col-title{
      text-align: right;
    }
    .custom-center{
      text-align: center;
    }
    .custom-left,.table-content{
      text-align: left;
    }
    .table-content{
      text-indent: 15px;
    }
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-white {
  background: #fff;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style lang="stylus" rel="stylesheet/stylus">
.el-table{
  .has-gutter{
    th.is-leaf{
      background-color: #f2f2f2;
      color: #333;
    }
  }
}
</style>
