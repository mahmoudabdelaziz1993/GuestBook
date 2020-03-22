import React , { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../join/join.css';

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    
    const handleSubmit= async(event)=>{
        if ( !name || !password || !email){
            event.preventDefault();
        }
        try {
            await axios.post("http://localhost:5000/auth/register",{name,password,email})
            return null ;
        } catch (error) {
            event.preventDefault();
        }
       

    };

console.log(name , password , email)
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading"> Sign up </h1>
                <div><input type="text" className="joinInput" placeholder="UserName" onChange={ event => { setName(event.target.value) } } /></div>
                <div><input type="email" className="joinInput" placeholder="email" onChange={ event => { setEmail(event.target.value) } } /></div>
                <div><input type="password" className="joinInput" placeholder="password" onChange={ event => { setPassword(event.target.value) } } /></div>
                <Link to={ '/' } onClick={handleSubmit}> <button  className="button mt-20"> Sign up </button></Link>
                <Link to={ "/" }> <button className="button-g mt-20" type="submit"> Sign in </button></Link>
            </div>

        </div>
    )
}

export default Register
