# nodejs-bekend
My small experiment on [node.js http module](https://nodejs.org/api/http.html). Trying to create a web server
with my own [Express](https://github.com/expressjs/express)-like framework
## Build instructions
To build and run, you can simply clone this repo for example:
```
git clone https://github.com/hmsgobrr/nodejs-bekend.git
```
Then install all of the necessary packages (make sure you have downloaded [node.js](https://nodejs.org/en/), I use v18.13.0 so it's recommended to install the same version or higher):
```
npm install
```
After that, use the following commands to compile the TypeScript scripts and then run the app
```
npm run build   # compiles the TypeScript scripts
npm start       # runs the app
```
Or.. you can also use this command that compiles and then automatically runs the app:
```
npm run dev
```
