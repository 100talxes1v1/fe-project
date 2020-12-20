# Git Commit Message 格式

```javascript
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

ex: feat(component): 新加弹框组件

### type: 提交的类型

- feat: 新加功能或者业务逻辑
- fix: 修复bug
- docs: 文档修改
- style: 无意义代码格式修改，如空格空行标点符号等
- refactory: 代码重构
- perf: 能提高性能的代码或者配置修改
- test: 添加缺失测试或更正现有测试
- chore: 其他修改, 比如构建流程, 依赖管理

### scope: commit 影响的范围, 比如: route, page,component, utils, build 等

### subject: commit 的概述,建议符合[50/72 formatting]("https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html")

### body: commit 具体修改内容,可以分为多行,建议符合[50/72 formatting]("https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html")

### footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接
