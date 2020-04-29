How to deploy a Node.js/Express app:
===============================

- Explain, preferably using an example, how you have deployed your Node/Express applications.
	- Create a Node.js droplet on Digital Ocean -- with HTTPS and non-root user as normal (see Digital Ocean Setup document).
	- Create a new Domain DNS record for your project that redirects to your droplet.
	- Clone your git repository into an "apps" folder on your droplet. Run "sudo chmod -R a+rwx project_folder".
	- Set up environment variables in project folder ("sudo nano .env" -> see envSetup document).
	- Set up proxy redirect (see nginxProxyInfo document).
	- Install required packages ("sudo npm install") and transpile typescript code ("sudo npm run build").
	- Start server with process manager, and set up automatic reboot on error ("sudo pm2 startup" + follow given instructions if any) and on changes ("pm2 start ./build/app.js --watch --ignore-watch="node_modules" --name MyAppName").
	- Run "sudo reboot".


.env Setup
======================

#### first thing you should do is to create af file `.env` in the root of the project with this content

CONNECTION=YOUR_CONNECTION_STRING_TO_ATLAS

DB_NAME=semester_case

PORT=5555

DEBUG=game-project


Nginx Proxy Info
========================

- Run "sudo nano /etc/nginx/sites-enabled/default", replace content with snippet below.
- Run "sudo nginx -t" to check syntax is ok.
- Run "sudo systemctl restart nginx".

**Snippet:**

server {
	listen 80 default_server;
	listen [::]:80 default_server;

	server_name ?hostNameForDigitalOceanDNSRecord?;

	location / {
		proxy_pass http://localhost:?portNumberDefinedInEnvFile?;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
