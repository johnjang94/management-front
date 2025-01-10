import keeps from "./house-keeping.json";
export default function Housekeeping() {
  return (
    <div>
      <div className="rounded-3xl p-4 bg-secondary-tan-alt-2 h-[592px]">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl">Housekeeping Tasks</h5>
          <button className="py-3 px-6 text-center text-white text-sm rounded-lg bg-secondary-jasper">
            New
          </button>
        </div>
        <div className="overflow-y-scroll h-[510px]">
          <div className="mr-4">
            {keeps.keeps.map((keep) => (
              <div
                key={keep.id}
                className="border-greys-battleship border bg-greys-white rounded-lg p-3 my-4 grid-cols-3 gap-20"
              >
                <div className="space-y-1">
                  <span className="text-black text-base">
                    {keep.room}, {keep.name}
                  </span>
                </div>

                <p className="text-base text-[#757575]">{keep.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
