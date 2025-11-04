import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import clickSound from "../assets/audios/button.mp3";
import { useEffect } from "react";

const ButtonIcon = ({ color, size, icon }) => {
  const colorClasses = {
    purple: "bg-[#4e2ab9] text-white",
    white: "bg-white text-[#4e2ab9]",
  };

  const sizeClasses = {
    md: "w-16 h-16 text-3xl",
    lg: "w-24 h-24 text-4xl",
  };

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  useEffect(() => {
    const audio = new Audio(clickSound);
    audio.load();
  }, []);

  return (
    <button
      onClick={playSound}
      className={twMerge(
        clsx(
          "flex justify-center items-center rounded-full hover:scale-105 transition-all duration-200 cursor-pointer",
          colorClasses[color],
          sizeClasses[size]
        )
      )}
    >
      {icon}
    </button>
  );
};
export default ButtonIcon;
