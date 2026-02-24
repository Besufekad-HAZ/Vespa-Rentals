#!/usr/bin/env node
/**
 * Run the Next.js CLI using the same Node that is running this script.
 * Use this when "npm run dev" picks up a different Node (e.g. 20.6) than
 * the one in your shell (e.g. 25): run "nvm use" then "node scripts/run-next.js dev".
 */
const { spawn } = require('child_process');
const path = require('path');

const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');
const args = process.argv.slice(2);

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});

child.on('exit', (code) => process.exit(code ?? 0));
