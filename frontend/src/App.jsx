import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'https://course-registration-system-1qb9.onrender.com/api';

export default function App() {
  const [courses, setCourses] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [courseName, setCourseName] = useState('')
  const [duration, setDuration] = useState('')
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [courseId, setCourseId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadData() {
    try {
      const [courseResponse, registrationResponse] = await Promise.all([
        axios.get(`${API}/courses`), axios.get(`${API}/registrations`)
      ])
      setCourses(courseResponse.data)
      setRegistrations(registrationResponse.data)
    } catch {
      setError('Could not connect to the server. Make sure the backend is running on port 8080.')
    }
  }

  useEffect(() => { loadData() }, [])

  async function addCourse(event) {
    event.preventDefault()
    setError(''); setMessage('')
    if (!courseName.trim() || !duration.trim()) {
      setError('Please enter both a course name and duration.'); return
    }
    try {
      await axios.post(`${API}/courses`, { name: courseName.trim(), duration: duration.trim() })
      setCourseName(''); setDuration('')
      setMessage('Course added successfully.')
      await loadData()
    } catch (e) { setError(e.response?.data?.message || 'Could not add course.') }
  }

  async function registerStudent(event) {
    event.preventDefault()
    setError(''); setMessage('')
    if (!studentName.trim() || !email.trim() || !courseId) {
      setError('Please complete every registration field.'); return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.'); return
    }
    try {
      await axios.post(`${API}/registrations`, {
        studentName: studentName.trim(), email: email.trim(), courseId: Number(courseId)
      })
      setStudentName(''); setEmail(''); setCourseId('')
      setMessage('Registration successful! The student has been registered.')
      await loadData()
    } catch (e) { setError(e.response?.data?.message || 'Could not complete registration.') }
  }

  async function cancelRegistration(id) {
    if (!window.confirm('Cancel this registration?')) return
    setError(''); setMessage('')
    try {
      await axios.delete(`${API}/registrations/${id}`)
      setMessage('Registration cancelled.')
      await loadData()
    } catch (e) { setError(e.response?.data?.message || 'Could not cancel registration.') }
  }

  return (
    <main className="container">
      <header>
        <h1>Course Registration System</h1>
        <p>Manage courses and student registrations in one place.</p>
      </header>

      {message && <div className="notice success" role="status">{message}</div>}
      {error && <div className="notice error" role="alert">{error}</div>}

      <section className="panel">
        <h2>Add a Course</h2>
        <form onSubmit={addCourse} className="form-grid">
          <label>Course name
            <input value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="e.g. Java Basics" required />
          </label>
          <label>Duration
            <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 6 weeks" required />
          </label>
          <button type="submit">Add Course</button>
        </form>
      </section>

      <section className="panel">
        <h2>Available Courses</h2>
        {courses.length === 0 ? <p className="muted">No courses yet. Add a course above to get started.</p> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Course</th><th>Duration</th></tr></thead>
            <tbody>{courses.map(course => <tr key={course.id}><td>{course.name}</td><td>{course.duration}</td></tr>)}</tbody>
          </table></div>
        )}
      </section>

      <section className="panel">
        <h2>Register a Student</h2>
        {courses.length === 0 && <p className="muted">Add at least one course before registering a student.</p>}
        <form onSubmit={registerStudent} className="form-grid">
          <label>Student name
            <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Full name" required />
          </label>
          <label>Email address
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@example.com" required />
          </label>
          <label className="full">Select course
            <select value={courseId} onChange={e => setCourseId(e.target.value)} required>
              <option value="">Choose a course</option>
              {courses.map(course => <option key={course.id} value={course.id}>{course.name} ({course.duration})</option>)}
            </select>
          </label>
          <button type="submit" disabled={courses.length === 0}>Register Student</button>
        </form>
      </section>

      <section className="panel">
        <h2>Student Registrations</h2>
        {registrations.length === 0 ? <p className="muted">No registrations to display.</p> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Student</th><th>Email</th><th>Course</th><th>Duration</th><th>Action</th></tr></thead>
            <tbody>{registrations.map(reg => (
              <tr key={reg.id}>
                <td>{reg.studentName}</td><td>{reg.email}</td><td>{reg.course?.name}</td>
                <td>{reg.course?.duration}</td>
                <td><button className="danger" onClick={() => cancelRegistration(reg.id)}>Cancel</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
      <footer>Course Registration System · React + Spring Boot</footer>
    </main>
  )
}
