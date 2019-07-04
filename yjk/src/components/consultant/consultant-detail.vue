<template>
  <div class="consultantDetail">
    <p class="information">
      <span>个人资料</span>
    </p>
    <div class="tag-wrapper">
      <tag-table title="入驻资料">
        <div class="userInfo">
          <div class="userInfo-form-item" style="border-top:1px solid #dcdcdc">
            <span class="label" style="border-left:1px solid #dcdcdc">姓名：</span>
            <span class="text">{{entryMap.name||'—'}}</span>
          </div>
          <div class="userInfo-form-item" style="border-top:1px solid #dcdcdc">
            <span class="label">性别：</span>
            <span class="text">{{formatSex(entryMap.gender)||'—'}}</span>
          </div>
          <div class="userInfo-form-item" style="border-top:1px solid #dcdcdc">
            <span class="label">出生年月：</span>
            <span class="text">{{entryMap.birthDate||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label" style="border-left:1px solid #dcdcdc">联系电话：</span>
            <span class="text">{{entryMap.mobile||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label">微信：</span>
            <span class="text">{{entryMap.wechat||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label">职业：</span>
            <span class="text">{{entryMap.career||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label" style="border-left:1px solid #dcdcdc">教育：</span>
            <span class="text">{{entryMap.educationLevel||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label">家庭状况：</span>
            <span class="text">{{entryMap.marriageInfo||'—'}}</span>
          </div>
          <div class="userInfo-form-item">
            <span class="label"></span>
            <span class="text"></span>
          </div>
          <div class="userInfo-item">
            <span class="car">个人简介：</span>
            <span class="myinfo">{{entryMap.information||'—'}}</span>
          </div>
          <div class="userInfo-item">
            <span class="car">其它证明：</span>
            <span class="myinfo">{{entryMap.slideshow||'—'}}</span>
          </div>
          <div class="userInfo-item">
            <span class="car">身份证：</span>
            <div class="idcardNo">
              <div >真实姓名：-</div>
              <div>身份证号码：{{entryMap.idcardNo||'—'}}</div>
            </div>
            <viewer :images="images" class="imgBox">
              <!-- <img v-for="src in images" :src="src" :key="src" width="300"> -->
              <img
                :class="{'active':isChoose}"
                width="100px;height:44px"
                v-if="entryMap && entryMap.idFrontUrl"
                :src="entryMap.idFrontUrl"
                alt="身份证正面"
              >
              <img
                :class="{'active':isChoose}"
                width="100px;height:44px"
                v-if="entryMap && entryMap.idBackUrl"
                :src="entryMap.idBackUrl"
                alt="身份证背面"
              >
              <!-- <img :src="info.portraitUrl" alt="" :class="{'active':isChoose}"
                width="100px;height:44px">
                <img :src="info.portraitUrl" alt="" :class="{'active':isChoose}"
                width="100px;height:44px"> -->
            </viewer>
          </div>
        </div>
      </tag-table>
    </div>
    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="账户信息">
        <el-row class="table-row-title">
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col1">用户ID</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col2">BRM账号</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col3">手机号码</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col4">入驻时间</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="6">
            <div class="grid-content bg-white col1">{{info.id||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2">{{entryMap.code||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col3">{{entryMap.mobile||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4">{{entryMap.updateTime||'—'}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>
    <!-- <div class="tag-wrapper">
        <tag-table title="从业数据">
          <el-table style="width: 100%;" size="mini">
            <el-table-column label="已服务人数"  prop="orderCount" align="center">
              <template slot-scope="scope">
                <span class="statistics-text">5555555555</span>
              </template>
            </el-table-column>
            <el-table-column label="从业年限"  prop="money" align="center">
              <template slot-scope="scope">
                <span class="statistics-text">25</span>
              </template>
            </el-table-column>
            <el-table-column label="粉丝"  align="center">
              <template slot-scope="scope">
                <span class="statistics-text">88888888888</span>
              </template>
            </el-table-column>
            <el-table-column label="好评率"  prop="levelScore" align="center">
              <template slot-scope="scope">
                <span class="statistics-text">6666666666</span>
              </template>
            </el-table-column>
          </el-table>
        </tag-table>
    </div>-->
    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="从业数据">
        <el-row class="table-row-title">
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col1">已服务人数</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col2">从业年限</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col3">粉丝</div>
          </el-col>
          <el-col :span="6" class="table-col-title">
            <div class="grid-content bg-white col4">好评率</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="6">
            <div class="grid-content bg-white col1">{{info.serviceNum||info.serviceNum===0?info.serviceNum:'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2">{{info.workingYears||'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col3">{{info.funs||info.funs===0?info.funs:'—'}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4">{{info.favorRate||'—'}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>
    <!-- <div class="tag-wrapper">
        <tag-table title="个人主页资料">
          <el-form  label-width="100px">
            <el-form-item label="头像:">
            <img style="width:100px">
            </el-form-item>
            <el-form-item label="主页背景:">
              <img style="width:200px" >
            </el-form-item>
            <el-form-item label="昵称:">
              个人资料
            </el-form-item>
            <el-form-item label="性别:" prop="age">
              个人资料
            </el-form-item>
            <el-form-item label="从业年限:">
              个人资料
            </el-form-item>
            <el-form-item label="标签展示:">
              <ul>
                <li>
                  个人资料
                </li>
                <li>
                  个人标签
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="个人简介:">
              个人资料个人资料个人资料个人资料个人资料个人资料
            </el-form-item>
          </el-form>
        </tag-table>
    </div>-->
    <div class="tag-wrapper personal-data" v-show="!fullLoading">
      <tag-table title="个人主页资料">
        <div class="wrap">
          <div class="title">头像：</div>
          <div class="content" v-if="info.portraitUrl">
            <img :src="info.portraitUrl" alt="">
          </div>
          <div v-else style="text-indent: 30px;">—</div>
        </div>
        <div class="wrap">
          <div class="title">主页背景：</div>
          <div class="content"  v-if="imgList&&imgList.length>0">
            <!-- <img :src="info.bgiUrl" alt="" style="width :250px;height :250px;"> -->
            <img  alt="" v-for="(myimg,index) in imgList" :key="index" :src="myimg" style="width :200px;height :200px;border: 5px solid #ccc;">
          </div>
          <div v-else style="text-indent: 30px;">—</div>
        </div>
        <div class="wrap">
          <div class="title">昵称：</div>
          <div class="content">{{info.nickname||'—'}}</div>
        </div>
        <div class="wrap">
          <div class="title">性别：</div>
          <div class="content">{{info.sex==1?'女':'男'}}</div>
        </div>
        <div class="wrap">
          <div class="title">年龄：</div>
          <div class="content">{{info.age}}</div>
        </div>
        <div class="wrap">
          <div class="title">城市：</div>
          <div class="content">{{info.city||'—'}}</div>
        </div>
        <div class="wrap">
          <div class="title">从业年限：</div>
          <div class="content">{{info.workingYears||'—'}}</div>
        </div>
        <div class="wrap">
          <div class="title">签名：</div>
          <div class="content">{{info.signature||'—'}}</div>
        </div>
        <div class="wrap">
          <div class="title" style="margin-top: 8px;margin-right: 30px;">标签展示：</div>
          <ul v-if="tagList&&tagList.length>0">
         <li v-for="(tag, index) in tagList" :key="index">
           {{tag}}
         </li>
       </ul>
       <div v-else style="margin-top: 8px;">—</div>
        </div>
        <div class="wrap">
          <div class="title">个人简介：</div>
          <div class="content">
            {{info.information||'—'}}
          </div>
        </div>
      </tag-table>
    </div>
    <el-button type="primary" style="    margin-left: 500px;
    display: block;" @click="back">返回</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
import {
  Table,
  TableColumn,
  Form,
  FormItem,
  MessageBox,
  Button,
  Input,
  Row,
  Col,
  Tag
} from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import tagTable from 'base/tag-table/tag-table'
import { getPlfConsultDetail } from 'api/consultant'
export default {
  data() {
    return {
      id: '',
      isChoose: false,
      pageNum: 1,
      index: 1,
      fullLoading: false,
      entryMap: {}, // 入住信息
      tagList: [], // 标签展示数组
      imgList: [], // 图片数组
      info: {}, // 个人资料
      images: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.pageNum = this.$route.query.pageNum
    // 初始化
    this.query()
  },
  methods: {
    query() {
      this._getList()
    },
    // 获取列表
    _getList() {
      console.log(this.id, this.pageNum)
      getPlfConsultDetail({ id: this.id }).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          console.log(data)
          // this.tagList = data.info.tags.split(',')
          if (!data.info.tags) {
            this.tagList = []
          } else {
            this.tagList = data.info.tags.split(',')
          }
          if (!data.bgiUrl) {
            this.imgList = []
          } else {
            this.imgList = data.bgiUrl.split(',')
          }
          console.log(this.imgList)
          // console.log(Boolean(this.tagList && this.tagList.length > 1))
          this.entryMap = data.entryMap
          this.info = data.info
        }
      })
    },
    // 返回上一页
    back(){
       this.$router.push(
        {
          path: 'consultantList',
          query: { pageNum: this.pageNum }}
      )
    },
    // 处理性别
    formatSex(num) {
      switch (num) {
        case 1:
          return '男'
        case 2:
          return '女'
        case 0:
          return '未知'
      }
    }
  },
  components: {
    [Table.name]: Table,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [MessageBox.name]: MessageBox,
    [Table.name]: Table,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Input.name]: Input,
    tagTable
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';

.consultantDetail {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0;
  overflow-y: auto;
  inline-block-top();

  .information {
    height: 10px;
    line-height: 37px;

    span {
      position: relative;
      margin-left: 8px;
      padding-left: 10px;
      color: #4897f9;
      font-size: 16px;
    }
  }

  li {
    display: inline-block;
    border: 1px solid #e2d9d9;
    // width: 73px;
    height: 36px;
    line-height: 36px;
    margin-left: 5px;
    text-align: center;
    border-radius: 7px;
  }
  li:nth-child(1){
    margin-left: 0;
  }

  .userInfo {
    height: 300px;

    .userInfo-form-item {
      width: 33.2%;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      color: black;
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

    .userInfo-item {
      width: 99.6%;
      height: 60px;
      line-height: 60px;
      border-right: 1px solid #dcdcdc;
      border-left: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      color: black;
      box-sizing: border-box;
      display: flex;
      .idcardNo{
        width :259px;
      }
      span.car {
        font-size: 12px;
        display: block;
        width: 90px;
        border-right: 1px solid #dcdcdc;
        text-align: right;
      }
      span.myinfo{
        font-size 12px
      }
      div {
        // width 230px
        // display flex
        // flex-direction column
        // justify-content center
        // margin: 0 100px 0 10px;

        div {
          font-size: 12px;
          height: 30px;
          line-height: 30px;
        }
      }
    }

    .imgBox {
      width: 300px;

      img {
        display: inline-block;
        height: 60px;
        margin-left: 50px;
      }
    }
  }

  .adviserIngo {
    height: 600px;
    overflow-y: scroll;

    span {
      font-size: 10px;
      color: #ccc;
    }

    li {
      display: inline-block;
      border: 1px solid #e2d9d9;
      width: 73px;
      height: 36px;
      margin-left: 5px;
      text-align: center;
      border-radius: 7px;
    }
  }

  .tag-wrapper {
    margin: 15px 15px 0 15px;
  }
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }

  &.row-title {
    .el-col {
      .grid-content {
        min-height: 105px;
        line-height: 105px;
      }
    }
  }

  &.row-content {
    .el-col {
      .grid-content {
        border-top: none;
      }
    }
  }

  &.table-row-title {
    .el-col {
      .grid-content {
        text-align: center;
      }
    }
  }

  &.table-row-content {
    .el-col {
      .grid-content {
        text-align: center;
        min-height: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
        border-top: none;
      }
    }
  }

  &.five-share {
    .el-col {
      width: 20%;
    }
  }

  .table-col-title {
    .grid-content {
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

    .custom-right, .table-col-title {
      text-align: right;
    }

    .custom-center {
      text-align: center;
    }

    .custom-left, .table-content {
      text-align: left;
    }

    .table-content {
      text-indent: 15px;
    }
  }
}

.personal-data {
  margin-bottom: 150px;
}

.tag-wrapper {
  margin: 0 15px 35px;

  .wrap {
    overflow: hidden;
    margin-bottom: 20px;
    font-size: 14px;

    >div {
      display: inline-block;
      float: left;
    }

    .title {
      width: 80px;
      height: 20px;
      line-height: 20px;
      font-weight: bold;
      background-color: #fff;
      text-align: left;
    }

    .content {
      min-height: 20px;
      line-height: 20px;
      width: calc(100% - 80px);
      text-indent: 30px;

      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}

@keyframes fangda {
  0% {
    width: 100px;
    height: 44px;
  }

  100% {
    width: 300px;
    height: 400px;
  }
}
</style>
