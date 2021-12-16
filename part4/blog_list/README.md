# Bloglist #


# How to start a project in backend: #

## Initialize project ##

1. npm init (see "package.json" for example)
2. npm install --save-dev nodemon
3. In package.json, under "scripts" add: 
    1. "start": "node index.js", (You can run the program with "node index.js" but with this script you can run it with "npm start")
    2. "dev": "nodemon index.js", (You can run the program in dev mode with nodemon with "node_modules/.bin/nodemon index.js" but now you can run it with "npm run dev")
    3. "test": "echo \"Error: no test specified\" && exit 1"
4. Create a .gitignore file and add "/node_modules" and ".env" to it
5. Create a index.js file
6. Run "npm install ..." for:
    1. express 
    2. cors
    3. mongoose
    4. eslint --save-dev
        1. Initialize a default ESlint configuration with the command: "node_modules/.bin/eslint --init" (see ".eslintrc.js" for example)
        2. Add npm script "lint": "eslint ." so you can use "npm run lint" to check every file in the project
        3. Create a ".eslintignore" file and add "build" to it to ignore all files in the frontend build 
    5. dotenv

## Connecting to MongoDB ##
1. Create a new project
2. Create a cluster
    1. AWS, Frankfurt
3. Database Access 
    1. Add a New user with read and write permissions
4. Network Access
    1. Allow access from anywhere
5. Clusters -> Connect
    1. Connect your application
    2. MongoDB URI 
        1. Create a .env file
        2. Add this link to your .env file with your password and database name into the link

## Connect to Heroku ##
1. Create a "Procfile" and add "web: npm start" to it for Heroku
