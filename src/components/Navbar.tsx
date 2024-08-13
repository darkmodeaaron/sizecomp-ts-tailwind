


import downArrow from "../assets/downArrow.png"

type NavbarProps = {
  propHomeState: boolean;
  toggleHomeStateFunction: () => void;

}

const Navbar: React.FC<NavbarProps> = ({propHomeState, toggleHomeStateFunction}) => {
  return (
    <section className='navbar-container flex justify-between py-4 px-4'>
        <div className={`navbar-left flex items-center justify-center w-12`}>
          <div className={`back-button w-6 rotate-90 hidden cursor-pointer ${propHomeState ? '' : 'hide'}`} onClick={() => toggleHomeStateFunction()}><img src={downArrow} alt="" /></div>
        </div>
        <div className='navbar-center'>
            <h1 className='text-xl'>sizecomp</h1>
        </div>
        <div className='navbar-right w-12'></div>
    </section>
  )
}

export default Navbar
