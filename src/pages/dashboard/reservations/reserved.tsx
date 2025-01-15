import { useEffect } from "react";

interface ReservedProps {
  isNavHovered: boolean;
}

export default function Reserved({ isNavHovered }: ReservedProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full px-10 h-screen">
      <div className="space-y-28 my-10">
        <h4 className="text-3xl">This is the page for reservation.</h4>
      </div>
      <div
        className={`grid-cols-2 flex justify-between ${
          isNavHovered ? "gap-5" : ""
        }`}
      >
        <p>.</p>
      </div>
    </div>
  );
}
