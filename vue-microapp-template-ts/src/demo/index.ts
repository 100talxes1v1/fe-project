import { EnumAppType } from '@xes/dh-boston-type';
import { applicationContext, EnumEnv } from '@xes/dh-boston-launcher';
import packageInfo from '../../package.json';

applicationContext.init({
  debug: true,
  baseUrl: packageInfo.bostonBaseUrl,
  registry: {
    host: 'https://b.xes1v1.com/',
    env: EnumEnv.dev
  }
}, async () => {
  return [
    {
      name: packageInfo.bostonAppName,
      type: EnumAppType.main,
      entry: packageInfo.bostonAppName,
      'entry_css': 'index.css',
      mount: 'boston-main'
    }
  ];
}).then(() => {
  console.log('boston inited');
}).catch(err => {
  console.error(err);
});
