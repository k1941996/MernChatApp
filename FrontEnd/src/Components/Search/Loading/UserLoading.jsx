import React from "react";
import { v4 } from "uuid";

const loadingArray = Array(8)
  .fill(0)
  .map(() => v4());
const UserLoading = () => {
  return loadingArray.map((e) => (
    <div key={e}>
      <div className="flex space-x-4 px-6 py-5 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className=" avatar">
          <div className=" skeleton w-14 rounded-full" />
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default UserLoading;
