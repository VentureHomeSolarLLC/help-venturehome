const fs = require('fs');
const path = require('path');

const kbPath = path.join(__dirname, '../public/kb-content.json');
const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

// Read the extracted doc content
const incentivesDoc = fs.readFileSync('/Users/goodspeed/Downloads/venture_home_state_local_incentives_kb.docx.content.txt', 'utf8');
const utilityDoc = fs.readFileSync('/Users/goodspeed/Downloads/venture_home_state_utility_guides_v2.docx.content.txt', 'utf8');

function chunkContent(content, maxChunkSize = 1500) {
  const chunks = [];
  const paragraphs = content.split(/\n\n+/);
  let currentChunk = '';
  
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    
    if ((currentChunk.length + trimmed.length) > maxChunkSize && currentChunk.length > 100) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + trimmed;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.map((content, index) => ({
    chunk_index: index,
    content,
    tokens: Math.ceil(content.split(/\s+/).filter(w => w.length > 0).length * 1.3)
  }));
}

// Extract state sections from incentives doc
function extractStateIncentives(docContent) {
  const states = {};
  const stateNames = ['Massachusetts', 'Rhode Island', 'New Hampshire', 'Maine', 'Connecticut', 'New York', 'New Jersey', 'Pennsylvania', 'Maryland', 'Washington, D.C.', 'Delaware'];
  
  for (let i = 0; i < stateNames.length; i++) {
    const state = stateNames[i];
    const nextState = stateNames[i + 1];
    
    let regex;
    if (nextState) {
      regex = new RegExp(`${state} Incentive[\\s\\S]*?(?=${nextState} Incentive|Quick Reference|Disclaimer)`, 'i');
    } else {
      regex = new RegExp(`${state} Incentive[\\s\\S]*$`, 'i');
    }
    
    const match = docContent.match(regex);
    if (match) {
      states[state.toLowerCase().replace(/[,\.\s]/g, '-')] = match[0].trim();
    }
  }
  
  return states;
}

// Extract state sections from utility doc
function extractStateUtilities(docContent) {
  const states = {};
  const stateNames = ['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Delaware', 'Maryland', 'Washington D.C.'];
  
  for (let i = 0; i < stateNames.length; i++) {
    const state = stateNames[i];
    const nextState = stateNames[i + 1];
    
    let regex;
    if (nextState) {
      regex = new RegExp(`${state} Utility Guide[\\s\\S]*?(?=${nextState} Utility Guide|Questions\\?|Net metering policies)`, 'i');
    } else {
      regex = new RegExp(`${state} Utility Guide[\\s\\S]*?(?=Questions\\?|Net metering policies|$)`, 'i');
    }
    
    const match = docContent.match(regex);
    if (match) {
      states[state.toLowerCase().replace(/[,\.\s]/g, '-')] = match[0].trim();
    }
  }
  
  return states;
}

console.log('Extracting state content from docs...');
const stateIncentives = extractStateIncentives(incentivesDoc);
const stateUtilities = extractStateUtilities(utilityDoc);

// Update articles
let updatedCount = 0;

kb.articles.forEach(article => {
  // Update state incentive articles
  if (article.category_id === 'solar-incentives' && article.id !== 'solar-incentives-overview') {
    const stateKey = article.id.replace('-incentives', '');
    if (stateIncentives[stateKey]) {
      article.content_chunks = chunkContent(stateIncentives[stateKey]);
      updatedCount++;
      console.log(`Updated ${article.id}`);
    }
  }
  
  // Update state utility articles  
  if (article.category_id === 'state-utilities' && article.id !== 'state-utilities-overview') {
    const stateKey = article.id.replace('-utilities', '');
    if (stateUtilities[stateKey]) {
      article.content_chunks = chunkContent(stateUtilities[stateKey]);
      updatedCount++;
      console.log(`Updated ${article.id}`);
    }
  }
});

// Save
fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log(`\nUpdated ${updatedCount} articles with verbatim content`);
