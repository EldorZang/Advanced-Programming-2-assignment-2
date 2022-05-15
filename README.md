# Authors
Dor Sror, 207271875  
Eldor Zang, 315232942  
# Messaging Platform
This project is a messaging platform built with React.  
Includes: Home, Login, Register and Chat pages.  
Supported message formats: Text, Photos, Videos and Recordings.  
# Existing users:
User Name | Nick Name | Password | Contacts
--- | --- | --- | --- |
bob123 | Bob | bob_pass | alice123, oliver123, olivia123, linda123, frank123
alice123 | Alice | alice_pass | bob123
oliver123 | Oliver | oliver_pass | bob123
olivia123 | Olivia | olivia_pass | bob123
linda123 | Linda | linda_pass | bob123
frank123 | Frank | frank_pass | bob123

# Running
1. Create a new project:  
`npx create-react-app projectname`  
2. Copy both src and public folders to project directory (overwrite new files).  
3. Navigate to the project directory:  
`cd projectname`  
4. Install dependencies (JQuery, Bootstrap, React-Bootstrap and React-Router):  
`npm install react-bootstrap bootstrap react-router-dom jquery --save`
5. Start React:  
`npm start`  
6. Navigate to [http://localhost:3000](http://localhost:3000) in order to view it in your browser.  

Please note, that in Google Chrome (in opposed to Firefox) forms aren't automatically out-focused when disabled buttons are clicked. Therefore using Google Chrome browser requires clicking the background (or any other not-focused element) before clicking the login button.
