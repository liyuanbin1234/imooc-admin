module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': ['off'], // any 使用【关闭】
    'vue/multi-word-component-names': 'off', // 组件名称为多单词【关闭】
    'space-before-function-paren': 'off', // 函数名称 或 function关键字 与开始参数之间缺少空格（或多出空格）【关闭】
    quotes: 'warn' // 双引号使用【警告】
  }
}
