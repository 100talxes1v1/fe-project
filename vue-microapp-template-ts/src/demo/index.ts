import { IBostonApp } from '@xes/dh-boston-type';
import { applicationContext } from '@xes/dh-boston-launcher';
import CustomMicroApp from '../index';

const app = (new CustomMicroApp() as IBostonApp);
app.applicationContext = applicationContext;
app.mountElement = (document.getElementById('boston-main') as Element);
app.loaded();
