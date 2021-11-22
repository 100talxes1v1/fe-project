export function getAppVersion() {
  var version = (new Date()).getTime();
  // TODO: 实现自己的应用版本号管理机制，保证每次构建生成唯一版本号，默认是取当前时间戳
  return version;
}
