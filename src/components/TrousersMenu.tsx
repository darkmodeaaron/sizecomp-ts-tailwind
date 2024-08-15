import { useEffect, useState } from "react"

import downArrow from "../assets/downArrow.png"

import "../style/index.css"

import slim3030 from '../assets/slim/sli3030.png'
import slim3032 from '../assets/slim/sli3032.png'

import straight3030 from '../assets/straight/str3030.png'
import straight3032 from '../assets/straight/str3032.png'

type TrousersMenuProps = {
    propTrousersState: boolean;
    
}

const TrousersMenu: React.FC<TrousersMenuProps> = ({propTrousersState}) => {

    const [selectedFitData, setSelectedData] = useState <TrouserFit> (placeholder)
    const [fitDropdownState, setFitDropdownState] = useState(false)
    const [widthSelectedData, setWidthSelectedData] = useState("")
    const [lengthSelectedData, setLengthSelectedData] = useState("")
    const [selectedSize, setSelectedSize] = useState(widthSelectedData + lengthSelectedData)
    const [widthDropdownState, setWidthDropdownState] = useState(false)
    const [lengthDropdownState, setLengthDropdownState] = useState(false)

    useEffect(() => {
        if (propTrousersState == false) {
            setSelectedData(placeholder)
            setWidthSelectedData("")
            setLengthSelectedData("")
            setSelectedImg("")
        }
    }, [propTrousersState])
    

    function toggleWidthDropdown() {
        setWidthDropdownState(!widthDropdownState)
    }

    function toggleLengthDropdown() {
        setLengthDropdownState(!lengthDropdownState)
    }

    const[selectedImg, setSelectedImg] = useState(selectedFitData.images[Number(selectedSize)])

    useEffect(() => {
        const size: string = widthSelectedData + lengthSelectedData
        setSelectedSize(size)
        if (selectedFitData.images[Number(size)]) {
            setSelectedImg(selectedFitData.images[Number(size)])
        }
    }, [widthSelectedData, lengthSelectedData, selectedFitData])

    // selects the fits from the dropdown menu, assigns selectedData and toggles dropdown 
    function selectFit(chosenFit: TrouserFit) {
        if (chosenFit.fit == selectedFitData.fit) {
            return
        } else {
            setSelectedData(chosenFit)
            toggleFitDropdown()
        }
    }

    // dropdown toggle function
    function toggleFitDropdown() {
        setFitDropdownState(!fitDropdownState)
    }

    function selectWidth(selectedWidth: string) {
        setWidthSelectedData(selectedWidth)
        setSelectedSize(widthSelectedData + lengthSelectedData)
        setSelectedImg(selectedFitData.images[Number(selectedSize)])
        toggleWidthDropdown()
    }    

    function selectLength(selectedLength: string) {
        setLengthSelectedData(selectedLength)
        setSelectedSize(widthSelectedData + lengthSelectedData)
        setSelectedImg(selectedFitData.images[Number(selectedSize)])
        toggleLengthDropdown()
    }    

    return (
        <section className={`flex w-96 trouser-menu-container flex-row justify-center items-center absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propTrousersState ? "" : "hide"}`}>
            <div className="trouser-menu-flex flex flex-row">
                <div className="menu-left border-2 border-blue-700 flex flex-col gap-12 relative px-2 py-5 h-full">
                    <SelectFitDropdown selectFitFunction={selectFit} fitDropdownToggleFunction={toggleFitDropdown} selectedData={selectedFitData} propFitDropdownState={fitDropdownState}/>
                    <FitDescription propSelectedFitData={selectedFitData}/>
                    <SizeSelectors selectWidthFunction={selectWidth} selectLengthFunction={selectLength} propWidthDropdownState={widthDropdownState} propLengthDropdownState={lengthDropdownState} toggleWidthDropdownFunction={toggleWidthDropdown} toggleLengthDropdownFunction={toggleLengthDropdown} propLengthSelectedData={lengthSelectedData} propWidthSelectedData={widthSelectedData}/>
                </div>
                <div className="menu-right border-2 border-red-500 flex justify-center items-center h-full">
                    <Image str={selectedImg}/>
                </div>
            </div>
        </section>
    )
}


type SelectFitDropdownProps = {
    fitDropdownToggleFunction: () => void;
    selectedData: TrouserFit;
    selectFitFunction: (fit: TrouserFit) => void;
    propFitDropdownState: boolean;
}

