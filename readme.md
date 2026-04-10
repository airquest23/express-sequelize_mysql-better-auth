This is a simple boilerplate made with :
- Express
- Sequelize / Mysql for the DB
- Better-auth for authentication
- A custom engine / parser

Instructions : Just download the repo and ...
- npm run start for developpment
- npm run build for production (you need to take off the 'node devTools/build.js && ' part inside the build script in package.json ; 'build.js' is just a script that will delete all files in the dist folder before building ...)