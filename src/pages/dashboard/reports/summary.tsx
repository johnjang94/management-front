import { RxDividerVertical } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function Summary() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Daily");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex">
      <div className="rounded-3xl bg-secondary-tan-alt p-6">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-2xl text-greys-black">
            Revenue vs Expense Summary
          </h5>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between rounded-2xl bg-secondary-jasper text-white gap-3 px-3"
            >
              {selectedOption}{" "}
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg text-white">
                <button
                  onClick={() => handleOptionClick("Daily")}
                  className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral rounded-tl-lg rounded-tr-lg border-b border-red-400"
                >
                  Daily
                </button>
                <button
                  onClick={() => handleOptionClick("Weekly")}
                  className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral border-b border-red-400"
                >
                  Weekly
                </button>
                <button
                  onClick={() => handleOptionClick("Monthly")}
                  className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral rounded-bl-lg rounded-br-lg"
                >
                  Monthly
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center my-8 mx-24 gap-16">
          <div className="text-center">
            <h2 className="text-5xl font-medium">$3,518</h2>
            <label
              htmlFor="text"
              className="text-sm font-semibold text-greys-black py-5"
            >
              Revenue
            </label>
          </div>
          <RxDividerVertical />
          <div className="text-center">
            <h2 className="text-5xl font-medium">$1,518</h2>
            <label
              htmlFor="text"
              className="text-sm font-semibold text-greys-black py-5"
            >
              Expense
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
