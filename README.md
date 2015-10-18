1. Please start with 'npm start' or use the startup.bat file if you have Windows machine, anyway follow the 3rd step.
2. Open the browser and check out the http://localhost:8080/index.html .
3. Open CLI in the root folder of the project.
4. Type 'npm install'
5. Type 'node ./server/server.js' -> (mock-server)
5. Change to the client directory and type 'http-server' (if it's necessary, type 'npm install http-server -g')


To set the Issue date, please check the function 'updateIssues' in Tracker.js file, the Date is hardcoded.

I was not sure in minutes. I implemented that version when every minutes count and need to extend the resolve time with one day if the minutes exceed 5PM.

To run test, please use 'npm run test'.
