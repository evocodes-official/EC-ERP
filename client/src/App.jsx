import { useState } from 'react'
import ERP from './ERP'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ERP />
    </>
  )
}

export default App
