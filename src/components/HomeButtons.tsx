import trousersBtn from "../assets/trousersBtn.png"
import jumpersBtn from "../assets/jumpersBtn.png"
import tshirtBtn from "../assets/tshirtBtn.png"

type HomeButtonsProps = {
    toggleHomeStateFunction: () => void;
    propHomeState: boolean;
}


const HomeButtons: React.FC<HomeButtonsProps> = ({toggleHomeStateFunction, propHomeState }) => {
  return (
    <section className={`home-buttons-container flex-row justify-center items-center gap-10 absolute bottom-0 top-4 left-0 right-0 max-w-5xl mx-auto ${propHomeState ? '' : 'hide'} flex`}>
        <div onClick={() => toggleHomeStateFunction()}><HomeButton img={trousersBtn}/></div>
        <HomeButton img={jumpersBtn}/>
        <HomeButton img={tshirtBtn}/>
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
