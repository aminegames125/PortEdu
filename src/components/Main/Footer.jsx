import React from "react";


const isRTL = false; 

const Footer = () => {
  return (
    <footer
      className={`border-t border-gray-300 bg-gray-100 py-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <p>© 2024 PortEdu جميع الحقوق محفوظة.</p>
      <div className="mt-2">
        <a
          href="/privacy-policy"
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          سياسة الخصوصية
        </a>
        {" | "}
        <a
          href="/terms-of-service"
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          شروط الخدمة
        </a>
      </div>
    </footer>
  );
};

export default Footer;
