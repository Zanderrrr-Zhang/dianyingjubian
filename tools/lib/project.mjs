import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export function projectPath(file) {
  const target = resolve(ROOT, file);
  if (target !== ROOT && !target.startsWith(ROOT + sep)) throw new Error(`Path outside project: ${file}`);
  return target;
}
