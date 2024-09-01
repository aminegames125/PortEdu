import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import DrawerComponent from "../components/Main/DrawerComponent";
import ProfileDropdown from "../components/Main/ProfileDropdown";
import ThemeSwitcher from "../components/Main/ThemeSwitcher";
import Footer from "../components/Main/Footer";
import SearchBar from "../components/Main/SearchBar";

const gradients = [
  "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500",
  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};


const tailwindStyles = {
  card: "relative transform-gpu transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl shadow-md dark:shadow-gray-700 rounded-lg overflow-hidden max-w-lg",
  cardMedia: "w-full h-72 object-cover transition-filter duration-300 ease-in-out hover:brightness-75",
  badge: "absolute top-3 right-3 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full",
  cardContent: "p-6 bg-gray-100 dark:bg-gray-800",
  title: "font-semibold text-xl dark:text-white",
  price: "mb-3 text-2xl dark:text-gray-300",
  date: "text-md text-gray-600 dark:text-gray-400",
  container: "p-6 flex flex-col items-center justify-center",
};


const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ProductInfo = () => {
  const { number } = useParams(); 

  
  const product = products.find((item) => item.number === parseInt(number, 10));

  
  const isNewProduct = (createdAt) => {
    const FIVE_DAYS_IN_MILLISECONDS = 5 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return now - createdAt * 1000 <= FIVE_DAYS_IN_MILLISECONDS;
  };

  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  const isLtr = product.ltr === "true"; 

  return (
    <div dir="ltr" className="flex min-h-screen flex-col bg-white dark:bg-main">
      <SearchBar />
      <DrawerComponent />
      <ThemeSwitcher />
      <ProfileDropdown />
      <div className="flex-grow p-4">
        <div className="mx-auto max-w-screen-lg">
          <div
            key={product.number}
            className={tailwindStyles.card}
            style={{ direction: isLtr ? "ltr" : "rtl" }} 
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className={tailwindStyles.cardMedia}
              />
              {isNewProduct(product.createdAt) && (
                <span className={`${tailwindStyles.badge} ${getRandomGradient()}`}>
                  {isLtr ? "New" : "جديد"}
                </span>
              )}
              {Object.keys(product.pathways).map((grade) => (
                <div key={grade} className="absolute top-3 left-3">
                  {product.pathways[grade].length > 0 ? (
                    <>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getRandomGradient()}`}>
                        {grade === "grade1" && "أولي ثانوي"}
                        {grade === "grade2" && "ثانية ثانوي"}
                        {grade === "grade3" && "ثالثة ثانوي"}
                        {grade === "grade4" && "رابعة ثانوي"}
                      </span>
                      <ul>
                        {product.pathways[grade].map((path, index) => (
                          <li
                            key={index}
                            className={`mr-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getRandomGradient()}`}
                          >
                            {path}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getRandomGradient()}`}>
                      {grade === "grade1" && "أولي ثانوي"}
                      {grade === "grade2" && "ثانية ثانوي"}
                      {grade === "grade3" && "ثالثة ثانوي"}
                      {grade === "grade4" && "رابعة ثانوي"}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={tailwindStyles.cardContent}>
              <div className={tailwindStyles.title}>
                {isLtr ? `Title: ${product.name}` : `العنوان: ${product.name}`}
              </div>
              <div className={tailwindStyles.price}>
                {isLtr
                  ? `Price: ${product.price} TND`
                  : `السعر: ${product.price} دينار`}
              </div>
              <div className={tailwindStyles.date}>
                {isLtr
                  ? `Added on: ${formatDate(product.createdAt)}`
                  : `أضيف في: ${formatDate(product.createdAt)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductInfo;
