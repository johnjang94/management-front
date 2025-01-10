import checkInsData from "./check-in.json";
import { CgProfile } from "react-icons/cg";

export default function CheckIn() {
  return (
    <div>
      <div className="rounded-3xl p-4 bg-secondary-tan-alt-2 h-[500px] md:h-[264px]">
        <h5 className="text-2xl">Current Check-ins</h5>
        <div className="md:max-h-52 overflow-y-scroll h-[430px]">
          <div className="mr-4">
            {checkInsData.checkIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="flex justify-between items-center border-black border rounded-lg p-3 my-4 grid-cols-3 gap-20 bg-greys-white"
              >
                <div className="gap-3 flex items-center">
                  {checkIn.profileImage ? (
                    <img
                      src={checkIn.profileImage}
                      alt={checkIn.name}
                      width={40}
                      height={40}
                      className="bg-slate-400 rounded-full"
                    />
                  ) : (
                    <CgProfile className="rounded-full text-4xl" />
                  )}
                  <div className="space-y-0">
                    <p className="text-greys-jet text-lg">{checkIn.name}</p>
                    <p className="text-[#b3b3b3] text-base">{checkIn.room}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#999999] text-base">{checkIn.dateTime}</p>
                </div>
                <div>
                  <p className="p-2 bg-secondary-saffron text-base text-secondary-violet rounded-full">
                    {checkIn.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
