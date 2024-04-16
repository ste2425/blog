---
title: Remembering when I made a simple Canbus sniffer
tags:
  - Electron
  - CanBus
date: 2024-04-16
---

A while ago i was planning a project (which i intend to come back to) to make my own power folding mirrors control module. It was going to be Arduino based and integrate with the vehicle via CanBus. Infact i made a proof of concept which can be seen on my GitHub [here](https://github.com/ste2425/powerfoldMirrors).

<!-- more -->

Before i could actually make that proof i needed to know what CAN messages meant what. So i embarked on a little project to write an Electron app accompanied by an Arduino app to help me viaualise the messages and figure what meant what.

At the time i hadn't used Electron for quite a while. the last project was a little utility to help me manage running multiple dotnet core apps [also on my Github](https://github.com/ste2425/DotnetRunner). It was even oilder so figured this would be a good learning opportunity to see how Electron has changed in that time.

I was using TypeScript heavily by this point (still do is great) but wanted to see if i could have the same development experience as TS but with plain vanilla JS. This again seemed the perfect chance to try it. So the stage was set, i would be using electron with plain JS and using JSDoc comments for typings.

# Two halves of a coin

So the tool was built in two sections, there was Arduino code which actually communickated with the vehicle and an Electron app which communicated with the Arduino to display and aggregate the data.

### Arduino
The Arduino code can be viewed [here](https://github.com/ste2425/Electron-CAN-viewer/blob/master/Arduino/arduino.ino) but it was rather simple. It would recieve command signals via serial and when enabled send recioeved CAN messages back.

Each block in the can message was delimiated with a pipe `|` and each message with a new line. The first block was the message and the remaining number of blocks was variable depending on how many were actually in the message.

```c++
void sendData() {  
  tCAN message;

  if (mcp2515_check_message()) 
  {
    if (mcp2515_get_message(&message)) 
    {      
      Serial.print(message.id, HEX);
      Serial.print("|");
            
      for(int i=0;i<message.header.length;i++)
      {
        Serial.print(message.data[i]);
        Serial.print("|");
      }
      Serial.println("");
    }
  }
}
```

## Electron
The electorn side was a little more involved, its source is int he root of the repository [here](https://github.com/ste2425/Electron-CAN-viewer/).

At the time i wasn't aware of the [Web USB](https://developer.mozilla.org/en-US/docs/Web/API/USB) so used a 3rd party NodeJS library for Serial comms. This mean that i had to get the dat aout of the main thread in NodeJS land into the Renderer thread for rendering.

An even system was used for this, which even now I'm quite pleased with.

```js
// In Main
const coms = new SerialComs();

coms.on(SerialComs.events.Data, (data) => sendToWindow(ipcEvents.CANMessage, data));

function sendToWindow(e, d) {
    const window = BrowserWindow.getFocusedWindow();

    if (window && window.webContents)
        window.webContents.send(e, d);
}

//In Preload
ipcRenderer.on(ipcEvents.CANMessage, (e, d) => {
    renderMessages(d);
});
```

Once the messages were in i used HTML templates to dictate how each row in the table would be rendered and used a very basic homebrewed templating system. The source can be seen [here](https://github.com/ste2425/Electron-CAN-viewer/blob/master/preload.js#L216) but what it did was aggregate the data into a key value object. Then for each key in that object do a string find teplace on the template HTML looking for a block that matched `{{<KEY>}}` and replace it with the value.

It was ugly but worked.

That was pretty much it. It had features that highloghted data changes and allowed me to take notes as to what caused the change. I could filter by message id and export the table once i was finished.

# But it was ugly

Looking back i see so much i would do differently, but some bit i was pleased with. 

The event based architecture I'm quite proud of. It worked well and was extensible.

I hated the folder structure (for somereason all the electron code was in the root of the repo) and i wish i had used a proper templating library like VueJS. Also i wished i had leveraged WebComponents like i have in some other projects, it would have simplified the rendering and allowed me to implement data transforms amongst other things.

All in all it was a fun project and served its purpose. Looking over the code now I'm not too horrified.
