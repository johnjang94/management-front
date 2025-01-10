import { useOutletProps } from "@/hooks/use-outlet-props";
import { useEffect } from "react";

export default function Reserved() {
  const { isNavHovered } = useOutletProps();
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
