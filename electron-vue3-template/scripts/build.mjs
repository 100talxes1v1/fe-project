import { buildRenderProd } from './task/startRender.mjs';
import { buildClientProd } from './task/buildClient.mjs';
import { buildPreloadProd } from './task/buildPreload.mjs';

await buildClientProd();
await buildPreloadProd();
await buildRenderProd();
