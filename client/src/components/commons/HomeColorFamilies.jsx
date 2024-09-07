import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillHexagonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// Hàm kiểm tra độ sáng của màu nền
const getContrastColor = (hex) => {
  // Cắt bỏ ký tự #
  hex = hex.replace("#", "");

  // Chuyển đổi màu hex thành giá trị RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Tính toán độ sáng
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Nếu độ sáng lớn hơn 128, chọn màu chữ đen, ngược lại chọn màu trắng
  return brightness > 128 ? "#3b3730" : "#cccccc";
};

const calculateRowLengths = (numColors) => {
  let rowLengths = [];
  let remaining = numColors;

  let currentRowLength = Math.ceil(Math.sqrt(numColors * 1.5)); // Dự đoán số lượng tối đa cho hàng đầu tiên

  while (remaining > 0) {
    if (remaining >= currentRowLength) {
      rowLengths.push(currentRowLength);
      remaining -= currentRowLength;
    } else {
      rowLengths.push(remaining);
      remaining = 0;
    }
    currentRowLength = Math.max(currentRowLength - 1, 1); // Giảm số lượng mỗi hàng nhưng không nhỏ hơn 1
  }
  return rowLengths;
};

const HomeColorFamilies = () => {
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const [hoveredColor, setHoveredColor] = useState(null);

  // Thêm lục giác "All Colors" vào cuối mảng
  const extendedColorFamilies = [
    ...colorFamilies,
    { hex: "010101", name: "All Colors" },
  ];
  const rowLengths = calculateRowLengths(extendedColorFamilies.length);
  const rows = [];
  let index = 0;

  // Thêm lục giác màu vào các hàng
  rowLengths.forEach((length) => {
    const row = [];
    for (let i = 0; i < length && index < extendedColorFamilies.length; i++) {
      row.push(extendedColorFamilies[index]);
      index++;
    }

    rows.push(row);
  });

  return (
    <div className="flex flex-col items-center mt-5 py-10">
      <div className="text-center mb-4">
        <h1 className="text-5xl text-[#1c2759]">CHOOSE A PAINT COLOR FAMILY</h1>
        <p className="text-xl m-2 text-[#747474]">
          We have over 2,000 paint colors to choose from
        </p>
      </div>
      <div className="flex flex-col w-full">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-wrap justify-center ${
              window.innerWidth < 600 ? "gap-1" : ""
            }`}
          >
            {row.map((color, index) => (
              <Link
                key={index}
                to={`/colors/color-family/${color.name}`}
                className={`mx-4 my-2 relative flex items-center justify-center transition-opacity duration-300 ${
                  hoveredColor && hoveredColor !== color.hex
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredColor(color.hex)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width:
                    window.innerWidth < 600 ? "calc(33.33% - 0.5rem)" : "auto",
                }}
              >
                <BsFillHexagonFill
                  size={window.innerWidth < 600 ? 100 : 150}
                  style={{ color: color.hex }}
                />
                <span
                  className="absolute text-xs md:text-sm font-bold text-center"
                  style={{ color: getContrastColor(color.hex) }}
                >
                  {color.name}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeColorFamilies;
