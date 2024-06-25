import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>This is the Login Page</h1>
        <div>
            <form method="post">
                <lable>Username</lable>
                <input type="text" name="username"/>
                <lable>Password</lable>
                <input type="password" name="password"/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    </div>
  )
}

export default Login