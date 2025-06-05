import { useState } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState("dark");

  const changeBgColor = () =>{
    setBgColor("cyberpunk")
  }

  return (
    <>
    <div data-theme={bgColor} >
      <button className='bg-blend-lighten' onClick={changeBgColor} >Light </button>
    </div>
    </>
  )
}

export default App
