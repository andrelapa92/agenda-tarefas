FROM php:8.2-fpm

RUN docker-php-ext-install pdo_mysql

WORKDIR /var/www/html

COPY . /var/www/html

EXPOSE 9000
