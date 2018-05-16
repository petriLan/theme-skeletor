# How to roll with Docker

## Locally (or CI)

1.  Make sure the project runs on your local (= everything compiled, etc)
2.  Make sure you're on right project: `gcloud config set project duodecim-203606`
3.  Modify one file to correct path:
    * Modify: htdocs/wp-content/themes/duodecim-theme/includes/enqueue.php
    * Modify `WPT_ENQUEUE_STRIP_PATH` to `/var/www/html`
4.  Authenticate Docker with Google Cloud: `gcloud auth configure-docker`
5.  Build the Docker image: `docker build -t redandblue/duodecim-ebmeds .`
6.  Tag the image for Google Cloud: `docker tag [SOURCE_IMAGE] [HOSTNAME]/[PROJECT-ID]/[IMAGE]`
    * e.g. `docker tag redandblue/duodecim-ebmeds eu.gcr.io/duodecim-203606/duodecim-ebmeds`
7.  Push the image to Google Cloud Registry `docker push [HOSTNAME]/[PROJECT-ID]/[IMAGE]`
    * e.g. `docker push eu.gcr.io/duodecim-203606/duodecim-ebmeds`

---

## On server

1.  `google auth configure-docker` (if not done yet)
    * Sometimes it says it works, but image pull still fails
    * If that happens, try: `gcloud docker -a`
2.  `[sudo] docker pull eu.gcr.io/duodecim-203606/duodecim-ebmedss` should now work
3.  Start the whole thing with: `[sudo] docker-compose up -d`

# How to use Docker

## Access WP-CLI with:

`docker-compose run --rm wp-cli`

Recommend doing this: alias wpd='docker-compose run --rm wp-cli'
Then use it with 'wpd' as you would normally with 'wp', e.g. "wpd user list"

## First time setup

* wpd core install --url=http://duodecim.local:8080 --title=Duodecim --admin_email=admin@duodecim.local --admin_user=vagrant --admin_password=vagrant
* wpd core is-installed
* wpd plugin activate --all

## Access bash inside Docker

`docker exec -it $(docker ps --format "{{.ID}}" --filter="name=wordpress_1") sh`
That will open you terminal inside the Wordpress image

## Shutdown, remove everything and then restart:

`docker-compose down --volumes && rm -rf tmp/ && docker-compose rm -sf && docker-compose up`
