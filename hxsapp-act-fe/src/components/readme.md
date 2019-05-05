# 编写公用组件的注意事项
1, 组件的name 属性 必须填写 且 name 是唯一的 eq: name: 'testHeaders'

2, 统一通过 index.js 暴露给全局 命名最好和name的一致

3, 本着公用组件的高复用的特性 一切自定义的设置都不可定义在公用组件中

## 这些公共组件 都用是通过Vue.component() 统一注册到全局的 可以直接使用 不必要再次引入组件了
