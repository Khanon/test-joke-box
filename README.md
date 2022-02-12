# Joke Box - How to test

## Description
This is a test to show how to handle a MySql Database from node.js on server side, and CSS dynamics to show the jokes on a Web application.

## Requirements
Please install <b>Node</b> and <b>npm</b> globally.
<ul>
<li><a href="https://nodejs.org/es/download/">https://nodejs.org/es/download/</a></li>
<li><a href="https://www.npmjs.com/">https://www.npmjs.com/</a></li>
</ul>
Also install <b>ts-node</b> globally in case you want to test the tool to store the .json file on the database. To do so execute the command <b><i>npm install -g ts-node</i></b>.

## Database
For this test I created a MySql Database instance on Amazon Web Services.
The data is stored on <i>jokes</i> table executing the .ts file <i>./server/tools/database-content-store.ts</i>
To execute this file run the command <b><i>npx ts-node ./server/tools/database-content-store.ts</i></b> from root folder (requires <b>ts-node</b>).
Anyway the content is already stored on the database.

## Microservices:
<ul>
<li>API Rest</li>
<li>Web Client</li>
</ul>

Ports **8080** and **3000** must be free !!.

## Server
The Node server is listening at **http://localhost:3000**.<br>
There are two simple GET endpoints for this test:
http://localhost:3000/randomJoke
http://localhost:3000/joke?id=[ID NUMBER]

## Client
The client for this test is launched through a Node Web Server.
This Web Server is listening at **http://localhost:8080**.

## How to run
Test designed to be executed on **Windows**.<br>
Execute batch file **build.bat** to build the project. This action is required once.
Execute batch file **start.bat** to start the microservices.
Open **http://localhost:8080** on browser to test the Web client.<br>

## Notes to improve
**GraphQL** could be implemented in the project to improve the performance of requests.
Code should be improved in many areas:
<ul>
<li>Making use of RXJS.</li>
<li>Any error should be handled.</li>
<li>Environment config and base classes should be implemented.</li>
<li>All variables should be strongly typed. 'any' type should never be used.</li>
<li>No code should be repeated, follow SOLID principles!!</li>
</ul>