<template>
  <catalyst-page
    :page-title="pageTitle"
    :business-config="businessConfig"
    :initiate-model="initModel"
    @dialogShow="handleDialogShow"
    @dockerShow="handleDockerShow"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #dialog>
      <!--页面如果有弹出居中弹层的交互，则此slot配置居中弹层的内容-->
      <div v-if="!!dialogArg">
        <router-content
          :uri="dialogArg.uri"
          @confirm="dialogArg.success($event);"
          @cancel="dialogArg.fail($event);"
        />
      </div>
    </template>
    <template #docker>
      <!--页面如果有右侧滑出浮层的交互，则此slot配置右滑浮层的内容-->
      <div v-if="!!dockerArg">
        <router-content
          :uri="dockerArg.uri"
          @confirm="dockerArg.success($event);"
          @cancel="dockerArg.fail($event);"
        />
      </div>
    </template>
  </catalyst-page>
</template>

<script>
import routerContent from '../router/router_content';
import pageConfig from '../../../test/catalyst/demo';

export default {
  name: 'CatalystTemplatePage',
  components: {
    routerContent
  },
  data() {
    return {
      businessType: '',
      pageTitle: '',// 页面标题
      businessConfig: null,// 页面配置模版数据，json格式
      initModel: {},// 页面初始数据对象
      dialogArg: null,
      dockerArg: null
    };
  },

  inject: {
    renderTab: {
      default: () => null
    }
  },
  provide() {
    return {
      $mpMatchKeyword: this.mpMatchKeyword,
      $mpDoAjaxAction: this.mpDoAjaxAction,
      $mpGetOptions: this.mpGetOptions
    };
  },
  mounted() {
    this.init(this.$mpRoute).catch(error => {
      this.$message.error(error.message);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to).then(() => {
      next();
    }).catch(error => {
      this.$message.error(error.message);
    });
  },
  methods: {
    async init(route) {
      // 清空缓存的options数据
      this.initModel = Object.assign({}, route.query);

      this.businessConfig = pageConfig;
    },
    async mpMatchKeyword(uri, params) {
      // console.log(params,111);
      let res = await this.$api.postDefault(uri, params);
      if (res.error_code === 0 && res.result.list) {
        let matchedData = res.result.list.map((item,index) => {
          return {
            'value': item.name,
            'id': item.id || index
          };
        });
        return matchedData;
      } else {
        return [];
      }
    },
    async mpGetOptions(optionsId) {
      // let result = await getOptions(optionsId);
      return [{
        value: 'option',
        label: 'option'
      }];
    },
    async mpDoAjaxAction(uri, method, params) {
      // let res = null;
      // if (method === 'get') {
      //   res = await this.$api.getDefault(uri, params);
      // } else {
      //   res = await this.$api.postDefault(uri, params);
      // }
      // if (res.error_code === 0) {
      //   return res.result;
      // } else {
      //   throw new Error(`Catalyst mpDoAjaxAction server error:${res.message}`);
      // }
    },
    handleDialogShow(arg) {
      // this.dialogArg = Object.assign({}, arg, { uri: urlHelper.addParameter(arg.params, arg.uri) });
    },
    handleDockerShow(arg) {
      // this.dockerArg = Object.assign({}, arg, { uri: urlHelper.addParameter(arg.params, arg.uri) });
    },
    handleConfirm(arg) {
      try {
        this.$emit('confirm', arg.params);
        arg.success();
      } catch (error) {
        arg.fail(error);
      }
    },
    handleCancel(arg) {
      try {
        this.$emit('cancel', arg.params);
        arg.success();
      } catch (error) {
        arg.fail(error);
      }
    }
  }
};
</script>
