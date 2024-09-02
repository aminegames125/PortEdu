import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import productsData from "../../data/products.json";

const gradients = [
  "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500",
  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500",
  "bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500",
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600",
  "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
  "bg-gradient-to-r from-red-400 via-red-600 to-red-800",
  "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  "bg-gradient-to-r from-teal-400 via-green-500 to-yellow-500",
  "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-700",
  "bg-gradient-to-r from-green-300 via-green-500 to-teal-600",
  "bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-pink-400 via-orange-500 to-yellow-500",
  "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
  "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
  "bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700",
  "bg-gradient-to-r from-red-300 via-red-500 to-red-700",
  "bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700",
  "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700",
  "bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700",
  "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
  "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800",
  "bg-gradient-to-r from-pink-600 via-pink-700 to-pink-800",
  "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600",
  "bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600",
  "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600",
  "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600",
  "bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600",
  "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700",
  "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600",
  "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600",
  "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600",
  "bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600",
  "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600",
  "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500",
  "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  "bg-gradient-to-r from-green-500 via-teal-500 to-blue-500",
  "bg-gradient-to-r from-pink-400 via-red-400 to-orange-400",
  "bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500",
  "bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600",
  "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
  "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500",
  "bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400",
  "bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500",
  "bg-gradient-to-r from-teal-500 via-green-500 to-blue-500",
  "bg-gradient-to-r from-pink-500 via-orange-500 to-red-500",
  "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600",
  "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400",
  "bg-gradient-to-r from-yellow-600 via-red-600 to-pink-600",
  "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500",
  "bg-gradient-to-r from-teal-400 via-green-400 to-blue-400",
  "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

const ModernSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
      return;
    }

    const filtered = productsData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number.toString().includes(searchTerm) ||
        item.price.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleClick = (number) => {
    navigate(`/PortEdu/product/${number}`);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSearch}
        className="fixed top-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
      >
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="ابحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-gray-100 px-6 py-3 pl-14 pr-16 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={24}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <FiX size={24} />
            </button>
          )}
        </div>
      </form>

      {searchTerm && (
        <ul className="fixed top-16 left-0 right-0 p-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg z-50">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.number)}
                className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    الرقم: {item.number}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    السعر: {item.price.toFixed(2)} TND
                  </span>

                  <div className="mt-2">
                    {Object.keys(item.pathways).map((grade) => (
                      <div key={grade} className="mb-2">
                        {item.pathways[grade].length === 0 ? (
                          <span
                            className={`mr-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getRandomGradient()}`}
                          >
                            {grade === "grade1" && "أولي ثانوي"}
                            {grade === "grade2" && "ثانية ثانوي"}
                            {grade === "grade3" && "ثالثة ثانوي"}
                            {grade === "grade4" && "رابعة ثانوي"}
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {grade === "grade1" && "أولي ثانوي"}
                              {grade === "grade2" && "ثانية ثانوي"}
                              {grade === "grade3" && "ثالثة ثانوي"}
                              {grade === "grade4" && "رابعة ثانوي"}
                            </span>
                            <ul>
                              {item.pathways[grade].map((path, index) => (
                                <li
                                  key={index}
                                  className={`mr-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getRandomGradient()}`}
                                >
                                  {path}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500 dark:text-gray-400">
              لا توجد نتائج
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ModernSearchBar;
