import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiSquareMinus } from "react-icons/ci";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { LuDot } from "react-icons/lu";

import { useState } from "react";
import importedData from "./reports-data.json";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ReportsProps {
  isNavHovered: boolean;
}

interface ReportRowData {
  revenue: string;
  accountNumber: string;
  accountName: string;
  revenueAmount: string;
  status: string;
}

export default function Reports({ isNavHovered }: ReportsProps) {
  const [data] = useState<ReportRowData[]>(importedData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Revenue");
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(importedData.length).fill(false)
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const toggleCheckbox = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  return (
    <div className={`space-y-4 my-10 ${isNavHovered ? "hovered" : ""}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-3xl">Reports</h4>
        <div className="relative z-10">
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
                onClick={() => handleOptionClick("Revenue")}
                className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral rounded-tl-lg rounded-tr-lg border-b border-red-400"
              >
                Revenue
              </button>
              <button
                onClick={() => handleOptionClick("Report Views")}
                className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral border-b border-red-400"
              >
                Report Views
              </button>
              <button
                onClick={() => handleOptionClick("Expense")}
                className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral border-b border-red-400"
              >
                Expense
              </button>
              <button
                onClick={() => handleOptionClick("APR")}
                className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral border-b border-red-400"
              >
                APR
              </button>
              <button
                onClick={() => handleOptionClick("RevAPR")}
                className="block w-full px-4 py-2 text-left bg-secondary-jasper hover:bg-secondary-coral rounded-bl-lg rounded-br-lg"
              >
                RevAPR
              </button>
            </div>
          )}
        </div>
      </div>

      <Table className="rounded-md">
        <TableHeader>
          <TableRow className="bg-secondary-tan-alt-2">
            <TableHead className="text-center">Revenue</TableHead>
            <TableHead className="text-center">Account Number</TableHead>
            <TableHead className="text-center">Account Name</TableHead>
            <TableHead className="text-center">Revenue Amount</TableHead>
            <TableHead className="text-center">Column Heading</TableHead>
            <TableHead className="flex justify-center items-center">
              <CiSquareMinus />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: ReportRowData, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{row.revenue}</TableCell>
              <TableCell className="text-center">{row.accountNumber}</TableCell>
              <TableCell className="text-center">{row.accountName}</TableCell>
              <TableCell className="text-center">{row.revenueAmount}</TableCell>
              <TableCell className="text-center flex justify-center items-center">
                {row.status === "active" ? (
                  <button className="px-4 py-2 border border-[#31207e] text-[#31207e] bg-[#e4eff1] rounded-full flex items-center gap-1">
                    <LuDot className="text-[#31207e]" /> Active
                  </button>
                ) : (
                  <button className="px-4 py-2 border border-[#da0c05] text-[#da0c05] bg-[#ffeeee] rounded-full flex items-center gap-1">
                    <LuDot className="text-[#da0c05]" /> Inactive
                  </button>
                )}
              </TableCell>
              <TableCell className="text-center justify-center">
                <button onClick={() => toggleCheckbox(index)}>
                  {checkedItems[index] ? (
                    <MdOutlineCheckBox className="text-[#31207e]" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-[#31207e]" />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
