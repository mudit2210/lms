import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './project/home'

function App() {
  return (
    <Router>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<div className="text-lg font-medium text-slate-300">Courses Page</div>} />
          <Route path="/analytics" element={<div className="text-lg font-medium text-slate-300">Analytics Page</div>} />
          <Route path="/settings" element={<div className="text-lg font-medium text-slate-300">Settings Page</div>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
