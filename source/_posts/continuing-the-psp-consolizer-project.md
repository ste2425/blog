---
title: Continuing the PSP Consolizer Project
tags:
  - psp
  - psp-consolizer
---

I’ve spent a few months working on other projects but now it's time to return to my PSP-Consolizer project with some cool new ideas.

<!-- more -->

In some of my older posts i was trying to figure out how to fit the PSP-Consolizer inside the psp, with little luck. This left me feeling somewhat demotivated (and skint) so I put this project down for a while.

In the meantime, I worked adding Aux Audio support to the great VitaDock+ project, I have a few Pull Requests for this project you can see [here](https://github.com/SilentNightx/VitaDockPlus/pulls).

If you interested in using them i wrote a {% post_link VitaDock-Manually-Apply-Aux-Audio-Feature 'post, viewable here' %} going through manually applying those changes.

Anyway, after a number of people have shown interest in the PSP-Consolizer I’ve got a new sense excitement for this project and I'm back working on it!

# I'm not alone

During this project I’ve had support from a member of the PSP Discord titled `Peter Lustig`. Without the help of this person I don't think the project would have made it this far and certainly wouldn't be able to support the PSP-3000. I just wanted to give credit for the brilliant help they have offered, this is a joint project, and they deserve the credit too.

# So what’s new?

The two main new developments are targeting the ESP32 and affordable FPC manufacturing.

### ESP32

My consolizer previously targeted the Arduino nano 33 IOT. I have used Arduino's in the past and not having much embedded programming experience chose to stick with what I new. Trouble was the Nano was expensive and limited compared to the ESP. So, after a few people asking I decided to make the switch. So far i have the PSP-Consolizer code compiled and running on the ESP, however I am yet to test it.

{% fancybox /blog/images/continuing-psp-consolizer/esp.jpg  "ESP32 running initial tests" %}

But lower cost is only one benefit, the ESP allows for things such as Over The Air (OTA) updates, flash storage (saving user made button configurations) and the ability to connect wirelessly with the ESP. We could build, like the BlueRetro project, some web app which can allow you to configure the ESP and build custom button mapping etc.

### Affordable FPC manufacturing

One of the other big changes is JLCPCB now offer low cost FPC production.

If you read a previous {% post_link PSP-Internal-Consolizer-Fitting-FPCs 'post on designing custom FPC\'s' %} to make the consolizer internal you may remember the cost issue. I think the cheapest i could find for a single small FPC (the PSP would need at least two) was £60+. Far too expensive and somewhat nuked that idea.

I recently noticed JLCPCB now offer FPC manufacturing and the same custom FPC that would have cost £60+ now would cost £16. Its crazy the price difference but it now makes this entire project possible.

So the plan is to design a single custom FPC which can replace all the internal buttons on the PSP and allow be to tap into those signals. This would mean an internal PSP consolizer is possible and would be solderless (at least on the PSP itself).

# To finish up

So this is still early days, I’ve only been at it a day or two. However, its exciting and we should hopefully be back on track to build some cool things!
