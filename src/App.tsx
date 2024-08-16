import { useState } from "react"

import Navbar from "./components/Navbar"
import HomeButtons from "./components/HomeButtons"

import TrousersMenu from "./components/TrousersMenu"
import TopMenu from "./components/TopMenu"

import "./style/index.css"

// data



function App() {

  const [homeState, setHomeState] = useState(true)

  function toggleHomeState() {
    setHomeState(!homeState)
    if (trousersState) {
      setTrousersState(false)
    } else if (topState) {
      setTopState(false)
      setJumperState(false)
      setTshirtState(false)
    }
  }

  const [trousersState, setTrousersState] = useState(false)

  function toggleTrousersState() {
    setTrousersState(!trousersState)
    setHomeState(false)
  }

  const [topState, setTopState] = useState(false)

  function toggleTopState() {
    setTopState(!topState)
  }

  const [jumperState, setJumperState] = useState(false)

  function toggleJumperState() {
    setJumperState(!jumperState)
    toggleTopState()
    toggleHomeState()
  }

  const [tshirtState, setTshirtState] = useState(false)

  function toggleTshirtState() {
    setTshirtState(!tshirtState)
    toggleTopState()
    toggleHomeState()
  }

  return (
    <>
      <Navbar propHomeState={homeState} toggleHomeStateFunction={toggleHomeState}/>
      <HomeButtons toggleHomeStateFunction={toggleHomeState} propHomeState={homeState} toggleTrousersStateFunction={toggleTrousersState} toggleJumperStateFunction={toggleJumperState} toggleTshirtStateFunction={toggleTshirtState}/>
      <TrousersMenu propTrousersState={trousersState} />
      <TopMenu propTopState={topState} propJumperState={jumperState} propTshirtState={tshirtState}/>
    </>
  )
}

export default App
