# Joke Box - How to test

## Description
This is a test that implements how to handle a MySql Database from node.js on server side, and a web server to show jokes on a browser.

## Requirements
Please install <b>Node</b> and <b>npm</b> globally.
<ul>
<li><a href="https://nodejs.org/es/download/">https://nodejs.org/es/download/</a></li>
<li><a href="https://www.npmjs.com/">https://www.npmjs.com/</a></li>
</ul>
Also install <b>ts-node</b> globally in case you want to test the server tool to store the <i>.json</i> data file on the database. To do so execute the command <b><i>npm install -g ts-node</i></b>.

## Database
For this test I created a MySql Database instance on Amazon Web Services.
The data is stored in the database executing the <i>.ts</i> file <i>./server/tools/database-content-store.ts</i>
To execute this file go to <i>server</i> folder and run the commands <b><i>npm install</b></i> and <b><i>npm run store-content-database</i></b> (requires <b>ts-node</b>).
Anyway the content is already stored on the database.

## Microservices:
<ul>
<li>Server</li>
<li>Web Server</li>
</ul>

Ports **8080** and **3000** must be free !!.

## Server
The Node server is listening at **http://localhost:3000**.<br>
There are two simple GET endpoints for this test:
http://localhost:3000/randomJoke
http://localhost:3000/joke?id=[ID]

## Client
The client for this test is launched through a Node Web Server.
This Web Server is listening at **http://localhost:8080**.
*JQuery* haven't beeing used in this test for performance reasons.
It uses vanilla.js approach (http://vanilla-js.com/).

## How to run
Execute batch file **build.bat** to build the project. This action is required once.
Execute batch file **start.bat** to start the microservices.
Open **http://localhost:8080** on browser to run the Web Server.<br>
In case you can't execute those batch files, please follow next steps:
- Open a terminal
- Go to <i>client</i> directory
- Run the command 'npm install'
- Run the command 'npm run build'
- Run the command 'node ./dist/launcher.js'
<br>
- Open a new terminal
- Go to <i>server</i> directory
- Run the command 'npm install'
- Run the command 'npm run build'
- Run the command 'node ./dist/app.js'

## Use cases
- Run only the <i>client</i> without <i>server</i>
  - The Web should load and show 'connecting' icon after the intro is done
- Run the <i>client</i> and <i>server</i> (happy path)
  - The web should work as expected
- Turn off the server after showing a joke
  - If the joke can't be loaded the Web should show again the 'connecting' icon
  - Running the server at this point the web should continue with more jokes
- If the user don't click in 3 seconds, a hand moving will be displayed
