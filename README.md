# authentificaton


back en is composed of thiese folders:
config => contains the Database connection file
controllers => contains the conditons of the user(user/password) and the signin &signup functions
            =>used modules are : JsonWebToken , bcrypt
            =>function:bcrypt,creation of token

middlewares => contains isAuth function to test if the user is aauthorized or not
            => using JsonWebToken
model => creation of schema
route=> contains the routing operation such as post & get +requiring the function "isAuth" to include it in the "get"
