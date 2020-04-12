- Run "sudo nano /etc/nginx/sites-enabled/default", replace content with snippet below.
- Run "sudo nginx -t" to check syntax is ok.
- Run "sudo systemctl restart nginx".

Snippet:
===============

server {
	listen 80 default_server;
	listen [::]:80 default_server;

	server_name ?hostNameForDigitalOceanDNSRecord?;

	location / {
		proxy_pass http://localhost:5000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}