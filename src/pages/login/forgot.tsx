import { FaArrowLeft } from "react-icons/fa6";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormValues = {
  email: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    values: emailPattern.test(values.email) ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
        }
      : !emailPattern.test(values.email)
      ? {
          email: {
            type: "pattern",
            message: "Please enter a valid email address.",
          },
        }
      : {},
  };
};

export default function Forgot() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ resolver, mode: "onChange" });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = handleSubmit(async ({ email }) => {
    setIsSubmitting(true);
    navigate("/check", { state: { email } });
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/password-reset/request-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate("/check", { state: { email } });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="lg:w-[36vw] lg:mx-auto mx-12 mb-6 my-14">
        <button onClick={handleBackToLogin} className="flex items-center gap-3">
          <FaArrowLeft />
          <span>Back</span>
        </button>
      </div>
      <div className="text-center">
        <h1 className="lg:text-5xl text-4xl">Forgot password?</h1>
        <p className="my-3 mx-12 lg:mx-0">
          Don't worry, it happens! Enter your email address, and we'll send you
          a link to reset your password.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:w-[20vw] lg:mx-auto mx-12 my-10"
      >
        <label htmlFor="email">Email address</label>
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <input
          {...register("email")}
          placeholder="example@example.com"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`px-4 py-2 rounded-lg cursor-pointer w-full mt-16 ${
            isValid && !isSubmitting
              ? "bg-secondary-jasper text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
