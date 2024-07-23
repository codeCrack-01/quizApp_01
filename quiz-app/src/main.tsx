import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Removing the `Strict Mode`
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
