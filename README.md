# CPSC304

### Demo

![alt text](demo.gif "Demo")

### Be Warned!

This starter kit uses `Sequelize` to perform ORM between JavaScript and Postgres. `Sequelize` provides convenient shortcuts for simple insert, update, and lookup (i.e. without you having to write INSERT, UPDATE, and SELECT SQL queries). For the purpose of the course project, you are responsible for meeting the minimal requirements of the project. This means that you should explicitly write out the raw SQL queries, at the minimum, as specified in your project formal specification.

## Setting Up Dev Environment (Postgres + Node) on Local Machine

### Linux

    Identical to the instructions for Windows, with one exception:
    1. Node.js doesn't have an installer for Linux. Download and extract the tar.gz file.
        - Make sure to add bin/ in the extracted folder to PATH

### Mac

    Identical to the instructions for Windows, with a few exceptions:
    0. [Optional] Install `homebrew`
        - Homebrew is a package manager for MacOS
    1. When installing postgres via GUI installer
        - The bin/ folder is not added to PATH automatically
        - The bin path should be /Library/PostgreSQL/<version>/bin
        - Alternatively you can try `brew install postgresql`, but there are problems with XCode
    2. When installing node
        - Simply run `brew install node`
        - Or download the pkg installer for Mac

### Windows

    1. Install Postgres using the GUI installer
        - https://www.postgresql.org/
        - Choose all default options
        - When prompt for password, enter `postgres`
    2. Setup the database locally
        - Use pgAdmin to access postgres graphically
        - Right-click on Databases node, and create a database called `Demo`
        - Right-click on the new `Demo` node and select `Query Tool`
        - This will bring up a place where you can execute SQL statements
        - Copy-paste db/dbscripts/CreateUsersTable.sql and execute
        - This will create a `Users` table and insert two fake users
        - Verify by running SELECT * FROM Users
    3. Install Node.js using the GUI installer
        - https://nodejs.org/en/
        - Choose the latest version, which should be v8.7.0
        - Choose all default options
    4. [Optional] Install `vue-cli`
        - https://github.com/vuejs/vue
        - Vue-cli is a npm module which allows you to quickly get started with vue
        - In PowerShell run `npm install -g vue-cli`
        - The -g option says that the module will be installed globally
    5. Clone starter code from https://github.com/belinghy/cpsc304-project-starter
        - Uses `nuxt-express` template internally
        - Nuxt.js is a module built on top of Vue.js
        - It takes care of a lot of the mechanical web dev exercises, like routing
    6. Run `npm install` in project root
        - This will install all the dependencies defined in `packages.json`
        - `packages.json` also defines other useful commands, basic info, etc
    7. Run `npm run dev` in project root
        - This will start the server
        - You should be able to see the webapp at http://localhost:3000
        - You should see the two fake users displayed on the main screen

## Running Project Locally

### Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

### Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).

## Deploy to Heroku

First, look up how to use Heroku at https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction. At the very minimum, you will need to add an Postgres add-on.

Heroku requires the root folder to contain `package.json` for Node projects, so make sure you have that (should be there by default if you haven't changed the folder structure). In order to make `nuxt` work with Heroku, follow this guide https://github.com/nuxt/docs/blob/master/en/faq/heroku-deployment.md.

Finally, you'll need to configure `server/configs/sequelize.js` to change the Postgres database connection settings, in particular the username, password, database name, host, and port. You can configure these parameters by setting them as environment variables (standard practice for production environments), which can be done through the heroku dashboard under `Settings Tab > Config Variables`. You can find these information on your project's Heroku dashboard. On the same page, you'll also find a command which allows you to launch psql, you can use it to initialize your database.
