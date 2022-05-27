import { chdir } from 'process';
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import getStream from 'get-stream';
import ora from 'ora';
import chalk from 'chalk';
import { createServer, build } from 'vite';

// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveRoot(...dirs) {
  return resolve(__dirname, '../..', ...dirs);
}

export async function startRender() {
  const spinner = ora('starting render development server...');
  spinner.start();

  try {
    const server = await createServer({
      configFile: resolveRoot('packages/render/vite.config.ts'),
      mode: 'development',
      logLevel: 'error'
    });

    await server.listen();
    spinner.stop();
    spinner.succeed(chalk.cyan(`start render development server success.`));
    const address = server.httpServer.address();
    spinner.info(chalk.cyan(`development server listenning: http://${address.address}:${address.port}`));
    // server.printUrls();
    return server;
  } catch (e) {
    throw new Error(chalk.red(`start render development server failed.\n${e.message ? e.message : e.toString()}`));
  } finally {
    spinner.stop();
  }
}

export async function buildRenderProd() {
  const spinner = ora('building render...');
  spinner.start();

  try {
    chdir(resolve(__dirname, '../../packages/render'));
    const clientProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build']);
    const errorString = await getStream(clientProcess.stderr);
    spinner.stop();
    if (errorString) {
      throw new Error(chalk.red(`build render failed.\n${errorString}`));
    }
    spinner.succeed(chalk.cyan('build render success.'));
  } finally {
    spinner.stop();
    // reset cwd
    chdir(resolve(__dirname, '../..'));
  }
}
