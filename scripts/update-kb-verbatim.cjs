const fs = require('fs');

const kbPath = '/Users/goodspeed/Desktop/rexy copy/help-venturehome/public/kb-content.json';
const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

const incentivesText = fs.readFileSync('/tmp/incentives_full.txt', 'utf8');
const utilitiesText = fs.readFileSync('/tmp/utilities_full.txt', 'utf8');

function chunkContent(text, maxChunk = 1200) {
  const chunks = [];
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  let current = '';
  
  for (const p of paragraphs) {
    if ((current.length + p.length) > maxChunk && current.length > 200) {
      chunks.push(current.trim());
      current = p;
    } else {
      current += (current ? '\n\n' : '') + p;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  
  return chunks.map((content, i) => ({
    chunk_index: i,
    content,
    tokens: Math.ceil(content.split(/\s+/).filter(w => w.length).length * 1.3)
  }));
}

function extractStateSection(text, stateName, nextStateNames) {
  // Find start of state section
  const patterns = [
    new RegExp(`\\n${stateName}\\nIncentive`, 'i'),
    new RegExp(`\\n${stateName}\\n`, 'i'),
    new RegExp(`${stateName} Incentive`, 'i'),
    new RegExp(`${stateName} Utility`, 'i')
  ];
  
  let startIdx = -1;
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      startIdx = match.index;
      break;
    }
  }
  
  if (startIdx === -1) return null;
  
  // Find end (next state or end marker)
  let endIdx = text.length;
  for (const nextState of nextStateNames) {
    const patterns = [
      new RegExp(`\\n${nextState}\\nIncentive`, 'i'),
      new RegExp(`\\n${nextState}\\n`, 'i'),
      new RegExp(`${nextState} Incentive`, 'i'),
      new RegExp(`${nextState} Utility`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match.index > startIdx && match.index < endIdx) {
        endIdx = match.index;
      }
    }
  }
  
  // Also check for end markers
  const endMarkers = ['Quick Reference', 'Disclaimer', 'Questions?', 'Net metering policies'];
  for (const marker of endMarkers) {
    const idx = text.indexOf(marker, startIdx + 10);
    if (idx !== -1 && idx < endIdx) endIdx = idx;
  }
  
  return text.slice(startIdx, endIdx).trim();
}

const states = [
  { name: 'Massachusetts', abbr: 'ma' },
  { name: 'Rhode Island', abbr: 'ri' },
  { name: 'New Hampshire', abbr: 'nh' },
  { name: 'Maine', abbr: 'me' },
  { name: 'Connecticut', abbr: 'ct' },
  { name: 'New York', abbr: 'ny' },
  { name: 'New Jersey', abbr: 'nj' },
  { name: 'Pennsylvania', abbr: 'pa' },
  { name: 'Maryland', abbr: 'md' },
  { name: 'Washington, D.C.', abbr: 'dc', alt: 'Washington' },
  { name: 'Delaware', abbr: 'de' }
];

let updated = 0;

// Update incentive articles
for (let i = 0; i < states.length; i++) {
  const { name, abbr, alt } = states[i];
  const nextStates = states.slice(i + 1).map(s => s.name);
  
  const searchName = alt || name;
  const content = extractStateSection(incentivesText, searchName, nextStates);
  
  if (content && content.length > 100) {
    const article = kb.articles.find(a => a.id === `${abbr}-incentives`);
    if (article) {
      article.content_chunks = chunkContent(content);
      updated++;
      console.log(`✓ Updated ${abbr}-incentives (${content.length} chars, ${article.content_chunks.length} chunks)`);
    } else {
      console.log(`✗ Article not found: ${abbr}-incentives`);
    }
  } else {
    console.log(`✗ No content found for ${abbr}-incentives`);
  }
}

// Update utility articles
for (let i = 0; i < states.length; i++) {
  const { name, abbr, alt } = states[i];
  const nextStates = states.slice(i + 1).map(s => s.name);
  
  const searchName = alt || name;
  const content = extractStateSection(utilitiesText, searchName, nextStates);
  
  if (content && content.length > 100) {
    const article = kb.articles.find(a => a.id === `${abbr}-utility-guide`);
    if (article) {
      article.content_chunks = chunkContent(content);
      updated++;
      console.log(`✓ Updated ${abbr}-utilities (${content.length} chars, ${article.content_chunks.length} chunks)`);
    } else {
      console.log(`✗ Article not found: ${abbr}-utilities`);
    }
  } else {
    console.log(`✗ No content found for ${abbr}-utilities`);
  }
}

fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log(`\n=== Total updated: ${updated} articles ===`);
