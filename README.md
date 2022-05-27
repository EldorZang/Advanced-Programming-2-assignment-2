# Authors
Dor Sror, 207271875  
Eldor Zang, 315232942  
# Messaging Platform
This project is a messaging platform built with React.  
Includes: Home, Login, Register and Chat pages.  
Differences from assignment 1:
1. Text only messages.
2. Due the api lack of pictures support, all users will have a default picutre.

# Existing users:
User Name | Nick Name | Password | Contacts
--- | --- | --- | --- |
bob123 | Bob | bob_pass | alice123, oliver123, olivia123, linda123, frank123
alice123 | Alice | alice_pass | bob123
oliver123 | Oliver | oliver_pass | bob123
olivia123 | Olivia | olivia_pass | bob123
linda123 | Linda | linda_pass | bob123
frank123 | Frank | frank_pass | bob123

# Preparing all files
Creating Servers from git files: 
React Server:  
1. Create a project using the template ASP.NET CORE with React.js and call it ReactServer.
2. Copy public and src folders from git to project/ClientApp folder (overwrite new files).
3. In console, navigate to project directory.
4. Install dependencies (JQuery, Bootstrap, React-Bootstrap  signalr and React-Router):  
`npm install react-bootstrap bootstrap react-router-dom@6 jquery @microsoft/signalr --save`

Api Server:  
1. Create a project using the template ASP.NET CORE Web API and call it ApiServer.
2. Delete WeatherForecast files from project folder and Controllers folder.
4. Copy Models, Hubs and Controllers folder from git to project's folder (overwrite new files).
5. Copy program.cs file to project's folder.
8. Check server address WITHOUT TRAILING SLASH (usually something like http://localhost:7050) - easiest way is to run the server and check its address.
9. Open ReactServerProject/ClientApp/src/App.js and change line 9 with new server address.
10. Open ApiServer/Controller/apiController.cs and change line 18 with new server address.
11. Open ApiServer/Models/UsersDb.cs and change line 21 with new server address.

Ratings Server:  

# Notes
1. In Google Chrome (in opposed to Firefox) forms aren't automatically out-focused when disabled buttons are clicked. Therefore using Google Chrome browser requires clicking the background (or any other not-focused element) before clicking the login button.
2. The api implements some more neccessary http calls (such as register/login). Please do not manually send those new requests.
