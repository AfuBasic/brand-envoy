FROM php:8.2-apache

# Install required PHP extensions (pdo_mysql, curl)
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite

# Apache rewrite configuration for /api URL rewriting
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/override.conf \
    && a2enconf override

# Copy backend files into DocumentRoot
COPY . /var/www/html/

# Copy Apache htaccess for clean routing
RUN echo 'RewriteEngine On\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteRule ^(.*)$ index.php [QSA,L]' > /var/www/html/.htaccess

EXPOSE 80
