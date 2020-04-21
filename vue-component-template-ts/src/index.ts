import Vue, { PluginObject } from 'vue';
import comp from './comp.vue';

class CustomPlugin implements PluginObject<void> {
  install(v: typeof Vue): void {
    v.component('customComp', comp);
  }
}

export default new CustomPlugin();
