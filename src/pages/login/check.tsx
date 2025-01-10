import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Check() {
  const location = useLocation();
  const email = location.state?.email || "your email";
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleResend = async () => {
    setIsSending(true);
    setMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/password-reset/request-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error sending reset link.");
      }

      const responseData = await response.json();
      setMessage(responseData.message || "Reset link sent successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(
          error.message || "Error sending reset link. Please try again."
        );
      } else {
        setMessage("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <div className="lg:w-[36vw] lg:mx-auto mx-12 mb-6 my-14">
        <Link to="/forgot">
          <button className="flex items-center gap-3">
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="lg:text-5xl text-4xl">Check your email</h1>
        <p className="my-3 mx-12 lg:mx-0">
          Check your inbox! We've sent a password reset link to {email}.
          <br />
          It may take a few minutes to arrive. Don't forget to check your spam
          or junk folder.
        </p>
      </div>
      <div className="mx-auto w-1/6 mt-20 mb-16">
        <button
          className="px-6 py-3 w-full rounded-lg bg-secondary-azure text-white"
          onClick={() => window.open(`https://mail.google.com`, "_blank")}
        >
          Open email
        </button>
      </div>
      <div className="text-center lg:mx-0 mx-20">
        <p>
          Didn't receive the email?{" "}
          <button
            className="text-blue-500 underline-none"
            onClick={handleResend}
            disabled={isSending}
          >
            {isSending ? "Resending..." : "Resend"}
          </button>{" "}
          or contact Support for help.
        </p>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
