import React, { useState, useContext } from 'react'
import API from '../api'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const { login } = useContext(AuthContext)
const navigate = useNavigate()


async function submit(e){
e.preventDefault()
try{
const res = await API.post('/auth/login', { email, password })
login(res.data)
navigate('/dashboard')
}catch(err){
alert(err?.response?.data?.message || 'Login failed')
}
}


return (
<div className="card" style={{maxWidth:420, margin:'20px auto'}}>
<h2>Login</h2>
<form className="form" onSubmit={submit}>
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="button" type="submit">Login</button>
</form>
</div>
)
}