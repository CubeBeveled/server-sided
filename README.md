# Server sided
A modpack that only needs to be installed server side

# Minimum system requirements
* Good CPU
* 8 GB of ram
* 2 GB disk
* Network connection

# How to install
* Download this repository via [this link](https://codeload.github.com/CubeBeveled/server-sided/zip/refs/heads/main)
* Unzip it
* Run install.bat or install.sh depending on your OS
  * This will download the [fabric server jar](https://fabricmc.net/use/server/) and an [eula.txt](https://bevels-files.vercel.app/eula.txt) file
  * curl is required
* Run start.bat or start.sh depending on your OS
  * This will just start the fabric server
  * **NOTE:** The server will most probably crash on first startup due to a tick timeout error because its generating the world. After the crash, restart it, it should work. If this crash didnt happen, congrats! You have good server hardware

# Known Errors

```
[15:11:31] [Worker-Main-5/ERROR]: Couldn't parse element loot_tables:ctov:chests/village/village_forager
com.google.gson.JsonSyntaxException: Missing expand, expected to find a Boolean
```
* Description: some CTOV loot table failed to be parsed
* Fix: not needed
* Effects: none
* Side effects: none
___
```
[15:13:52] [Server Watchdog/ERROR]: A single server tick took 60.01 seconds (should be max 0.05)
[15:13:52] [Server Watchdog/ERROR]: Considering it to be crashed, server will forcibly shutdown.
Crash report:
---- Minecraft Crash Report ----

```
* Description: The server was too busy generating the world, and it considers itself crashed since a tick took so long
* Fix: Start the server again
* Effects: The world has been created and the spawn area generated
* Side effects: Can scare some people and think the modpack is broken
___

# Yoink Credits
* Auto release workflow yoinked from the [GT New Horizons](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack) modpack