import { IoIosInformationCircleOutline } from "react-icons/io";

export default function FourBlocks() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-5 w-full">
      <div className="bg-greys-white p-5 rounded-3xl space-y-5 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
        <p className="text-base font-normal flex items-center gap-2">
          Total Revenue <IoIosInformationCircleOutline />
        </p>
        <h2 className="text-5xl font-medium">$9,518</h2>
      </div>
      <div className="bg-greys-white p-5 rounded-3xl space-y-5 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
        <p className="text-base font-normal flex items-center gap-2">
          ADR <IoIosInformationCircleOutline />
        </p>
        <h2 className="text-5xl font-medium">$865</h2>
      </div>
      <div className="bg-greys-white p-5 rounded-3xl space-y-5 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
        <p className="text-base font-normal flex items-center gap-2">
          Total Expenses <IoIosInformationCircleOutline />
        </p>
        <h2 className="text-5xl font-medium">$9,518</h2>
      </div>
      <div className="bg-greys-white p-5 rounded-3xl space-y-5 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
        <p className="text-base font-normal flex items-center gap-2">
          RevPAR <IoIosInformationCircleOutline />
        </p>
        <h2 className="text-5xl font-medium">$34</h2>
      </div>
    </div>
  );
}
