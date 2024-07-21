import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<div className='MainCard'><HomePage /></div>} />
            <Route path="/quiz" element={< QuizPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
