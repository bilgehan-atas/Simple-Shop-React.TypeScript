import React, { useState, useEffect } from 'react';
import CategoriesDropDown from '../components/CategoriesDropDown';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { typeProduct } from '../routes/Details';

let loadingText: string = 'p-8 font-bold text-center';

const Listings = () => {
  const [items, setItems] = useState<typeProduct[]>([]);
  const [filteredItems, setFilteredItems] = useState<typeProduct[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<typeProduct[]>([]);
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);

  async function fetchData() {
    try {
      const response = await fetch(
        'https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/'
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      }

      setItems(data);
      setFilteredItems(data);
      setItemsByCategory(data);
      setIsLoaded(true);
      setError(null);
    } catch (error) {
      setError('Obi-wan Kenobi felt a great disturbance in the force...');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
    (document.getElementById('searchinput') as HTMLFormElement).value = null;
  };

  return (
    <div className='relative '>
      <div className='w-4/5 m-auto lg:flex lg:flex-row lg:justify-between'>
        <div className='w-full mt-6 bg-white rounded-md drop-shadow-md overflow-hidden lg:w-1/3'>
          <input
            type='text'
            className='w-full p-2 border-none outline-none text-sm text-gray-base'
            placeholder='Apple Watch, Samsung S21, Macbook Pro, ...'
            id='searchinput'
            onChange={(e) => filterFunc(e.target.value)}
          ></input>
        </div>
        <div className='w-full mt-6 bg-white rounded-md drop-shadow-md z-10 lg:w-1/3'>
          <CategoriesDropDown getCategory={getCategory} />
        </div>
      </div>
      <div className='relative w-full mt-6'>
        <div className='w-2/3 m-auto'>
          {isloaded === false && error === null && (
            <p className={loadingText}>Loading...</p>
          )}
          {isloaded === true && filteredItems.length === 0 && (
            <p className={loadingText}>There is nothing to see here.</p>
          )}
          {error !== null && <p className={loadingText}>{error}</p>}
          {isloaded === true && filteredItems.length > 0 && (
            <div className='text-center m-auto grid grid-cols-1 gap-y-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {filteredItems.map((element: any, i: any) => {
                return (
                  <div className='w-32 h-48 m-auto' key={i}>
                    <Link to={`/details/${element.id}`} key={element.id}>
                      <div className='bg-white rounded-md drop-shadow-md w-32 h-48 overflow-hidden'>
                        <img
                          src={element.avatar}
                          alt={element.name}
                          className='object-scale-down object-center w-32 h-48'
                        />
                      </div>
                      <p>{element.name}</p>
                      <p>${element.price}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className='sticky bottom-6 w-16 h-16 ml-auto mr-12'>
        <Link to='/additem'>
          <PlusCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default Listings;
