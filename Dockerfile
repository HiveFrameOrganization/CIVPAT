FROM debian@sha256:9f76a008888da28c6490bedf7bdaa919bac9b2be827afd58d6eb1b916e1e5918

# Install locales package and generate pt_BR.UTF-8 locale
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8

# Set the locale environment variables to pt_BR.UTF-8
ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install -y nginx php8.2-fpm php8.2-mysql

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set the working directory to /var/www/html
COPY frontend/ /var/www/html/frontend
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY php/www.conf /etc/php/8.2/fpm/pool.d/www.conf
COPY backend/ /var/www/html/backend
COPY ./index.html /var/www/html

RUN mkdir /var/www/html/database
COPY database/ /var/www/html/database

# Expose ports
EXPOSE 80

# Start both Nginx and PHP-FPM when the container runs
CMD service php8.2-fpm start && nginx -g 'daemon off;'
