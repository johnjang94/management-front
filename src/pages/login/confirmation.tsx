import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="w-[36vw] mx-auto mb-6 my-14"></div>
      <div className="text-center">
        <h1 className="text-5xl">Password is reset!</h1>
        <p className="my-3">
          Success! You have reset your password. You can now continue.
        </p>
        <div className="lg:mx-auto my-20 bg-secondary-jasper lg:w-1/6 mx-12 rounded-xl">
          <button
            onClick={handleLogin}
            className="px-5 py-1 text-center text-white"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
