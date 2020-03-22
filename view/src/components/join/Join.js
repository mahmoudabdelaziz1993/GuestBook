import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './join.css';

function Join() {
    /** Hooks for name and password  */
    const [email, setName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const[user , setUser] = useState('')

    const handleSubmit = (event) => {
        if (!email || !password) {
            event.preventDefault();
        }
        return null;
    }
    const handlePassword = async (event) =>{
        event.preventDefault();
        try {
            let {data} = await axios.post('http://localhost:5000/auth/login',{email,password});
            
            setUser(data); 
            
            setToken(data.token);
            return null ;
        } catch (error) {
            setPassword('');
        }
    }

    return (
        <div>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading"> Sign in </h1>
                    <div><input type="email" className="joinInput" placeholder="email" onChange={ event => { setName(event.target.value) } } /></div>
                    <div><input type="password" className="joinInput" placeholder="password" value ={password} onChange={ event => { setPassword(event.target.value) } } onBlur = {handlePassword}/></div>
                    <Link  to={ `/chat?token=${token}`}> <button onClick={ handleSubmit } className="button mt-20" type="submit"> Sign In </button></Link>
                    <Link to={ "/signup" }> <button className="button-g mt-20" type="submit"> Sign up </button></Link>
                </div>

            </div>
        </div>
    )
}

export default Join
