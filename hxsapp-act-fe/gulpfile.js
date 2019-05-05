/**
 * @desc 多页面项目的gulp操作
 * @author Ocean(chenweiliang@lvshou.com)
 */
const gulp = require('gulp')
const lvShouConfig = require('./config/lvshou-config')

// 注册task
require('./build/LvShou-tasks')(gulp, lvShouConfig)