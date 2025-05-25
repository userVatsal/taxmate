// Simple script to append a timestamp to TODO.md after automation runs
const fs = require('fs');
const path = require('path');

const todoPath = path.join(__dirname, '..', 'TODO.md');
const now = new Date().toISOString();

const note = `\n---\nAutomated update: Last deploy or update ran at ${now}\n`;

try {
  fs.appendFileSync(todoPath, note, 'utf8');
  console.log('TODO.md updated with automation timestamp.');
} catch (err) {
  console.error('Failed to update TODO.md:', err);
  process.exit(1);
} 