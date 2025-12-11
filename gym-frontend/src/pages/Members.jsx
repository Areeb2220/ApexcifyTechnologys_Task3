import React, { useEffect, useState } from 'react'
import API from '../api'


export default function Members() {
    const [members, setMembers] = useState([])
    useEffect(() => {
        async function load() {
            try {
                const res = await API.get('/users')
                setMembers(res.data)
            } catch (err) { console.error(err) }
        }
        load()
    }, [])


    return (
        <div className="card">
            <h2>Members</h2>
            <div style={{ display: 'grid', gap: 8 }}>
                {members.map(m => (
                    <div key={m._id} className="member-card">
                        <div>
                            <div><strong>{m.name}</strong></div>
                            <div className="small">{m.email}</div>
                        </div>
                        <div className="small">ID: <code>{m._id}</code></div>
                    </div>
                ))}
            </div>
        </div>
    )
}