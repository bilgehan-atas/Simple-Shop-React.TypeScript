import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostProduct from "../api/PostProduct";

type newProduct = {
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
};

const AddItem = () => {
  let developerEmail: string = "bilgehan.atas@gmail.com";
  const [error, setError] = useState<any>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef<any>("");
  const descRef = useRef<any>("");
  const priceRef = useRef<any>("");
  const catRef = useRef<any>("");
  const avatarRef = useRef<any>("");

  let timer = null;
  let navigate = useNavigate();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      nameRef.current.value !== "" &&
      priceRef.current.value !== "" &&
      catRef.current.value !== "" &&
      descRef.current.value !== "" &&
      avatarRef.current.value !== ""
    ) {
      const newProduct: newProduct = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        category: catRef.current.value,
        description: descRef.current.value,
        avatar: avatarRef.current.value,
        developerEmail: developerEmail,
      };
      setIsSubmitted(true);
      PostProduct(newProduct).then((result) => {
        console.log(result)
        setIsAdded(true);
        timer = setTimeout(() => navigate("/"), 500)
      }).catch((error)=> {
        console.log(error)
        setError("Obi-wan Kenobi felt a great disturbance in the force...")
      })

    } else return alert("You have to fill the whole form")
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
          <select id="categories" ref={catRef} className={formStyle}>
            <option value="" disabled selected hidden>
              Categories
            </option>
            <option value="electronic">Electronic</option>
            <option value="furnitures">Furnitures</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>
          <input
            onKeyPress={(event) => {
              if (!/[0-9,".",","]/.test(event.key)) {
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