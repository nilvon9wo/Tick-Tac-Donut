/// <reference path='../declarations/node/node.d.ts' />
/// <reference path='../declarations/express/express.d.ts' />

// Loosely derived from 
// http://www.software-architects.com/devblog/2014/06/04/Learn-by-Example-AngularJS-NodeJS-and-Typescript    

require('envs');

const express = require('express');
const app = express();
const port: number = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);

console.info(`Listening to port: ${port}`);