const SelectFitDropdown: React.FC<SelectFitDropdownProps> = ({fitDropdownToggleFunction, selectedData, selectFitFunction, propFitDropdownState}) => {
    return (
        <div className="fit-selector w-44 ">
            <div className="px-1 flex items-center justify-between border-2 border-black">
                <h1 className="selected-fit cursor-pointer" onClick={() => fitDropdownToggleFunction()}>{selectedData.fit}</h1>
                <div className="arrow-container w-3 cursor-pointer" onClick={() => fitDropdownToggleFunction()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propFitDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
                </div>
            </div>
            <div className={`fit-dropdown h-0 overflow-hidden transitions-all duration-300 ease-in-out border-2 border-t-0 border-black border-b-0 px-1  absolute w-44 ${propFitDropdownState ? "active" : ""}`}>
                {trouserData.map((trouser, index) => {
                    return <div className="fit-dropdown-text font-extralight" key={index} onClick={() => selectFitFunction(trouser)}>
                        <h1 className=" cursor-pointer">{trouser.fit}</h1>
                    </div>
                })}
            </div>
        </div>
    )
}

type FitDescriptionProps = {
    propSelectedFitData: TrouserFit;
};

const FitDescription: React.FC<FitDescriptionProps> = ({propSelectedFitData}) => {
    return (
        <div className="fit-description border-1 border-green-700 mt-14 px-1">
            <h1>{propSelectedFitData.description}</h1>
        </div>
    )
}

type SizeSelectorsProps = {
    selectWidthFunction: (selectedWidth: string) => void;
    selectLengthFunction: (selectedLength: string) => void;
    propWidthDropdownState: boolean;
    propLengthDropdownState: boolean;
    toggleWidthDropdownFunction: () => void; 
    toggleLengthDropdownFunction: () => void;
    propWidthSelectedData: string;
    propLengthSelectedData: string; 
}


const SizeSelectors: React.FC<SizeSelectorsProps> = ({selectWidthFunction, selectLengthFunction, propWidthDropdownState, toggleWidthDropdownFunction, toggleLengthDropdownFunction, propLengthDropdownState, propWidthSelectedData, propLengthSelectedData}) => {

    const sizes: string[] = ['30', '32', '34']



    return (
        <>
        <div className={`size-selector flex gap-5 flex-row absolute bottom-16 border-2 border-black px-1`}>
            <div className="cursor-pointer" onClick={() => toggleWidthDropdownFunction()}>{propWidthSelectedData ? propWidthSelectedData + ' W' : "Select Width"}</div>
            <div className={`selector-numbers flex gap-5 w-0 overflow-hidden transitions-all duration-300 ease-in-out ${propWidthDropdownState ? 'active' : ''}`}>
            {sizes.map((size, index) => {
                return <div className="cursor-pointer font-extralight" key={index} onClick={() => selectWidthFunction(size)}>{size}</div>
            })}
            </div>
            <div className="arrow-container w-3 -rotate-90" onClick={() => toggleWidthDropdownFunction()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propWidthDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
            </div>
        </div>
        <div className={`size-selector flex gap-5 flex-row absolute bottom-5 border-2 border-black px-1`}>
            <div className="cursor-pointer" onClick={() => toggleLengthDropdownFunction()}>{propLengthSelectedData ? propLengthSelectedData + ' L' : "Select Length"}</div>
            <div className={`selector-numbers flex gap-5 w-0 overflow-hidden transitions-all duration-300 ease-in-out ${propLengthDropdownState ? 'active' : ''}`}>
            {sizes.map((size, index) => {
                return <div className="cursor-pointer font-extralight" key={index} onClick={() => selectLengthFunction(size)}>{size}</div>
            })}
            </div>
            <div className="arrow-container w-3 -rotate-90" onClick={() => toggleLengthDropdownFunction()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propLengthDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
            </div>
        </div>
            </>
    )
}

type ImageProps = {
    str: string;
}

const Image: React.FC<ImageProps> = ({str}) => {
    return (
        <img className="box-img w-64" src={str} alt="" />
    )
}

// data

type TrouserFit = {
    fit: string;
    description: string;
    images: { [key: number]: string };
}

let slimFit: TrouserFit = {
    fit: "Slim",
    description: "The slim-fit trouser contours closely to the body, offering a sleek and modern silhouette.",
    images: {
        3030: slim3030,
        3032: slim3032,
        3034: "3636"
    }
}

let straightFit: TrouserFit = {
    fit: "Straight",
    description: "The straight-fit trouser offers a relaxed, uniform cut from hip to hem for a classic, comfortable look.",
    images: {
        3030: straight3030,
        3032: straight3032,
        3636: "3636"
    }
}

let regularFit: TrouserFit = {
    fit: "Regular",
    description: "The regular-fit trouser provides a comfortable, tailored cut with ample room for everyday wear.",
    images: {
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let placeholder: TrouserFit = {
    fit: "Select fit",
    description: "",
    images: {
        1111:""
    }
}

const trouserData = [slimFit, straightFit, regularFit]

type Sizes = {
    width: number;
    length: number;
    total: number;
}

export default TrousersMenu