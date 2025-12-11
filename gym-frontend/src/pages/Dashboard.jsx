import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import API from '../api'
import { Link } from 'react-router-dom'


export default function Dashboard() {
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])


    useEffect(() => {
        async function load() {
            try {
                const res = await API.get('/classes')
                setClasses(res.data)
            } catch (err) { console.error(err) }
        }
        load()
    }, [])


    return (
        <div className="card">
            <h2>Dashboard</h2>
            <div className="small">Welcome, {user?.name} ({user?.role})</div>


            <div style={{ marginTop: 16 }}>
                <h3>Upcoming Classes</h3>
                {classes.length === 0 ? <div className="small">No classes found.</div> : (
                    <table className="table">
                        <thead><tr><th>Title</th><th>Trainer</th><th>Start</th></tr></thead>
                        <tbody>
                            {classes.map(c => (
                                <tr key={c._id}><td>{c.title}</td><td>{c.trainer?.name}</td><td>{new Date(c.startTime).toLocaleString()}</td></tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


            {(user?.role === 'trainer' || user?.role === 'admin') && (
                <div style={{ marginTop: 12 }}>
                    <Link to="/attendance" className="button">Go to Attendance</Link>
                </div>
            )}
        </div>
    )
}