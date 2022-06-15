import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { typeProduct } from '../routes/Details'

export type typeCategories = {
  id: string;
  name: string;
};

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const CategoriesDropDown: React.FC<{getCategory: (param: typeProduct[]) => void }> = (props) => {
  const [selected, setSelected] = useState<any>(null)
  const [categories, setCategories] = useState<typeCategories[]>([]);

  async function fetchCategories() {
      const response = await fetch(
        'https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/'
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategory = (e:typeProduct[]) => {
    setSelected(e);
    props.getCategory(e)
  }

  return (
    <Listbox value={selected} onChange={getCategory}>
      {({ open }) => (
        <>
          <div className='realtive p-2 w-full'>
            <Listbox.Button className='relative w-full border-none outline-non text-sm text-gray-base'>
              <span className='flex items-center'>
                {selected === null && <span className='ml-3 block truncate'>Categories</span> }
                {selected !== null && <span className='ml-3 block truncate'>{selected.name}</span> }
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='z-10 absolute mt-6 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {category.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default CategoriesDropDown;