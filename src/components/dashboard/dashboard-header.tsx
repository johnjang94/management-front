import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSearch } from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/logo-white.png";

interface DashboardHeaderProps {
  onLogout: () => void;
  onToggleNav: () => void;
}

export default function DashboardHeader({
  onLogout,
  onToggleNav,
}: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) =>
      handleClickOutside(event);

    if (isMenuOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-primary-dark-brown flex items-center justify-between px-9 h-[3.75rem] fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-5">
        <RxHamburgerMenu
          className="text-white text-2xl cursor-pointer md:hidden block"
          onClick={onToggleNav}
        />
        <div>
          <Link to="/dashboard">
            <img
              src={LogoWhite}
              alt="Logo"
              width={79.2}
              height={39.3}
              className="pt-1"
            />
          </Link>
        </div>
      </div>
      <div className="w-2/6 px-2 rounded-lg p-1 items-center flex bg-white justify-start">
        <MdOutlineSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 outline-none"
        />
      </div>
      <div className="flex items-center gap-4 relative">
        <CgProfile className="text-white text-2xl" />
        <BsGrid3X3Gap
          className="text-white text-2xl cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-8 right-0 shadow-lg rounded-lg -left-20 z-50"
          >
            <Link to="/settings">
              <button
                onClick={closeMenu}
                className="py-2 px-4 bg-white hover:bg-gray-100 hover:cursor-pointer w-full text-start rounded-tl-lg rounded-tr-lg"
              >
                Settings
              </button>
            </Link>
            <Link to="/account">
              <button
                onClick={closeMenu}
                className="py-2 px-4 bg-white hover:bg-gray-100 hover:cursor-pointer w-full text-start"
              >
                My account
              </button>
            </Link>
            <button
              onClick={closeMenu}
              className="py-2 px-4 bg-white hover:bg-gray-100 hover:cursor-pointer w-full text-start"
            >
              Help
            </button>
            <button
              onClick={() => {
                closeMenu();
                onLogout();
              }}
              className="py-2 px-4 bg-white hover:bg-gray-100 hover:cursor-pointer w-full text-start rounded-bl-lg rounded-br-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
