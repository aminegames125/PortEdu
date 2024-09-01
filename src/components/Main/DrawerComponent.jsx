import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MdMenu, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import MyImage from "../../assets/images/PortEdu.jpg"; 
import { FaStar } from "react-icons/fa";
import productsData from "../../data/products.json";

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGrade2Open, setIsGrade2Open] = useState(false);
  const [isGrade3Open, setIsGrade3Open] = useState(false);
  const [isGrade4Open, setIsGrade4Open] = useState(false);
  const navigate = useNavigate();

  const getPathwaysByGrade = (grade) => {
    const pathways = productsData.flatMap((item) => item.pathways[grade] || []);
    return [...new Set(pathways)];
  };

  const pathwaysGrade1 = useMemo(() => getPathwaysByGrade("grade1"), []);
  const pathwaysGrade2 = useMemo(() => getPathwaysByGrade("grade2"), []);
  const pathwaysGrade3 = useMemo(() => getPathwaysByGrade("grade3"), []);
  const pathwaysGrade4 = useMemo(() => getPathwaysByGrade("grade4"), []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handlePathwayClick = (grade) => {
    navigate(`/products/${grade}`);
    toggleDrawer();
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 p-4">
        <button
          onClick={toggleDrawer}
          className="flex items-center justify-center rounded-full bg-gray-800 p-2 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-200 dark:text-gray-900"
        >
          <MdMenu size={32} />
        </button>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="fixed inset-0 z-40"
        overlayClassName="bg-black/50"
      >
        <div className="flex h-full flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="p-4">
            {}
          </div>
          <div className="mt-8 flex flex-col items-center border-b border-gray-300 p-4 dark:border-gray-700">
            <img
              src={MyImage}
              alt="PortEdu Logo"
              className="mb-2 h-12 w-12 rounded-full"
            />
            <h2 className="text-xl font-semibold">مرحبا بكم في PortEdu</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <div className="flex items-center space-x-2 rounded p-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">أولي ثانوي</span>
                </div>
                <ul className="mt-2 space-y-2 pl-8">
                  {pathwaysGrade1.length === 0 ? (
                    <li className="p-2">لا توجد مسارات لأولي ثانوي</li>
                  ) : (
                    pathwaysGrade1.map((path, index) => (
                      <li
                        key={index}
                        className="cursor-pointer p-2"
                        onClick={() => handlePathwayClick('grade1')}
                      >
                        {path}
                      </li>
                    ))
                  )}
                </ul>
              </li>
              <li>
                <div
                  onClick={() => setIsGrade2Open(!isGrade2Open)}
                  className="flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">ثانية ثانوي</span>
                  {isGrade2Open ? (
                    <MdKeyboardArrowDown className="mr-2" />
                  ) : (
                    <MdKeyboardArrowRight className="mr-2" />
                  )}
                </div>
                {isGrade2Open && (
                  <ul className="mt-2 space-y-2 pl-8">
                    {pathwaysGrade2.length === 0 ? (
                      <li className="p-2">لا توجد مسارات لثانية ثانوي</li>
                    ) : (
                      pathwaysGrade2.map((path, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2"
                          onClick={() => handlePathwayClick('grade2')}
                        >
                          {path}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
              <li>
                <div
                  onClick={() => setIsGrade3Open(!isGrade3Open)}
                  className="flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">ثالثة ثانوي</span>
                  <span className="ml-2 rounded-full bg-gray-300 px-2 py-1 text-xs text-gray-700">
                    قريباً
                  </span>
                  {isGrade3Open ? (
                    <MdKeyboardArrowDown className="mr-2" />
                  ) : (
                    <MdKeyboardArrowRight className="mr-2" />
                  )}
                </div>
                {isGrade3Open && (
                  <ul className="mt-2 space-y-2 pl-8">
                    {pathwaysGrade3.length === 0 ? (
                      <li className="p-2">لا توجد مسارات لثالثة ثانوي</li>
                    ) : (
                      pathwaysGrade3.map((path, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2"
                          onClick={() => handlePathwayClick('grade3')}
                        >
                          {path}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
              <li>
                <div
                  onClick={() => setIsGrade4Open(!isGrade4Open)}
                  className="flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-75"
                >
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">رابعة ثانوي</span>
                  <span className="ml-2 rounded-full bg-gray-300 px-2 py-1 text-xs text-gray-700">
                    قريباً
                  </span>
                  {isGrade4Open ? (
                    <MdKeyboardArrowDown className="mr-2" />
                  ) : (
                    <MdKeyboardArrowRight className="mr-2" />
                  )}
                </div>
                {isGrade4Open && (
                  <ul className="mt-2 space-y-2 pl-8">
                    {pathwaysGrade4.length === 0 ? (
                      <li className="p-2">لا توجد مسارات لرابعة ثانوي</li>
                    ) : (
                      pathwaysGrade4.map((path, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2"
                          onClick={() => handlePathwayClick('grade4')}
                        >
                          {path}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="border-t border-gray-300 p-4 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 PortEdu. جميع الحقوق محفوظة.
            </span>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
