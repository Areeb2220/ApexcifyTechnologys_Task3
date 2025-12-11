import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


export default function Navbar(){
const { user, logout } = useContext(AuthContext);
return (
<div className="nav container">
<div style={{display:'flex',alignItems:'center',gap:12}}>
<strong>GymApp</strong>
<Link to="/">Home</Link>
<Link to="/dashboard">Dashboard</Link>
<Link to="/classes">Classes</Link>
</div>
<div>
{user ? (
<>
<span className="small" style={{marginRight:12}}>{user.name} ({user.role})</span>
<button className="button" onClick={logout}>Logout</button>
</>
) : (
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}
</div>
</div>
)
}