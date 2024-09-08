import { checkBoxProps } from "@/@types/types";
import React from "react";

const Checkbox: React.FC<checkBoxProps> = ({ parameters }) => {
  return (
    <div className="mx-5 my-2">
      <h1 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Edit Users
      </h1>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {parameters.map((item) => {
          return (
            <li
              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              key={item}
            >
              <div className="flex items-center ps-3">
                <input
                  id={item}
                  type="checkbox"
                  value={item}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {item}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Checkbox;
