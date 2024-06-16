# Server sided
A modpack that only needs to be installed server side

# How to install
* Download this repository via [this link](https://codeload.github.com/CubeBeveled/server-sided/zip/refs/heads/main)
* Unzip it
* Run install.bat or install.sh depending on your OS
  * This will download the [fabric server jar](https://fabricmc.net/use/server/) and an [eula.txt](https://bevels-files.vercel.app/eula.txt) file
  * curl is required
* Run start.bat or start.sh depending on your OS
  * This will just start the fabric server
  * **NOTE:** The server will most probably crash on first startup due to a tick timeout error because its generating the world. After the crash, restart it, it should work. If this crash didnt happen, congrats! You have good server hardware