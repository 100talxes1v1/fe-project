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

export async function buildPreload() {
  const spinner = ora('building preload...');
  spinner.start();

  try {
    await build({
      configFile: resolveRoot('packages/preload/vite.config.ts'),
      mode: 'development',
      logLevel: 'error'
    });
    spinner.stop();
    spinner.succeed(chalk.cyan('build preload success.'));
  } catch (e) {
    throw new Error(chalk.red(`build preload failed.\n${e.message ? e.message : e.toString()}`));
  } finally {
    spinner.stop();
  }
}

export async function buildPreloadProd() {
  const spinner = ora('building preload...');
  spinner.start();

  try {
    chdir(resolve(__dirname, '../../packages/preload'));
    const clientProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build']);
    const errorString = await getStream(clientProcess.stderr);
    spinner.stop();
    if (errorString.includes('Error:')) {
      throw new Error(chalk.red(`build preload failed.\n${errorString}`));
    }
    spinner.succeed(chalk.cyan('build preload success.'));
  } finally {
    spinner.stop();
    // reset cwd
    chdir(resolve(__dirname, '../..'));
  }
}
