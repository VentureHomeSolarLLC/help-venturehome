#!/usr/bin/env node
/**
 * Update KB content with verbatim text from Google Docs
 */

const fs = require('fs');
const path = require('path');

// Read the current kb-content.json
const kbPath = path.join(__dirname, '../public/kb-content.json');
const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

// Helper to split content into chunks
function chunkContent(content, maxChunkSize = 800) {
  const chunks = [];
  const paragraphs = content.split('\n\n');
  let currentChunk = '';
  
  for (const para of paragraphs) {
    if ((currentChunk + para).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.map((content, index) => ({
    chunk_index: index,
    content,
    tokens: Math.ceil(content.split(/\s+/).length * 1.3)
  }));
}

// Massachusetts Incentives - verbatim from doc
const maIncentives = `Massachusetts State Income Tax Credit — Schedule EC

Massachusetts offers a state income tax credit worth 15% of the total net cost of your solar energy system, up to a maximum of $1,000. This credit directly reduces your Massachusetts state income tax liability.

If you cannot use the full credit in the year of installation, the unused portion can be carried forward to future tax years.

Owner-only benefit: This credit applies to customer-owned systems (cash or loan purchases) only. TPO customers under a lease or PPA are not eligible.

To claim: File Schedule EC with your Massachusetts state income tax return (Form 1 or 1-NR/PY) for the year your system is placed in service.

Schedule EC form and instructions: mass.gov — Schedule EC

Class 1 NEPOOL-GIS Renewable Energy Credits (RECs)

Customer-owned systems in Massachusetts earn Class 1 RECs through NEPOOL-GIS (the regional grid's tracking system). Venture Home handles registration on your behalf. RECs are generated monthly based on your system's actual electricity production — 1 REC per 1 MWh produced.

For customers financing through Participate Energy (our managed credit program), RECs are sold on your behalf and the proceeds offset your system cost. For cash/loan customers, Venture Home enrolls your system and you retain the RECs or can elect to sell them.

TPO note: If your system is financed through a SunStrong or Palmetto lease/PPA, the financing provider retains ownership of the RECs. Venture Home cannot enroll TPO systems for REC ownership.

Property Tax Exemption

Massachusetts provides a 20-year property tax exemption for the value added to your home by a solar energy system. Even though solar panels can increase your property's market value, that additional value is fully excluded from your property tax assessment for 20 years after installation.

There is no separate application required in most municipalities — the exemption is applied automatically at assessment. Confirm with your local assessor's office. Statutory reference: M.G.L. ch. 59 § 5 (45, 45A).

Sales Tax Exemption

All solar energy equipment and installation labor in Massachusetts is exempt from the 6.25% state sales tax. This exemption is applied at the point of sale — no action is required on your part. On a $20,000 system, this represents approximately $1,250 in instant savings.`;

console.log('Updating KB with verbatim content...');

// Find and update Massachusetts incentives article
const maIncentivesArticle = kb.articles.find(a => a.id === 'ma-incentives');
if (maIncentivesArticle) {
  maIncentivesArticle.content_chunks = chunkContent(maIncentives);
  console.log('Updated MA incentives');
}

// Save updated KB
fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log('Done!');
