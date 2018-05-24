# redandblue theme-skeletor

This is _the_ starter kit for creating new customer-specific WordPress setups.

This is stand-alone package for the customer's project. It requires base project (e.g. plain WordPress or Skeletor) in order to run.

# Getting started

There's now 2 ways to run with this project.
1. New, more lightweight approach with Docker 🐳
2. Old, slightly heavier way with our old, magnificent Skeletor 🙊

Choose your flavour (also depending on project), instructions below.

## Option 1) with Docker

1. Clone this project
2. Edit `/etc/hosts` and add your preferred hostname
    * e.g. `127.0.0.0    theme-skeletor.local`
3. Run `echo "DB_PASSWORD=example123" > .env`
4. Run `docker-compose up`
5. Access your new WordPress at `http://theme-skeletor.local:8080`

> You need to have Docker installed

## Option 2) with Vagrant [Deprecated]

This method still works, but we'll deprecate this method soon.
Lightweight approach with Docker is more versatile and works in all environments,
so it's no Seravo-specific as Skeletor is.
a
1.  Install our CLI: `[sudo] npm install -g yo generator-redandblue`
2.  Kickstart the project: `yo redandblue:wordpress`
3.  Yeoman is a nice guy and will guide you through the rest of the setup

> You need to have Node.js 8+, NPM, Vagrant, Composer, etc. installed

# Where to go next?

Next you'll probably want to start writing code. Check out
`docs/Development.md` for some tips how to get started with that.

Once you're done with your code, checkout the `docs/Deployment.md` on
how to get your code running on other environments than your local machine.
