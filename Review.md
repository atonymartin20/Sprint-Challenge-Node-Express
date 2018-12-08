# Review Questions

## What is Node.js?
    Node.js is a runtime environment that is used to execute JavaScript applications outside of the browser.

## What is Express?
    Express is a web application framework that sits on the top of the Node.js server.  Express adds extra 
        functionality, like routing and middleware support.

## Mention two parts of Express that you learned about this week.
    Express uses methods to allow a server to be setup.  The .listen() method monitors a port on the computer for 
        incoming connections and responds.  The .require() method imports the express module and makes it available 
        to be used in the application.

## What is Middleware?
    Middleware gets the request and response objects and can operate them returning a response or call the next
        middleware.

## What is a Resource?
    Resources are the requests and function calls that allow us to send and receive data in Express.

## What can the API return to help clients know if a request was successful?
    Status calls reflect the outcomes of the operation to the client letting them know if the operation was succesful 
        or not.

## How can we partition our application into sub-applications?
    We can partition our application into sub-applications using express routers.  This allows the application to 
        have a more modular design and helps with maintaing the application.

## What is express.json() and why do we need it?
    express.json() is built in middleware that takes an object or array an parses it into JSON before sending back 
        to the client.  It is used as server.use(express.json());.
