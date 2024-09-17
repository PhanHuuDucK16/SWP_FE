import React from 'react';
import './LoginForm.css'
import { FaUserAlt, FaLock } from "react-icons/fa";
const LoginForm = () => {
    return (
        <div class="form-box">
            <form>
                <h1>Login</h1>
                <div class="inputbox">
                    <FaUserAlt class='icon' />
                    <input type="text" placeholder='UserID' required="" />
                </div>

                <div class="inputbox">
                    <FaLock class='icon' />
                    <input type="password" placeholder='Password' required="" />
                </div>

                <button type="submit">Login</button>

                <div class="register">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>

            </form>
        </div>
    );
}

export default LoginForm;
