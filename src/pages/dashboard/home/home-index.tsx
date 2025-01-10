import CheckIn from "./check-in";
import CheckOut from "./check-out";
import Room from "./room";
import ReservationStatus from "./reservation-status";
import Notes from "./notes";
import Housekeeping from "./house-keeping";
import { useOutletProps } from "@/hooks/use-outlet-props";

interface HomeProps {
  name: string;
}

export default function Home({ name }: HomeProps) {
  const { isNavHovered } = useOutletProps();
  return (
    <div className="w-full px-10">
      <div className="space-y-28 my-10">
        {name === "" ? (
          <h4 className="text-3xl">Welcome</h4>
        ) : (
          <h4 className="text-3xl">Welcome, {name}!</h4>
        )}
      </div>
      <div
        className={`md:grid-cols-2 md:flex md:justify-between space-y-5 md:space-y-0 ${
          isNavHovered ? "gap-5" : ""
        }`}
      >
        <CheckIn />
        <CheckOut />
      </div>
      <div className="md:flex md:items-center md:space-x-7 md:my-9 my-5 space-y-5 md:space-y-0">
        <div className="md:w-3/6 w-full">
          <Room />
        </div>
        <div className="w-full">
          <ReservationStatus />
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-7 md:my-9 space-y-5 my-5">
        <Notes />
        <Housekeeping />
      </div>
    </div>
  );
}
