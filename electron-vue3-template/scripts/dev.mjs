import { startRender } from './task/startRender.mjs';
import { buildPreload } from './task/buildPreload.mjs';
import { buildClient, startClient } from './task/buildClient.mjs'

if (process.env.NODE_DEBUG === 'debug') {
  console.log('start debug build...');
}
const server = await startRender();
await buildPreload();
if (process.env.NODE_DEBUG === 'debug') {
  await buildClient();
  console.log('end debug build...');
} else {
  await startClient(server);
}

