import { useState, useEffect, useRef } from "react";
import "../assets/css/PlayGame.css";
import { FaRegClock } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import endGame from "../assets/audios/end-game.mp3";
import bgGame from "../assets/audios/bg-game.mp3";
import cardMatch from "../assets/audios/match-card.mp3";
import cardNotMatch from "../assets/audios/not-match.mp3";
import ButtonIcon from "../components/ButtonIcon";

const catList = ["cat-1", "cat-2", "cat-3", "cat-4", "cat-5", "cat-6"];
const PlayGame = () => {
  const [cardList, setCardList] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerIdRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const [flipCardList, setFlipCardList] = useState([]);
  const [cardMatchList, setMatchCardList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const audioBgRef = useRef(new Audio(bgGame));

  const addToFlipCardList = (card) => {
    if (
      flipCardList.length === 2 ||
      flipCardList.includes(card) ||
      cardMatchList.includes(card)
    ) {
      return;
    }
    const newFlipCardList = [...flipCardList];
    newFlipCardList.push(card);
    setFlipCardList(newFlipCardList);
  };

  const checkMatchCard = () => {
    const newCardMatchList = [...cardMatchList];
    if (flipCardList[0].name === flipCardList[1].name) {
      newCardMatchList.push(flipCardList[0]);
      newCardMatchList.push(flipCardList[1]);
      playSound(cardMatch);
      setMatchCardList(newCardMatchList);
      setFlipCardList([]);
    } else {
      playSound(cardNotMatch);
      setTimeout(() => setFlipCardList([]), 500);
    }
  };

  const randomCardList = () => {
    const newCardList = [...catList, ...catList]
      .map((cat, index) => ({
        id: index,
        name: cat,
      }))
      .sort(() => Math.random() - 0.5);
    setCardList(newCardList);
  };

  const setTimerGame = () => {
    stopTimerGame();
    setTimer(0);
    timerIdRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimerGame = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const startGame = () => {
    handleSoundBg();
    randomCardList();
    setTimerGame();
    setIsShowModal(false);
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const playBgSound = () => {
    setTimeout(() => {
      audioBgRef.current.loop = true;
      audioBgRef.current.play();
    }, 500);
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
    startGame();

    return () => {
      stopPlayBgSound();
    };
  }, []);

  useEffect(() => {
    if (flipCardList.length === 2) {
      checkMatchCard();
    }
  }, [flipCardList]);

  useEffect(() => {
    if (cardMatchList.length === 12) {
      setIsShowModal(true);
      stopTimerGame();
      stopPlayBgSound();
      playSound(endGame);
      setMatchCardList([]);
      const savedTimeList = JSON.parse(localStorage.getItem("timeList")) || [];
      savedTimeList.push(timer);
      localStorage.setItem("timeList", JSON.stringify(savedTimeList));
    }
  }, [cardMatchList]);

  useEffect(() => {
    handleSoundBg();
  }, [isPlaying]);

  return (
    <div className="play-game-container bg-[#8253cd] ">
      <div className="header grid grid-cols-3 items-center py-10 text-white text-3xl">
        <div className="flex justify-center items-center">
          <Link to="/">
            <ButtonIcon color="white" size="md" icon={<FaHome />} />
          </Link>
        </div>
        <div className="time flex justify-center items-center gap-2">
          <FaRegClock />
          <h1>
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
          </h1>
        </div>
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-fit mx-auto text-5xl hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          {isPlaying ? <HiMiniSpeakerWave /> : <HiMiniSpeakerXMark />}
        </div>
      </div>
      <div className="card-list-container grid grid-cols-4 grid-rows-3 gap-7 pb-10">
        {cardList.map((card) => {
          return (
            <div
              onClick={() => {
                addToFlipCardList(card);
              }}
              className={`cursor-pointer mx-auto transition-all duration-1000 ${
                cardMatchList.includes(card) && cardMatchList.length !== 12
                  ? "opacity-0"
                  : ""
              }`}
              key={card.id}
            >
              <img
                src={`/images/cat/${
                  cardMatchList.includes(card) || flipCardList.includes(card)
                    ? card.name
                    : "card-back-cat"
                }.png`}
                alt="card-back"
                className={`max-w-60 max-h-80 object-cover rounded-md hover:-translate-y-2 transition-all duration-200 ${
                  flipCardList.includes(card) ? "scale-105" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
      {isShowModal && (
        <div className="modal-container z-50 inset-0 fixed flex justify-center items-center bg-black/70 ">
          <div className="box-modal w-1/3 h-1/3 flex flex-col justify-center items-center gap-8 rounded-2xl bg-white text-3xl">
            <h1 className="font-semibold text-4xl">Time</h1>
            <p>
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </p>
            <div className="flex gap-7 ">
              <div className="flex justify-center items-cent">
                <Link to="/">
                  <ButtonIcon color="purple" size="md" icon={<FaHome />} />
                </Link>
              </div>
              <div
                onClick={startGame}
                className="flex justify-center items-center"
              >
                <ButtonIcon color="purple" size="md" icon={<FaRedo />} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayGame;
