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

// Rewritten articles with natural prose
const updatedArticles = {
  "envoy-reconnect": `Your Enphase Envoy is the communication hub for your solar system — it sends production data to the Enphase Enlighten app and to Venture Home. Sometimes it can lose connection to your WiFi network, and when that happens, you won't be able to see your system's performance in the app. The good news is that this is usually easy to fix, and your solar panels will continue producing power even while the Envoy is offline. You just won't see the data until it's reconnected.

There are several common reasons why an Envoy loses connection. Your WiFi network password might have changed, you may have installed a new router, or your internet service may have experienced an interruption. Sometimes router firmware updates can change settings that affect the connection. In some cases, the WiFi signal at the Envoy location is simply too weak.

Start by looking at the LED light on the front of your Envoy device. This light tells you the device's current status. A solid green light means everything is working correctly — the Envoy is connected to the internet and communicating with your microinverters. A flashing green light means the Envoy is trying to establish a connection, which is normal after a power cycle or during startup. A solid red light indicates no internet connection, which means you'll need to troubleshoot the network connection. A flashing red light signals an error condition that may require further investigation. If there's no light at all, the device isn't receiving power.

The first step in troubleshooting is to power cycle the Envoy. Unplug the power adapter from the wall outlet, wait 30 seconds, then plug it back in. Wait two to three minutes for the device to fully boot up, then check if the LED turns solid green. This simple reset resolves many connection issues.

Next, verify that your home internet connection is working properly. Make sure your WiFi network is functioning on other devices like your phone or computer. Test the internet connection near the Envoy location to ensure the signal reaches that area. If your WiFi signal is weak at the Envoy location, consider moving your router closer or adding a WiFi extender to improve coverage.

If the Envoy still won't reconnect automatically, you'll need to manually reconnect it to your WiFi network. Download the Enphase Installer Toolkit app from the iOS App Store or Google Play Store. Stand near the Envoy with your phone, open the app, and select the "Commission" option. Follow the on-screen prompts to reconnect your Envoy to WiFi. You'll need your WiFi network name and password handy during this process.

If you've tried these steps and your Envoy is still offline after 24 hours, contact Venture Home for assistance. We can remotely diagnose the issue or schedule a technician visit if needed. You can reach us by phone at 800-203-4158, by email at support@venturehome.com, or through the Venture Home App by submitting a service request.

Remember, your solar panels will continue producing power even if the Envoy is offline — you just won't see the production data in the app until the connection is restored. Most connection issues resolve themselves within 24 to 48 hours.`,

  "panel-producing-less": `It's normal to notice that some of your solar panels produce slightly different amounts of energy than others. Small differences of 10 to 20 percent are completely normal and expected. Panels may produce different amounts based on their orientation — some may face slightly different directions. The time of day also affects production, as morning sun hits east-facing panels first before moving across your roof. Even slight differences in panel angle can cause variations in output.

However, if one panel is consistently producing significantly less than its neighbors — 50 percent or more — that's worth investigating. Start by verifying what you're seeing in the Enphase Enlighten app. Tap on your system, then select "Array" to view individual panel production. Compare today's production across all your panels to identify any significant outliers. Check during peak sun hours between 11 AM and 2 PM for the most accurate comparison.

The most common cause of reduced panel production is shade. Even a small shadow can significantly reduce a panel's output. Check for shade from trees, chimneys, roof vents, or neighboring buildings. Note what time of day the panel underperforms, as this will tell you when the shade is hitting it. Seasonal changes matter too — trees leaf out in spring and may create new shade patterns that weren't present when your system was first installed. If trimming tree branches is possible, that may solve the issue. Contact Venture Home if new construction or vegetation is causing persistent shading that you can't resolve yourself.

Dirt or debris is another common culprit. Dust, pollen, bird droppings, or leaves can reduce panel efficiency. Look at the panel to see if it's visibly dirty or if debris is blocking part of it. The good news is that rain usually washes panels clean. For persistent dirt, panels can be professionally cleaned. Never use high-pressure water or harsh chemicals on your panels, as this can damage them.

Sometimes the issue is with the microinverter rather than the panel itself. Each panel has its own microinverter, and if it's malfunctioning, the panel may show zero or very low production, or may appear grayed out in the app. If you suspect a microinverter issue, contact Venture Home — microinverter replacement is covered under warranty, and we can often diagnose the problem remotely before dispatching a technician.

Rarely, a panel itself may have a hardware issue. Look for visible damage such as cracks, hot spots, or discoloration. Physical damage from weather or impact can also affect performance. Contact Venture Home if you notice any physical damage to your panels.

Reach out to us if one panel consistently produces 50 percent or less than neighboring panels, if a panel shows zero production for more than three days, if you notice visible damage, or if multiple panels are underperforming. You can contact us by phone at 800-203-4158, by email at support@venturehome.com, or through the Venture Home App. We'll review your system remotely and determine if a site visit is needed.`,

  "panel-black-screen": `In the Enphase Enlighten app, solar panels are normally shown in color with their current production displayed. When a panel appears gray, white, or black, it means the microinverter is not communicating, the panel is not producing power, or there's a connection issue. However, this doesn't always mean the panel is broken — often it's simply a communication or power issue that can be resolved.

First, make sure you're checking during daylight hours between 9 AM and 4 PM. At night, all panels appear gray or black in the app — this is completely normal and expected behavior. Check during peak sun hours for an accurate status of your system's performance.

To determine if there's actually a problem, compare the panel to others in your array. Is it just one panel that's gray, or are multiple panels affected? Are neighboring panels producing normally? If all panels are gray, the issue is likely with your Envoy connection rather than individual panels.

If only one panel is gray, this is usually a communication issue. The microinverter may be working but not reporting its data to the Envoy. Wait 24 to 48 hours — many communication issues resolve automatically as the system re-establishes connections. During this time, also check that your Envoy has a solid green light, indicating it has a good connection to the internet.

If the panel stays gray during peak sun hours for three or more consecutive days, you may have a microinverter failure. This is indicated when the panel remains gray while other panels on the same circuit are working fine. Contact Venture Home if this persists.

Check your electrical panel for a tripped circuit breaker. Look for a breaker labeled "Solar" or "PV" that may have switched off. If you find a tripped breaker, reset it and monitor the panel for 24 hours to see if it comes back online.

In rare cases, a wiring issue such as a loose connection or damage from weather or pests can cause a panel to appear gray. These issues require professional diagnosis and repair.

Contact Venture Home if the panel remains gray for more than three days during daylight hours, if multiple panels are gray, or if you've checked your breakers and the Envoy connection and the issue persists. You can reach us by phone at 800-203-4158, by email at support@venturehome.com, or through the Venture Home App by submitting a service request. Most gray panel issues are resolved remotely or with a quick technician visit.`,

  "share-system-performance": `Many homeowners are proud of their solar production and want to share it with friends, family, or on social media. Sharing your system's performance is a great way to celebrate your environmental impact, show others your savings, inspire friends and neighbors to consider solar, and track important milestones.

The easiest way to share is directly through the Enphase Enlighten app, which has built-in sharing features. Open the app and navigate to your system's production view. Look for the share icon, usually located in the top right corner of the screen. Tap it and select how you want to share — you can send via text message, email, or post directly to social media platforms like Facebook, Twitter, or Instagram. You can also save the image to your phone if you prefer to share it manually later.

The app automatically creates a clean, professional graphic showing your total production in kilowatt-hours, your environmental impact including trees planted equivalent and CO2 offset, and how long you've been solar-powered. This makes it easy to show off your system's performance without sharing sensitive information.

If you want more control over what you share, you can take a screenshot of any view in the Enphase app. Navigate to the screen you want to share — daily production on a sunny day, monthly production totals, lifetime production milestones, or the environmental impact screen are all popular choices. Take a screenshot on your phone, edit it if desired to crop or highlight specific numbers, then share it via text, email, or social media.

You can also use the Venture Home App to view and share your system performance. Download the Venture Home App from the App Store or Google Play, log in with your account, view your system performance, and use your phone's share function to send screenshots or app details to others.

When deciding what to share, consider highlighting production milestones like hitting 10,000 kilowatt-hours generated or producing 50 kilowatt-hours in a single day. Environmental impact statements resonate well too — for example, noting that your panels have offset 8 tons of CO2, which is equivalent to planting 200 trees. Many homeowners also celebrate savings achievements like one year of zero electric bills.

Regarding privacy, your system address or specific location is never shown in the production data that the app shares. Only production numbers and environmental impact statistics are displayed, and your Enphase username or account information remains private. If you have any concerns about privacy, you can simply share the production numbers without including your system name.

If you have questions about sharing your solar performance, contact us by phone at 800-203-4158 or by email at support@venturehome.com. We love seeing customers share their solar success stories!`,

  "envoy-led-meaning": `Your Enphase Envoy has an LED light on the front that indicates its current status. Understanding what each light pattern means can help you quickly diagnose connection issues and know when everything is working properly.

A solid green light means everything is working correctly. The Envoy is connected to the internet, communicating with all your microinverters, and reporting production data to the app. When you see this light, no action is needed — your system is operating normally.

A flashing green light indicates the Envoy is connecting or updating. This is normal behavior when the Envoy is establishing a connection, which may occur after power cycling the device or during firmware updates. If you see a flashing green light, wait five to ten minutes for the connection to establish. If it doesn't eventually turn solid green, check your internet connection.

A solid red light means the Envoy has power but cannot connect to the internet. This can happen if your WiFi password has changed, if there's a router issue, or if there's a network configuration problem. To resolve this, first check that your home WiFi is working on other devices. Then try power cycling the Envoy by unplugging it for 30 seconds and plugging it back in. If the issue persists, you may need to reconnect the Envoy to your WiFi network.

A flashing red light indicates an error condition. This could be a firmware issue, a hardware problem, or a severe connection issue. Power cycle the Envoy to see if this resolves the problem. If the flashing red light continues for more than 24 hours, contact Venture Home for assistance.

If there is no light at all, the Envoy is not receiving power. Check that the power adapter is securely plugged into the wall outlet. Test the outlet with another device to make sure it's working. Try plugging the Envoy into a different outlet. If there's still no light after these steps, contact Venture Home as there may be a power supply failure.

Some Envoy models may show a flashing orange or amber light, which indicates a warning condition. This typically means there's a partial connection or some microinverters are not communicating properly. Monitor the system for 24 hours to see if it resolves itself. If the orange light persists, contact Venture Home.

Contact Venture Home if a solid or flashing red light persists for more than 24 hours, if there's no light even after checking power connections, if you see flashing green for more than 30 minutes, or if any light pattern concerns you. You can reach us by phone at 800-203-4158, by email at support@venturehome.com, or through the Venture Home App. Keep in mind that LED colors and patterns can vary slightly between Envoy models including the Envoy-S, IQ Envoy, and IQ Combiner. When in doubt, contact us with a description of what you're seeing and we'll help you determine the appropriate next steps.`,

  "encharge-not-reporting": `If your Encharge battery isn't showing up in the Enphase Enlighten app or appears offline, there are several steps you can take to troubleshoot the issue. Before diving into troubleshooting, it's worth confirming whether the battery is actually having problems or if it's simply not visible in the app. The battery may be working fine even if the app shows issues.

Check the battery status during daylight hours, as the app may show "standby" at night when the battery isn't actively charging or discharging. You can also test whether the battery is providing backup power during a power outage. Additionally, check your electric bill to see if it shows reduced usage, which would indicate that the battery is discharging during peak hours even if it's not visible in the app.

Start troubleshooting by locating your Encharge battery unit, which is usually mounted on a wall in your garage or on the exterior of your home. Look at the LED indicator on the front of the unit. A solid green light means the battery is operating normally. A flashing green light indicates the battery is communicating or starting up. A solid or flashing red light means an issue has been detected. If there's no light at all, the unit isn't receiving power.

If you're comfortable working with electrical equipment, you can try power cycling the battery system. Turn off the Encharge battery breaker in your electrical panel, which should be labeled "Battery" or "Encharge." Wait two minutes, then turn the breaker back on. Wait five to ten minutes for the battery to fully start up, then check the app again to see if it appears.

Next, verify the Envoy connection. The Encharge communicates through your Envoy, so if the Envoy is offline, the battery won't report either. Make sure your Envoy shows a solid green light indicating a good connection. If the Envoy is offline, see our article on reconnecting your Envoy.

To verify the battery in the app, open Enphase Enlighten and tap your system name. Look for "Storage" or the battery icon in the interface. You may need to tap "Devices" to see individual batteries listed separately.

There are several common issues that can cause an Encharge to not report properly. New installations can take 24 to 48 hours to fully appear in the app, and firmware updates may temporarily hide the battery from view. If your battery is enrolled in utility grid services, this can affect when and how the battery appears active in the app — contact Venture Home to verify your enrollment status. Network issues can also prevent proper reporting if the Encharge doesn't have a strong connection to the Envoy, which can be caused by distance, walls, or interference.

Contact Venture Home if the battery shows a red LED status for more than one hour, if the battery doesn't appear in the app after 48 hours from installation, if the battery was working but disappeared from the app, or if you're experiencing power outages and the battery isn't providing backup power. You can reach us by phone at 800-203-4158, by email at support@venturehome.com, or through the Venture Home App.

It's important to never open the Encharge enclosure, never disconnect DC wiring, and never attempt repairs yourself. All battery service must be performed by certified technicians for safety reasons.`,
};

// Update each article
let updated = 0;
for (const [id, content] of Object.entries(updatedArticles)) {
  const article = kb.articles.find(a => a.id === id);
  if (article) {
    article.content_chunks = chunkContent(content);
    updated++;
    console.log(`✓ Rewrote: ${article.title}`);
  }
}

// Save
kb.metadata.updated = new Date().toISOString();
fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
console.log(`\nRewrote ${updated} articles with natural prose`);
