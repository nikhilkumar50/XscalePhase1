import React from "react";

const Table = ({ data }) => {
  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-slate-400">
        <thead>
          <tr className="border-r border-secondary bg-blue-500">
            <th className="border-r border-secondary text-white">Year</th>
            <th className="border-r border-secondary text-white">Revenue</th>
            <th className="border-r border-secondary text-white">
              Unit Price
            </th>
            <th className="border-r border-secondary text-white">
              Imp Fee (if Any)
            </th>
            <th className="border-r border-secondary text-white">
              No of Customer (Total)
            </th>
            <th className="border-r border-secondary text-white">
              No of Customer (Retained)
            </th>
            <th className="border-r border-secondary text-white">
              No of Customer (New)
            </th>
            <th className="border-r border-secondary text-white">EBITDA %</th>
          </tr>
        </thead>

        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index} className="even:bg-slate-100">
              {Object.values(row).map((value, index) => (
                <td key={index} className="border border-slate-300 p-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
