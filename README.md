# [Fiona 2.0](https://github.com/samisosa20/Fiona_2.0)

---

**Description**

web application for managing personal finances, you can control how much you have, compare the budget, create events and much more

**Requirements**

`node >= 16`


## tips

add thoose lines in the file `.htaccess` to can refresh page in production mode

`<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /subdirectory
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>`


## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/argon-dashboard-react?ref=adr-github-readme)

## Quick start

1. clone the repo

`git clone https://github.com/samisosa20/Fiona_2.0.git`

2. Install dependences

`npm i`

3. run application in dev

`npm run dev`

## Licensing

- Copyright 2020 [**Sammy Guttman**](https://github.com/samisosa20)

- Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md?ref=creativetim)

