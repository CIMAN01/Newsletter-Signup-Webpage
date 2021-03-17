A signup app that runs a dynamic webpage where people signup for newletters, or similar, by entering their full names and email addresses.

The webpage runs on a local server using Node.js (as backend), the Express framework, and the Mailchimp API. However, it can also be run on external servers via Heroku.

This app includes three separate html files (and one css file) that use the Bootstrap framework. 

The "node_module" folder is empty, but should contain a lot of files once the npm package manager (external Node modules) has been installed alongside Express in the Hyper CLI.

Hyper commands:

npm init  
npm install express
npm install -g nodemon 
nodemon app.js (monitors changes made in app.js instead of running node app.js multiple times)

To run locally open your browser and type	localhost:3000 inside the address bar and hit enter. 
