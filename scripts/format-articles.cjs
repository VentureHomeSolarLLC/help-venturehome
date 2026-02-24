const fs = require('fs');

const kbPath = '/Users/goodspeed/Desktop/rexy copy/help-venturehome/public/kb-content.json';
const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

function chunkContent(text, maxChunk = 1500) {
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

// Updated articles with better formatting
const updatedArticles = {
  "envoy-reconnect": `Overview
Your Enphase Envoy is the communication hub for your solar system. When it loses connection, you can't see production data in the app. This guide walks you through reconnecting it.

Common Causes of Disconnection
WiFi Changes
New WiFi password or network name
New router installed
Router firmware updated

Power Issues
Home power outage
Internet service interruption
Loose power connection

Signal Problems
Weak WiFi signal at Envoy location
Physical obstructions
Distance from router

Step 1: Check the LED Status
The LED light on your Envoy tells you its status:

Solid Green — Connected and working
Flashing Green — Trying to connect  
Solid Red — No internet connection
Flashing Red — Error condition
No Light — No power

Step 2: Power Cycle the Envoy
1. Unplug the Envoy power adapter
2. Wait 30 seconds
3. Plug it back in
4. Wait 2-3 minutes for startup
5. Check if LED turns solid green

Step 3: Check Your Internet
Verify your home WiFi works on other devices
Test connection near the Envoy location
Consider a WiFi extender if signal is weak

Step 4: Reconnect to WiFi
If automatic reconnection fails:

Download the Enphase Installer Toolkit app
Stand near the Envoy
Open app and select "Commission"
Follow prompts to reconnect
Enter your WiFi name and password

Step 5: Contact Venture Home
If still offline after 24 hours:

Phone: 800-203-4158
Email: support@venturehome.com
App: Submit service request

Important Notes
Panels continue producing power when Envoy is offline — only monitoring is affected
Most issues resolve within 24-48 hours
Never open the Envoy enclosure`,

  "panel-producing-less": `Quick Check
Before troubleshooting, verify the difference:

Small differences (10-20%) are normal
Large gaps (50%+) need investigation
Check during peak sun hours (11 AM - 2 PM)

Why Panels Produce Different Amounts
Normal Variations
Different panel orientations
Time of day sun angles
Slight angle differences

Problem Causes

1. Shade (Most Common)
Check for shadows from:
Trees
Chimneys or vents
Neighboring buildings

Note what time the panel underperforms — this tells you when shade hits it.

Solutions:
Trim tree branches when possible
Contact us for persistent shading issues

2. Dirt or Debris
Look for:
Dust or pollen buildup
Bird droppings
Leaves covering panels

Solutions:
Rain usually cleans panels
Professional cleaning available if needed
Never use high-pressure water

3. Microinverter Failure
Signs:
Zero or very low production
Panel grayed out in app

Solutions:
Contact Venture Home
Replacement is warranty-covered
We can diagnose remotely

4. Panel Hardware Issue
Rare but serious:
Visible cracks or damage
Hot spots or discoloration
Impact damage

When to Contact Us
Contact Venture Home if:
One panel produces 50% or less than neighbors
A panel shows zero production for 3+ days
You see visible damage
Multiple panels underperform

Contact Info
Phone: 800-203-4158
Email: support@venturehome.com
App: Submit service request`,

  "panel-black-screen": `What Gray/Black Means
In the Enphase app, colored panels are producing power. Gray or black panels are not communicating or not producing.

Important: Check during daylight hours (9 AM - 4 PM). All panels appear gray at night — this is normal.

Is It Actually a Problem?
Check These First
Is it nighttime? (Normal)
Is it early morning or evening? (Normal)
Are other panels producing normally?

Status Guide
One Panel Gray
Usually a communication issue
Often resolves in 24-48 hours

Multiple Panels Gray
Possible Envoy connection issue
Check circuit breakers

All Panels Gray
Envoy may be offline
Check WiFi connection

Common Causes

1. Communication Issue
Microinverter is working but not reporting
Wait 24-48 hours for auto-resolution
Check Envoy has solid green light

2. Microinverter Failure
Panel stays gray during peak sun
Other panels on same circuit work fine
Contact us for replacement

3. Tripped Circuit Breaker
Check your electrical panel
Look for tripped "Solar" or "PV" breaker
Reset and monitor for 24 hours

4. Wiring Issue
Loose connection
Weather or pest damage

Contact Us When
The panel stays gray for 3+ days during daylight
Multiple panels are affected
You've checked breakers and Envoy connection

How to Reach Us
Phone: 800-203-4158
Email: support@venturehome.com
App: Submit service request

Most gray panel issues are resolved remotely or with a quick technician visit.`,

  "share-system-performance": `Why Share Your Solar Data?
Many homeowners share their solar production to:
Celebrate environmental impact
Show friends and family their savings
Inspire others to go solar
Track milestones

Method 1: Enphase App Sharing
The easiest way — built right into the app:

Open Enphase Enlighten app
Go to your production view
Tap the share icon
Choose how to share:
  Text message
  Email
  Facebook or Twitter
  Save as image

What Gets Shared
Total production (kWh)
Environmental impact
Trees planted equivalent
CO2 offset
Days solar-powered

Method 2: Screenshot & Share
For more control:

Navigate to the view you want
Take a screenshot
Edit if desired
Share anywhere

Best Screenshots to Share
Daily production on sunny days
Monthly totals
Lifetime milestones
Environmental impact screen

Method 3: Venture Home App
Download the Venture Home App
Log in to your account
View system performance
Share screenshots

Share-Worthy Milestones
Production
Just hit 10,000 kWh!
50 kWh today — powered our house and then some

Environmental
Our panels offset 8 tons of CO2
Like planting 200 trees

Savings
Celebrating 1 year of $0 electric bills!

Privacy Notes
Your address is NOT shown
Only production numbers appear
Your account info stays private

Questions?
Phone: 800-203-4158
Email: support@venturehome.com

We love seeing customers share their solar success!`,

  "envoy-led-meaning": `LED Quick Reference
Your Envoy's LED tells you its status at a glance:

Solid Green — Everything OK
Flashing Green — Connecting
Solid Red — No internet
Flashing Red — Error
No Light — No power

Detailed Status Guide

Solid Green
What it means:
Connected to internet
Communicating with all microinverters
Reporting production data

Action: None needed — your system is working normally.

Flashing Green
What it means:
Establishing connection
Firmware updating
Starting up after power cycle

Action: Wait 5-10 minutes. Should turn solid green.

Solid Red
What it means:
No internet connection
WiFi password may have changed
Router issue

Action:
Check home WiFi works
Power cycle the Envoy
Reconnect to WiFi if needed

Flashing Red
What it means:
Firmware error
Hardware problem
Severe connection issue

Action: Power cycle. If still flashing red after 24 hours, contact us.

No Light
What it means:
No power to Envoy
Adapter unplugged
Outlet not working

Action:
Check power adapter is plugged in
Test outlet with another device
Try different outlet
Orange/Amber Flashing (some models)
What it means:
Partial connection
Some microinverters not responding
Warning condition

Action: Monitor for 24 hours. Contact us if it persists.

When to Contact Venture Home
Contact us if:
Red light persists 24+ hours
No light after checking power
Flashing green 30+ minutes
Any pattern concerns you

Contact Info
Phone: 800-203-4158
Email: support@venturehome.com
App: Submit service request

Note: LED patterns may vary slightly between Envoy-S, IQ Envoy, and IQ Combiner models.`,

  "encharge-not-reporting": `First: Is It Really Not Working?
The battery may work fine even if the app shows issues:

Check during daylight — app shows "standby" at night
Test during a power outage — is backup working?
Check your electric bill for reduced usage

Step 1: Check the Battery LED
Find your Encharge unit (garage or outside wall):

Solid Green — Operating normally
Flashing Green — Starting up/communicating
Solid Red — Issue detected
No Light — No power

Step 2: Power Cycle (Advanced)
Only if you're comfortable with electrical equipment:

Turn off the "Battery" or "Encharge" breaker
Wait 2 minutes
Turn breaker back on
Wait 5-10 minutes for startup
Check app again

Step 3: Check Envoy Connection
The battery communicates through your Envoy:

Make sure Envoy shows solid green light
If Envoy is offline, battery won't report
See our "Reconnecting Your Envoy" article

Step 4: Verify in App
Open Enphase Enlighten
Tap your system name
Look for "Storage" or battery icon
Tap "Devices" to see individual batteries

Common Issues

Communication Delay
New installations: 24-48 hours to appear
Firmware updates may temporarily hide battery

Grid Services
Some batteries enrolled in utility programs
This affects how battery appears in app
Contact us to verify enrollment

Network Issues
Battery needs strong Envoy connection
Distance or interference can affect communication

When to Contact Us
Contact Venture Home if:

Red LED for more than 1 hour
Battery doesn't appear after 48 hours from install
Battery was working but disappeared
Battery not providing backup power during outages
Error messages in app

How to Reach Us
Phone: 800-203-4158
Email: support@venturehome.com
App: Submit service request

Important Safety
Never open the Encharge enclosure
Never disconnect DC wiring
Never attempt repairs yourself

All battery service must be performed by certified technicians.`,
};

// Update each article
let updated = 0;
for (const [id, content] of Object.entries(updatedArticles)) {
  const article = kb.articles.find(a => a.id === id);
  if (article) {
    article.content_chunks = chunkContent(content);
    updated++;
    console.log(`✓ Updated: ${article.title}`);
  }
}

// Save
kb.metadata.updated = new Date().toISOString();
fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log(`\nUpdated ${updated} articles with improved formatting`);
