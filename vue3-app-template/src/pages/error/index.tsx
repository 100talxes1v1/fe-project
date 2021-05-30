import { defineComponent } from 'vue';

const ErrorPage = defineComponent({
  name: 'ErrorPage',
  props: {
    message: {
      type: String,
      default: '网络异常请检查后重新加载'
    }
  },
  setup(props) {
    const reload = () => {
      location.reload();
    };
    return () => (
      <div>
        <div>{props.message}</div>
        <div onClick={reload}>重新加载</div>
      </div>
    );
  }
});

export function renderErrorPage(message: string) {
  return () => <ErrorPage message={message}></ErrorPage>;
}

export default ErrorPage;
