# Server sided
[![CodeFactor](https://www.codefactor.io/repository/github/cubebeveled/server-sided/badge)](https://www.codefactor.io/repository/github/cubebeveled/server-sided)<br>
A modpack that only needs to be installed server side

# Minimum system requirements
* Good CPU (The worst the cpu, the slower the server will be)
* 8 GB of ram
* 2 GB disk
* Network connection

# How to install
* Download the zip from [the latest modpack version](https://modrinth.com/modpack/server-sided/versions)
* Unzip it
* Download [Fabric for 1.20.1](https://fabricmc.net/use/server/) and install it
* Run the server by running the fabric server launcher

[Tutorial for installing and running a 1.20 fabric server](https://www.youtube.com/watch?v=sg91I4vg7ew) (make sure to download the mods and put the in the mods directory)

# Known Errors
```log
[15:11:31] [Worker-Main-5/ERROR]: Couldn't parse element loot_tables:ctov:chests/village/village_forager
com.google.gson.JsonSyntaxException: Missing expand, expected to find a Boolean
```
* Description: some CTOV loot table failed to be parsed
* Fix: not needed
* Effects: none
* Side effects: none
___

```log
[15:13:52] [Server Watchdog/ERROR]: A single server tick took 60.01 seconds (should be max 0.05)
[15:13:52] [Server Watchdog/ERROR]: Considering it to be crashed, server will forcibly shutdown.
Crash report:
---- Minecraft Crash Report ----
```

* Description: The server was too busy generating the world, and it considers itself crashed since a tick took so long
* Fix: Start the server again
* Effects: The world has been created and the spawn area generated

___

# Yoink Credits
* Auto release workflow yoinked from the [GT New Horizons](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack) modpack
