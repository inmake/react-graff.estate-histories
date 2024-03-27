/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSwipeable } from "react-swipeable";

interface IVideo {
  src: string;
  poster: string;
  title: string;
  desc: string;
}

const videos: IVideo[] = [
  {
    src: "https://graff.estate/videos/histories/1.mp4",
    poster: "",
    title: "",
    desc: "",
  },
  {
    src: "https://graff.estate/videos/histories/2.mp4",
    poster: "",
    title: "",
    desc: "",
  },
  {
    src: "https://graff.estate/videos/histories/3.mp4",
    poster: "",
    title: "",
    desc: "",
  },
  {
    src: "https://graff.estate/videos/histories/1.mp4",
    poster: "",
    title: "",
    desc: "",
  },
  {
    src: "https://graff.estate/videos/histories/2.mp4",
    poster: "",
    title: "",
    desc: "",
  },
  {
    src: "https://graff.estate/videos/histories/3.mp4",
    poster: "",
    title: "",
    desc: "",
  },
];

function App() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const videoRefs = videos.map(() => createRef<HTMLVideoElement>());
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [videoHeigth, setVideoHeigth] = useState<number>(0);
  // const [_document, setDocument] = useState<Document>();
  const { ref, inView } = useInView();
  const [isEntered, setIsEntered] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  function handleEnded() {
    if (selectedVideoIndex === videos.length - 1) {
      setSelectedVideoIndex(0);
    } else {
      setSelectedVideoIndex((prev) => prev + 1);
    }
  }

  function prev() {
    if (selectedVideoIndex === 0) return;
    setSelectedVideoIndex((prev) => prev - 1);
  }

  function next() {
    if (selectedVideoIndex === videos.length - 1) return;
    setSelectedVideoIndex((prev) => prev + 1);
  }

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    if (!inView || isEntered) return;

    setIsEntered(true);
  }, [inView]);

  useEffect(() => {
    for (let index = 0; index < videoRefs.length; index++) {
      if (selectedVideoIndex === index) {
        videoRefs[index].current?.play();
      } else {
        videoRefs[index].current?.pause();
      }
    }
  }, [isEntered, selectedVideoIndex]);

  // useEffect(() => {
  //   if (!_document) return;
  //   if (videoRefs.length !== videos.length) return;

  //   // TODO
  // }, [_document]);

  return (
    <div className="overflow-x-clip h-[3000px]">
      <div ref={ref} className="container mx-auto 2xl:max-w-screen-2xl">
        <div className="flex bg-gray-500 border-b 2xl:h-[760px] xl:h-[687px]">
          <div className="left bg-red-200 min-w-[496px] flex flex-col justify-between">
            <h2>Истории</h2>
            <p>{videos[selectedVideoIndex].title}</p>
            <p>{videos[selectedVideoIndex].desc}</p>
            <div className="flex gap-2">
              <button className="rounded-full border p-2" onClick={prev}>
                Left
              </button>
              <button className="rounded-full border p-2" onClick={next}>
                Right
              </button>
            </div>
          </div>
          <div
            {...handlers}
            className="right relative flex gap-4 pb-10 pl-10 select-none"
            style={{
              clipPath: `rect(auto auto auto 0)`,
            }}
          >
            {videos.map((video, index) => (
              <div
                className="relative aspect-[9/16] bg-black transition-transform duration-300"
                style={{
                  transform: `translateX(-${
                    videoWidth * selectedVideoIndex + 16 * selectedVideoIndex
                  }px)`,
                }}
              >
                <video
                  ref={videoRefs[index]}
                  src={isEntered ? video.src : undefined}
                  poster={video.poster}
                  muted
                  loop
                  playsInline
                  className="aspect-[9/16] object-cover w-full h-full"
                  onEnded={handleEnded}
                  onLoadedData={() =>
                    setTimeout(() => {
                      setVideoWidth(videoRefs[0].current!.clientWidth);
                      setVideoHeigth(videoRefs[0].current!.clientHeight);
                    }, 200)
                  }
                />
                <div
                  className={`absolute progress-bar h-[3px] bg-[#52587A] transition-opacity duration-700 ${
                    selectedVideoIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: `${videoWidth}px`,
                    top: `${videoHeigth - 3}px`,
                  }}
                >
                  <div
                    className="bg-white h-full"
                    style={{
                      width: `10%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {/* <div
              {...handlers}
              className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-50"
            ></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
