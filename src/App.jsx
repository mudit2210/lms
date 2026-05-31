import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Head from './head_foot/head'
import Foot from './head_foot/foot'
import Home from './project/home'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Head />
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Courses Page</div>} />
            <Route path="/analytics" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Analytics Page</div>} />
            <Route path="/settings" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Settings Page</div>} />
          </Routes>
        </main>
        <Foot />
      </div>
    </Router>
  )
}

export default App
