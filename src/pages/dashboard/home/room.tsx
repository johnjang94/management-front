import { BiBookAlt } from "react-icons/bi";
import { PiHouseSimple } from "react-icons/pi";
import { MdOutlineBed } from "react-icons/md";

export default function Room() {
  return (
    <div className="bg-secondary-tan-alt-2 rounded-2xl">
      <h5 className="text-2xl text-center p-5">Room Status</h5>
      <div className="space-y-5 px-3 pb-3">
        <div className="flex items-center justify-between bg-greys-white rounded-lg p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full">
              <PiHouseSimple className="text-2xl text-primary-iris" />
            </div>
            <p className="text-lg">Occupied</p>
          </div>
          <h3 className="text-5xl">35</h3>
        </div>
        <div className="flex items-center justify-between bg-greys-white rounded-lg p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full">
              <BiBookAlt className="text-2xl text-[#1d8953]" />
            </div>
            <p className="text-lg">Booked</p>
          </div>
          <h3 className="text-5xl">39</h3>
        </div>
        <div className="flex items-center justify-between bg-greys-white rounded-lg p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full">
              <MdOutlineBed className="text-2xl text-primary-saffron" />
            </div>
            <p className="text-lg">Vacancies</p>
          </div>
          <h3 className="text-5xl">21/60</h3>
        </div>
      </div>
    </div>
  );
}
