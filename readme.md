This is a simple boilerplate made with :
- Express
- Sequelize / Mysql for the DB
- Better-auth for authentication
- A custom engine / parser

Instructions : Just download the repo and ...
- npm run start for developpment
- npm run build for production (you need to take off the 'node devTools/build.js && ' part inside the build script in package.json ; 'build.js' is just a script that will delete all files in the dist folder before building ...)

Example of a .env file :

```
NODE_ENV = 'development'
# NODE_ENV = 'test'
# NODE_ENV = 'remote'

# --------------------------------------- #
PORT = 8080

APP_NAME = my-app
APP_URL_1 = http://localhost:8080
APP_URL_2 = http://127.0.0.1

LOG_LEVEL = 'silly'
LOG_PATH = '../../logs'
PUBLIC_PATH = '../public'
VIEW_PATH = '../views'

# USE_SOCKET = true

# --------------------------------------- #
# BETTER_AUTH_URL = http://localhost:8080
BETTER_AUTH_SECRET = my-better-auth-secret
# BETTER_AUTH_FORCE_APPROVAL = true
BETTER_AUTH_FORCE_ENABLE_TWOFA = true

# --------------------------------------- #
# NODEMAILER
NODEMAILER_HOST = smtp.ethereal.email
NODEMAILER_PORT = 587
# NODEMAILER_SECURE = true
NODEMAILER_SMTP_USER = (check_the_nodemailer_docs)
NODEMAILER_SMTP_USER_EMAIL = (check_the_nodemailer_docs)
NODEMAILER_SMTP_PASSWORD = (check_the_nodemailer_docs)

# --------------------------------------- #
# DB
DB_HOST = localhost
DB_USERNAME = 'root'
DB_PASSWORD = ''
DB_DATABASE = test
DB_DIALECT = 'mysql'
```