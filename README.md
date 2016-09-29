# Tick-Tack-Doughnuts
Tick Tack Doughtnuts is a traditional Tic-tac-toe game which enables users to play in a modern web-browser.  Disrupted play can be continued within the same web-browser, provided the user has not destroyed the browser history.

## The Challenge
To build a tic-tac-toe game in JavaScript that can be played in a browser.

### Requirements
* The user can compete against a computer player in a 3×3 grid. 
* The computer player doesn’t need to be super smart.
* IMPORTANT: If the user closes their browser or navigates away from the site by accident, they have to be able to continue the interrupted game later on.

### Assumptions
* It is only necessary to support modern browsers, whereby modern is delimited to those which support localStorage.
* Any person using the same browser can be interpreted as the same user.
* The user does not need to be able to play from a different browser.
* Reseting the history or using an incognito window will invalidate the requirement for resumed play.


## Installation:
1. git clone git@github.com:nilvon9wo/Tick-Tack-Doughnuts.git
2. npm install

## Play
1. npm start
2. browse http://localhost:3000

## Run Tests
* Unit tests: npm test
* Lint: npm run lint

## Tested environments:
### Operating System: 
* Windows Version 5.1 (Build 2600.xpsp_sp3_qfe.160814-1135: Service Pack 3)
### Node: 
* v5.12.0
### Web browsers:
* Google Chrome Version 49.0.2623.112 m
* Mozilla Firefox 47.0.1
* Mozilla Firefox Developer Edition 51.0a2(2016-09-28)(32-bit)

 


## Further Reading:
* About Tic-tac-toe: https://en.wikipedia.org/wiki/Tic-tac-toe
* About Tic-tac-toe AI with JavaScript: https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
