import router, { contentRoutes } from './index';
// import { saTrack } from '../common/statistic';

export default {
  name: 'RouterContent',
  props: {
    uri: {
      type: String,
      default: ''
    }
  },
  computed: {
    matched() {
      let uri = this.uri;
      if (!uri) {
        uri = '/plus/not_found';
      }
      let components = router.getMatchedComponents(uri);
      if (!components || components.length === 0) {
        uri = '/plus/not_found';
        components = router.getMatchedComponents(uri);
      }
      let { route } = router.resolve(uri);
      let title = document.title;

      // TODO: 暂时屏蔽权限校验
      let comp = components[components.length - 1];
      return {
        component: comp,
        route,
        title
      };
    }
  },
  provide() {
    return {
      $isLoadByRouterContent() {
        return true;
      }
    };
  },
  render(createElement) {
    return createElement(this.matched.component, {
      on: {
        confirm: this.handleConfirm,
        cancel: this.handleCancel
      }
    });
  },
  watch: {
    uri() {
      // TODO: 虽然这么修改router-content内部组件的$mpRoute能够获取正确的路由了，但是router-content本身上的$mpRoute获取得还是不对，需要后续修复。出现此问题的场景是在一个页面上连续弹出两个及以上数量的dialog时会出现(每个dialog内部是用router-content加载的页面)
      this.destroyContentRoute();
      this.defineContentRoute();
      this.track();
    }
  },
  beforeMount() {
    this.defineContentRoute();
  },
  mounted() {
    this.track();
  },
  activated() {
    this.defineContentRoute();
    this.track();
  },
  beforeDestroy() {
    this.destroyContentRoute();
  },
  deactivated() {
    this.destroyContentRoute();
  },
  methods: {
    defineContentRoute() {
      contentRoutes.unshift(this.matched.route);
    },
    destroyContentRoute() {
      contentRoutes.shift();
    },
    handleConfirm(...params) {
      this.$emit('confirm', ...params);
    },
    handleCancel(...params) {
      this.$emit('cancel', ...params);
    },
    track() {
      // saTrack('$pageview', {
      //   $title: this.matched.title,
      //   url: this.$mpRoute.fullPath
      // });
    }
  }
};
