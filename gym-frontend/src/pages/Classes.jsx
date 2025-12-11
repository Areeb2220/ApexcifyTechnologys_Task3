import React, { useEffect, useState } from 'react'
import API from '../api'


export default function Classes() {
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
            <h2>Classes</h2>
            {classes.length === 0 ? <div className="small">No classes found.</div> : (
                <ul style={{ display: 'grid', gap: 8 }}>
                    {classes.map(c => (
                        <li key={c._id} className="member-card">
                            <div>
                                <strong>{c.title}</strong>
                                <div className="small">{new Date(c.startTime).toLocaleString()}</div>
                            </div>
                            <div className="small">Trainer: {c.trainer?.name || 'TBD'}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}