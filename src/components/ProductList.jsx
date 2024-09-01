import React from "react";
import products from "../data/products.json"; 


const tailwindStyles = {
  card: "relative transform-gpu transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl shadow-md dark:shadow-gray-700 rounded-lg overflow-hidden max-w-lg", 
  cardMedia:
    "w-full h-72 object-cover transition-filter duration-300 ease-in-out hover:brightness-75", 
  badge:
    "absolute top-3 right-3 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full", 
  cardContent: "p-6 bg-gray-100 dark:bg-gray-800", 
  title: "font-semibold text-xl dark:text-white", 
  price: "mb-3 text-2xl dark:text-gray-300", 
  date: "text-md text-gray-600 dark:text-gray-400", 
  container: "p-6",
};


const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ProductList = () => {
  
  const isNewProduct = (createdAt) => {
    const FIVE_DAYS_IN_MILLISECONDS = 5 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return now - createdAt * 1000 <= FIVE_DAYS_IN_MILLISECONDS;
  };

  return (
    <div className={tailwindStyles.container} dir="ltr">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((item) => {
          const isLtr = item.ltr === "true"; 
          return (
            <div
              key={item.id}
              className={tailwindStyles.card}
              style={{ direction: isLtr ? "ltr" : "rtl" }} 
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className={tailwindStyles.cardMedia}
                />
                {isNewProduct(item.createdAt) && (
                  <span className={tailwindStyles.badge}>
                    {isLtr ? "New" : "جديد"}
                  </span>
                )}
              </div>
              <div className={tailwindStyles.cardContent}>
                <div className={tailwindStyles.title}>
                  {isLtr ? `Title: ${item.name}` : `العنوان: ${item.name}`}
                </div>
                <div className={tailwindStyles.price}>
                  {isLtr
                    ? `Price: ${item.price} TND`
                    : `السعر: ${item.price} دينار`}
                </div>
                <div className={tailwindStyles.date}>
                  {isLtr
                    ? `Added on: ${formatDate(item.createdAt)}`
                    : `أضيف في: ${formatDate(item.createdAt)}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
