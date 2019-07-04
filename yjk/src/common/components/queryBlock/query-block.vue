<!-- name： 查询框组件 -->
<!-- createBy: lhz -->
<!-- createTime: 2019-04-29 -->
<!-- 此组件依赖于element-ui，使用前请确保项目中安装了element-ui -->
<!-- 参数介绍：
[Array]queryList
queryList:
[
    {
        label: '用户ID',
        placeholder: '输入用户ID',
        type: 'input',
        clearable: true, // 是否可清空
        key: 'userId', // 想要绑定的参数名，注意需要唯一
        modelVal: '', // 绑定的默认值，如果type=select，则必须有此参数
        size: 'mini',
        maxlength: 10 // 最大长度
    },
    {
        label: '用户名称',
        placeholder: '输入用户名称',
        type: 'input',
        clearable: true,
        key: 'userName',
        modelVal: '',
        size: 'mini',
        maxlength: 10
    },
    {
        label: '状态',
        placeholder: '请选择',
        type: 'select',
        key: 'state',
        modelVal: '',
        optionsList: [
            {
                label: '全部',
                value: ''
            },
            {
                label: '通过',
                value: 1
            },
            {
                label: '不通过',
                value: 2
            }
        ]
    }
]
 -->
<template>
    <div class="query-block">
        <div class="header-item" v-for="(item, index) in useQueryList" :key="index">
            <span class="label">{{item.label}} ：</span>
            <div class="input-item" v-if="item.type==='input'">
                <el-input
                    v-model="item.modelVal"
                    @input="changeInputVal($event,item.key)"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :size="item.size"
                    :maxlength="item.maxlength" ></el-input>
            </div>
            <div class="input-item" v-if="item.type==='select'">
                <el-select
                    :placeholder="item.placeholder"
                    v-model="item.modelVal"
                    @input="changeInputVal($event,item.key)">
                    <el-option
                        v-for="child in item.optionsList"
                        :key="child.value"
                        :label="child.label"
                        :value="child.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="header-select-btn">
            <el-button size="small" type="primary" @click="queryBtn">查询</el-button>
            <el-button size="small" type="primary" @click="resetBtn">重置</el-button>
        </div>
    </div>
</template>

<script>
import {
  Input, Button, Select, Option
} from 'element-ui'
export default {
    props: ['queryList'],
    data (){
        return {
            useQueryList: [],
            dataObj: {}
        }
    },
    methods: {
        queryBtn(){
            this.$emit('query', this.dataObj)
        },
        resetBtn(){
            for (var item in this.dataObj){
                this.dataObj[item] = ''
            }
            for (var i = 0; i < this.useQueryList.length; i++){
                this.useQueryList[i].modelVal = ''
            }
            this.$emit('reset', this.dataObj)
        },
        changeInputVal(value, key){
            this.dataObj[key] = value
        }
    },
    components: {
        [Input.name]: Input,
        [Button.name]: Button,
        [Select.name]: Select,
        [Option.name]: Option
    },
    created (){
        this.useQueryList = this.queryList
        // 将默认值全部传入dataObj
        this.queryList.forEach(item => {
            this.dataObj[item.key] = item.modelVal || ''
        })
    }
}
</script>

<style lang="scss">
.query-block{
    width: calc(96% - 2px);
    padding: 15px 2% 0;
    font-size: 12px;
    border: 1px solid #dedede;
    .header-item{
        padding-right: 1%;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        .label{
            width: 65px;
            text-align: right;
            display: inline-block;
        }
        >.input-item{
            display: inline-block;
            input{
                width: 200px;
                height: 30px;
            }
        }
    }
    .header-select-btn{
        text-align: center;
        margin: 10px 0;
        button{
            vertical-align: middle;
        }
    }
}
</style>
