import React, { useState, useContext } from 'react'
import API from '../api'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('member')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()


    async function submit(e) {
        e.preventDefault()
        try {
            const res = await API.post('/auth/register', { name, email, password, role })
            login(res.data)
            navigate('/dashboard')
        } catch (err) {
            alert(err?.response?.data?.message || 'Registration failed')
        }
    }


    return (
        <div className="card" style={{ maxWidth: 420, margin: '20px auto' }}>
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <select className="input" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="member">Member</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>

                </select>
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    )
}