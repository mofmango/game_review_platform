import React from "react";

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  ...rest
}) {
  return (
    <div className="mb-4">
      <input
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
