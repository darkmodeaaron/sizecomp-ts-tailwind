import { useEffect, useState } from "react"

import downArrow from "../assets/downArrow.png"

import "../style/index.css"

const TrousersMenu = () => {

    const [selectedFitData, setSelectedData] = useState <TrouserFit> (placeholder)
    const [fitDropdownState, setFitDropdownState] = useState(false)
    const [widthSelectedData, setWidthSelectedData] = useState("")
    const [lengthSelectedData, setLengthSelectedData] = useState("")
    const [selectedSize, setSelectedSize] = useState(widthSelectedData + lengthSelectedData)

    useEffect(() => {
        console.log(selectedSize)
    }, [selectedSize])

    
    // selects the fits from the dropdown menu, assigns selectedData and toggles dropdown 
    function selectFit(chosenFit: TrouserFit) {
        setSelectedData(chosenFit)
        toggleFitDropdown()
    }

    // dropdown toggle function
    function toggleFitDropdown() {
        setFitDropdownState(!fitDropdownState)
    }

    function selectWidth(selectedWidth: string) {
        setWidthSelectedData(selectedWidth)

        setSelectedSize(widthSelectedData + lengthSelectedData)

    }    

    function selectLength(selectedLength: string) {
        setLengthSelectedData(selectedLength)

        setSelectedSize(widthSelectedData + lengthSelectedData)

    }    

    return (
        <section className="trousers-menu border-1 border-black flex flex-row mx-auto h-96">
            <div className="menu-left border-2 border-blue-700 flex flex-col gap-12 relative px-2 py-5">
                <SelectFitDropdown selectFitFunction={selectFit} fitDropdownToggleFunction={toggleFitDropdown} selectedData={selectedFitData} propFitDropdownState={fitDropdownState}/>
                <FitDescription propSelectedFitData={selectedFitData}/>
                <SizeSelectors selectWidthFunction={selectWidth} selectLengthFunction={selectLength}/>
            </div>
            <div className="menu-right border-2 border-red-500 flex-1.5">
                <Image />
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
                <div className="arrow-container w-3" onClick={() => fitDropdownToggleFunction()}>
                    <img className={`arrow-img transitions-all duration-300 ease-in-out cursor-pointer ${propFitDropdownState ? 'active' : ''}`} src={downArrow} alt="" />
                </div>
            </div>
            <div className={`fit-dropdown h-0 overflow-hidden transitions-all duration-300 ease-in-out border-2 border-t-0 border-black px-1 absolute w-44 ${propFitDropdownState ? "active" : ""}`}>
                {trouserData.map((trouser, index) => {
                    return <div key={index} onClick={() => selectFitFunction(trouser)}>
                        <h1 className="cursor-pointer">{trouser.fit}</h1>
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
        <div className="fit-description border-1 border-green-700 mt-7">
            <h1>{propSelectedFitData.description}</h1>
        </div>
    )
}

type SizeSelectorsProps = {
    selectWidthFunction: (selectedWidth: string) => void;
    selectLengthFunction: (selectedLength: string) => void;
}


const SizeSelectors: React.FC<SizeSelectorsProps> = ({selectWidthFunction, selectLengthFunction}) => {

    const sizes: string[] = ['30', '32', '34']

    return (
        <>
        <div className={`size-selector flex flex-row gap-5 absolute bottom-16`}>
            {sizes.map((size, index) => {
                return <div key={index} onClick={() => selectWidthFunction(size)}>{size}</div>
            })
            }
        </div>
        <div className={`size-selector flex flex-row gap-5 absolute bottom-5`}>
            {sizes.map((size, index) => {
                return <div key={index} onClick={() => selectLengthFunction(size)}>{size}</div>
            })
            }
        </div>
            </>
    )
}

const Image = () => {
    return (
        <img src="" alt="" />
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
        3232: "3232",
        3434: "3434",
        3636: "3636"
    }
}

let straightFit: TrouserFit = {
    fit: "Straight",
    description: "The straight-fit trouser offers a relaxed, uniform cut from hip to hem for a classic, comfortable look.",
    images: {
        3232: "3232",
        3434: "3434",
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