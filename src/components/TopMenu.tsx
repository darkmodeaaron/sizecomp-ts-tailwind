import React from 'react'

import { useEffect, useState } from "react"

import downArrow from "../assets/downArrow.png"
import downArrowRed from "../assets/downArrowRed.png"

import "../style/index.css"

import slims from '../assets/jumpers/slim/slims.png'
import slimm from '../assets/jumpers/slim/slimm.png'
import sliml from '../assets/jumpers/slim/sliml.png'

import regulars from '../assets/jumpers/regular/regulars.png'
import regularm from '../assets/jumpers/regular/regularm.png'
import regularl from '../assets/jumpers/regular/regularl.png'

import oversizeds from '../assets/jumpers/oversized/oversizeds.png'
import oversizedm from '../assets/jumpers/oversized/oversizedm.png'
import oversizedl from '../assets/jumpers/oversized/oversizedl.png'

import tslims from '../assets/tees/tslims.png'
import tslimm from '../assets/tees/tslimm.png'
import tsliml from '../assets/tees/tsliml.png'

import tregulars from '../assets/tees/tregulars.png'
import tregularm from '../assets/tees/tregularm.png'
import tregularl from '../assets/tees/tregularl.png'

import toversizeds from '../assets/tees/toversizeds.png'
import toversizedm from '../assets/tees/toversizedm.png'
import toversizedl from '../assets/tees/toversizedl.png'




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

    const[selectedImg, setSelectedImg] = useState(selectedFit.images[0])
    
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
            setSelectedImg('')
        }

    }, [propTopState])

    useEffect(() => {
        setTimeout(() => {
            if (widthSelectedData == 'S') {
                setSelectedImg(selectedFit.images[1])
            } else if (widthSelectedData == 'M') {
                setSelectedImg(selectedFit.images[2])
            } else if (widthSelectedData == 'L') {
                setSelectedImg(selectedFit.images[3])
            }
        }, 1600)
    }, [selectedImg, selectedFit, widthSelectedData])

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
            toggleImageVis()
        }
    }

    function selectWidth(selectedWidth: string) {
        if (selectedWidth == widthSelectedData) {
            return
        } else 
        
        toggleImageVis()
        setWidthSelectedData(selectedWidth)
        toggleWidthDropdown()
        
    }    

    const [imageVis, setImageVis] = useState(true)

    function toggleImageVis() {
        setImageVis(false)
        setTimeout(() => {
            setImageVis(true)
        }, 1500)
    }



    return (
        <section className={`flex w-96 top-menu-container flex-row justify-center items-center absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propTopState ? "" : "hide"}`}>
            <div className="top-menu-flex flex flex-row gap-1">
                <div className="menu-left border-2 border-black flex flex-col gap-12 relative px-2 py-5 h-full">
                    <SelectFitDropdown selectFitFunction={selectFit} fitDropdownToggleFunction={toggleFitDropdown} propSelectedItemsData={selectedItemsData} propFitDropdownState={fitDropdownState} propSelectedFit={selectedFit} />
                    <div className={`select-fit-pointer flex-row items-center justify-center gap-1 absolute opacity-0 flex ${selectFitPointerState ? 'active' : ''}`}>
                        <div className="w-3 rotate-90"><img src={downArrowRed} alt="" /></div>
                        <h1>Select a fit</h1>
                    </div>
                    <FitDescription propSelectedFit={selectedFit}/>
                    <SizeSelectors selectWidthFunction={selectWidth} propWidthDropdownState={widthDropdownState}  toggleWidthDropdownFunction={toggleWidthDropdown}  propWidthSelectedData={widthSelectedData}/>
                </div>
                <div className="menu-right border-2 border-black flex justify-center items-center h-full">
                    <Image propSrc={selectedImg} propImageVis={imageVis}/>
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

    const Sizes = ['S', 'M', 'L']





    return (
        <>
            <div className={`size-selector flex gap-5 flex-row absolute bottom-16 border-2 border-black px-1`}>
                <div className="cursor-pointer" onClick={() => toggleWidthDropdownFunction()}>{propWidthSelectedData ? propWidthSelectedData : "Select Size"}</div>
                <div className={`selector-letters flex gap-5 w-0 overflow-hidden transitions-all duration-300 ease-in-out ${propWidthDropdownState ? 'active' : ''}`}>
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
    propSrc: string;
    propImageVis: boolean;
}

const Image: React.FC<ImageProps> = ({propSrc, propImageVis}) => {
    return (
        <img className={`box-img ${propImageVis ? '' : 'active'}`} src={propSrc} alt="" />
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
        1: slims,
        2: slimm,
        3: sliml
    }
}

let jumperMediumFit: TopFit = {
    fit: "Regular",
    description: "A regular fit jumper offers a balanced, comfortable fit that follows the natural shape of the body without being too tight or too loose.",
    images: {
        1: regulars,
        2: regularm,
        3: regularl
    }
}

let jumperLargeFit: TopFit = {
    fit: "Oversized",
    description: "An oversized jumper offers a relaxed, loose fit with a cozy, slouchy silhouette that drapes comfortably over the body.",
    images: {
        1: oversizeds,
        2: oversizedm,
        3: oversizedl
    }
}

let tshirtSmallFit: TopFit = {
    fit: "Slim",
    description: "A slim fit T-shirt is designed to contour to the body, providing a snug, flattering fit with a sleek and modern silhouette.",
    images: {
        1: tslims,
        2: tslimm,
        3: tsliml
    }
}

let tshirtMediumFit: TopFit = {
    fit: "Regular",
    description: "A regular fit T-shirt offers a comfortable, natural fit with a balanced cut that provides room through the chest and waist without being too tight or too loose.",
    images: {
        1: tregulars,
        2: tregularm,
        3: tregularl
    }
}

let tshirtLargeFit: TopFit = {
    fit: "Oversized",
    description: "An oversized fit T-shirt features a loose, relaxed silhouette with extra room through the body and sleeves for a casual, laid-back look.",
    images: {
        1: toversizeds,
        2: toversizedm,
        3: toversizedl
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