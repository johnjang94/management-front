import { Link } from "react-router-dom";
import logoBlack from "../../assets/logo-black.png";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";

export default function RegisterNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div>
      <div className="hidden lg:flex bg-primary-iris items-center justify-between py-5 px-12">
        <div>
          <Link to="/">
            <img src={logoBlack} alt="Logo" width={85.3} height={44.5} />
          </Link>
        </div>
        <div className="space-x-12">
          <button className="text-lg font-semibold text-greys-black">
            Solutions
          </button>
          <button className="text-lg font-semibold text-greys-black">
            About Us
          </button>
        </div>
      </div>
      <div
        className={`px-10 flex md:hidden justify-between w-full py-5 items-center`}
      >
        <button onClick={toggleMenu}>
          <RxHamburgerMenu className="text-2xl" />
        </button>

        <div
          className={`fixed inset-y-0 left-0 w-[80vw] max-h-screen bg-primary-cream shadow overflow-y-scroll z-50 transition-transform duration-300 ease-in-out rounded-2xl box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px; ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="float-right px-10 pt-10" onClick={closeMenu}>
            <RxCross1 className="text-2xl" />
          </button>
          <ul className="py-24 px-10 space-y-5">
            <li
              className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
                isMenuOpen
                  ? "translate-x-0 delay-[400ms]"
                  : "-translate-x-full delay-[600ms]"
              }`}
            >
              <Link to="" onClick={closeMenu}>
                <button className="p-2">Solutions</button>
              </Link>
            </li>
            <li
              className={`text-xl sm:text-base transition-transform duration-500 ease-in-out ${
                isMenuOpen
                  ? "translate-x-0 delay-[600ms]"
                  : "-translate-x-full delay-[400ms]"
              }`}
            >
              <Link to="" onClick={closeMenu}>
                <button className="p-2">About Us</button>
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/">
          <img src={logoBlack} alt="Logo" width={85.3} height={44.5} />
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
