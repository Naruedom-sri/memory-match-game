import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import clickSound from "../assets/audios/button.mp3";
import { useEffect } from "react";

const Button = ({ color, size, title }) => {
  const colorClasses = {
    purple:
      "hover:bg-white/50",
    pink: "bg-[#e2b6fe] shadow-[0_4px_0_#c084fc] active:shadow-[0_1px_0_#c084fc] hover:scale-105 active:translate-y-0.5 ",
  };

  const sizeClasses = {
    sm: "w-24 h-8 text-sm",
    md: "w-40 h-10 text-base",
    lg: "w-56 h-12 text-lg",
    xl: "w-72 h-20 text-2xl",
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
          "text-[#4e2ab9] font-bold rounded-2xl transition-all duration-150 cursor-pointer",
          colorClasses[color],
          sizeClasses[size]
        )
      )}
    >
      {title}
    </button>
  );
};

export default Button;
