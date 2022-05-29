# Authors
Dor Sror, 207271875  
Eldor Zang, 315232942  
# Messaging Platform
This project is a messaging platform built with React.  
Includes: Home, Login, Register and Chat pages.  
Differences from assignment 1:
1. Only text messages.
2. Due the api lack of pictures support, all users will have a default picutre.

# Existing users:
User Name | Nick Name | Password | Contacts
--- | --- | --- | --- |
bob123 | Bob | bob_pass | alice123, oliver123, olivia123
alice123 | Alice | alice_pass | bob123
oliver123 | Oliver | oliver_pass | bob123
olivia123 | Olivia | olivia_pass | bob123


# Preparing all files
Creating Servers from git files:  

**React Server:**
1. Create a project using the template ASP.NET CORE with React.js and call it ReactServer.
2. Copy public and src folders from git to project/ClientApp folder (overwrite new files).
3. Copy program.cs to project's directory.
4. In console, navigate to project/ClientApp.
5. Install dependencies (JQuery, Bootstrap, React-Bootstrap  signalr and React-Router):  
`npm install react-bootstrap bootstrap react-router-dom@6 jquery @microsoft/signalr --save`

**Api Server:**  
1. Create a project using the template ASP.NET CORE Web API and call it ApiServer.
2. Delete WeatherForecast files from project folder and Controllers folder.
4. Copy Models, Hubs, Controllers and Services folder from git to project's folder (overwrite new files).
5. Copy program.cs file to project's folder.
8. Check Api Server address **WITHOUT TRAILING SLASH** (usually something like https://localhost:7050) - easiest way is to run the server and check its address.
9. Open ReactServerProject/ClientApp/src/App.js and change line 9 with new Api server address.
10. Open ApiServer/Controller/apiController.cs and change line 18 with new Api server address.
11. Open ApiServer/Models/UsersDb.cs and change line 21 with new Api server address.

**Ratings Server (Main Server):**  
1. Copy advanced-programming-2-backend.
3. In the solution, create a new SQL server named (localdb)\MSSQLLocalDB and inside a new database object named advanced-programming-2-backend.Data  
   (In VS: Open View->SQL Server Object Explorer, right click on SQL Server->Add SQL Server, choose from Local menu MSSQLLocalDB and click connect.
   Then, in the server dropdown choose Add new DataBase and choose name advanced-programming-2-backend.Data)
4. Install Microsoft.EntityFrameworkCore from NuGet (In VS:Tools->NuGet Package Manager->Mange NuGet packages for solution.
5. In Nuget console (In VS click Tools->NuGet Package Manager->Package Manager Console) enter:  
`update-database`
6. Open advanced-programming-2-backend/Views/Shared/\_Layout.cshtml and change line 23 with the React Server address (usually something like https://localhost:7050).

# Running
1. Navigate to project folder.
2. Enter to each server folder and run:  
`dotnet run`
(Alternativly, it is more preffered to run with VS)
# Notes
1. Updating the readme after submission time was allowed by TA Yotam - meaning the assignment is only 1 day late (instead of 2).
1. In Google Chrome (in opposed to Firefox) forms aren't automatically out-focused when disabled buttons are clicked. Therefore using Google Chrome browser requires clicking the background (or any other not-focused element) before clicking the login button.
2. The api implements some more neccessary http calls (such as register/login). Please do not manually send those new requests.
3. The Ratings Server works only in http.
4. Sometimes entering the React Server initialized url is required to enable SPA proxy (and then redirecting to actual server).
