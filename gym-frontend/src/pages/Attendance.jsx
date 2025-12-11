import React, { useEffect, useState } from 'react'
import API from '../api'


export default function Attendance() {
    const [classes, setClasses] = useState([])
    const [memberId, setMemberId] = useState('')
    const [selectedClass, setSelectedClass] = useState('')


    useEffect(() => {
        async function load() {
            try {
                const res = await API.get('/classes')
                setClasses(res.data)
                if (res.data[0]) setSelectedClass(res.data[0]._id)
            } catch (err) { console.error(err) }
        }
        load()
    }, [])


    async function mark() {
        if (!memberId || !selectedClass) return alert('Member and class required')
        try {
            await API.post('/attendance/mark', { memberId, classId: selectedClass })
            alert('Attendance marked')
            setMemberId('')
        } catch (err) { alert(err?.response?.data?.message || 'Error') }
    }


    return (
        <div className="card">
            <h2>Manual Attendance</h2>
            <div className="small">Enter Member's user id to mark attendance manually.</div>
            <div style={{ marginTop: 12, display: 'grid', gap: 8, maxWidth: 520 }}>
                <input className="input" placeholder="Member MongoDB _id" value={memberId} onChange={e => setMemberId(e.target.value)} />
                <select className="input" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                    {classes.map(c => <option key={c._id} value={c._id}>{c.title} - {new Date(c.startTime).toLocaleString()}</option>)}
                </select>
                <button className="button" onClick={mark}>Mark Attendance</button>
            </div>


            <p className="small" style={{ marginTop: 12 }}>Tip: You can add a Members page to search and copy user IDs. Want me to add that?</p>
        </div>
    )
}