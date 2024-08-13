import { useState } from "react"

import Navbar from "./components/Navbar"
import HomeButtons from "./components/HomeButtons"

import TrousersMenu from "./components/TrousersMenu"

import "./style/index.css"

// data



function App() {

  const [homeState, setHomeState] = useState(true)

  function toggleHomeState() {
    setHomeState(!homeState)
    console.log(homeState)
  }

  const [trousersState, setTrousersState] = useState(true)

  function toggleTrousersState() {
    setTrousersState(!trousersState)
  }

  return (
    <>
      <Navbar propHomeState={homeState} toggleHomeStateFunction={toggleHomeState}/>
      <HomeButtons toggleHomeStateFunction={toggleHomeState} propHomeState={homeState}/>
      <TrousersMenu />
    </>
  )
}

export default App
