How to deploy a Node.js/Express app:
===============================

- See https://www.youtube.com/playlist?list=PLDbigcKhXkiW3w8RQ25QRwJD5OhuTj8HU, if in doubt.

- See https://github.com/wormple12/Fullstack-JS-GameAPI for Typescript-based project, and https://github.com/wormple12/Friends_GraphQL_API for a simple JS-based project, to see how to structure and set up a similar project for deployment. Be aware of details like import/export methods, package.json scripts, ts-config, and .babelrc.

- Explain, preferably using an example, how you have deployed your Node/Express applications.
	- Create a Node.js droplet on Digital Ocean -- with HTTPS and non-root user as normal (see Digital Ocean Setup document).
	- Create a new Domain DNS record for your project that redirects to your droplet.
	- Clone your git repository into an "apps" folder on your droplet. Run "sudo chmod -R a+rwx project_folder".
	- Set up environment variables in project folder ("sudo nano .env" -> see envSetup document).
	- Set up proxy redirect (see nginxProxyInfo document).
	- Install required packages ("sudo npm install") and transpile typescript code ("sudo npm run build").
	- Start server with process manager, and set up automatic reboot on error ("sudo pm2 startup" + follow given instructions if any) and on changes ("sudo pm2 start MyJSRootFile --watch --ignore-watch="node_modules" --name MyAppName"). Replace MyJSRootFile with something like "./build/app.js".
	- Run "sudo reboot".
	- Set up Certbot: https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx


.env Setup
======================

#### first thing you should do is to create af file `.env` in the root of the project with this content

CONNECTION=YOUR_CONNECTION_STRING_TO_ATLAS

DB_NAME=NAME_OF_MONGO_DATABASE

PORT=YOUR_PORT_NUMBER_EXAMPLE_5555

DEBUG=game-project


Nginx Proxy Info
========================

- Run "sudo nano /etc/nginx/sites-enabled/default" or (if multiple projects on same droplet) with an app/domain name instead of default. Replace content with the snippet below. Emit "default_server" if not the default site file.
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
