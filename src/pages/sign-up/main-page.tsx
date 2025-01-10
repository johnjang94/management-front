import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
};

const emailResolver: Resolver<FormValues> = async (values) => {
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    values: email && emailPattern.test(email) ? { email } : {},
    errors: !email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
        }
      : !emailPattern.test(email)
      ? {
          email: {
            type: "pattern",
            message: "Please enter a valid email address.",
          },
        }
      : {},
  };
};

export default function RegisterMain() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: emailResolver,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    const trimmedEmail =
      data.email && typeof data.email === "string" ? data.email.trim() : null;
    if (trimmedEmail) {
      navigate("/sign-up-detail", { state: { email: trimmedEmail } });
    } else {
      console.error("Email is empty or invalid after trimming.");
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="my-7">
      <div className="text-center">
        <h1 className="text-5xl">Welcome to OperateEase</h1>
        <p className="my-3">Revolutionize your workflow</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:w-1/6 lg:mx-auto mx-12 my-12"
        onKeyDown={handleKeyDown}
      >
        <label htmlFor="email">Email</label>
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <input
          {...register("email")}
          placeholder="abe@gmail.com"
          className={`py-2 px-2 my-2 rounded-lg bg-white border-2 ${
            errors.email ? "border-red-500" : "border-greys-background"
          }`}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`py-2 rounded-lg px-2 cursor-pointer ${
            isValid
              ? "bg-secondary-jasper text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </form>
      <div className="flex items-center justify-center space-x-4 mx-12 md:mx-0">
        <div className="w-60 h-px grow-0 bg-greys-battleship"></div>
        <p className="text-greys-battleship">OR</p>
        <div className="w-60 h-px grow-0 bg-greys-battleship"></div>
      </div>
      <div className="lg:w-1/6 lg:mx-auto mx-12 my-12 space-y-4">
        <button
          className="px-6 py-2 rounded-lg bg-slate-400 text-white w-full"
          disabled
        >
          Sign up with Google
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-slate-400 text-white w-full"
          disabled
        >
          Sign up with Apple
        </button>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <p>Already have an account?</p>
        <button
          onClick={handleLoginClick}
          className="text-blue-500 hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
