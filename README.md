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

## Server endpoints
There are two simple GET requests for this test:

http://localhost:3000/randomJoke
http://localhost:3000/joke?id=[ID NUMBER]