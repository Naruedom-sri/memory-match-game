import "../assets/css/Home.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import bgHome from "../assets/audios/bg-home.mp3";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const audioBgRef = useRef(new Audio(bgHome));

  const playBgSound = () => {
    audioBgRef.current.loop = true;
    audioBgRef.current.play().catch((e) => console.log(e));
  };

  const stopPlayBgSound = () => {
    audioBgRef.current.pause();
    audioBgRef.current.currentTime = 0;
  };

  const handleSoundBg = () => {
    if (isPlaying) {
      playBgSound();
    } else {
      stopPlayBgSound();
    }
  };

  useEffect(() => {
    const savedTimeList = JSON.parse(localStorage.getItem("timeList"));
    if (savedTimeList) setTimeList(savedTimeList);
    return () => {
      stopPlayBgSound();
    };
  }, []);

  useEffect(() => {
    handleSoundBg();
  }, [isPlaying]);
  return (
    <div className="home-container h-screen grid grid-cols-2">
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-fit h-fit my-4 mx-10 text-white text-6xl cursor-pointer hover:scale-105 transition-all duration-200"
      >
        {isPlaying ? <HiMiniSpeakerWave /> : <HiMiniSpeakerXMark />}
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/src/assets/images/title-game.png"
          alt="title-game"
          className="w-lg object-cover"
        />
        <div className="button flex flex-col gap-7">
          <Link to="/play-game">
            <Button title="PLAY" color="pink" size="xl" />
          </Link>
          <div onClick={() => setIsShowModal(!isShowModal)}>
            <Button title="BOARD" color="purple" size="xl" />
          </div>
        </div>
      </div>
      {isShowModal && (
        <div className="modal-container z-50 inset-0 fixed flex justify-center items-center bg-black/70 ">
          <div className="box-modal overflow-auto w-1/2 h-1/2 pb-7 flex flex-col items-center rounded-2xl bg-white text-3xl">
            <button
              onClick={() => setIsShowModal(!isShowModal)}
              className="self-end w-10 h-10 m-3 rounded-full bg-red-500 text-white cursor-pointer"
            >
              X
            </button>
            <h1 className="font-semibold text-4xl">Time Board</h1>
            <div className="flex items-center gap-2 mt-4">
              <FaStar className="text-yellow-500" />
              <h1>
                {Math.floor(Math.min(...timeList) / 60)}:
                {String(Math.min(...timeList) % 60).padStart(2, "0")}
              </h1>
            </div>
            <div className="w-full mb-4 mt-4 flex justify-around text-2xl">
              <h1 className="w-40  text-center ">Round</h1>
              <h1 className="w-40  text-center">Time</h1>
            </div>
            <div className="w-full space-y-4">
              {timeList.map((time, index) => {
                return (
                  <div className="flex justify-around text-xl ">
                    <h1 className="w-40 text-center">{index + 1}</h1>
                    <h1 className="w-40  text-center">
                      {Math.floor(time / 60)}:
                      {String(time % 60).padStart(2, "0")}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
