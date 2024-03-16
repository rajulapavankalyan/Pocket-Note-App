import { useState } from 'react';
import './App.css'
import Display from './Components/Display'
import NoteDisplayArea from './Components/NoteDisplayArea'

function App() {
  const [isSelectedData,setisSelectedData] = useState(null);
  return (
    <div className="homePageContainer">
      <Display setisSelectedData={setisSelectedData} />
      <NoteDisplayArea isSelectedData={isSelectedData} />
    </div>
  )
}

export default App
