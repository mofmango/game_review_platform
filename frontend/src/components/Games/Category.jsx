import { Link } from "react-router-dom";

export default function Category({ text, to, checked }) {
  return (
    <Link
      to={to}
      className={`block w-[30%] border-2 border-[#ccc] text-center py-2 rounded-2xl transition-colors
        ${
          checked
            ? "bg-[#000] text-white border-[#000] font-bold shadow"
            : "bg-white text-gray-800"
        }
      `}
    >
      {text}
    </Link>
  );
}
