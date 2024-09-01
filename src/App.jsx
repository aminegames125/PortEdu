import React from "react";
import DrawerComponent from "./components/Main/DrawerComponent";
import ProfileDropdown from "./components/Main/ProfileDropdown";
import SearchBar from "./components/Main/SearchBar";
import ThemeSwitcher from "./components/Main/ThemeSwitcher";
import Footer from "./components/Main/Footer";
import ProductList from "./components/ProductList"; 

const App = () => (
  <div dir="rtl" className="flex min-h-screen flex-col bg-white dark:bg-main">
    <SearchBar />
    <DrawerComponent />
    <ThemeSwitcher />
    <ProfileDropdown />
    <div className="flex-grow p-4 text-left">
      <div className="mx-auto max-w-screen-lg">
        <h1 className="mb-4 text-2xl font-bold">Products</h1>
        <ProductList />
      </div>
    </div>
    <Footer />
  </div>
);

export default App;
