import { CgProfile } from "react-icons/cg";

export default function Settings({ isNavHovered }: { isNavHovered: boolean }) {
  return (
    <div className="w-full px-10">
      <div className="space-y-28 my-10">
        <h4 className="text-3xl">Settings</h4>
      </div>
      <div
        className={`${
          isNavHovered ? "gap-5" : ""
        } w-fit bg-greys-white rounded-lg p-5`}
      >
        <div>
          <CgProfile className="bg-secondary-tan-alt-2 w-32 h-32 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
