import { applicationContext, EnumEnv } from '@xes/dh-boston-launcher';
import packageInfo from '../../package.json';

applicationContext.init({
  debug: true,
  baseUrl: '/microapp/',
  registry: {
    host: 'http://localhost:8080/',
    env: EnumEnv.dev
  }
}, async () => {
  return [
    {
      name: packageInfo.microAppName,
      type: EnumAppType.main,
      entry: packageInfo.microAppName,
      'entry_css': 'index.css',
      mount: 'boston-main'
    }
  ];
}).then(() => {
  console.log('boston inited');
}).catch(err => {
  console.error(err);
});
