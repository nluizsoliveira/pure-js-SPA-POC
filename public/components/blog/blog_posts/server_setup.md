# Steps to configure a VPS for hosting Node applications

This is a summary of (many) tutorials on deploying a Node-served webpage
on your own domain. Each step contains a reference to the source material
(hostinger, digitalocean, nginx and certbot tutorials) 

### STEPS COVERED: 

0. **Overview on domains, hosting and VPS** 
1. **Point domain to VPS IPV4 and IPV6 (DNS Record)** 
2. **First VPS login and packages updating** 
3. **Create user in sudo group** 
4. **Create a public key, enable SSH-KEY login and disable user/password login** 
5. **Configure Firewall (UFW)** 
6. **Install Node** 
7. **Install and configure Nginx** 
8. **Enable HTTPS on NGINX: Install TLS/SSL Certificates (Certbot)** 
9. **Setup SSH for github and clone your Node.js repository** 
10. **Run your node process as a deamon (PM2)** 
11. **Setup Nginx as a Reverse Proxy Server** 

### PREMISES: 

1. My VPS is at hostinger. Most steps remain the same regardless of your vps provider.The exception is changing DNS record, which is done through 
hostingers online GUI. 
2. Steps assume ubuntu as client's distro and ubuntu 18.04.
as the VPS distro. 
3. If you're using Windows as a client, SSH steps can be done through 
[putty](https://www.hostinger.com/tutorials/how-to-use-putty-ssh)


### ! WARNING !

Although every article summarized was written by specialized professionals, 
I am not a senior specialized professional. Do not take this summary steps as enough to fully secure your application. 

Web security, Sysadmin, Infra and Devops are careers theirselves.I do not recommend configuring a server from scratch without support from senior specialized professionals. 


I only did it for the sake of learning and ecouraging others to learn more about deploy.

## 0 - Overview on VPSs, domains and Hosting
To deploy a page on your own website, you'll need: 

1. A domain  - `www.yourdomain.com`
2. A Host - An actual machine, with IPV4/IPV6 ips, in which a 
webserver will listen and respond to HTTP/S requests

I used hostinger for both [buying a domain](https://www.hostinger.com.br/registro-de-dominio) and renting a hosting service (in my case, a VPS). 

If your website is static (Pure HTML/CSS/Javascript) you can use a 
[simpler hosting solution](https://www.hostinger.com.br/hospedagem-de-sites) 
that allows uploading assets and setting a `index.html`. 
All server configuration is automated through an online GUI.  

That's not the case for you Node app, that exposes a port and defines routes.
Some hosting platforms provide automatized solutions for that. For sake of learning
more about deploying, I've chosen [VPS](https://www.hostinger.com.br/servidor-vps), - Virtual Private Server, whichs requires further configuration. 

## 1 - Point domain to VPS IPV4 (DNS Record)
[Full Reference - Hostinger](https://www.hostinger.com/tutorials/dns/how-to-point-domain-to-vps.)

DNS propagation can take up to 24h, which is the reason we're setting DNS first.  

### 1.0 Discover your VPS IPV4 and IPV6
If you're using hostinger it's [here](https://hpanel.hostinger.com/servers/)
### 1.1 Delete older DNS Records
At **hpanel.hostinger.com/domain/your_domain.com/dns**, delete: 

1. All records type `A` with names exactly `@` or `www`.  
2. All records type `AAAA` with names exactly `@` or `www`.
3. All records type `CNAME` with names exactly `@` or `www`. 

Don't delete any other records. 

### 1.2 Create new DNS Records pointing to your VPS IP

1. Create a record type `A` name `@` pointing to your VPS IPV4
2. Create a record type `A` name `www` pointing to your VPS IPV4
1. Create a record type `AAAA` name `@` pointing to your VPS IPV6
2. Create a record type `AAAA` name `www` pointing to your VPS IPV6

### 1.3 Verify DNS propagation 

Check it at https://www.whatsmydns.net/

## 2 - First VPS login and packages updating
[Full Reference - DigitalOcean](https://www.hostinger.com/tutorials/getting-started-with-vps-hosting)

We'll setup SSH keys as soon as possible. But before that we'll update 
packages and create an user. 

### 2.1 First VPS Login
On linux, the ssh connection syntax is: 

```bash
ssh <username>@<ip> -p <port>
```

Use `root` as there's no other user yet. Standard SSH `port` is 22. 

```bash
ssh root@<ip> -p 22
```

### 2.2 Update Packages

```bash
apt update
apt upgrade
```

## 3 - Create user in sudo group
It's a good practice to avoid operating as root when not necessary. 

### 3.1 Create Username
```bash
adduser username
```
Select a password and press ENTER for the user info settings. 

### 3.2 Add user to sudo group: 

```bash
usermod -aG sudo username
```

### 3.3 Swap contet to new user

```bash
su - username
```

## 4 - Create a public key, enable SSH-KEY login and disable user/password login
1. [Full Reference 1 - Hostinger](https://www.hostinger.com/tutorials/ssh/how-to-set-up-ssh-keys)
2. [Full Reference 2 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server)

### 4.1 Generate SSH keys
```bash
# Run on the COMPUTER YOU'LL USE TO CONNECT TO VPS, NOT THE VPS ITSELF
cd ~/.ssh/
ssh-keygen -t rsa
```

Select a filename for saving your ssh key. I'll use `sitessh`. 
Enter a passphrase. 

This will generate a pair of public/private ssh key, `sitessh` (private) 
and `sitessh.pub` (public), both at `/home/yourUser/.ssh`. **Do not share your
private ssh key**.  

### 4.2 Copy public SSH key to clipboard
Do
```bash
cat siteuser.pub 
```
And copy the output to your clipboard. 

### 4.3 Enable SSH-Key login
Login again at your vps at your newly created user. 

NOTE: `~/` is a shortcut to your `/home/currentUser` folder. This process will 
enable ssh key login to the current terminal user. If you need multiple users 
you'll have to repeat the process multiple times. 

0. Be sure to be in your newly created user context.  
1. Create a `.ssh` folder at `~/`
2. Give owner user read, write and execute permissions
3. create and open an `authorized_keys` file at `~/.ssh`

```bash
# Run on your VPS at you new user account
mkdir ~/.ssh
chmod 700 ~/.ssh
vim ~/.ssh/authorized_keys
```

After opening the file: 
1. type `i` to enable write mode
2. press `shift insert` to paste your pub ssh key from clipboard
3. press `esc` to exit write mode, then `:wq` to exit saving changes.
4. Add read and write permissions to `authorized_keys`

```bash
chmod 600 ~/.ssh/authorized_keys
```
Exit user with 
```
exit
```

### 4.4 Test if your ssh-key login is working
At your client computer, try to ssh connect to your user: 

```bash
ssh -p 22 <user>@<ip>
```

### 4.5 Disable user/password login
After login into VPS, open SSH config file: 

```bash
sudo vim /etc/ssh/sshd_config
```

There will be a key/value pair:

```bash
#PasswordAuthentication yes
```
Delete the comment with `shift backspace` and set the key to no:

```bash
PasswordAuthentication no
```

Reload ssh deamon

```bash
sudo systemctl reload ssh
```

This will disable user/password login to all users, including `root`. Notice your
SSH key was set only for your new `user`. Therefore you'll not be able to login 
into `root` any longer. 

If for some reason will need to access `root` user, do `sudo su`. If for some 
reason you need to enable ssh login to root, follow [this tutorial](https://serverfault.com/questions/140421/how-to-set-public-ssh-key-for-root-user-on-server)

## 5 - Configure Firewall (UFW)
[Full reference - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)

Iptables is the native program for configuring ipv4 packages filtering. 
UFW (Uncomplicated Firewall) is an interface for setting up iptables 
more smoothly. 


### 5.1 Install UFW
Usually UFW comes pre-installed but disabled in VPSs by default. If that's not
the case, install with:

```
sudo apt install ufw
```

### 5.2 Deny all incoming connections
The approach is to deny all conections by default and create a restricte list
with the allowed connections. 

```
sudo ufw default deny incoming
```

### 5.3 Allow all outgoing connections
```
sudo ufw default allow outgoing
```

### 5.4 Allow incoming SSH connections
By standard ssh connections use tcp protocol over port 22. 

You can allow this specific connection
```
sudo ufw allow 22/tcp
```

Or allow the alias
```
sudo ufw allow ssh
```

Both approaches have the same effect. 

### 5.5 Check current rules table

```bash
sudo ufw status numbered
```

As I just configured SSH connections, this is my table:

```bash
Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     ALLOW IN    Anywhere                  
[ 2] 22/tcp (v6)                ALLOW IN    Anywhere (v6)             
```

We will enable HTTP/HTTPs later when configuring NGINX. 
We will use git for transfering files. If that's not your case, enable sftp. 

### 5.6 Enable Firewall
After setting all your desired rules 
**(be sure to allow ssh otherwise you will get locked)** enable the firewall:
```bash
sudo ufw enable
```
### (Additional useful UFW Commands) 

1. Drop a rule
Notice the numerical column on the table. You can drop a rule by: 

```bash
# Not a step 
sudo ufw delete <ruleNumber>
```
2. Reset UFW to default settings:
```bash
# Not a step 
sudo ufw reset
```
3. Disable UFW
```bash
# Not a step 
sudo ufw disable
```

## 6 - Install Node
[Full Reference - LowEndBox](https://lowendbox.com/blog/how-to-set-up-a-node-js-application-on-ubuntu-16-04-vps/)

### 6.1 Install latest Node version that supports you VPS OS
I'll use Node 16

```bash
cd /tmp
suo apt install curl -y
curl -sLO https://deb.nodesource.com/setup_16.x
sudo bash setup_16.x
sudo apt install -y nodejs gcc g++ make
node -v #Check if installation was sucessful
npm -v #Check if NPM was installed
```
## 7 - Install and configure Nginx
1. [full reference 1 -DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04)
2. [full reference 2 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)
3. [full reference 3 - Thomas hunter article](https://medium.com/intrinsic-blog/why-should-i-use-a-reverse-proxy-if-node-js-is-production-ready-5a079408b2ca)


### 7.1 What is a reverse proxy and why use Nginx
Reverse proxy is an intermediate web server that will:
1. Receive requests
2. Optionally modify requests
3. Forward requests to another web server
4. Await for the forwarded request to be responsed
5. Intercept the forwarded response
5. Optionally modify the forwarded response
6. Response to the original client

It's a good idea to use nginx for many reasons: 
1. Enable HTTPS over servers that only suport HTTP
2. Compress responses
3. Clean up malformated requests
4. Dispatch requests to multiple backend instances

Although modern Node versions can handle many of the tasks above, it's a good 
idea to use Nginx as a layer that only handles/enchaces requests while 
keeping Node handling only the necessary backend core operations.    

## 7.2 Installing Nginx

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nginx -y
```

## 7.3 Enabling Ningx on Firewall

```bash
sudo ufw allow 'Nginx Full'
```

## 7.4 Test if nginx is working
Open your VPS `ipv4` address on browser. You should see Nginx default page. 
If that's not the case, your VPS is probably configured to use `apache2` 
as standard server. 

Check if Nginx is runnig/your vps is running apache2: 

```bash
systemctl status nginx
systemctl status apache2
```

If that's the case, let's unninstall apache and restart Nginx: 

```bash 
sudo service apache2 stop
sudo apt-get purge apache2 apache2-utils apache2-bin apache2.2-common -y
sudo apt-get autoremove
sudo rm -rf /etc/apache2
sudo systemctl enable nginx
sudo systemctl restart nginx
```

Check again: 

```bash
systemctl status nginx
systemctl status apache2
```

Don't worry if you still see apache2 initial page at this point. 

It happens because both nginx and apache2 use `/var/www/html` as the standard 
folder for serving content. Nginx is the one serving apache2 standard HTML.

### 7.5 Set up a Server Block
Server Blocks are used to encapsulate a domain. The default server block is 
configured to serve files ate `/var/www/html`. 

1. Create a server block for your domain: 

```bash
sudo mkdir -p /var/www/yourdomain.com/html
```

2. Assign ownership of the directory with the $USER environment variable

```bash
sudo chown -R $USER:$USER /var/www/yourdomain.com/html
```

3. Allow the owner to read, write, and execute the files while granting only 
read and execute permissions to groups and others


```bash
sudo chmod -R 755 /var/www/yourdomain.com
```

4. Create a sample index.html page and fill it with a testing content

```bash
vim /var/www/yourdomain.com/html/index.html
```

```
<html>
     Your server block is being served 
</html>
```
5. Create a configuration file for your server block

```bash
sudo vim /etc/nginx/sites-available/yourdomain.com
```

and paste inside it the configuration: 

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/yourdomain.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name yourdomain.com www.yourdomain.com;

        location / {
                try_files $uri $uri/ =404;
        }

        location /.well-known/acme-challenge {
          default_type text/plain;
          root /etc/letsencrypt/webroot;
        }
}
```

6. Enable the file by creating a link from it to the sites-enabled directory, which Nginx reads from during startup:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```

7. Uncomment and adjust`server_names_hash_bucket_size` at `/etc/nginx/nginx.conf` to 64 (this avoid a possible hash bucket memory problem that can arise from adding additional server names) 

```bash
sudo vim /etc/nginx/nginx.conf
```
Also change `include /etc/nginx/sites-enabled/*;` to `include /etc/nginx/sites-enabled/yourdomain.com;`
8. Run nginx test:

```bash
sudo nginx -t
```

9. Restart nginx to apply changes: 
```
sudo systemctl restart nginx
```

10. Finally, type your VPS `ipv4` on browser and check if changes applied. 
Use `ctrl f5` to reload clearing cache. 

## 8 - Enable HTTPS on Nginx: Install TLS/SSL certificates (Certbot)
[full reference  - certbot](https://certbot.eff.org/instructions?ws=nginx&os=pip)

### 8.0 Remove old Certbot installed
```bash
sudo apt-get remove certbot
```
### 8.1 Install Certbot Dependencies
Hostinger VPS has issues with `snap`. Therefore we will use Python's `pip` to 
install certbot. 

```bash
sudo apt update
sudo apt install python3 python3-venv libaugeas0
```
### 8.2 Setup Python venv

```bash
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
```

### 8.3 Install Certbot

```bash
sudo /opt/certbot/bin/pip install certbot certbot-nginx
```

### 8.4 Prepare certbot command

```bash
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

### 8.5 Generate and install certificates
This will only work if you already have a nginx instance providing an http 
server over port `80`.

```
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -v
```

**Finally your (test) website should be acessable at www.yourdomain.com!!!**

## 9 - Setup SSH for github and clone your Node.js repository
0. [Full reference 0 - Atlassian](https://www.atlassian.com/git/tutorials/install-git#linux)
1. [Full reference 1 - Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
2. [Full reference 2 - Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)


## 9.0 Install and config git
```
sudo apt-get update
sudo apt-get install git
git config --global user.name "<your name>"
git config --global user.email "<your email>" 
git config --global user.username"<your username>" 
```

### 9.1 Generate SSH keys @ your vps
```
cd ~/.ssh/
ssh-keygen -t ed25519 -C "your_git_email@example.com"
```

Call it `gitkey`. 

1. Start to your `ssh-agent`:

```bash
eval "$(ssh-agent -s)"
```

2. Add the private key to your agent: 

```bash
ssh-add gitkey
```

3. If you're facing issues with ssh not working on reboot, add the two commands 
above to your `~./bashrc` file. 

```bash
vim ~/.bashrc
# Paste both commands above at the bottom of your ~/.bashrc
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/gitkey
```
vim 
4. Copy the public key content: 

```bash
cat gitkey.pub
```

5. Paste it at [Github SSH key manager](https://github.com/settings/ssh/new)
as an `Authentication Key`

### 9.2 Clone your repo using ssh

```bash
cd ~
git clone git@github.com:<user>/<repo-path>.git
```

Also enter your project and install your dependencies:

```bash
cd <your_repo>
npm install
```

## 10 - Run your node process as a deamon (PM2)
[Source - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04)

PM2 allows running the node application as a background process and facilitates
integration with nginx proxy. 

1. Install PM2

```bash
sudo npm install pm2@latest -g
```

2. Run your node app through PM2
```bash
pm2 start <your_script>.js
```

3. Set PM2 to run every system startup:
```bash
pm2 startup systemd
```

This will output a command such as 

```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u <user> --hp /home/<user>
```

Execute it. 

4. Save the PM2 process list and corresponding environments in an instance: 

```bash
pm2 save
```

5. Set PM2 to run your instance every startup: 
reboot the system for pm2 to properly apply its changes:

```bash
sudo reboot
```
then 

```bash
sudo systemctl start pm2-<user>
```

## 11 - Set Up Nginx as a Reverse Proxy Server

1. Open up your server block configuration file for edition: 

```bash
sudo vim /etc/nginx/sites-available/yourdomain.com
```

2. Replace your `/location` block for: 

```bash
server {
...
    location / {
        proxy_pass http://localhost:<port your Node app is exposing>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
```

3. Check for syntax errors on your serverblock conf file:
```
sudo nginx -t
```

4. Restart Nginx
```
sudo systemctl restart nginx
```

**Your website is now fully running at your domain.com!!**

Until implementing a proper CI/CD, you can update you website by: 

```bash
git pull
pm2 restart server
sudo systemctl restart nginx
```