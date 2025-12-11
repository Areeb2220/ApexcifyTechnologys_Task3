import React, { createContext, useEffect, useState } from 'react'
import API, { setAuthToken } from '../api'


const AuthContext = createContext();


export function AuthProvider({ children }){
const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user')));
const [token, setToken] = useState(()=> localStorage.getItem('token'));


useEffect(()=>{
if(token) setAuthToken(token);
setAuthToken(token);
localStorage.setItem('token', token || '');
localStorage.setItem('user', JSON.stringify(user || null));
}, [token, user]);


const login = (data)=>{ setToken(data.token); setUser(data.user); }
const logout = ()=>{ setToken(null); setUser(null); setAuthToken(null); localStorage.removeItem('token'); localStorage.removeItem('user'); }


// helper: fetch profile
const fetchProfile = async ()=>{
try{
const res = await API.get('/users/me');
setUser(res.data);
}catch(e){/* ignore */}
}


return <AuthContext.Provider value={{ user, token, login, logout, fetchProfile }}>{children}</AuthContext.Provider>
}


export default AuthContext;