# TodoAPI
#### This is a simple Todos API with user authentication using JSON Web Tokens (JWT). Technologies used are - JavaScript, NodeJS and MongoDB.

## Steps to setup the project:
1. First, Clone the Repo.
2. Open Terminal >> Run "npm install".
2. Create a ".env" (no name just .env) file in the project root. And set two ENV. variables namely, MONGODB_URL & JWT_SECRET.
3. Goto Terminal >> Run "npm run dev".

##### Don't forget to set the ENV. variables - MONGODB_URL & JWT_SECRET.

## The API operations are: 
#### Todos
1. Add Todo  --->  /api/todos/add
2. Edit Todo  --->  /api/todos/edit ; and id sent in the body
3. Delete Todo  --->  /api/todos/delete ; and id sent via req.body )
4. Get all Todos  --->  /api/todos/ ; user id sent via req.body )

#### Users
1. User Signup  ---> /api/user/signup ; signup with username and Password)
2. User Login  ---> /api/user/login ; Login with username and Password)
3. User Logout  --->  /api/user/logout ; Resets the JWT.


#### To test the TodoAPI , first signup and get the JWT Auth token. Then send the Auth token received as Bearer token in the headers with key 'Authorization'. Then create todos, edit, delete and so on.
