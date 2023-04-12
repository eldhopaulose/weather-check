import { useState } from 'react'
import './App.scss'
import Search from './pages/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Search/>
    </div>
  )
}

export default App
