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

    const [selectFitPointerState, setSelectFitPointerState] = useState(false)
    
    useEffect(() => {

        if (propJumperState && propTopState == true) {
            setSelectedItemsData(jumperData)
            console.log('jumper')
        }
        if (propTshirtState && propTopState == true) {
            setSelectedItemsData(tshirtData)
            console.log('tsshirt')
        }
        if (propTopState == false && propJumperState == false && propTshirtState == false) {
            setSelectedItemsData(placeholderData)
            setSelectedFit(placeholder)
            setWidthSelectedData("")
            setFitDropdownState(false)
            setWidthDropdownState(false)
        }

    }, [propTopState])



    

    function toggleWidthDropdown() {
        if (selectedFit == placeholder) {
            setSelectFitPointerState(true)
            return
        }
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
            setSelectFitPointerState(false)
        }
    }

    function selectWidth(selectedWidth: string) {
        setWidthSelectedData(selectedWidth)
        toggleWidthDropdown()
    }    


    return (
        <section className={`flex w-96 top-menu-container flex-row justify-center items-center absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propTopState ? "" : "hide"}`}>
            <div className="top-menu-flex flex flex-row">
                <div className="menu-left border-2 border-black flex flex-col gap-12 relative px-2 py-5 h-full">
                    <SelectFitDropdown selectFitFunction={selectFit} fitDropdownToggleFunction={toggleFitDropdown} propSelectedItemsData={selectedItemsData} propFitDropdownState={fitDropdownState} propSelectedFit={selectedFit} />
                    <div className={`select-fit-pointer flex-row items-center justify-center gap-1 absolute opacity-0 flex ${selectFitPointerState ? 'active' : ''}`}>
                        <div className="w-3 rotate-90"><img src={downArrow} alt="" /></div>
                        <h1>Select a fit</h1>
                    </div>
                    <FitDescription propSelectedFit={selectedFit}/>
                    <SizeSelectors selectWidthFunction={selectWidth} propWidthDropdownState={widthDropdownState}  toggleWidthDropdownFunction={toggleWidthDropdown}  propWidthSelectedData={widthSelectedData}/>
                </div>
                <div className="menu-right border-2 border-black flex justify-center items-center h-full">
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

    enum Sizes { Small = 'S', Medium = 'M', Large = 'L', Xlarge = 'XL'}



    return (
        <>
            <div className={`size-selector flex gap-5 flex-row absolute bottom-16 border-2 border-black px-1`}>
                <div className="cursor-pointer" onClick={() => toggleWidthDropdownFunction()}>{propWidthSelectedData ? propWidthSelectedData : "Select Size"}</div>
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
    fit: "Slim",
    description: "A slim fit jumper is tailored to hug the body closely, offering a sleek, streamlined look with minimal excess fabric.",
    images: {
        3030: slim3030,
        3032: slim3032,
        3034: "3636"
    }
}

let jumperMediumFit: TopFit = {
    fit: "Regular",
    description: "A regular fit jumper offers a balanced, comfortable fit that follows the natural shape of the body without being too tight or too loose.",
    images: {
        3030: straight3030,
        3032: straight3032,
        3636: "3636"
    }
}

let jumperLargeFit: TopFit = {
    fit: "Oversized",
    description: "An oversized jumper offers a relaxed, loose fit with a cozy, slouchy silhouette that drapes comfortably over the body.",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let tshirtSmallFit: TopFit = {
    fit: "Slim",
    description: "A slim fit T-shirt is designed to contour to the body, providing a snug, flattering fit with a sleek and modern silhouette.",
    images: {
        3030: slim3030,
        3032: slim3032,
        3034: "3636"
    }
}

let tshirtMediumFit: TopFit = {
    fit: "Regular",
    description: "A regular fit T-shirt offers a comfortable, natural fit with a balanced cut that provides room through the chest and waist without being too tight or too loose.",
    images: {
        3030: straight3030,
        3032: straight3032,
        3636: "3636"
    }
}

let tshirtLargeFit: TopFit = {
    fit: "Oversized",
    description: "An oversized fit T-shirt features a loose, relaxed silhouette with extra room through the body and sleeves for a casual, laid-back look.",
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