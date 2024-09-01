import React, { useState, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import users from "../data/users.json";
import { useAlert } from "../providers/AlertContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ThemeSwitcher from "../components/Main/ThemeSwitcher";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      setError("");
      Cookies.set("authToken", user.id, { expires: 1 });
      showAlert("تم تسجيل الدخول بنجاح!", "success");
      navigate("/");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      showAlert("البريد الإلكتروني أو كلمة المرور غير صحيحة.", "error");
    }
  };

  return (
    <>
      <ThemeSwitcher />
      <div
        className="flex min-h-screen items-center justify-center bg-gray-50 transition-colors duration-300 dark:bg-gray-900"
        style={{ direction: "ltr" }}
      >
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            تسجيل الدخول
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                عنوان البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <FaRegEye className="text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <AiOutlineLock className="mr-2 h-5 w-5 text-white" />
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
