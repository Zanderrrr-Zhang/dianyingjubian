import { readFile } from 'node:fs/promises';
import { projectPath } from './project.mjs';

export async function buildHome() {
  const [template, logic, content, episodes] = await Promise.all([
    'template.html', 'logic.js', 'content.json', 'episodes.json'
  ].map(file => readFile(projectPath(`src/home/${file}`), 'utf8')));
  const encode = value => JSON.stringify(JSON.parse(value)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const script = `<script type="text/x-dc" data-dc-script>\nconst HOME_CONTENT = ${encode(content)};\nconst HOME_EPISODES = ${encode(episodes)};\n${logic}\n</script>`;
  if (!template.includes('<!-- HOME_LOGIC -->')) throw new Error('Homepage logic marker is missing');
  return template.replace('<!-- HOME_LOGIC -->', () => script);
}
