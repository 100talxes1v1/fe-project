import { chdir } from 'process';
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import getStream from 'get-stream';
import ora from 'ora';
import chalk from 'chalk';
import { createServer, build } from 'vite';
import { config } from 'dotenv';

// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveRoot(...dirs) {
  return resolve(__dirname, '../..', ...dirs);
}

export async function buildClient() {
  const spinner = ora('building client...');
  spinner.start();

  try {
    await build({
      configFile: resolveRoot('packages/client/vite.config.ts'),
      mode: 'development',
      logLevel: 'error'
    });
    spinner.stop();
    spinner.succeed(chalk.cyan('build client success.'));
  } catch (e) {
    throw new Error(chalk.red(`build client failed.\n${e.message ? e.message : e.toString()}`));
  } finally {
    spinner.stop();
  }
}

export async function startClient(server) {
  await buildClient();

  const spinner = ora('starting client...');
  spinner.start();

  try {
    // 加载环境变量
    config({
      path: resolve(__dirname, '../../.env')
    });

    const address = server.httpServer.address();
    const env = Object.assign(process.env, {
      VITE_DEV_SERVER_HOST: address.address === '127.0.0.1' ? 'localhost' : address.address,
      VITE_DEV_SERVER_PORT: address.port,
    });
    const clientProcess = spawn(/^win/.test(process.platform) ? 'electron.cmd' : 'electron', [resolveRoot('packages/client/dist/main.js')], { stdio: 'inherit', env });
    clientProcess.on('close', () => {
      server.close();
    });
    spinner.stop();
    spinner.succeed(chalk.cyan('start client success.'));
    return clientProcess;
  } finally {
    spinner.stop();
  }
}


export async function buildClientProd() {
  const spinner = ora('building client...');
  spinner.start();

  try {
    chdir(resolve(__dirname, '../../packages/client'));
    const clientProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build']);
    const errorString = await getStream(clientProcess.stderr);
    spinner.stop();
    if (errorString) {
      throw new Error(chalk.red(`build client failed.\n${errorString}`));
    }
    spinner.succeed(chalk.cyan('build client success.'));
  } finally {
    spinner.stop();
    // reset cwd
    chdir(resolve(__dirname, '../..'));
  }
}
