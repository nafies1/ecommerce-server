# e-commerce-server

Base API url : **https://shrouded-refuge-10537.herokuapp.com**

## Home
Route | Method | Description
---|----|---
`/` | GET | Show `Welcome to e-commerce server. For further information, please contact Us at nafies1` in a JSON format

----	
  Home route for test server status. It's return message `Welcome to e-commerce server. For further information, please contact Us at nafies1`

* **URL**	

  /

* **Method:**	

  `GET`	

* **Success Response:**	

  * **Code:** 200 <br />	
  *  **Content :** `Welcome to e-commerce server. For further information, please contact Us at nafies1`

--------------


## **User** :

Route | Method | Description
---|---|---
`/auth/register` | POST | Create a user
`/auth/login` | POST | Sign in a user 
`/auth/googleSign` | POST | Sign in using Google Account

**Register**	
----	
  Register User endpoints. Only accept real email. It would return error if email accepted is dummy email or invalid email. Valid email would be sent a verification email contains link verification.

* **URL**	

  /auth/register

* **Method:**	

  `POST`	

* **Data Params**	

  name : `string`  
  email : `string`    
  password : `string`

* **Success Response:**	

  * **Code:** 201 <br />	
  *  **Content :** 	
      ```json	
      {
        "msg": "Register success",
        "id": 99,
        "name": "nafies",
        "email": "nafies1@nafies.tech",
        "isVerified": false,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNzMxMTIyfQ.Rmemzd4-SYiMcMcAPxB14QZXQWdgm-2d_M829gWc5sk"
      }
      ```	

* **Error Response:**	

  * **Code:** 500 <br />	
  *  **Content:** 
     ```json
      { "msg" : "Internal Server Error" }
     ```	

  OR	

  * **Code:** 400 <br />	
  *  **Content:** 
      ```json
      {
        "msg": "Email has been registered. Please login or register with another email",
        "name": "duplicate_email"
      }
      ```	
  OR	

  * **Code:** 400 <br />	
  *  **Content:** 
      ```json
      {
        "msg": "email is not valid. please use a valid email"
      }
      ```	
--------------

**Login**	
----	
  Login User endpoints.	

* **URL**	

  /auth/login/	

* **Method:**	

  `POST`	

* **Data Params**	

  email : `string`    
  password : `string`

* **Success Response:**	

  * **Code:** 200 <br />	
  *  **Content :** 	
      ```json	
      {
        "msg": "Login success",
        "id": 2,
        "name": "Nafies",
        "email": "nafies1@nafies.tech",
        "isVerified": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgxNzMwNjY5fQ.GkMi1N_llcF7QV7E2BGSOjNMqVpW42mE1hcyLigv9Ls"
      }
      ```	

* **Error Response:**	

  * **Code:** 500 <br />	
  *  **Content:** 
     ```json
      { "msg" : "Internal Server Error" }
     ```	

  OR	

  * **Code:** 400 <br />	
  *  **Content:** 
      ```json
        {
          "name": "invalid email/password",
          "msg": "Email / Password is wrong"
        }
      ```	
--------------

**Google Sign**	
----	
  Endpoint for Sign in using Google Account.	

* **URL**	

  /auth/googleSign

* **Method:**	

  `POST`	

* **Data Params**	

  id_token : `string`    

* **Success Response:**	

  * **Code :** 200 	
  *  **Content :** 	
      ```json	
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxNzMxNzUwfQ.qz5s1T1QWm9uTmUzj_L4mC2Tx-aOoi_6CXF1b-3HzJs",
        "msg": "user found",
        "id": 22
      }
      ```	
  OR

  * **Code:** 201 
  *  **Content :** 	
      ```json	
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxNzMxNzUwfQ.qz5s1T1QWm0uTmUzj_L4mC2Tx-aOoi_6CXF1b-3HzJs",
        "msg": "user not found. Create user",
        "id": 22
      }
      ```	

* **Error Response:**	

  * **Code:** 500 <br />	
  *  **Content:** 
     ```json
      { "msg" : "Internal Server Error" }
     ```	
--------------

## Product :

Route | Method | Description
---|---|---
`/product` | POST | Create a product
`/product` | GET | **Headers**<br>`None` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all products
`/product/:id` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one product
`/product/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>file: `File` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update a product
`/product/:id` | PATCH | **Headers**<br>token: `String`<br>**Body**<br>published: `Boolean` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update Stock
`/product/:id` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a product

**Add Product**	
----	
  Add product endpoint.	

* **URL**	

  /product	

* **Method:**	

  `POST`	

* **Headers**	

  token : `string` (required)   

* **Data Params**	

  name: `string` (required)  
  price: `integer` (required)  
  stock: `integer` (required)  
  description: `string`   
  image: `string`

* **Success Response:**	
  * **Code:** 200 <br />	
  *  **Content :** 	
      ```json	
      {
        "msg": "Add product success",
        "id": 33,
        "name": "Sepatu",
        "price": 100000,
        "stock": 10,
        "description": "Sepatu makan",
        "image": "https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg"
      }
      ```	

* **Error Response:**	

  * **Code:** 500 <br />	
  *  **Content:** 
     ```json
      { "msg" : "Internal Server Error" }
     ```	

  OR	

  * **Code:** 401 <br />	
  *  **Content:** 
      ```json
        {
          "msg": "You are not authorized to modify product data. Only verified admin can modify product data"
        }
      ```	

  OR	

  * **Code:** 400 <br />	
  *  **Content:** 
      ```json
        {
          "errors": [
            {
              "msg": "Minimum stock is 0"
            },
            {
              "msg": "Minimum price is 0"
            }
          ],
          "name": "SequelizeValidationError"
        }
      ```
      or
      ```json
        {
          "errors": [
            {
              "msg": "Stock is number only",
            },
            {
              "msg": "Price is number only",
            }
          ],
          "name": "SequelizeValidationError"
        }
      ```
      or
      ```json
        {
          "errors": [
            {
              "msg": "Name is required"
            },
            {
              "msg": "Stock is required"
            },
            {
              "msg": "Price is required"
            },
          ],
          "name": "SequelizeValidationError"
        }
      ```
      
--------------
## **Cart** :

Route | Method | Description
---|---|---
`/cart` | GET | Fetch cart data
`/cart` | POST | Add cart data
`/cart/:id` | PUT | Update cart data
`/cart/:id` | DELETE | Delete product from cart

--------------
### Undefined Route :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/*` | any | any | **Error**<br>`404` <br>Route not found | Show result if route not found