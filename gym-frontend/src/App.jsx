import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Classes from './pages/Classes'
import Attendance from './pages/Attendance'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<div className="card">Welcome to Gym Management App</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/classes" element={<PrivateRoute><Classes /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute roles={["trainer", "admin"]}><Attendance /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}