import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [code, setCode] = useState(["", "", "", ""]);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const codeSentRef = useRef(false);

  useEffect(() => {
    const requestCode = async () => {
      if (codeSentRef.current) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (response.ok) {
          setMessage("A verification code has been sent to your email.");
          codeSentRef.current = true;
        } else {
          setMessage(data.message || "Failed to send verification code.");
        }
      } catch (error) {
        console.error("Error requesting verification code:", error);
        setMessage("An error occurred while sending the verification code.");
      }
    };

    if (email && !codeSentRef.current) {
      requestCode();
    }
  }, [email, API_BASE_URL]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        nextInput?.focus();
      }

      setIsValid(newCode.every((digit) => digit.length === 1));
    }
  };

  const handleBlur = () => {
    if (code.some((digit) => digit === "")) {
      setShowError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const verificationCode = code.join("");
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          navigate("/verified");
        } else {
          setShowError(true);
          setMessage(data.message || "Verification failed.");
          console.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error verifying code:", error);
        setMessage("An error occurred during verification.");
      }
    }
  };

  return (
    <div className="my-4">
      <div className="text-center">
        <h1 className="lg:text-5xl text-4xl">Email Verification</h1>
        <div className="my-3">
          <p>We have sent a 4-digit code to your email ({email}).</p>
          <p>
            Please enter the code below to verify your email address within 3
            minutes.
          </p>
          {message && <p className="text-blue-500 mt-2">{message}</p>}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-1 justify-center my-16">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onBlur={handleBlur}
                className={`md:w-24 md:h-24 w-20 h-20 border ${
                  isValid || !showError ? "border-black" : "border-red-500"
                } rounded-md outline-none text-center text-xl`}
              />
            ))}
          </div>
          {!isValid && showError && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid 4-digit code
            </p>
          )}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`py-2 rounded-lg px-[132.5px] mt-16 ${
              isValid && !loading
                ? "bg-secondary-jasper text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="mx-[16.5px]">
              {loading ? "Verifying..." : "Verify"}
            </span>
          </button>
        </form>
        <div className="my-10 space-y-5">
          <p className="font-cabin text-base">Didn't receive the email?</p>
          <button className="border border-secondary-jasper text-secondary-jasper py-2 px-[132.5px] rounded-lg">
            Send Code
          </button>
        </div>
      </div>
    </div>
  );
}
