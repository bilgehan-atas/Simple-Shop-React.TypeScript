import React from "react";
import { Link } from "react-router-dom";
import { typeProduct } from "../types";

const ItemCard: React.FC<{ itemlist: typeProduct[] }> = (props) => {
  return (
    <div className="m-auto grid grid-cols-1 gap-y-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...props.itemlist].reverse().map((element: typeProduct, i: number) => {
        return (
          <div className="m-auto md:w-32 md:h-48" key={i}>
            <Link to={`/details/${element.id}`} key={element.id}>
              <div className="bg-white rounded-lg overflow-hidden md:w-32 md:h-48">
                <img
                  src={element.avatar}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://www.webtures.com/backend/images/no-image.jpeg";
                  }}
                  alt={element.name}
                  className="object-scale-down object-center p-12 md:w-32 md:h-48 md:p-2"
                />
              </div>
              <p className="mt-2 font-medium max-h-4 leading-4 overflow-hidden">
                {element.name}
              </p>
              <p className="text-center mt-2 font-medium">$ {element.price}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCard;
