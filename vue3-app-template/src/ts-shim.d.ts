/*
 * @Date: 2021-04-02 16:00:27
 * @Description:
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string,unknown>, Record<string,unknown>, unknown>
  export default component
}