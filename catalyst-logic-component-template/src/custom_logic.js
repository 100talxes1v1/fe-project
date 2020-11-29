export default {
  name: 'catalyst_logic_<%=name%>',
  // props中的属性由开发者自己定义，没有强制要求，只是不要与框架提供的配置项重名，另外命名要求小驼峰命名
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  inject: {
    // 注入的方法$mpGetOptions,通过optionsId属性来获取配置中的options_id字段的数据
    $mpGetOptions: {
      default: () => null
    },
    // 注入的方法$mpDoAjaxAction,可以用来发送ajax请求来获取数据，在下面methods中的sendAjax方法中会为你演示如何调用
    $mpDoAjaxAction: {
      default: () => null
    }
  },
  // 自定义逻辑组件需要实现onRun钩子，该钩子有两个参数，第一个参数是逻辑链条中上一步的结果，第二个参数是继续下一步逻辑流程的触发器
  onRun(prevResult, next) {
    /**
     * prevResult 是逻辑链条中上一步的结果
     * next() 方法继续下一步逻辑
     * **/
    console.log(prevResult);
    next();
  },
  mounted() {
    // 在渲染完成达到可用状态时必须触发catalystReady事件，用来通知catalyst框架该自定义组件已经初始化完，请务必在你的组件达到可用时触发此事件！
    this.$emit('catalystReady');
  },
  methods: {
    // $mpDoAjaxAction方法调用示例
    async sendAjax() {
      /**
       * $mpDoAjaxAction接受三个参数
       * 第一个参数是要请求的uri （String类型）
       * 第二个参数是请求方式 post 或 get (String类型)
       * 第三个参数是要发送的数据
       * **/
      let res = await this.$mpDoAjaxAction('/api/a', 'post', {data: 'data'})
    }
  },
  render() {}
};