import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.replace('/');
    };
    return () => (
      <div>
        <div>如果你来到这里，说明页面出去旅游了！</div>
        <div onClick={goHome}>返回首页</div>
      </div>
    );
  }
});
