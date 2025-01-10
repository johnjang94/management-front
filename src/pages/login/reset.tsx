import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  password: string;
  confirmPassword: string;
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
    confirmPassword: !values.confirmPassword
      ? { type: "required", message: "Please confirm your password." }
      : values.password !== values.confirmPassword
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

export default function Reset() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: passwordResolver,
    mode: "onChange",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = handleSubmit(async (data) => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      alert("Oops! A technical error has occurred. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/password-reset/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password, token }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/confirmation");
      } else {
        console.error(
          result.message ||
            "Hmm... we could not change your password for some reason."
        );
      }
    } catch (error) {
      console.error("Reason that we could not change your password:", error);
    }
  });

  return (
    <div className="my-4">
      <div className="text-center">
        <h1 className="lg:text-5xl text-3xl">Create a new password</h1>
        <p className="my-3 lg:mx-0 mx-12">
          Your new password must be different from your previous one. Make sure
          it's something secure but easy to remember.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:w-1/6 lg:mx-auto mx-12 my-12"
      >
        <label htmlFor="password">New Password</label>
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="**************"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        {errors?.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="***************"
          className={`px-4 py-3 my-2 rounded-lg bg-white border-2 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
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
          Reset Password
        </button>
      </form>
    </div>
  );
}
