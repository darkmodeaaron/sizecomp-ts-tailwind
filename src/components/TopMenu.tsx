import React from 'react'

import { useEffect, useState } from "react"

import downArrow from "../assets/downArrow.png"

import "../style/index.css"

import slim3030 from '../assets/slim/sli3030.png'
import slim3032 from '../assets/slim/sli3032.png'

import straight3030 from '../assets/straight/str3030.png'
import straight3032 from '../assets/straight/str3032.png'

type TopMenuProps = {
    propTopState: boolean;
    propJumperState: boolean;
    propTshirtState: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({propTopState, propJumperState, propTshirtState}) => {

    const [selectedItemsData, setSelectedItemsData] = useState <TopFit[]> (placeholderData)
    const [selectedFit, setSelectedFit] = useState<TopFit>(placeholder)
    const [fitDropdownState, setFitDropdownState] = useState(false)
    const [widthSelectedData, setWidthSelectedData] = useState("")
    const [widthDropdownState, setWidthDropdownState] = useState(false)


    
    useEffect(() => {
        if (propTopState == false) {
            setSelectedItemsData(placeholderData)
            setWidthSelectedData("")
        }
        if (propJumperState == true) {
            setSelectedItemsData(jumperData)
        }
        if (propTshirtState == true) {
            setSelectedItemsData(tshirtData)
        }

    }, [propTopState])
    

    function toggleWidthDropdown() {
        setWidthDropdownState(!widthDropdownState)
    }



    // dropdown toggle function
    function toggleFitDropdown() {
        setFitDropdownState(!fitDropdownState)
    }

    function selectFit(chosenFit: TopFit) {
        if (chosenFit.fit == selectedFit.fit) {
            return
        } else {
            setSelectedFit(chosenFit)
            toggleFitDropdown()
        }
    }

    function selectWidth(selectedWidth: string) {
        setWidthSelectedData(selectedWidth)

        toggleWidthDropdown()
    }    


    return (
        <section className={`flex w-96 top-menu-container flex-row justify-center items-center absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propTopState ? "" : "hide"}`}>
            <div className="top-menu-flex flex flex-row">
                <div className="menu-left border-2 border-blue-700 flex flex-col gap-12 relative px-2 py-5 h-full">
                    <SelectFitDropdown selectFitFunction={selectFit} fitDropdownToggleFunction={toggleFitDropdown} propSelectedItemsData={selectedItemsData} propFitDropdownState={fitDropdownState} propSelectedFit={selectedFit} />
                    <FitDescription propSelectedFit={selectedFit}/>
                    <SizeSelectors selectWidthFunction={selectWidth} propWidthDropdownState={widthDropdownState}  toggleWidthDropdownFunction={toggleWidthDropdown}  propWidthSelectedData={widthSelectedData}/>
                </div>
                <div className="menu-right border-2 border-red-500 flex justify-center items-center h-full">
                    <Image />
                </div>
            </div>
        </section>
    )
}


type SelectFitDropdownProps = {
    fitDropdownToggleFunction: () => void;
    selectFitFunction: (fit: TopFit) => void;
    propFitDropdownState: boolean;
    propSelectedItemsData: TopFit[];
    propSelectedFit: TopFit;
}

const SelectFitDropdown: React.FC<SelectFitDropdownProps> = ({fitDropdownToggleFunction, selectFitFunction, propFitDropdownState, propSelectedFit, propSelectedItemsData}) => {
    return (
        <div className="fit-selector w-44 ">
            <div className="px-1 flex items-center justify-between border-2 border-black">
                <h1 className="selected-fit cursor-pointer" onClick={() => fitDropdownToggleFunction()}>{propSelectedFit.fit}</h1>
                <div className="arrow-container w-3 cursor-pointer" onClick={() => fitDropdownToggleFunction()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propFitDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
                </div>
            </div>
            <div className={`fit-dropdown h-0 overflow-hidden transitions-all duration-300 ease-in-out border-2 border-t-0 border-black border-b-0 px-1  absolute w-44 ${propFitDropdownState ? "active" : ""}`}>
                {propSelectedItemsData.map((top, index) => {
                    return <div className="fit-dropdown-text font-extralight" key={index} onClick={() => selectFitFunction(top)}>
                        <h1 className=" cursor-pointer">{top.fit}</h1>
                    </div>
                })}
            </div>
        </div>
    )
}

type FitDescriptionProps = {
    propSelectedFit: TopFit;
};

const FitDescription: React.FC<FitDescriptionProps> = ({propSelectedFit}) => {
    return (
        <div className="fit-description border-1 border-green-700 mt-14 px-1">
            <h1>{propSelectedFit.description}</h1>
        </div>
    )
}

type SizeSelectorsProps = {
    selectWidthFunction: (selectedWidth: string) => void;
    propWidthDropdownState: boolean;
    toggleWidthDropdownFunction: () => void; 
    propWidthSelectedData: string;
}


const SizeSelectors: React.FC<SizeSelectorsProps> = ({selectWidthFunction, propWidthDropdownState, toggleWidthDropdownFunction, propWidthSelectedData}) => {

    enum Sizes { Small = 'S', Medium = 'M', Large = 'L'}



    return (
        <>
            <div className={`size-selector flex gap-5 flex-row absolute bottom-16 border-2 border-black px-1`}>
                <div className="cursor-pointer" onClick={() => toggleWidthDropdownFunction()}>{propWidthSelectedData ? propWidthSelectedData + ' W' : "Select Width"}</div>
                <div className={`selector-numbers flex gap-5 w-0 overflow-hidden transitions-all duration-300 ease-in-out ${propWidthDropdownState ? 'active' : ''}`}>
                {Object.values(Sizes).map((size, index) => {
                    return <div className="cursor-pointer font-extralight" key={index} onClick={() => selectWidthFunction(size)}>{size}</div>
                })}
                </div>
                <div className="arrow-container w-3 -rotate-90" onClick={() => toggleWidthDropdownFunction()}>
                        <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propWidthDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
                </div>
            </div>
        </>
    )
}

type ImageProps = {
    
}

const Image: React.FC<ImageProps> = () => {
    return (
        <img className="box-img w-64" src="" alt="" />
    )
}

// data

type TopFit = {
    fit: string;
    description: string;
    images: { [key: number]: string };
}

let jumperSmallFit: TopFit = {
    fit: "Small",
    description: "Small Jumper",
    images: {
        3030: slim3030,
        3032: slim3032,
        3034: "3636"
    }
}

let jumperMediumFit: TopFit = {
    fit: "Medium",
    description: "Medium Jumper",
    images: {
        3030: straight3030,
        3032: straight3032,
        3636: "3636"
    }
}

let jumperLargeFit: TopFit = {
    fit: "Large",
    description: "Large Jumper",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let tshirtSmallFit: TopFit = {
    fit: "Small",
    description: "Small Tshirt",
    images: {
        3030: slim3030,
        3032: slim3032,
        3034: "3636"
    }
}

let tshirtMediumFit: TopFit = {
    fit: "Medium",
    description: "Medium Tshirt",
    images: {
        3030: straight3030,
        3032: straight3032,
        3636: "3636"
    }
}

let tshirtLargeFit: TopFit = {
    fit: "Large",
    description: "Large Tshirt",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let placeholder: TopFit = {
    fit: "Select fit",
    description: "",
    images: {
        1111:""
    }
}


const placeholderData= [placeholder, placeholder, placeholder]
const jumperData = [jumperSmallFit, jumperMediumFit, jumperLargeFit]
const tshirtData = [tshirtSmallFit, tshirtMediumFit, tshirtLargeFit]


export default TopMenu