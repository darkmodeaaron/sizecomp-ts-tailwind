import trousersBtn from "../assets/trousersBtn.png"
import jumpersBtn from "../assets/jumpersBtn.png"
import tshirtBtn from "../assets/tshirtBtn.png"

type HomeButtonsProps = {
    toggleHomeStateFunction: () => void;
    propHomeState: boolean;
    toggleTrousersStateFunction: () => void;
    toggleJumperStateFunction: () => void;
    toggleTshirtStateFunction: () => void;
}


const HomeButtons: React.FC<HomeButtonsProps> = ({propHomeState, toggleTrousersStateFunction, toggleJumperStateFunction, toggleTshirtStateFunction}) => {
  return (
    <section className={`home-buttons-container flex-row justify-center items-center gap-10 absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propHomeState ? '' : 'hide'} flex`}>
        <div onClick={() => toggleTrousersStateFunction()}><HomeButton img={trousersBtn}/></div>
        <div onClick={() => toggleJumperStateFunction()}><HomeButton img={jumpersBtn}/></div>
        <div onClick={() => toggleTshirtStateFunction()}><HomeButton img={tshirtBtn}/></div>
    </section>
  )
}

type HomeButtonProps = {
    img: string
}

const HomeButton = ({ img }: HomeButtonProps) => {
    return (
        <button className="home-button w-64">
            <img src={img} />
        </button>
    )
}

export default HomeButtons
