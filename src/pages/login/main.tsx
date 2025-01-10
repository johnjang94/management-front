import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return {
    values:
      emailPattern.test(values.email) && passwordPattern.test(values.password)
        ? values
        : {},
    errors: {
      ...(!values.email
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
              message: "Enter a valid email address.",
            },
          }
        : {}),
      ...(!values.password
        ? {
            password: {
              type: "required",
              message: "Password is required.",
            },
          }
        : !passwordPattern.test(values.password)
        ? {
            password: {
              type: "pattern",
              message:
                "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
            },
          }
        : {}),
    },
  };
};

export default function Main() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ resolver, mode: "onChange" });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/dashboard", { replace: true });
        window.location.reload();
      } else {
        console.error(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  });

  return (
    <div className="my-7">
      <div className="text-center">
        <h1 className="text-5xl">Welcome to OperateEase</h1>
        <p className="my-3">Revolutionize your workflow</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:w-1/6 lg:mx-auto mx-12 my-12"
      >
        <label htmlFor="email">Email Address</label>
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <input
          {...register("email")}
          placeholder="abe@gmail.com"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.email ? "border-red-500" : "border-greys-background"
          }`}
        />
        <label htmlFor="password">Password</label>
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="*************"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.password ? "border-red-500" : "border-greys-background"
          }`}
        />

        <div className="flex space-x-5 items-center">
          <div
            onClick={() => setIsChecked(!isChecked)}
            className="cursor-pointer flex items-center space-x-2 my-4"
          >
            {isChecked ? <IoMdCheckbox /> : <MdOutlineCheckBoxOutlineBlank />}
            <span className="text-sm">Remember me</span>
          </div>
          <Link to="/forgot">
            <span className="hover:text-blue-500 text-sm">
              Forgot password?
            </span>
          </Link>
        </div>
        <input
          type="submit"
          value="Login"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg cursor-pointer w-full ${
            isValid
              ? "bg-secondary-jasper text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        />
      </form>
      <div className="flex items-center justify-center space-x-4 px-12">
        <div className="w-60 h-px grow-0 bg-greys-battleship"></div>
        <p className="text-greys-battleship">OR</p>
        <div className="w-60 h-px grow-0 bg-greys-battleship"></div>
      </div>
      <div className="lg:w-1/6 lg:mx-auto mx-12 my-12 space-y-4">
        <div className="flex justify-center">
          <button
            className="px-6 py-2 rounded-lg text-white bg-slate-400 w-full flex items-center justify-center gap-2 transition-colors"
            disabled
          >
            Sign in with Google
          </button>
        </div>
        <button
          className="px-6 py-2 rounded-lg bg-slate-400 text-white w-full"
          disabled
        >
          Sign in with Apple
        </button>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="hover:text-blue-500">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
