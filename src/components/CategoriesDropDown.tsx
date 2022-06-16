import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { typeProduct } from "../pages/Details";
import GetCategories from "../api/GetCategories";

export type typeCategories = {
  id: string;
  name: string;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const CategoriesDropDown: React.FC<{
  getCategory: (param: typeProduct[]) => void;
}> = (props) => {
  const [isloaded, setIsLoaded] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [categories, setCategories] = useState<typeCategories[]>([]);

  if (!isloaded) {
    GetCategories().then((result) => {
      if (result.error) {
        setIsError(true);
      } else {
        setCategories(result);
        setIsLoaded(true);
      }
    });
  }

  const getCategory = (e: any) => {
    setSelected(e);
    props.getCategory(e);
    console.log(e)
  };

  return (
    <div>
      {iserror && <p className="p-2 text-sm text-gray-base ml-3 block truncate" onClick={()=> alert("Category API is broken")}>Categories</p>}
      {!iserror && (
        <Listbox value={selected} onChange={getCategory}>
          {({ open }) => (
            <>
              <div className="relative p-2 w-full">
                <Listbox.Button className="relative w-full border-none outline-non text-sm text-gray-base">
                  <span className="flex items-center">
                    {selected === null && (
                      <span className="ml-3 block truncate">Categories</span>
                    )}
                    {selected !== null && (
                      <span className="ml-3 block truncate">
                        {selected.name}
                      </span>
                    )}
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 mt-4 w-full bg-white shadow-lg rounded-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none text-sm overflow-hidden">
                    {categories.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={category}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {category.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
      )}
    </div>
  );
};

export default CategoriesDropDown;
