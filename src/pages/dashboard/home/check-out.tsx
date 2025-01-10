import checkOutsData from "./check-out.json";
import { CgProfile } from "react-icons/cg";

export default function CheckOut() {
  return (
    <div>
      <div className="rounded-3xl p-4 bg-secondary-tan-alt-2 h-[500px] md:h-[264px]">
        <h5 className="text-2xl">Current Check-outs</h5>
        <div className="md:max-h-52 overflow-y-scroll h-[430px]">
          <div className="mr-4">
            {checkOutsData.checkOuts.map((checkOut) => (
              <div
                key={checkOut.id}
                className="flex justify-between items-center border-black border rounded-lg p-3 my-4 grid-cols-3 gap-20 bg-greys-white"
              >
                <div className="gap-3 flex items-center">
                  {checkOut.profileImage ? (
                    <img
                      src={checkOut.profileImage}
                      alt={checkOut.name}
                      width={40}
                      height={40}
                      className="bg-slate-400 rounded-full"
                    />
                  ) : (
                    <CgProfile className="rounded-full text-4xl" />
                  )}
                  <div className="space-y-0">
                    <p className="text-greys-jet text-lg">{checkOut.name}</p>
                    <p className="text-[#b3b3b3] text-base">{checkOut.room}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#999999] text-base">
                    {checkOut.dateTime}
                  </p>
                </div>
                <div>
                  <p className="p-2 bg-secondary-saffron text-base text-secondary-violet rounded-full w-fit">
                    {checkOut.status}
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
