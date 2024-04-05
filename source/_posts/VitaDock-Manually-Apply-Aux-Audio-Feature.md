---
title: VitaDock+ Manually Apply Aux Audio Feature
tags:
  - PSVita
  - VitaDock+
image: /blog/images/vitadockaux/thumb.png
date: 2023-05-12
---

This little write up documents how to manually apply my feature change to the VitaDock+ project to enable the use of Aux Audio.

<!-- more -->

{% alert warning %}
**This is not an official process**

If something does not work please contact me rather than logging an issue on the VitaDock+ repostory. I doubt anyone will see my ramblings but i don't want to cause any extra work for those maintaining the official project!

{% endalert %}

**TLDR;** _Get to the [point](#Lets-do-it)._

The VitaDock+ is a fantastic project, you can see it [here](https://github.com/SilentNightx/VitaDockPlus).

It allows you, in combination with some PSVita plugins, to stream audio and video from your PSVita to your telly using a RPi. Essentially it gives you an experience very close to the Nintendo Switch.

When combined with a nice pretty little 3D printed dock its a really impressive setup.

{% fancybox https://cdn.thingiverse.com/assets/66/14/a0/e8/7a/featured_preview_David.O_Dock.jpg  " " %}

<p style="text-align: center">Image credit to the 3D model creator <a href="https://www.thingiverse.com/thing:3942821">here</a></p>

By default You are expected to use Bluetooth Audio and pair the PSVita with the RPi. I allong with others on the `VitaDock(+)` Discord server have had issues getting the two to pair. It seems to be very particular about the dongles it will use.

Once you have managed to pair them you have to manually connect and disconnect the RPi from within the PSVitas settings. This is a rather tedious process IMHO.

I decided to write a feature allowing someone to choose between Bluetooth audio or Aux audio. This feature is currently in a Pull Request (you can view that [here](https://github.com/SilentNightx/VitaDockPlus/pull/32)) however untill that gets merged you can manually apply those changes instead.

Read below to figure out how.

## Lets do it

{% alert info %}

Before doing this work _don't_ connect the PSVita to the RPi.

{% endalert %}

- Deploy the Experimental VitaDock+ V2 image [here](https://github.com/SilentNightx/VitaDockPlus/releases/)
  - The Raspberry Pi Imager [here](https://www.raspberrypi.com/software/) can be used.
- Once deployed insert the SD into your RPi and boot it for the first time. Let it do its first time setup.
- Now you need to copy the required files onto your RPi, how you do that is upto you (SSH, thumb drive, floppy disk...) however ensure you copy the following files to the RPi
  - Download the files needed from my fork [here](https://github.com/ste2425/VitaDockPlus/tree/addAuxInput)
  - Click the green `code` button and select `Download Zip`
  - Copy the following files over to the pi:
    | Location in Zip | Location on RPi |
    | -- | -- |
    | All the files ending in `.sh` located in `/home/pi` | `/home/pi` |
    | `vitadock.conf` located in `/home/pi` | `/home/pi` |
    | `auxAudio.png` located in `/home/pi/Pictures/Icons` | `/home/pi/Pictures/Icons` |
    | `aucAudioConfigure.png` located in `/home/pi/Pictures/Icons` | `/home/pi/Pictures/Icons` |
- Once copied you need to take ownership of the `.sh` files and mark them as executable
  - from a terminal run `cd ~ && sudo chown pi *.sh && chmod +rwx *.sh`
- Now you need to add the menu items, this is done with the `menulibre` tool
  - open a terminal and run `menulibre`
  - You may see warning messages logged but this is fine, wait till the tool opens
- when the tools GUI opens you should see the custom menu represented on the left
  - You may need to expand the `Options` item

{% fancybox /blog/images/vitadockaux/menulibre.png "Menu Libre Tool" %}

- With the `Options` menu highlighted click the `+` button in the top left.
- Now add the `Enable Aux` menu item. Set the settings as seen in the image below. Click the icon on the left to select the `auxAudio.png` image coppied earlier.
  - Be sure to tick the `Run In Terminal` tick box.
  - Note the command begins with `./`
  - Once set click the `save` button in the top left.

{% fancybox /blog/images/vitadockaux/enableAux.png "Aux Menu item settings" %}

- Now add the `Configure Aux` menu item following the same approach as above.
  - Note the command begins with `./`

{% fancybox /blog/images/vitadockaux/configureAux.png "Configure Aux Menu item settings" %}

- You can now close `Menu Libre`.
- Insert the USB Audio capture device.
- Now reboot the pi
- Launch the menu item `Enable Aux Audio`
  - This will launch the `Aux Audio Configuration tool` for you.
- There are a few information screens to read through, press `enter` to continue.
- Now select the USB Audio capture device, there will most likely only be one option to choose from.
  - The name you see will be different to mine

{% fancybox /blog/images/vitadockaux/inputSelect.png "Select USB Audio Capture Device" %}

- Next select the audio output device, this is most likely the HDMI output which will be auto selected.

{% fancybox /blog/images/vitadockaux/outputSelect.png "Select the output audio device" %}

- Now the Aux audio is fully configured, however you can re-run the configuration tool by selecting its menu item you added earlier.
- Connect the Vita to the RPi, don't forget to use a ground loop isolater to remove the hum.
- You should now be able to see and hear your vita through the TV!
