events {}

http {
    # Serve files with correct mimetypes on OSX
    # location may have to be adjusted depending on your OS and nginx install
    # include /usr/local/etc/nginx/mime.types;
    include /etc/nginx/mime.types;

    server {
        listen 9001;
        access_log http.access.log;
        error_log http.error.log;

        root .;
        location / {

        }
    }
}
