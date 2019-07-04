<template>
  <div class="listener-page">
    <query-block :queryList="queryList" @query="queryHandler" @reset="resetHandler"></query-block>
  </div>
</template>

<script type="text/ecmascript-6">

import queryBlock from '@/common/components/queryBlock/query-block.vue'

export default {
  data() {
    return {
      queryList: [
        {
          label: '用户ID',
          placeholder: '输入用户ID',
          type: 'input',
          clearable: true, // 是否可清空
          key: 'userId', // 想要绑定的参数名，注意需要唯一
          modelVal: '111', // 绑定的默认值，如果type=select，则必须有此参数
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
          label: '用户名称',
          placeholder: '输入用户名称',
          type: 'input',
          clearable: true,
          key: 'userName1',
          modelVal: '',
          size: 'mini',
          maxlength: 10
        },
        {
          label: '用户名称',
          placeholder: '输入用户名称',
          type: 'input',
          clearable: true,
          key: 'userName2',
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
    }
  },
  created() {
  },
  methods: {
    queryHandler(queryObj){
      console.log(queryObj)
    },
    resetHandler(){
      console.log('我进行了重置')
    }
  },
  watch: {
  },
  components: {
    'query-block': queryBlock
  }
}
</script>
