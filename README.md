# [Fiona 2.0](https://github.com/samisosa20/Fiona_2.0)

---

**Description**

working....


## tips

add thoose lines in the file `.htaccess` to can refresh page in production mode

`<Directory>
    RewriteEngine on
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} -f {OR}
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    RewriteRule ^ index.html [L]
</Directory>`


## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme)

## Quick start

- Clone the repo: `git clone https://github.com/creativetimofficial/argon-dashboard-react.git`.
- ***Install node 10 and npm:*** 
    1. `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`.
    2. `sudo apt-get install -y nodejs`.
- Install dependencies: `npm install -g start-react-app`.


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64">


## Licensing

- Copyright 2020 [**Sammy Guttman**](https://github.com/samisosa20)

- Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md?ref=creativetim)

