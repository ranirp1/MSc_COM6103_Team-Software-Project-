import React, { useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { DeviceStatusConstant } from '../User/DeviceStatusComponent';
const StaffFilterComponent = ({ onFilterChange }: { onFilterChange: (option: string) => void }) => {
   
    return (<details className="dropdown dropdown-end ml-4">
        <summary tabIndex={0} role="button" className="btn btn-ghost cursor-pointer border-2 border-primary"> <RiFilter3Line className="text-lg" /> Filter</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {Object.values(DeviceStatusConstant).map((option, index) => (
                    <li key={index}>
                        <a onClick={() => onFilterChange(option)}>{option}</a>
                    </li>
                ))}
            </ul>
    </details>);
   
};

export default StaffFilterComponent;