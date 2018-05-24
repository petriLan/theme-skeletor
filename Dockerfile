FROM wordpress:4.9.5-php7.2-apache

## Copy our customer-specific things to the Docker image
## TODO This is still pretty sloppy (e.g. we don't need to include code, only compiled)
COPY htdocs/wp-content/themes/theme-skeletor /var/www/html/wp-content/themes/theme-skeletor
COPY htdocs/wp-content/mu-plugins /var/www/html/wp-content/mu-plugins
COPY htdocs/wp-content/plugins /var/www/html/wp-content/plugins
