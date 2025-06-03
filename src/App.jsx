import React from "react"
import './index.css'
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuranReader from "./components/LayoutRead/QuranReader"
import { QuranProvider } from "./Context/QuranContext"


function App() {

  return (
    <Router>
      <QuranProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:surahId" element={<QuranReader />} />
        <Route path="/juz/:juzId" element={<QuranReader />} />
        <Route path="/page/:pageId" element={<QuranReader />} />
      </Routes>
      </QuranProvider>
    </Router>
  )
}

export default App
