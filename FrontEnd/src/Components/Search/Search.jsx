import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = (props) => {
  return (
    <div className="flex gap-4 p-4 items-center  ">
      <form action="" className="flex-1">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" {...props} />
        </label>
      </form>
      <button className="rounded-full bg-white w-10 h-10 flex items-center justify-center duration-300 hover:bg-gray-600">
        <IoSearch color="#000" fontSize={24} />
      </button>
    </div>
  );
};

export default Search;
