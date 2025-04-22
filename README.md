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
