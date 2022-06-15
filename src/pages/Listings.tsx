import React, { useState, useEffect } from "react";
import CategoriesDropDown from "../components/CategoriesDropDown";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { typeProduct } from "./Details";
import GetListing from "../api/GetListing";

let loadingText: string = "p-8 font-bold text-center";

const Listings = () => {
  const [items, setItems] = useState<typeProduct[]>([]);
  const [filteredItems, setFilteredItems] = useState<typeProduct[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<typeProduct[]>([]);
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);

  if (!isloaded) {
    GetListing()
      .then((result) => {
        setItems(result);
        setFilteredItems(result);
        setItemsByCategory(result);
        setIsLoaded(true);
        setError(null);
        console.log(result);
      })
      .catch((error) => {
        setError("Obi-wan Kenobi felt a great disturbance in the force...");
        console.log(error);
      });
  }

  const filterFunc = (searchTerm: string) => {
    const newItems = itemsByCategory.filter(
      (item) =>
        !searchTerm ||
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(newItems);
  };

  const getCategory = (e: any) => {
    const newItems = items.filter(
      (item) =>
        !e || item?.category.toLowerCase().includes(e.name.toLowerCase())
    );
    setItemsByCategory(newItems);
    setFilteredItems(newItems);
    (document.getElementById("searchinput") as HTMLFormElement).value = null;
  };

  return (
    <div className="">
      <div className="w-4/5 m-auto lg:flex lg:justify-between">
        <div className="mt-6 bg-white rounded-lg drop-shadow-md overflow-hidden lg:w-1/3">
          <input
            type="text"
            className="w-full p-2 border-none outline-none text-sm text-gray-base"
            placeholder="Apple Watch, Samsung S21, Macbook Pro, ..."
            id="searchinput"
            onChange={(e) => filterFunc(e.target.value)}
          ></input>
        </div>
        <div className="mt-6 bg-white rounded-lg drop-shadow-md z-10 lg:w-1/3">
          <CategoriesDropDown getCategory={getCategory} />
        </div>
      </div>
      <div className="mt-6">
        <div className="w-2/3 m-auto">
          {isloaded === false && error === null && (
            <p className={loadingText}>Loading...</p>
          )}
          {isloaded === true && filteredItems.length === 0 && (
            <p className={loadingText}>There is nothing to see here.</p>
          )}
          {error !== null && <p className={loadingText}>{error}</p>}
          {isloaded === true && filteredItems.length > 0 && (
            <div className="m-auto grid grid-cols-1 gap-y-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((element: any, i: any) => {
                return (
                  <div className="w-32 h-48 m-auto" key={i}>
                    <Link to={`/details/${element.id}`} key={element.id}>
                      <div className="bg-white rounded-lg w-32 h-48 overflow-hidden">
                        <img
                          src={element.avatar}
                          alt={element.name}
                          className="object-scale-down object-center w-32 h-48"
                        />
                      </div>
                      <p className="mt-2 font-medium max-h-4 leading-4 overflow-hidden">
                        {element.name}
                      </p>
                      <p className="text-center mt-2 font-medium">
                        $ {element.price}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-6 w-16 h-16 ml-auto mr-12">
        <Link to="/additem">
          <PlusCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default Listings;