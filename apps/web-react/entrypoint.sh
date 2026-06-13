#!/bin/sh
set -e

# Substitute environment variables in nginx config if template exists
if [ -f /etc/nginx/nginx.conf.template ]; then
    envsubst '$SERVER_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
fi

# Start nginx
exec nginx "$@"
