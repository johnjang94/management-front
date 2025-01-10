import { useState } from "react";
import noteData from "./noteData.json";
import { IoMdMore } from "react-icons/io";

export default function Notes() {
  const [openNotes, setOpenNotes] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenNotes(openNotes === id ? null : id);
  };

  return (
    <div>
      <div className="rounded-3xl p-4 bg-secondary-tan-alt-2 h-[592px]">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl">Notes</h5>
          <button className="py-3 px-6 text-center text-white text-sm rounded-lg bg-secondary-jasper">
            New
          </button>
        </div>
        <div className="overflow-y-scroll h-[510px]">
          <div className="mr-4">
            {noteData.notes.map((notes) => (
              <div
                key={notes.id}
                className="border-greys-battleship border rounded-lg p-3 my-4 grid-cols-3 gap-20 bg-greys-white"
              >
                <div className="space-y-1 items-center flex justify-between">
                  <div>
                    <p className="text-greys-jet text-lg">{notes.date}</p>
                    <span className="text-[#757575] text-base">
                      {notes.room}, {notes.name}
                    </span>
                  </div>
                  <button onClick={() => toggleDropdown(notes.id)}>
                    <IoMdMore className="text-2xl" />
                  </button>
                </div>
                {openNotes === notes.id && (
                  <div className="bg-white shadow-lg rounded-lg w-1/6 float-right border-black border">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 w-full">
                      Solved
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 w-full">
                      Delete
                    </button>
                  </div>
                )}
                <p className="text-base text-black py-7">{notes.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
