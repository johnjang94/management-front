import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verified() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate("/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="text-center my-24">
      <h1 className="text-5xl">Verified!</h1>
      <div className="my-3 mx-12">
        <p>Success! Your email has been verified. You can now continue.</p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="bg-secondary-jasper text-white cursor-pointer py-3 lg:w-1/6 mx-auto px-[110px] mt-36 rounded-lg"
      >
        Back to Login
      </button>
    </div>
  );
}
