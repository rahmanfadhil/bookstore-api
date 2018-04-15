# node-bookstore-api (BETA)

Bookstore web api with nodejs and express

This API is hosted on heroku
[https://node-bookstore-api.herokuapp.com/](https://node-bookstore-api.herokuapp.com/)

## Packages

* express
* body-parser
* mongoose
* jsonwebtoken
* cors

## Routes

* /auth
  * (POST) /register : register an account
  * (POST) /login : login to registered account
  * (GET) /user : get user detail
  * (PUT) /user : update user account

* /books
  * (GET) / : get all books
  * (POST) / : add a book
  * (GET) /:id : get a book
  * (PUT) /:id : update a book
  * (DELETE) /:id : delete a book

* /order
  * (GET) / : get all orders
  * (POST) / : add an order
  * (GET) /:id : get an order
  * (PUT) /:id : update an order
  * (DELETE) /:id : delete an order

## Notes

all routes above except /login and /register require token to access the routes
to get the token you must register an account
