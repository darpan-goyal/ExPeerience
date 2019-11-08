
# ExPeerience

  

## How To Run

  

1. cd backend

2. npm install

3. cd ../client

4. npm install

5. cd ..

6. npm install

7. npm start

  
  

## Frontend Routes Setup

  

* Place your webpages here:

		/client/src/webpages/

* Set up all routes here:

		/client/routes/routes.js

* Place any routes that you want visible in the navigation bar here:

		/client/src/App.js

* While on a webpage, if you want to jump to another webpage, use:

		props.history.push("routeName")

  

## Backend Routes Setup

  

* Place data models here:

		/backend/models/

* Set up all routes here:

		/backend/routes/

* Access routes in the frontend by using axios. You can find axios examples in: 

		/client/src/containers/