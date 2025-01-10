import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { MdOutlineAccountBalance } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type ButtonItem = {
  key: string;
  label: string;
  icon: (isSelected: boolean) => JSX.Element;
};

const buttonData: ButtonItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (isSelected) => (
      <LuLayoutDashboard
        className={`text-xl ${isSelected ? "text-black" : ""}`}
      />
    ),
  },
  {
    key: "reservations",
    label: "Reservations",
    icon: (isSelected) => (
      <FaRegCalendarPlus
        className={`text-xl ${
          isSelected ? "text-black" : "text-white"
        } group-hover:text-inherit`}
      />
    ),
  },
  {
    key: "guests",
    label: "Guest Book",
    icon: (isSelected) => (
      <GoBook
        className={`text-xl ${
          isSelected ? "text-black" : "text-white"
        } group-hover:text-inherit`}
      />
    ),
  },
  {
    key: "reports",
    label: "Reports",
    icon: (isSelected) => (
      <MdOutlineAccountBalance
        className={`text-xl ${
          isSelected ? "text-black" : "text-white"
        } group-hover:text-inherit`}
      />
    ),
  },
  {
    key: "inventory",
    label: "Inventory",
    icon: (isSelected) => (
      <FaClipboardList
        className={`text-xl ${isSelected ? "text-black" : ""}`}
      />
    ),
  },
  {
    key: "housekeeping",
    label: "Housekeeping",
    icon: (isSelected) => (
      <RiHome4Line
        className={`text-xl ${
          isSelected ? "text-black" : "text-white"
        } group-hover:text-inherit`}
      />
    ),
  },
];

export default function DashboardNav({
  onHover,
  currentPath,
  ignorePaths,
}: {
  onHover: (isHovered: boolean) => void;
  currentPath: string;
  ignorePaths?: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ignorePaths?.some((path) => currentPath.includes(path))) {
      setSelected(null);
      return;
    }

    const matchedButton = buttonData.find((button) =>
      currentPath.includes(button.key)
    );
    setSelected(matchedButton?.key || null);
  }, [currentPath, ignorePaths]);

  return (
    <div
      className="group md:flex md:flex-col w-14 hover:w-40 bg-primary-dark-brown text-white text-xl space-y-3 hover:cursor-pointer transition-all duration-300 hidden "
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {buttonData.map((button) => (
        <div
          key={button.key}
          className={`group flex items-center transition-all duration-300 ${
            selected === button.key
              ? "bg-secondary-lavender text-black w-4/5"
              : "bg-transparent"
          } group-hover:w-[90%] py-2 px-2 rounded-tr-lg rounded-br-lg gap-1`}
          onClick={() => {
            setSelected(button.key);
            navigate(`/${button.key}`);
          }}
        >
          {button.icon(selected === button.key)}
          <div className="flex-1 hidden group-hover:flex justify-between items-center">
            <p
              className={`text-sm ${
                selected === button.key ? "text-black" : ""
              }`}
            >
              {button.label}
            </p>
            {selected === button.key && (
              <IoIosArrowDown className="text-black text-sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
