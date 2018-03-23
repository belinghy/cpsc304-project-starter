# CPSC304

## Demo
*Live Demo*: https://304demoproject-ejhdpgkdmg.now.sh/
![alt text](demo.gif "Demo")

## Be Warned!

This starter kit uses `Sequelize` to perform ORM between JavaScript and Postgres. `Sequelize` provides convenient shortcuts for simple insert, update, and lookup (i.e. without you having to write INSERT, UPDATE, and SELECT SQL queries). For the purpose of the course project, you are responsible for meeting the minimal requirements of the project. This means that you should explicitly write out the raw SQL queries, at the minimum, as specified in your project formal specification.

## Setting Up Dev Environment (Postgres + Node.js) on Local Machine

Before you install Postgres DBMS on your machine, you might want to consider running the database server remotely with ElephantSQL (see near end of this page). Reason being that running a full DBMS like Postgres on your local machine just for one project seems to be wasteful. Of course, if you are going to use RDBMS regularly for other projects, or if you want to be able to work without internet connection, then you should set up on local machine.

### Linux

    Identical to the instructions for Windows, with one exception:
    1. Node.js doesn't have an installer for Linux. Download and extract the tar.gz file.
        - Make sure to add bin/ in the extracted folder to PATH

### Mac

    Identical to the instructions for Windows, with a few exceptions:
    0. [Optional] Install `homebrew`
        - Homebrew is a package manager for MacOS, continue to 2.
    1. When installing postgres via GUI installer
        - *SKIP* If you are going to use ElephantSQL
        - The bin/ folder is not added to PATH automatically
        - The bin path should be /Library/PostgreSQL/<version>/bin
        - Alternatively you can try `brew install postgresql`, but there are problems with XCode
    2. When installing node
        - Simply run `brew install node`
        - Or download the pkg installer for Mac

### Windows

    1. Install Postgres using the GUI installer
        - *SKIP* If you are going to use ElephantSQL, continue to 2. But read Running Postgres Server with ElephantSQL first.
        - https://www.postgresql.org/
        - Choose all default options
        - When prompt for password, enter `postgres`
    2. Setup the database locally/remotely
        - Use pgAdmin to access postgres graphically or use the web console
        - [Local] Right-click on Databases node, and create a database called `Demo`
        - [Local] Right-click on the new `Demo` node and select `Query Tool`, this will bring up a place where you can execute SQL statements
        - Copy-paste db/CreateUsersTable.sql and execute
        - This will create a `Users` table and insert two fake users
        - Verify by running SELECT * FROM Users
    3. Install Node.js using the GUI installer
        - https://nodejs.org/en/
        - Choose the latest version, which should be v8.7.0
        - Choose all default options
    4. [Optional] Install Git for Windows
        - Installing Git for Windows lets you run the commands in this document as is
        - You can also use PowerShell, but you'll need to change the way environment variables are set in `env_setup`
        - There should be a context menu option for launching Git Bash, use that
    5. Clone starter code from https://github.com/belinghy/cpsc304-project-starter
        - Uses `nuxt-express` template internally
        - Nuxt.js is a module built on top of Vue.js
        - It takes care of a lot of the mechanical web dev exercises, like routing
    6. Run `npm install` in project root
        - This will install all the dependencies defined in `packages.json`
        - `packages.json` also defines other useful commands, basic info, etc
    7. Run `npm run dev` in project root
        - This will start the server
        - You might need to modify `env_setup` file if your database wasn't set up identical to mine, or if you are using ElephantSQL (see below)
        - You should be able to see the webapp at http://localhost:3000
        - You should see the two fake users displayed on the main screen

## Running Project Locally (UI Only)

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

## Deploying to Remote Servers

If you are not already familiar with Heroku, it is recommended that you use ElephantSQL + Now over Heroku (In my opinion it's the easier route). If you are familiar with Heroku, you are encouraged to try out new things. Nevertheless, it is possible to deploy to either.

### Running Postgres Server with ElephantSQL (Recommended)

ElephantSQL (https://www.elephantsql.com/plans.html) provides Postgres as a service. The free tier allows 20 MB of data and 5 concurrent connections, which is more than enough for the purpose of the course project. Signing up is extremely easy and it even provides a web console from running SQL commands -- All you need to do is to copy your database script (i.e. `db/CreateUsersTable.sql`) into the console and execute.

Again, you need to modify `env_setup` file to get the UI to connect to your remote Postgres server. Every time after you modify this file or if you restart your shell, you should run `source env_setup` in your terminal to set environment variables. If you are using PowerShell on Windows, you can set environment variables like `$env:DB_NAME = "Demo"`, instead of `export DB_NAME=Demo` etc.

### Deploying Node.js UI to Zeit Now (Recommended)

`Now` is a deployment tool developed by Zeit (https://zeit.co/). It supports all things Node.js and Docker (for those familiar with containers). For our purposes, all you need to know is that as long as your package has a `package.json` file at the root folder, and the file has appropriate commands defined in it (i.e. `npm run build` and `npm start`), `Now` simply uploads your source code and executes those two commands (which is what you'd do manually if you have access to an AWS virtual machine, say.)

First, you need to download `now-cli` by running `npm install -g now-cli`. Another nice thing about `Now` is that the only dependency it needs is the Node.js environment, but you already have this set up since you are working on a Node.js project.

Then, normally you can deploy your project by simply running `now` in your terminal. However, for this project, we need to make sure we have the database connections properly configured. Again, make sure you have `env_setup` configured correctly and you have ran `source env_setup` in your current shell session. Then you want to run the command in `deploy_now` file to tell `Now` to use the correct environment variables. The first time you run it, you will be asked to login using an email -- If you haven't done so already, registering an account take about two minutes. Run `now ls` and it'll spit out an url for your application.

Some useful commands:

1. `now ls` tells you the instances you have running. With a free tier account, you can only run up to three instances.
2. `now rm <instance_id>` lets you remove an instance.
3. `now logs <instance_id>` shows you the console logs for your application.

### Deploy to Heroku

First, look up how to use Heroku at https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction. At the very minimum, you will need to add an Postgres add-on.

Heroku requires the root folder to contain `package.json` for Node projects, so make sure you have that (should be there by default if you haven't changed the folder structure). In order to make `nuxt` work with Heroku, follow this guide https://github.com/nuxt/docs/blob/master/en/faq/heroku-deployment.md.

Finally, you'll need to configure `server/configs/sequelize.js` to change the Postgres database connection settings, in particular the username, password, database name, host, and port. You can configure these parameters by setting them as environment variables (standard practice for production environments), which can be done through the heroku dashboard under `Settings Tab > Config Variables`. You can find these information on your project's Heroku dashboard. On the same page, you'll also find a command which allows you to launch psql, you can use it to initialize your database.

## Random

1. Why Node.js?

    Node.js is easy to set up on all platforms. For a project of this size, performance doesn't really matter. Plus the majority of application is really just displaying information from databases.

2. Why Nuxt.js (Vue.js)?
    
    Vue.js is very easy to learn, and is as powerful as other popular alternatives (like React) once you know how to use it.  Nuxt.js makes it so that you can focus on making the content of your website and provides additional benefits like server side rendering.

3. Why is the website so ugly?

    It doesn't use any CSS libraries (like Bootstrap and Semantic UI); this was to improve performance by reducing amount of data that's needed to be transfered over the internet.  As is, the layout is quite responsive and delivers consistent user experience on desktop and mobile.
    
