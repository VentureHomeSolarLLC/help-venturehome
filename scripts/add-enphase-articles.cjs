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

// New articles based on Enphase topics
const newArticles = [
  {
    id: "envoy-reconnect",
    slug: "reconnecting-your-envoy",
    category_id: "troubleshooting",
    title: "Reconnecting Your Enphase Envoy",
    tags: ["envoy", "monitoring", "connection", "troubleshooting", "wifi", "ethernet"],
    visibility: "customer",
    question_aliases: [
      "How do I reconnect my Envoy?",
      "My Envoy is offline",
      "Envoy not connecting to internet",
      "How to reconnect Envoy to WiFi"
    ],
    content: `Why Your Envoy May Lose Connection

Your Enphase Envoy is the communication hub for your solar system. It sends production data to the Enphase Enlighten app and to Venture Home. Sometimes it can lose connection due to:

WiFi network changes (new password, new router, network name change)
Power outages or internet service interruptions
Router firmware updates that change settings
Weak WiFi signal at the Envoy location

Step 1: Check Envoy Status

Look at your Envoy device (usually installed near your electrical panel or in your garage). The LED light on the front indicates connection status:

Solid green: Connected and working normally
Flashing green: Trying to connect
Solid or flashing red: Connection issue
No light: No power to the device

Step 2: Power Cycle the Envoy

Unplug the Envoy power adapter from the wall outlet
Wait 30 seconds
Plug it back in
Wait 2-3 minutes for it to fully boot up
Check if the LED turns solid green

Step 3: Check Your Internet Connection

Make sure your home WiFi is working on other devices
Test your internet connection with a phone or computer near the Envoy location
If your WiFi signal is weak, consider moving your router closer or adding a WiFi extender

Step 4: Reconnect to WiFi (if needed)

If the Envoy won't reconnect automatically:

Download the Enphase Installer Toolkit app (iOS or Android)
Stand near the Envoy with your phone
Open the app and select "Commission"
Follow the prompts to reconnect your Envoy to WiFi
You'll need your WiFi network name and password

Step 5: Contact Venture Home

If you've tried the steps above and your Envoy is still offline after 24 hours, contact us:

Phone: 800-203-4158
Email: support@venturehome.com
Venture Home App: Submit a service request

We can remotely diagnose the issue or schedule a technician visit if needed.

Important Notes

Your solar panels will continue producing power even if the Envoy is offline — you just won't see production data in the app
Most connection issues resolve within 24-48 hours
Don't attempt to open the Envoy enclosure or disconnect any wiring`
  },
  {
    id: "panel-producing-less",
    slug: "why-is-one-panel-producing-less",
    category_id: "troubleshooting",
    title: "Why Is One of My Panels Producing Less Than the Others?",
    tags: ["panels", "production", "troubleshooting", "shade", "microinverter"],
    visibility: "customer",
    question_aliases: [
      "One panel is underperforming",
      "Why is my solar panel producing less?",
      "Panel showing low production",
      "Uneven solar panel output"
    ],
    content: `Is One Panel Really Producing Less?

First, verify what you're seeing. In the Enphase Enlighten app:

Tap your system, then "Array"
Look at individual panel production
Compare today's production across panels

Small differences (10-20%) are normal. Panels may produce different amounts based on:

Panel orientation (some face slightly different directions)
Time of day (morning sun hits east-facing panels first)
Slight differences in panel angle

Common Causes of Lower Production

1. Shade

Even a small shadow can significantly reduce panel output:

Check for shade from trees, chimneys, vents, or neighboring buildings
Note what time of day the panel underperforms — this indicates when shade hits it
Seasonal changes: trees leaf out in spring and may create new shade patterns

What to do:

Trim tree branches if possible
Contact Venture Home if new construction or vegetation is causing persistent shading

2. Dirt or Debris

Dust, pollen, bird droppings, or leaves can reduce panel efficiency:

Look at the panel — is it visibly dirty?
Is debris blocking part of the panel?

What to do:

Rain usually washes panels clean
For persistent dirt, panels can be professionally cleaned
Never use high-pressure water or harsh chemicals

3. Microinverter Issues

Each panel has its own microinverter. If it's malfunctioning:

The panel may show zero or very low production
The panel may be grayed out in the app

What to do:

Contact Venture Home — microinverter replacement is covered under warranty
We can remotely diagnose and dispatch a technician

4. Panel Hardware Issue

Rarely, a panel itself may have an issue:

Visible damage (cracks, hot spots)
Discoloration
Physical damage from weather or impact

When to Contact Venture Home

Contact us if:

One panel consistently produces 50% or less than neighboring panels
A panel shows zero production for more than 3 days
You notice visible damage to a panel
Multiple panels are underperforming

Phone: 800-203-4158
Email: support@venturehome.com
Venture Home App: Submit a service request

We'll review your system remotely and determine if a site visit is needed.`
  },
  {
    id: "panel-black-screen",
    slug: "why-is-the-panel-gray-in-app",
    category_id: "troubleshooting",
    title: "Why Is My Solar Panel Gray (or Black) in the App?",
    tags: ["panels", "app", "microinverter", "troubleshooting", "offline"],
    visibility: "customer",
    title: "Why Is My Solar Panel Gray (or Black) in the App?",
    question_aliases: [
      "Panel is gray in Enlighten app",
      "Why is my panel showing black?",
      "Panel not showing in app",
      "Solar panel offline in app"
    ],
    content: `What Does a Gray or Black Panel Mean?

In the Enphase Enlighten app, panels are normally shown in color with their current production. When a panel appears gray, white, or black, it means:

The microinverter is not communicating
The panel is not producing power
There's a connection issue

This doesn't always mean the panel is broken — often it's a communication or power issue.

Check If It's Actually Not Producing

1. Check the Time of Day

Panels only show color when producing power
At night, all panels appear gray/black — this is normal
Check during daylight hours (9 AM - 4 PM) for accurate status

2. Compare to Other Panels

Is it just one panel or multiple?
Are neighboring panels producing normally?

Common Causes

1. Normal Nighttime Mode

All panels appear gray at night
This is expected behavior

2. Microinverter Communication Issue

The microinverter may be working but not reporting
Wait 24-48 hours — many issues resolve automatically
Check if the Envoy has a good connection (solid green light)

3. Microinverter Failure

If the panel stays gray during peak sun hours for 3+ days
Other panels on the same circuit are working fine

4. Tripped Circuit Breaker

Check your electrical panel
Look for a tripped breaker labeled "Solar" or "PV"
If tripped, reset it and monitor for 24 hours

5. Wiring Issue

Loose connection
Damage to wiring from weather or pests

What to Do

Wait 24-48 hours
Many communication issues resolve on their own

Check during peak sun
Look at the app between 11 AM and 2 PM on a sunny day

Contact Venture Home if:

The panel remains gray for more than 3 days during daylight hours
Multiple panels are gray
You've checked your breakers and the Envoy connection

Phone: 800-203-4158
Email: support@venturehome.com
Venture Home App: Submit a service request

Most gray panel issues are resolved remotely or with a quick technician visit.`
  },
  {
    id: "share-system-performance",
    slug: "share-your-solar-performance",
    category_id: "monitoring",
    title: "How Can I Share My Solar System Performance With Others?",
    tags: ["monitoring", "app", "sharing", "social media", "production"],
    visibility: "customer",
    question_aliases: [
      "How do I share my solar production?",
      "Can I share my Enphase data?",
      "Share solar performance online",
      "Post solar production to social media"
    ],
    content: `Sharing Your Solar Success

Many homeowners are proud of their solar production and want to share it with friends, family, or on social media. Here's how to share your system performance:

Method 1: Enphase Enlighten App Sharing

The Enphase app makes it easy to share directly:

Open the Enphase Enlighten app
Navigate to your system's production view
Look for the share icon (usually in the top right)
Select how you want to share:
  Text message
  Email
  Social media (Facebook, Twitter/X, Instagram)
  Save as image

The app creates a clean graphic showing:
Your total production (kWh)
Environmental impact (trees planted equivalent, CO2 offset)
How long you've been solar-powered

Method 2: Screenshot and Share

For more control over what you share:

Navigate to the view you want to share in the Enphase app
Take a screenshot on your phone
Edit if desired (crop, highlight numbers)
Share via text, email, or social media

Good views to screenshot:
Daily production on a sunny day
Monthly production totals
"Lifetime" production milestones
The "Impact" screen showing environmental benefits

Method 3: Share the Venture Home App

Download the Venture Home App from the App Store or Google Play
Log in with your account
View your system performance
Use your phone's share function to send screenshots or app details

What You Might Want to Share

Production milestones:
"Just hit 10,000 kWh generated!"
"Our system produced 50 kWh today — powered our house and then some"

Environmental impact:
"Our solar panels have offset 8 tons of CO2 — like planting 200 trees"
"This month our house was powered 100% by sunshine"

Savings achievements:
"Celebrating 1 year of $0 electric bills!"

Privacy Considerations

When sharing screenshots:

Your system address or specific location is NOT shown in production data
Only production numbers and environmental impact are displayed
Your Enphase username/account info is not visible in production views

If you have concerns about privacy, just share the production numbers without your system name.

Questions About Sharing?

Contact us:
Phone: 800-203-4158
Email: support@venturehome.com

We love seeing customers share their solar success stories!`
  },
  {
    id: "envoy-led-meaning",
    slug: "what-do-envoy-leds-mean",
    category_id: "troubleshooting",
    title: "What Do the LED Lights on My Enphase Envoy Mean?",
    tags: ["envoy", "led", "status", "troubleshooting", "monitoring"],
    visibility: "customer",
    question_aliases: [
      "Envoy light meanings",
      "What do Envoy LEDs mean?",
      "Envoy status light",
      "Why is my Envoy light red?"
    ],
    content: `Understanding Your Envoy's LED Status Light

Your Enphase Envoy has an LED light on the front that tells you its current status. Here's what each light pattern means:

LED Status Reference

Solid Green

Status: Everything is working correctly
The Envoy is connected to the internet
Communicating with all microinverters
Reporting production data

Action needed: None — your system is operating normally

Flashing Green

Status: Connecting or updating
The Envoy is establishing a connection
May occur after power cycling or during firmware updates

Action needed: Wait 5-10 minutes. If it doesn't go solid green, check your internet connection.

Solid Red

Status: No internet connection
The Envoy has power but cannot connect to the internet
WiFi password may have changed
Router issue
Network configuration problem

Action needed:
Check your home WiFi is working
Try power cycling the Envoy (unplug for 30 seconds, plug back in)
If the issue persists, you may need to reconnect the Envoy to WiFi

Flashing Red

Status: Error condition
Possible firmware issue
Hardware problem
Severe connection issue

Action needed: Power cycle the Envoy. If flashing red continues for more than 24 hours, contact Venture Home.

No Light

Status: No power to the Envoy
Power adapter unplugged
Outlet not working
Power supply failure

Action needed:
Check that the power adapter is plugged in
Test the outlet with another device
Try a different outlet
If still no light, contact Venture Home

Flashing Orange/Amber (on some models)

Status: Warning condition
Partial connection
Some microinverters not communicating

Action needed: Monitor for 24 hours. If it doesn't resolve, contact Venture Home.

When to Contact Venture Home

Contact us if:

Solid or flashing red light persists for more than 24 hours
No light even after checking power connections
Flashing green for more than 30 minutes
Any light pattern that concerns you

Phone: 800-203-4158
Email: support@venturehome.com
Venture Home App: Submit a service request

Note: LED colors and patterns can vary slightly between Envoy models (Envoy-S, IQ Envoy, IQ Combiner). When in doubt, contact us with a description of what you see.`
  },
  {
    id: "encharge-not-reporting",
    slug: "troubleshoot-encharge-not-reporting",
    category_id: "troubleshooting",
    title: "How to Troubleshoot an Encharge Battery Not Reporting",
    tags: ["battery", "encharge", "troubleshooting", "monitoring", "storage"],
    visibility: "customer",
    question_aliases: [
      "Encharge battery not showing in app",
      "Battery not reporting",
      "Why can't I see my battery?",
      "Encharge offline"
    ],
    content: `Is Your Encharge Battery Really Not Working?

If your Encharge battery isn't showing up in the Enphase Enlighten app or appears offline, here's how to troubleshoot:

First: Check If It's Actually Working

The battery may be working fine even if the app shows issues:

Check during daylight hours — the app may show "standby" at night
Look at your home's power during an outage — is the battery providing backup?
Check if your electric bill shows reduced usage (indicating battery discharge during peak hours)

Step 1: Check the Encharge LED

Locate your Encharge battery unit (usually mounted on a wall in garage or outside)
Look at the LED indicator on the front:

Solid green: Operating normally
Flashing green: Communicating/starting up
Solid or flashing red: Issue detected
No light: No power

Step 2: Power Cycle the Battery System

Important: Only do this if you're comfortable with electrical equipment, or call Venture Home

Turn off the Encharge battery breaker in your electrical panel (labeled "Battery" or "Encharge")
Wait 2 minutes
Turn the breaker back on
Wait 5-10 minutes for full startup
Check the app again

Step 3: Check the Envoy Connection

The Encharge communicates through your Envoy:

Make sure your Envoy shows a solid green light
If the Envoy is offline, the battery won't report either
See our "Reconnecting Your Enphase Envoy" article

Step 4: Verify in the App

Open Enphase Enlighten
Tap your system name
Look for "Storage" or the battery icon
You may need to tap "Devices" to see individual batteries

Common Issues

Communication Delay
New installations can take 24-48 hours to fully appear in the app
Firmware updates may temporarily hide the battery from view

Grid Services Enrollment
Some batteries are enrolled in utility grid services
This can affect when and how the battery appears active
Contact Venture Home to verify your enrollment status

Network Issues
The Encharge needs a strong connection to the Envoy
Distance, walls, or interference can affect communication

When to Contact Venture Home

Contact us if:

The battery shows red LED status for more than 1 hour
Battery doesn't appear in the app after 48 hours from installation
Battery was working but disappeared from the app
You're experiencing power outages and the battery isn't providing backup
Any error messages in the app related to storage

Phone: 800-203-4158
Email: support@venturehome.com
Venture Home App: Submit a service request

Important Safety Note

Never open the Encharge enclosure
Never disconnect DC wiring
Never attempt repairs yourself

All battery service must be performed by certified technicians. Contact Venture Home for any physical issues with the battery unit.`
  }
];

// Add new articles
let added = 0;
for (const article of newArticles) {
  const exists = kb.articles.find(a => a.id === article.id);
  if (!exists) {
    const articleObj = {
      ...article,
      content_chunks: chunkContent(article.content),
      related_article_ids: [],
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    delete articleObj.content;
    kb.articles.push(articleObj);
    added++;
    console.log(`Added: ${article.title}`);
  } else {
    console.log(`Already exists: ${article.title}`);
  }
}

// Update metadata
kb.metadata.total_articles = kb.articles.length;
kb.metadata.updated = new Date().toISOString();

fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log(`\nTotal articles: ${kb.articles.length} (+${added} new)`);
