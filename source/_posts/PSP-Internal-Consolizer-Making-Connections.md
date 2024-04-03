---
title: PSP Internal Consolizer - Making Connections
tags:
  - psp
  - psp-consolizer
image: /blog/images/consolizer - making connections/analog.png
---

Today I begin working on my internal PSP Consolizer.

Probably around a year ago I started work on an [external consolizer](https://github.com/ste2425/PSP-Consolizer). The end goal was always for it to be internal to the PSP but there was so much I needed to learn first. Arduino dev, PCB design & production etc. Figured it would be best to start easy and not have to worry about trying to cram it all into the PSP too.

<!-- more -->

The first challenge I needed to try and solve was how to connect both the original PSP's buttons and the Arduino to the PSP's motherboard.

The PSP (2000 in my case) uses two 10-pin and one 14-pin 0.5mm FFC connectors for its face buttons.

The analog stick uses an odd surface mating situation. Similar to PS2/3 controllers it relies on metal contacts on the analog stick to touch contacts on the motherboard. I'll need to figure out a way to work with that.

# FFC Connectors

This one seems simpler. Essentially a Y-splitter. I'm thinking, build some custom FPC's. A male connector built into the FPC on one end and two FFC connectors on the other.

Plug the male end into the motherboard, the PSP's buttons into one FFC connector and the Arduino into the other.

I can even simplify it and omit any grounds going to the Arduino.

{% fancybox "/blog/images/consolizer - making connections/left-connector.png" "/blog/images/consolizer - making connections/left-connector-thumb.png" "Left Connector" %}

{% fancybox "/blog/images/consolizer - making connections/middle-connector.png" "/blog/images/consolizer - making connections/middle-connector-thumb.png" "Center Connector" %}

I haven't test-fitted these yet.

The plan was to print them on paper, offer it up to the motherboard and see how it fits. However, when I got my printer out it leaked ink all over my floor.

Luckily I'm visiting my parents for Christmas so I'm sure they won't mind me borrowing their printer.

# Analog Stick

The analog stick for the PSP is odd. It doesn't mound with a FFC connector (on the 2000 anyway, the 3000 does). It instead has four gold contacts on the motherboard which press against contacts on the stick.

So I need a way of intercepting these.

Again a custom FPC is on the cards, this time a dual-layer one.

Idea is it has contacts on both sides that will mate with the motherboard and stick. Ground and power can be directly connected but sense for the X and Y axis needs to be intercepted.

This is because we either need to feed to the PSP a value from our digital potentiometer when using a controller or hook it directly to the original stick when not. If we connect both at the same time it will skew the resistance and result in a stick only operating at half its range.

On the Arduino's side I intend to use an Analog Multiplexer, which essentially acts like a switch for analog signals and will allow me to route either the digital potentiometer or the original stick to the PSP.

{% fancybox "/blog/images/consolizer - making connections/analog.png" "/blog/images/consolizer - making connections/analog-thumb.png" "Analog Stick FPC" %}

# Why not do it in Software?

The PSP has two interfaces an Arduino could use to talk to it in software, USB and a Serial Port exposed via the AV socket.

There are also a number of projects attempting to do the same (external controllers) using these ports.

## Operation-Ditto

https://github.com/Operation-DITTO/Operation-DITTO

Is a project to add a second analog stick to the PSP. It uses a little microcontroller to read the stick then talk to the PSP via the serial port and gives a custom PRX (plugin that runs on the PSP) the position of the stick.

Trouble is the project has stalled as there is difficulty in getting the protocol right the PSP expects its data in.

More info can be found on the PSP Homebrew Discord.

## Remote Joy Lite

Remote Joy is an old-school program built back in the PSP's homebrew hayday. It sent data (controls and video) over USB to an app that ran on a PC. This app displayed the video from the PSP and fed controls back into the PSP.

It allowed you to essentially play games on the PSP whilst viewing them on the PC and using a controller.

This [Blog Post](https://habr.com/ru/post/213513/) (written in Russian) took the sources from that project, stripped out everything except just the remote control (no video) and re-wrote the PC app as a script to run on a Raspberry Pi.

I attempted to port the Pi script to run on the Arduino using the built in USBHost library but with little success. I could get the Arduino to connect to the PSP, importantly the custom PRX acknowledged the connection. However, no matter what I did I could not get the Arduino to send data to the PSP after the fact.

# To Finish up

In the end, I would like the Arduino and the PSP to talk at a software level.

There are so many options unlocked if that could happen. PSP app to make button mappings in real time, mappings per game etc.

However I would also like to get a version of this out and working so I'll stick with my current plan for now.

Just need to get my hands on a printer and test-fit these adapters then get them ordered.
