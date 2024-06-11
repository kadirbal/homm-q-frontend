import React from "react";
import "./monts.css";

type TMonth = {
  month: number;
  name: string;
};

const MONTHS: TMonth[] = [
  { month: 1, name: "Ocak" },
  { month: 2, name: "Şubat" },
  { month: 3, name: "Mart" },
  { month: 4, name: "Nisan" },
  { month: 5, name: "Mayıs" },
  { month: 6, name: "Haziran" },
  { month: 7, name: "Temmuz" },
  { month: 8, name: "Ağustos" },
  { month: 9, name: "Eylül" },
  { month: 10, name: "Ekim" },
  { month: 11, name: "Kasım" },
  { month: 12, name: "Aralık" },
];

const Months: React.FC<{
  selectedMonths: number[];
  onChange: (months: TMonth) => void;
}> = ({ selectedMonths, onChange }) => {
  return (
    <ul className="grid grid-cols-6 gap-2 text-sm w-full">
      {MONTHS.map((item) => (
        <li key={item.month} className="">
          <label
            className={`badge block text-center ${
              selectedMonths.includes(item.month) ? "selected-month" : ""
            }`}
          >
            {item.name}
            <input
              type="checkbox"
              value={item.month}
              onChange={() => onChange(item)}
              hidden
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Months;
