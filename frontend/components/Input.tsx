import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="w-full mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-600"
      />
    </div>
  );
}
