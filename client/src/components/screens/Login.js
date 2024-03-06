import React from 'react';

const Login = () => {

    return (
        <div className="mycard">
            <div className="card auth-card">
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />

                <button class="btn waves-effect waves-light">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;