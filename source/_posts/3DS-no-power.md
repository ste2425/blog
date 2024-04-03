---
title: 3DS - Not powering on
tags:
  - 3DS
image: /blog/images/ds3-nopower/ribbons.JPG
---

Been waiting on a few PCB's to arrive for my PSP Consolizer project so thought I'd waste the time fixing the pile of broken consoles I've got.

The newest addition was a 3DS which would not power on or charge.

<!-- more -->

# The Problem

Quite simply it would not power on, or charge. No other information was provided. It's possible the fault could be with the DC-in side of things and with a charged battery it will power up fine. It's also possible the whole thing is buggered.

It's quite common for them to get cold solder joints (broken joints) on the power connector and reflowing them can fix the charging issue.

_TLDR; This was the issue, reflowed the joints, replaced a swollen battery and it works. You don't need to read the rest now_

## Powering the console

Sadly I don't have a 3DS charger, both the charging dock and the console use this bespoke connector.

You can however modify it to use USB so I decided, whilst testing, to do that. If I can get it all to work I may invest in a proper charger.

Opening the dock was easy enough, just a few tri-wing screws. Interestingly the console itself uses normal Phillips head screws. You would have thought Nintendo would have used the tri-wing on the device with all the complicated hardware that they wouldn't want people snooping in on, not an empty plastic box.

{% fancybox /blog/images/ds3-nopower/dock.jpg "Dock screws" %}

It's worth noting that once inside there are three little legs with springs on the bottom. These help hold the DS in place. If you open the dock at an angle these can easily fall out.

{% fancybox /blog/images/ds3-nopower/dock-open.jpg "Dock springs" %}

Once in there is a tiny circuit board with nice big solder points that even have polarity marked for us, soldering up the cable was nice and simple.

{% fancybox /blog/images/ds3-nopower/dock-con.JPG "Solder points" %}
{% fancybox /blog/images/ds3-nopower/dock-connector.JPG "Dock connector with markings" %}

With that done it was time to test the console. After re-assembly, as expected, nothing happened. No orange light. No power. Nothing.

I checked the docks pins with a multi-meter to be sure and was reading 5V with the correct polarity.

Seems the issue is within the console.

## Disassembly

Taking the 3DS apart is quite easy, just a dozen small Phillips head screws.

First are the screws holding the battery cover in. These have a locking clip on the back so they can't be removed from the cover, stopping them from getting lost

{% fancybox /blog/images/ds3-nopower/back.JPG "Battery cover" %}

Once removed it's just a few more screws to remove the backplate. Note the silver screw visible inside the cart slot (the circle at the top of the image).

{% fancybox /blog/images/ds3-nopower/under-bat-cover.JPG "Backplate screws" %}

After removing the battery the backplate can carefully be lifted.

**BE CAREFUL** the shoulder buttons are connected with two small ribbon cables and these will get pulled if you are heavy handed.

{% fancybox /blog/images/ds3-nopower/ribbons.JPG "Shoulder ribbons (Picture taken after the repair)" %}

## Repair

With access granted we can begin investigation. The first thing to check is that power is getting into the console. It's quite common for cold solder joints on the connector. I did a continuity test between the gold pins on either side and the edge of the solder pad on the PCB.

I got no continuity. After scraping slightly on the solder pad to be sure no oxidisation or flux is stopping the connection there was still no continuity.

Reflowing all the pins with fresh solder and checking again we now have continuity.

{% fancybox /blog/images/ds3-nopower/repair.JPG "Repaired connector" %}

After partially re-assembling and testing in the dock we have an orange light!

{% fancybox /blog/images/butwait.jpg "But Wait, There's More!" %}

...Then 5 seconds later the orange light turned off.

Remove it from the charger, put it back in, orange light on, 5 seconds and orange light off.

## The battery

Taking a closer look at the battery it seemed obvious, not too sure how I missed it. The thing is quite swollen.

{% fancybox /blog/images/ds3-nopower/batteryswell.gif "Battery Swell" %}

Not too sure how a battery with such damage would respond to charging (besides with fire) so maybe the DS has detected this and refuses to charge?

Tried to power the console on mains without a battery and got the same behavior. A day later and a new battery and we have an orange light, and it stays on!

{% fancybox /blog/images/ds3-nopower/charge.JPG "Charging light" %}

## To finish up

So we had cold solder joints on the power connector, applied fresh solder fixed that problem. We also had a swollen battery, replacing that and the console is as good as new.

{% fancybox /blog/images/ds3-nopower/working.JPG "It's Alive" %}
