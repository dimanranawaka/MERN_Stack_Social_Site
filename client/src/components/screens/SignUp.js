import React,{userState} from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {

    const [name,setName] = userState("");
    const [password,setPassword] = userState("");
    const [email,setEmail] = userState("");

    const PostData = ()=>{
        fetch("http:/localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:"",
                password:"",
                email:""
            })
        }).then(res=>res.json())
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Dexter</h2>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                    Sign Up
                </button>
                <h6>
                    <Link to="/SignIn">Already have an account?</Link>
                </h6>
            </div>
        </div>
    );
};

export default SignUp;