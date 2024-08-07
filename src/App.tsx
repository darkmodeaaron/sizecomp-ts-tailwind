import { useState } from "react"

import Navbar from "./components/Navbar"
import HomeButtons from "./components/HomeButtons"

import TrousersMenu from "./components/TrousersMenu"

import "./style/index.css"

// data


function App() {

  return (
    <>
      <Navbar />
      <HomeButtons />
      <TrousersMenu />
    </>
  )
}

export default App
