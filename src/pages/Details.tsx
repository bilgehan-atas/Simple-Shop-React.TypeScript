import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetProduct from "../api/GetProduct";

export type typeProduct = {
  id: number;
  name: string;
  avatar: string;
  price: number;
  description: string;
  category: string;
};

const Details = () => {
  const [item, setItem] = useState<typeProduct | null>(null);
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  let params = useParams();
  let ItemId: any = params.ItemId

  if (!isloaded) {
    GetProduct(ItemId)
      .then((result) => {
        setItem(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError("Obi-wan Kenobi felt a great disturbance in the force...")
      });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-6 ">
      {isloaded === false && error === null && <p>Loading...</p>}
      {isloaded === true && item === null && error === null && (
        <p>There is nothing to see here.</p>
      )}
      {error !== null && <p>{error}</p>}
      {isloaded === true && item !== null && (
        <div className="flex flex-col w-2/3">
          <div className="mb-2 m-auto lg:flex lg:m-0 lg:space-x-8 ">
            <div className="w-64 h-72 pt-6 pb-6 bg-white rounded-md overflow-hidden">
              <img src={item.avatar} alt={item.name} className="object-scale-down object-center w-64 h-60"/>
            </div>
            <div className="flex flex-col w-64 grow lg:space-y-52">
              <p className="grow mt-6 m-auto text-center lg:mt-0 lg:m-0 lg:text-left font-semibold text-4xl">{item.name}</p>
              <p className="grow mt-6 m-auto text-center lg:mt-0 lg:m-0 lg:text-left font-semibold text-xl">$ {item.price}</p>
            </div>
          </div>
          <div className="divide-y-2 divide-slate-500">
            <div></div> <div className="m-2"></div>
          </div>
          <div>
            <p className="font-semibold text-xl">Description</p>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;