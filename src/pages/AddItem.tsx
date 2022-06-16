import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostProduct from "../api/PostProduct";
import { typeNewProduct, } from "../types"



const AddItem = () => {
  let developerEmail: string = "bilgehan.atas@gmail.com";
  const [error, setError] = useState<any>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const catRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  let timer = null;
  let navigate = useNavigate();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      nameRef.current?.value !== null &&
      descRef.current?.value !== null &&
      avatarRef.current?.value !== null &&
      catRef.current?.value !== null &&
      catRef.current?.value !== "default" &&
      priceRef.current?.value !== null
    ) {
      const newProduct: typeNewProduct = {
        name: nameRef.current?.value!,
        description: descRef.current?.value!,
        avatar: avatarRef.current?.value!,
        category: catRef.current?.value!,
        price: parseFloat(priceRef.current?.value!),
        developerEmail: developerEmail,
      };
      setIsSubmitted(true);
      PostProduct(newProduct).then((response) => {
        if (response.error) {
          console.log(response);
          setError("Obi-wan Kenobi felt a great disturbance in the API...");
        } else {
          console.log(response);
          setIsAdded(true);
          timer = setTimeout(() => navigate("/"), 500);
        }
      });
    } else return alert("You have to fill the whole form");
  };

  let formStyle: string =
    "text-sm text-gray-base w-full p-2 mb-5 rounded mb-2 outline-none drop-shadow-md";

  return (
    <div className="m-16">
      <div className="flex flex-col items-center justify-center">
        {error !== null && (
          <p className="flex flex-col items-center justify-center">{error}</p>
        )}
        {error === null && isAdded === false && isSubmitted === true && (
          <p className="flex flex-col items-center justify-center">
            Working on it. Please wait.
          </p>
        )}
        {error === null && isAdded === true && (
          <p className="flex flex-col items-center justify-center">
            A new item has been added!
          </p>
        )}
        <p className="font-semibold p-8 text-xl">Create Product</p>
        <form onSubmit={submitHandler}>
          <input
            id="name"
            ref={nameRef}
            type="text"
            placeholder="Product Name"
            className={formStyle}
          />
          <textarea
            id="description"
            ref={descRef}
            placeholder="Description"
            className={formStyle}
          />
          <input
            id="avatar"
            ref={avatarRef}
            type="text"
            placeholder="Image URL"
            className={formStyle}
          />
          <select defaultValue="default" id="categories" ref={catRef} className={formStyle}>
            <option value="default" hidden>
              Select a Category
            </option>
            <option value="Electronic">Electronic</option>
            <option value="Furnitures">Furnitures</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            onKeyPress={(event) => {
              if (!/[0-9.]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            id="price"
            ref={priceRef}
            type="text"
            placeholder="Price"
            className={formStyle}
          />
          <button
            type="submit"
            className="bg-white w-full rounded p-2 mb-4 outline-none drop-shadow-md"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
