import FourBlocks from "./four-blocks";
import Reports from "./reports";
import Summary from "./summary";

interface FinancialProps {
  isNavHovered: boolean;
}

export default function FinancialPerformance({ isNavHovered }: FinancialProps) {
  return (
    <div className="w-full px-10">
      <div className="space-y-28 my-10">
        <h4 className="text-3xl">Financial Performance</h4>
      </div>
      <div
        className={`md:grid-cols-2 md:flex md:justify-between space-y-5 md:space-y-0 md:space-x-6 ${
          isNavHovered ? "gap-5" : ""
        }`}
      >
        <Summary />
        <FourBlocks />
      </div>
      <div>
        <Reports isNavHovered={isNavHovered} />
      </div>
    </div>
  );
}
