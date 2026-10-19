#!/usr/bin/env node
// 零依赖的本地静态服务器。用法：node tools/serve.mjs [端口，默认 8000] [--no-open]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname } from 'node:path';
import { exec } from 'node:child_process';
import { PAGE_REDIRECTS } from '../src/catalog.mjs';
import { projectPath } from './lib/project.mjs';

const args = process.argv.slice(2);
const portArgument = args.find(arg => !arg.startsWith('--'));
const PORT = portArgument === undefined ? 8000 : Number(portArgument);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) throw new Error('Invalid port');
if (args.some(arg => arg.startsWith('--') && arg !== '--no-open')) throw new Error('Unknown server option');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.jsx': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.css': 'text/css; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const redirect = PAGE_REDIRECTS[p.slice(1)];
    if (redirect) { res.writeHead(302, { Location: '/' + encodeURI(redirect), 'Cache-Control': 'no-cache' }).end(); return; }
    const file = projectPath('.' + p);
    if (!(await stat(file)).isFile()) throw 0;
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404'); }
}).listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`已启动：${url}  （Ctrl+C 停止）`);
  if (!args.includes('--no-open')) {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} ${url}`);
  }
});
