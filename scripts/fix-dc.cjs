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

// Extract DC Incentives (between "Washington, D.C." and "Delaware")
const dcIncMatch = incentivesText.match(/Washington, D\.C\.\nIncentive([\s\S]*?)Delaware\nIncentive/);
if (dcIncMatch) {
  const article = kb.articles.find(a => a.id === 'dc-incentives');
  if (article) {
    article.content_chunks = chunkContent('Washington, D.C. Incentive' + dcIncMatch[1]);
    console.log('✓ Updated dc-incentives');
  }
}

// Extract DC Utilities (between "Washington D.C." and "Questions?")
const dcUtilMatch = utilitiesText.match(/Washington D\.C\. Utility Guide([\s\S]*?)(?:Questions\?|Net metering policies)/);
if (dcUtilMatch) {
  const article = kb.articles.find(a => a.id === 'dc-utility-guide');
  if (article) {
    article.content_chunks = chunkContent('Washington D.C. Utility Guide' + dcUtilMatch[1]);
    console.log('✓ Updated dc-utility-guide');
  }
}

fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log('Done!');
