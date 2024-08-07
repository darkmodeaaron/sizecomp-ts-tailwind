import { useState, useEffect } from "react"

import downArrow from "../assets/downArrow.png"

import "../style/index.css"

const TrousersMenu = () => {

    const [selectedData, setSelectedData] = useState({})
    const [sizedata, setSizeData] = useState("")
    const [selectedFit, setSelectedFit] = useState("Select fit")

    const [fitDropdownState, setFitDropdownState] = useState(false)

    function selectFit(chosenFit: TrouserFit) {
        setSelectedData(chosenFit)
        setSelectedFit(chosenFit.fit)
        toggleFitDropdown()
    }

    function toggleFitDropdown() {
        setFitDropdownState(!fitDropdownState)
    }


  return (
    <section className="trousers-men">
        <div className="menu-left">
            <SelectFitDropdown selectFitFunc={selectFit} fitDropdownToggle={toggleFitDropdown} selectedFitData={selectedFit} fitddState={fitDropdownState}/>
        </div>
    </section>
  )
}

const SelectFitDropdown: React.FC<SelectFitDropdownProps> = ({fitDropdownToggle, selectedFitData, selectFitFunc, fitddState}) => {
    return (
        <div className="fit-selector w-44">
            <div className="px-1 flex items-center justify-between border-2 border-black">
                <h1 className="selected-fit" onClick={() => fitDropdownToggle()}>{selectedFitData}</h1>
                <div className="arrow-container w-3" onClick={() => fitDropdownToggle()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${fitddState ? 'active' : ''}`} src={downArrow} alt="" />
                </div>
            </div>
            <div className={`fit-dropdown ${fitddState ? "" : "active"}`}>
                {trouserData.map((trouser, index) => {
                    return <div key={index} onClick={() => selectFitFunc(trouser)}>
                        <h1 >{trouser.fit}</h1>
                    </div>
                })}
            </div>
        </div>
    )
}

// data

type SelectFitDropdownProps = {
    fitDropdownToggle: () => void;
    selectedFitData: string;
    selectFitFunc: (fit: TrouserFit) => void;
    fitddState: boolean;
  };

type TrouserFit = {
    fit: string;
    description: string;
    images: { [key: number]: string };
}

let slimFit: TrouserFit = {
    fit: "Slim",
    description: "Slim description",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let straightFit: TrouserFit = {
    fit: "Straight",
    description: "Straight description",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let regularFit: TrouserFit = {
    fit: "Regular",
    description: "Regular description",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

const trouserData = [slimFit, straightFit, regularFit]

export default TrousersMenu