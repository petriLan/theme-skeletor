# redandblue theme-skeletor

This is _the_ starter kit for creating new customer-specific WordPress setups.

This is stand-alone package for the customer's project. It requires base project (e.g. plain WordPress or Skeletor) in order to run.

# Getting started

There's now 2 ways to run with this project.

1.  Old, slightly heavier way with our old, magnificent Skeletor 🙊
2.  New, more lightweight approach with Docker 🐳 

Choose your flavour (also depending on project), instructions below.

## Option 1) with Vagrant

This method still works, but we'll deprecate this method soon.
Lightweight approach with Docker is more versatile and works in all environments,
so it's no Seravo-specific as Skeletor is. If you are creating new project / theme check out step 3
a

1.  Install our CLI: `[sudo] npm install -g yo @redandblue/generator-redandblue`
2.  Kickstart the project: `yo @redandblue/redandblue:wordpress`
3.  Yeoman is a nice guy and will guide you through the rest of the setup

> You need to have Node.js 8+, NPM, Vagrant, Composer, etc. installed

## Option 2) Creating new theme

This method is when you create your new theme / project for a new client.
Tested with Vagrant, should also work with Docker

Note, you can also setup customer project with one-liner if you prefer:
`yo @redandblue/redandblue:wordpress --base="Seravo/wordpress" --project="redandbluefi/theme-skeletor"`

1.  `npm install -g yo @redandblue/generator-redandblue`
2.  `yo @redandblue/redandblue:wordpress`
3.  `cd htdocs/wp-content/themes/theme-skeletor`
4.  `git remote remove origin`
5.  Create new empty repository in Github eg. -> client-theme
6.  `git remote add origin git@github.com:redandbluefi/[client-theme].git`
7.  Push the content to new repo `git push -u origin master`
8.  Change theme-skeletor references -> client-theme
9.  Remember to edit config.yml file to match your project name.
10. Profit
11. Remember to enable theme `wp theme activate client-theme`
12. Run composer on custom folder to get starter plugins `cd /custom && composer install`
13. Edit correct urls to `config.json` in `htdocs/wp-content/themes/client-theme`
13. `cd /htdocs/wp-content/themes/theme-name && npm install && npm run build`
14. `vagrant up` (if you haven't already)

## Option 3) with Docker

1.  Clone this project
2.  Edit `/etc/hosts` and add your preferred hostname
    - e.g. `127.0.0.1 theme-skeletor.local`
3.  Run `echo "DB_PASSWORD=$(pwgen -nys 10 1)" > .env`
4.  Run `composer install [-d custom/]`
5.  Run `docker-compose up`
6.  Access your new WordPress at `http://theme-skeletor.local:8080`

> You need to have Docker installed
> Set up "SENDGRID_API_KEY" in your .env file if you need to send emails

# Where to go next?

Next you'll probably want to start writing code. Check out
`docs/Development.md` for some tips how to get started with that.

Once you're done with your code, checkout the `docs/Deployment.md` on
how to get your code running on other environments than your local machine.
