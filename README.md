# DevTinder

- Created Vite + React application
- Remove unnecessary codes and code Hello world.
- Install tailwind css
- Install daisyUi
- Add Navbar component to app.jsx file
- Create a NavBar.jsx in separate component file.
- Installed react-router-dom.
  -Create BrowserRouter , Routes component , Route children , Outlet
  -Added Footer Component.
  -Create Login Page.
  -Install axios
- CORS => Install CORS in backend => Add middleware to with configurations:origin , credentials:true
  -Whenever we are making api call pass to axios=> {withCredential:true}
  -Install @reduxjs/toolkit and react-redux =>configureStore=>Provider=>create slice(createSlice) and export properly =>add reducer to the store
- Login and see see if the data is coming to store.
- Navbar should update as soon as user logs in.
- Refactor the code add a constant file in utils folder and create a components folder.
  -You should not go to other routes without login.
  -If the token is present is present then redirect to login page.
  -Logout feature
  - Get the feed and the feed in the store.
  - Build the user-card in the feed.
  - Edit profile page
  -Added toast notification after successfully edit and saving the profile.
  - Connection page
  - Received request page
  - Feature: Accept or Reject requests.
  -Send connection request (interested/ignored).

Remaining 
 
 -SignUp new user to the app
 -E to E testing.


Body
NavBar
Route / =>Feed
Route /login =>login
route /connection =>connections
Route /profile =>profile

## Deployment
 -Sign up to AWS
 - Launch an instance
 -chmod 400 <secret> pem
 -ssh -i "devTinder-secret.pem" ubuntu@ec2-44-211-156-255.compute-1.amazonaws.com
 -Install node version 20.12.0
 -Git Clone
 -Frontend 
   ->npm install =>dependcies install
   ->npm run build
   ->sudo apt update
   ->sudo apt install ngnix.
   ->sudo systemctl start ngnix.
   ->sudo systemctl enable ngnix.
   ->Copy code from dist(build files) to www/var/html
   ->sudo scp -r dist/* /var/www/html
   ->Enable port :80 of your instance.

  -Backend
    ->Updated DB Password
    ->allowed ec2 instance  public IP on mongodb server.
    ->npm install =>dependcies install
    ->npm install pm2 -g
    ->pm2 start npm --name "devTinder-backend" -- start
    ->pm2 logs
    -> pm2 list , pm2 flush <name> , pm2  stop <name> ,pm2 delete <name> 
    ->config nginx  - etc/nginx/sites-available/default
    ->restart nginx - sudo systemctl restart nginx
    ->Modify the BASEURL in frontend project to "/api"


# Ngxinx config : 

   Frontend - http://44.211.156.255/
   Backend -  http://44.211.156.255:7777/

   Domain name = devTinder.com => 44.211.156.255


   Frontend - devTinder.com
   Backend - devTinder.com:7777 => devTinder.com/api


   nginx config 

   server_name 44.211.156.255

   location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }



