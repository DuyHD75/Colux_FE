import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BsFillHexagonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";

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
  const { t } = useTranslation();
  const [ colorFamlily, setColorFamily ] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getListColorFamily = async () => {
      dispatch(setGlobalLoading(true)); 
      try {
        const { response, err } = await colorsApi.getColorFamily();

        if(response) {
          setColorFamily([...response.data.colorFalimies])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching color family.")
      } finally {
        dispatch(setGlobalLoading(false)); 
      }
    }
    getListColorFamily();
  }, [dispatch])

  const [hoveredColor, setHoveredColor] = useState(null);

  // Thêm lục giác "All Colors" vào cuối mảng
  const extendedColorFamilies = useMemo(() => {
    return [
      ...colorFamlily,
      {
        id: "0",
        name: "All Colors",
        image: "https://stppgpaints1prd01.blob.core.windows.net/masterbrand/libraries/masterbrand/assets/swatches/choosing-color-for-your-job_2.jpg?ext=.jpg",
        title: "Explore Paint Colors",
        description:
          "Ready to find the perfect hue? Explore our interior and exterior paint colors by color family or curated color palettes to get inspired. We also offer easy-to-use tools and color samples to help you see which hues look best in your space. Whether you're painting your front door or adding an accent wall to your home office, we have all the color solutions to bring your vision to life.",
        hex: "#010101",
        collections: [],
      },
    ];
  }, [colorFamlily]);


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

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-col items-center mt-5 py-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl text-[#1c2759] font-bold" style={{ textTransform: 'capitalize', ...textConfigs.style.basicFont}}>{capitalizeWords(t('home.colors.title'))}</h1>
        <p className="text-xl m-2 text-[#000000]" style={{ ...textConfigs.style.basicFont}}>
        {t('home.colors.desc')}
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
            {row.map((colorFamily, index) => (
              <Link
                key={index}
                to={`/colors/color-family/${colorFamily.name}/${colorFamily.id}`}
                className={`mx-4 my-2 relative flex items-center justify-center transition-opacity duration-300 ${
                  hoveredColor && hoveredColor !== colorFamily.id
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredColor(colorFamily.id)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width:
                    window.innerWidth < 600 ? "calc(33.33% - 0.5rem)" : "auto",
                }}
              >
                <BsFillHexagonFill
                  size={window.innerWidth < 600 ? 100 : 150}
                  style={{ color: colorFamily.hex }}
                />
                <span
                  className="absolute text-xs md:text-sm font-bold text-center font-nunito"
                  style={{ color: colorFamily.hex ? getContrastColor(colorFamily.hex): '#000000' }}
                >
                  {colorFamily.name}
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
