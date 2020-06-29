<template>
  <div>
    <span>{{ oLabel }}</span>
    <input
      :value="value"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: "catalyst_form_<%=libraryName%>",
  props: {
    // 自定义表单组件必须定义value属性，需要实现双向绑定。value属性用来传递页面配置数据中的key_name绑定字段的值。value类型可以任意定义，如果key_name字段配置了多个绑定字段，则value定义成数组，一一对应返回数据
    value: {
      type: String,
      default: null
    },
    // 其它属性由开发者自己定义，没有强制要求，只是不要与框架提供的配置项重名，另外命名要求小驼峰命名
    oLabel: {
      type: String,
      default: ''
    }
  },
  inject: {
    // 注入的方法$mpGetOptions,通过optionsId属性来获取配置中的options_id字段的数据
    $mpGetOptions: {
      default: () => null
    }
  },
  mounted() {
    // 在渲染完成达到可用状态时必须触发catalystReady事件，用来通知catalyst框架该自定义组件已经初始化完成
    this.$emit('catalystReady');
    this.init();
  },
  methods: {
    // options机制(可选) 有的组件(下拉框、复选框)需要展示一些备选项，往往这些备选项是通用的数据。因此，如果组件通过optionsId属性来获取备选项组的数据，需要调用注入的方法$mpGetOptions来获取。当然，自定义组件也可以不采用这个机制，而是内部通过自己的逻辑来获取备选项列表
    async init() {
      if (this.$mpGetOptions) {
        let options = await this.$mpGetOptions(this.optionsId); // eslint-disable-line
      }
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>

<style>

</style>