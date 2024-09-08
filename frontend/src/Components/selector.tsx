import { User } from "@/@types/types";
import React, { Dispatch } from "react";

type Props = {
  parameters: User[];
  setUser: Dispatch<React.SetStateAction<string>>;
}

const Slider: React.FC<Props> = ({ parameters, setUser }) => {
  return (
    <select
      className="px-5 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none outline-none w-[18%]"
      onChange={(e) => setUser(e.target.value)}
    >
      <option disabled selected>
        Choose
      </option>
      {parameters?.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.username}
          </option>
        );
      })}
    </select>
  );
};

export default Slider;
