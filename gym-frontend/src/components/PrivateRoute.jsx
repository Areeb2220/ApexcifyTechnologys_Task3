import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


export default function PrivateRoute({ children, roles=[] }){
const { user } = useContext(AuthContext);
if(!user) return <Navigate to="/login" replace />;
if(roles.length && !roles.includes(user.role)) return <div style={{padding:20}} className="container card">Unauthorized</div>;
return children;
}