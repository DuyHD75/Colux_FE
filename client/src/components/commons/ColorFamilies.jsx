import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillHexagonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

// Hàm kiểm tra độ sáng của màu nền
const getContrastColor = (hex) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#3b3730" : "#cccccc";
};

const ColorFamilies = ({ onColorSelect, selectedColor }) => {
  const [ colorFamlily, setColorFamily ] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getListColorFamily = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
    getListColorFamily();
  }, [dispatch])


  const extendedColorFamilies = [
    ...colorFamlily,
    {
      id: "0",
      name: "All Colors",
      img: "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fall-color.jpg?alt=media&token=da5ab063-332e-4808-8905-1747d131c180",
      title: "Explore Paint Colors",
      content:
        "Ready to find the perfect hue? Explore our interior and exterior paint colors by color family or curated color palettes to get inspired. We also offer easy-to-use tools and color samples to help you see which hues look best in your space. Whether you're painting your front door or adding an accent wall to your home office, we have all the color solutions to bring your vision to life.",
      hex: "#c1cbd2",
      collections: [],
    },
  ];

  const handleColorSelect = (color) => {
    onColorSelect(color);
  };

  return (
    <div
      className={`flex flex-wrap justify-center ${
        window.innerWidth < 600 ? "gap-1" : ""
      }`}
    >
      {isLoading === false && extendedColorFamilies.map((colorFamily, index) => {
        const isSelected = selectedColor?.id === colorFamily.id;
        return (
          <Link
            key={index}
            to={{
              pathname: `/colors/color-family/${colorFamily.name}/${colorFamily.id}`,
              state: { colorfamilyId: colorFamily.id },  
            }}
            className={`mx-2 my-2 relative flex flex-col items-center justify-center transition-transform duration-300`}
            style={{
              width: window.innerWidth < 600 ? "calc(33.33% - 0.5rem)" : "auto",
              transform: isSelected ? "scale(1.2)" : "scale(1)",
            }}
            onClick={() => handleColorSelect(colorFamily)}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <BsFillHexagonFill
              size={window.innerWidth < 600 ? 60 : 80}
              style={{ color: colorFamily.hex }}
            />
            {isSelected && (
              <FaCheck
                className="absolute bottom-1/2"
                style={{
                  colorFamily: getContrastColor(colorFamily.hex),
                  fontSize: window.innerWidth < 600 ? "1rem" : "1.6rem",
                }}
              />
            )}
            <span
              className="text-xs md:text-sm font-bold text-center mt-1"
              style={{ color: "#3b3730" }}
            >
              {colorFamily.name}
            </span>
          </Link>
        );
      })}
      {isLoading === true && (
          <Box display="flex" justifyContent="center" alignItems="center" width="20%">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
          </Box>
        )}
    </div>
  );
};

export default ColorFamilies;
