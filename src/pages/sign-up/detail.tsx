import { useForm, Resolver } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const passwordResolver: Resolver<FormValues> = async (values) => {
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const errors = {
    password: !values.password
      ? { type: "required", message: "Password is required." }
      : !passwordPattern.test(values.password)
      ? {
          type: "pattern",
          message:
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
        }
      : null,
    repeatPassword: !values.repeatPassword
      ? { type: "required", message: "Please confirm your password." }
      : values.password !== values.repeatPassword
      ? { type: "validate", message: "Passwords do not match." }
      : null,
  };

  const filteredErrors = Object.fromEntries(
    Object.entries(errors).filter(([, value]) => value !== null)
  );

  return {
    values: Object.keys(filteredErrors).length === 0 ? values : {},
    errors: filteredErrors,
  };
};

export default function RegisterDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email?.trim() || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: passwordResolver,
    mode: "onChange",
    defaultValues: { email },
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = handleSubmit(async (data) => {
    const trimmedPassword = data.password?.trim();
    const trimmedEmail =
      data.email && typeof data.email === "string" ? data.email.trim() : null;

    if (!trimmedPassword) {
      console.error("Password is invalid or empty after trimming.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/sign-up-detail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      localStorage.setItem("jwtToken", responseData.token);
      navigate("/verification", { state: { email: trimmedEmail } });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  });

  if (!email) {
    navigate("/");
    return null;
  }

  return (
    <div className="my-4">
      <div className="lg:w-[36vw] lg:mx-auto mx-12 mb-6">
        <Link to="/">
          <button className="flex items-center gap-3">
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-5xl">Welcome to OperateEase</h1>
        <p className="my-3">Revolutionize your workflow</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:w-1/6 lg:mx-auto mx-12 my-12"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          disabled
          className="px-4 py-3 my-2 rounded-lg bg-gray-200 border-2 border-gray-300 cursor-not-allowed"
        />
        <label htmlFor="password">Password</label>
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="**************"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.password ? "border-red-500" : "border-greys-background"
          }`}
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        {errors?.repeatPassword && (
          <p className="text-red-500">{errors.repeatPassword.message}</p>
        )}
        <input
          {...register("repeatPassword")}
          type="password"
          placeholder="***************"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.repeatPassword ? "border-red-500" : "border-greys-background"
          }`}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg cursor-pointer w-full mt-16 ${
            isValid
              ? "bg-secondary-jasper text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
