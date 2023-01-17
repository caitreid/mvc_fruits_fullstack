# Fruitcakes CRUD Full stack app

- Use Express.js to build a server
- Use Mongoose to communicate with MongoDB
- Full CRUD functionality on our fruits resource
- User Authentication 
- The ability to add comments to fruits
- Maybe: gather data from 3rd party API, if we have time


This app will start as an API, that receives requests and sends JSON responses, but eventually we will add a views layer that will render html in our browser.


## MVC Application
- Models
- Views
- Controllers

Models - all of our data, what shape it's in and what resources we're using (models) and how our resources relate to  one another


Controllers - connects our views and our models. 
routes are controllers - the ydetermin how a user can interact with our resources

## What's going on

Using express framewokr to build a server 
using mongoose to process the requests + run CRUD operations using mongoDB database


## What is REST?

Representational State Transfer
Set of principles that describe how networked resources are accessed and manipulated
7 RESTful routes that allow us basic operations for reading and manipulating a collection of data

| URL                | REQUEST    | ACTION
|____________________|____________|________
| /fruits/           | GET        | index
| /fruits/:id        | GET        | show
| /fruits/new        | GET        | new
| /fruits            | POST       | create
| /fruits/:id/edit   | GET        | edit 
| /fruits/:id        | PATCH/PUT  | update
| /fruits/:id        | DELETE     | destroy