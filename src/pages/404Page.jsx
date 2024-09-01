import React from "react";
import { FaExclamationTriangle, FaQuestionCircle } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import ThemeSwitcher from "../components/Main/ThemeSwitcher";

const NotFound = () => {
  return (
    <>
      <ThemeSwitcher />
      <div
        className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800 dark:bg-main dark:text-gray-100"
        style={{ direction: "ltr" }}
      >
        <FaExclamationTriangle className="mb-4 text-6xl text-red-500" />
        <h1 className="text-4xl font-bold">404 - الصفحة غير موجودة</h1>
        <p className="mt-2 text-lg">عذرًا! الصفحة التي تبحث عنها غير موجودة.</p>
        <Link
          to="/"
          className="mt-6 text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-200"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </>
  );
};

export default NotFound;
