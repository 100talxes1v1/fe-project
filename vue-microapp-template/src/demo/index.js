import { applicationContext } from '@xes/dh-boston-launcher';
import app from '../index';

app.applicationContext = applicationContext;
app.mountElement = document.getElementById('boston-main');
app.loaded();
