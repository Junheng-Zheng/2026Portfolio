"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

const CalendarHeatmap = ({ year = new Date().getFullYear() }) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  // Generate all days in the year
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  // Fake activity data (replace later with real data)
  const getIntensity = () => Math.floor(Math.random() * 5); // 0–4

  const colorMap = ["#F3F4F6", "#FED7AA", "#F3F4F6", "#FB923C", "#F97316"];

  //   "#FED7AA",
  // "#FDBA74",
  // "#FB923C",
  // "#F97316",

  // Pad start so weeks align (Sun–Sat)
  const padding = Array(start.getDay()).fill(null);

  const cells = [...padding, ...days];

  return (
    <div className="flex flex-col gap-6 w-full bg-white">
      {/* Month labels */}
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-12 text-xs text-gray-400 px-1">
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m) => (
            <div key={m}>{m}</div>
          ))}
        </div>

        {/* Heatmap */}
        <div
          className="grid grid-rows-7 rounded-xl auto-cols-fr grid-flow-col"
          style={{
            gridAutoColumns: "1fr",
          }}
        >
          {cells.map((day, i) => {
            if (!day) {
              return <div key={i} className="w-3 h-3 " />;
            }

            const intensity = getIntensity();
            const color = colorMap[intensity];

            return (
              <div
                key={i}
                className="aspect-square border-r border-b rounded-xs border-white"
                style={{ backgroundColor: color }}
                title={day ? day.toDateString() : ""}
              />
            );
          })}
        </div>
      </div>

      {/* Heamap legend */}
      <div className="flex items-center gap-3 text-xs text-gray-400 ">
        <p>0 Activity</p>
        <div className="flex items-center gap-1">
          {colorMap.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p>5 Activity</p>
      </div>
    </div>
  );
};

const Starticon = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 114 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0.5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <path
        d="M11.5797 21.0299V73.3099C11.5797 74.7899 11.1397 75.7799 10.2697 76.2799C9.39974 76.7799 8.30974 76.6499 7.01974 75.9099C5.72974 75.1599 4.64975 74.0399 3.77975 72.5299C2.89975 71.0199 2.46973 69.5299 2.46973 68.0499V15.7699C2.46973 14.2899 2.89975 13.2999 3.77975 12.7999L4.04971 12.6699C4.86971 12.3299 5.85974 12.4999 7.01974 13.1699C8.30974 13.9199 9.39974 15.0399 10.2697 16.5499C11.1397 18.0599 11.5797 19.5499 11.5797 21.0299Z"
        stroke="#E0E0E0"
        strokeLinejoin="round"
      />
      <path
        d="M20.6898 52.4299C20.6898 53.9099 21.1298 55.4099 21.9998 56.9099C22.1498 57.1699 22.3098 57.4199 22.4698 57.6499C23.2498 58.7899 24.1798 59.6699 25.2498 60.2899L31.5498 63.9299C31.4398 65.0699 31.0098 65.8499 30.2698 66.2799L29.9998 66.4099L10.2698 76.2799C11.1398 75.7799 11.5798 74.7899 11.5798 73.3099V21.0299C11.5798 19.5499 11.1398 18.0599 10.2698 16.5499C9.39984 15.0399 8.30984 13.9199 7.01984 13.1699C5.85984 12.4999 4.8698 12.3299 4.0498 12.6699L23.7798 2.79986C24.6498 2.29986 25.7298 2.42986 27.0198 3.16986C28.3098 3.91986 29.3998 5.03986 30.2698 6.54986C31.1398 8.05986 31.5798 9.54986 31.5798 11.0299V44.6699L22.4698 49.2299L22.2698 49.3299L21.9998 49.4599C21.1298 49.9599 20.6898 50.9499 20.6898 52.4299Z"
        stroke="#E0E0E0"
        strokeLinejoin="round"
      />
      <path
        d="M91.65 93.3999C91.65 94.0999 91.5599 94.6998 91.3699 95.1998C91.1799 95.6998 90.85 96.0798 90.4 96.3398L87.02 98.2599L69.4399 108.29C68.6099 108.76 67.5599 108.64 66.3099 107.91C65.0599 107.19 63.9699 106.09 63.0599 104.6C62.1499 103.03 61.7 101.53 61.7 100.09C61.7 98.6498 62.1499 97.6699 63.0599 97.1499L76.1599 89.6799L31.5499 63.9299L25.2499 60.2899C24.1799 59.6699 23.2499 58.7899 22.4699 57.6499C22.3099 57.4199 22.1499 57.1699 21.9999 56.9099C21.1299 55.4099 20.6899 53.9099 20.6899 52.4299C20.6899 50.9499 21.1299 49.9599 21.9999 49.4599L22.27 49.3299C22.33 49.2999 22.3999 49.2799 22.4699 49.2699C23.2499 49.0299 24.1799 49.2199 25.2499 49.8299L31.58 53.4899L76.1599 79.2299L66.5699 62.5999L63.0599 56.5099C62.2299 55.0599 61.7899 53.6099 61.7499 52.1499C61.7199 51.1099 61.9399 50.2999 62.4099 49.7399C62.5899 49.5199 62.8099 49.3399 63.0599 49.1899L63.3099 49.0699C64.1099 48.7399 65.0899 48.9099 66.2499 49.5899C67.5399 50.3399 68.6099 51.4299 69.4399 52.8699L70.2499 54.2699L79.3599 69.9799L87.7599 84.4699L90.4 89.0198C90.85 89.7998 91.1799 90.5598 91.3699 91.2799C91.5599 91.9999 91.65 92.6999 91.65 93.3999Z"
        stroke="#E0E0E0"
        strokeLinejoin="round"
      />
      <path
        d="M111.65 83.3999C111.65 84.0999 111.56 84.6999 111.37 85.1999C111.18 85.6999 110.85 86.0799 110.4 86.3399L89.4396 98.2899L89.1896 98.4099L69.4396 108.29L87.0196 98.2599L90.3996 96.3399C90.8496 96.0799 91.1796 95.6999 91.3696 95.1999C91.5596 94.6999 91.6496 94.0999 91.6496 93.3999C91.6496 92.6999 91.5596 91.9999 91.3696 91.2799C91.1796 90.5599 90.8496 89.7999 90.3996 89.0199L87.7596 84.4699L79.3596 69.9799L70.2496 54.2699L69.4396 52.8699C68.6096 51.4299 67.5396 50.3399 66.2496 49.5899C65.0896 48.9099 64.1096 48.7399 63.3096 49.0699L83.0596 39.1899C83.8996 38.7099 84.9596 38.8399 86.2496 39.5899C87.5396 40.3399 88.6096 41.4299 89.4396 42.8699L110.4 79.0199C110.85 79.7999 111.18 80.5599 111.37 81.2799C111.56 81.9999 111.65 82.6999 111.65 83.3999Z"
        stroke="#E0E0E0"
        strokeLinejoin="round"
      />
      <path
        d="M76.1595 79.2299L31.5795 53.4899L25.2495 49.8299C24.1795 49.2199 23.2495 49.0299 22.4695 49.2699C22.3995 49.2799 22.3295 49.2999 22.2695 49.3299L22.4695 49.2299L31.5795 44.6699L41.9995 39.4599C42.8695 38.9699 43.9595 39.0899 45.2495 39.8299L62.4095 49.7399C61.9395 50.2999 61.7195 51.1099 61.7495 52.1499C61.7895 53.6099 62.2295 55.0599 63.0595 56.5099L66.5695 62.5999L76.1595 79.2299Z"
        stroke="#E0E0E0"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Timeline = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 110 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="0.5px"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`${className}`}
    >
      <path
        d="M87.3205 46.9876C87.3205 49.4276 86.5605 51.0776 85.0405 51.9476C84.6705 52.1576 84.2705 52.3076 83.8605 52.3876C82.6105 52.6576 81.1805 52.3176 79.5805 51.3976L78.5705 50.8176C78.2805 50.6476 77.9705 50.3976 77.6505 50.0576L73.5605 52.3976L63.9305 57.8876C64.0605 58.3276 64.1205 58.7176 64.1205 59.0476V60.2176C64.1205 62.6576 63.3605 64.3076 61.8505 65.1676C60.3405 66.0276 58.5205 65.8476 56.3905 64.6176C54.2605 63.3976 52.4405 61.4776 50.9305 58.8676C49.4205 56.2576 48.6605 53.7276 48.6605 51.2876V50.1276C48.6605 49.7876 48.7205 49.4776 48.8505 49.1776L39.0005 32.1776C38.6705 32.1376 38.3705 32.0376 38.0805 31.8676L37.7305 31.6676L37.0605 31.2876C36.9305 31.2076 36.2905 30.7676 35.1305 29.9476L27.1705 34.4876L17.5405 39.9776C17.6705 40.4176 17.7305 40.8076 17.7305 41.1376V42.3076C17.7305 44.7476 16.9805 46.3976 15.4605 47.2576C13.9505 48.1176 12.1305 47.9376 10.0005 46.7076C7.88052 45.4876 6.06053 43.5676 4.54053 40.9576C3.03053 38.3376 2.27051 35.8176 2.27051 33.3776C2.27051 30.9376 3.03053 29.2876 4.54053 28.4276L5.02051 28.1876C6.44051 27.6076 8.10052 27.8676 10.0005 28.9676L11.0205 29.5576C11.3105 29.7176 11.6105 29.9776 11.9405 30.3076L22.3205 24.3876L29.5205 20.2776C29.4005 19.8376 29.3305 19.4476 29.3305 19.1176V17.9476C29.3305 15.5076 30.0905 13.8576 31.6005 12.9976L32.0805 12.7576C33.5005 12.1776 35.1605 12.4476 37.0605 13.5376C38.0705 14.1276 39.0205 14.8676 39.8905 15.7676C40.8505 16.7576 41.7305 17.9276 42.5205 19.2976C43.8305 21.5476 44.5705 23.7376 44.7405 25.8676C44.7805 26.2076 44.7905 26.5476 44.7905 26.8776C44.7905 27.0276 44.7305 27.7276 44.6005 28.9876L54.4605 45.9876C54.7805 46.0276 55.0905 46.1276 55.3805 46.2976L57.4105 47.4676C57.7005 47.6376 58.0005 47.8876 58.3205 48.2176L68.7105 42.2976L72.0505 40.3976C71.9205 39.9476 71.8505 39.5576 71.8505 39.2276V38.0676C71.8505 37.7976 71.8605 37.5276 71.8905 37.2776C71.9905 35.7676 72.4405 34.6176 73.2105 33.8276C73.4705 33.5376 73.7805 33.2976 74.1205 33.1076C75.6405 32.2476 77.4605 32.4276 79.5805 33.6576C80.5905 34.2476 81.5405 34.9876 82.4105 35.8876C83.3705 36.8776 84.2505 38.0476 85.0405 39.4176C86.3505 41.6676 87.1005 43.8576 87.2705 45.9776C87.3105 46.3176 87.3205 46.6576 87.3205 46.9876Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M73.2106 33.8276C72.4406 34.6176 71.9906 35.7675 71.8906 37.2675L68.6806 38.8775L54.4606 45.9875L44.6006 28.9875L64.6006 18.9875L73.2106 33.8276Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M64.79 16.8776C64.79 17.0276 64.73 17.7276 64.6 18.9876L44.6 28.9876C44.73 27.7276 44.79 27.0276 44.79 26.8776C44.79 26.5476 44.7801 26.2076 44.7401 25.8676C44.5701 23.7376 43.8301 21.5476 42.5201 19.2976C41.7301 17.9276 40.8501 16.7576 39.8901 15.7676C39.0201 14.8676 38.0701 14.1276 37.0601 13.5376C35.1601 12.4476 33.5001 12.1776 32.0801 12.7576L51.6 2.9976C53.12 2.1276 54.9401 2.31759 57.0601 3.53759C59.1901 4.76759 61.0101 6.6876 62.5201 9.2976C64.0401 11.9076 64.79 14.4376 64.79 16.8776Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M29.5205 20.2776L22.3205 24.3876L11.9405 30.3076C11.6105 29.9776 11.3105 29.7176 11.0205 29.5576L10.0005 28.9676C8.10052 27.8676 6.44051 27.6076 5.02051 28.1876L24.5405 18.4276C25.9005 17.6476 27.4905 17.7076 29.3305 18.6176V19.1176C29.3305 19.4476 29.4005 19.8376 29.5205 20.2776Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M37.7309 31.6676V32.3076C37.7309 34.7476 36.9809 36.3976 35.4609 37.2576L15.4609 47.2576C16.9809 46.3976 17.7309 44.7476 17.7309 42.3076V41.1376C17.7309 40.8076 17.6709 40.4176 17.5409 39.9776L27.1709 34.4876L35.1309 29.9476C36.2909 30.7676 36.9309 31.2076 37.0609 31.2876L37.7309 31.6676Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M83.8606 52.3876C83.5306 53.6676 82.8606 54.5976 81.8506 55.1676L61.8506 65.1676C63.3606 64.3076 64.1206 62.6576 64.1206 60.2176V59.0476C64.1206 58.7176 64.0606 58.3276 63.9306 57.8876L73.5606 52.3976L77.6506 50.0576C77.9706 50.3976 78.2806 50.6476 78.5706 50.8176L79.5806 51.3976C81.1806 52.3176 82.6106 52.6576 83.8606 52.3876Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M72.0509 40.3976L68.7109 42.2976L58.3209 48.2176C58.0009 47.8876 57.7009 47.6376 57.4109 47.4676L55.3809 46.2976C55.0909 46.1276 54.7809 46.0276 54.4609 45.9876L68.6809 38.8776L71.8909 37.2776C71.8609 37.5276 71.8509 37.7976 71.8509 38.0676V39.2276C71.8509 39.5576 71.9209 39.9476 72.0509 40.3976Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
      <path
        d="M107.32 36.9876C107.32 39.4276 106.56 41.0776 105.04 41.9476L85.0401 51.9476C86.5601 51.0776 87.3201 49.4276 87.3201 46.9876C87.3201 46.6576 87.3101 46.3176 87.2701 45.9776C87.1001 43.8576 86.3501 41.6676 85.0401 39.4176C84.2501 38.0476 83.3701 36.8776 82.4101 35.8876C81.5401 34.9876 80.5901 34.2476 79.5801 33.6576C77.4601 32.4276 75.6401 32.2476 74.1201 33.1076L94.1201 23.1076C95.6401 22.2476 97.4601 22.4276 99.5801 23.6576C101.71 24.8876 103.53 26.8076 105.04 29.4176C106.56 32.0276 107.32 34.5476 107.32 36.9876Z"
        stroke="#E0E0E0"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full  text-black/80  font-light bg-white p-12 px-32 text-sm flex flex-col gap-24">
      <div
        className="absolute inset-0 bg-grid bg-repeat bg-center "
        style={{ backgroundSize: "32px 32px" }}
      ></div>
      <div
        className={`w-full top-0 left-0 z-5 h-dvh  flex justify-center items-center fixed bg-white/50 backdrop-blur-sm ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none transition-all duration-300"
        }`}
      >
        <div
          className="absolute w-full h-full 0 z-10"
          onClick={handleClose}
        ></div>
        <div
          className={`max-w-xl h-fit flex flex-col gap-4 w-full p-8 rounded-xl   shadow-sm bg-white z-20 ${
            isOpen ? "scale-100" : "scale-90"
          } transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/landingpage/logo.png"
                alt="logo"
                width={48}
                height={48}
              />
              {/* <h2 className="text-xl font-bold uppercase">Start Interview</h2> */}
            </div>
            <button onClick={handleClose} className="cursor-pointer">
              <X size={48} strokeWidth={0.5} />
            </button>
          </div>
          <div className="flex w-full items-center gap-3">
            <h2 className="text-xl instrument-serif italic">Configurate</h2>
            <div className="w-full h-px bg-linear-to-r from-gray-300 to-white" />
          </div>
          <div className="flex gap-2">
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              Reload Challenge
            </button>
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              30 Min
            </button>
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              Easy
            </button>
          </div>
          {/* <div>
            <div className="py-4 border-b text-lg border-gray-200">
              <span className="text-2xl tracking-tight">Design</span> a FAQ Page
            </div>
            <div className="py-4 border-b text-lg border-gray-200">
              <span className="text-2xl tracking-tight">For</span> a FAQ Page
            </div>
            <div className="py-4  text-lg border-gray-200">
              <span className="text-2xl tracking-tight">To Help</span> a FAQ
              page
            </div>
          </div> */}

          <div className="flex w-full items-center gap-3">
            <h2 className="text-xl instrument-serif italic text-nowrap">
              Voice Settings
            </h2>
            <div className="w-full h-px bg-linear-to-r from-gray-300 to-white" />
          </div>
          <div className="flex gap-2 items-center">
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              Desktop Microphone
            </button>
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              Desktop Microphone
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <button className="py-3 cursor-pointer px-4 border w-fit  border-gray-200 rounded-full ">
              Test Microphone
            </button>
            <div className="flex gap-1 h-[16px]">
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="grow w-[4px] rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>

          <div className="w-full py-3 text-lg cursor-pointer bg-orange-500 text-white rounded-full flex justify-center items-center">
            Start Interview
          </div>
        </div>
      </div>
      <div className="w-full flex   z-3 justify-between items-center">
        <Image src="/landingpage/logo.png" alt="logo" width={56} height={56} />
        <Image
          src="/jun.png"
          alt="logo"
          width={56}
          height={56}
          className="rounded-full"
        />
      </div>

      <div className="w-full grow   z-1 flex flex-col gap-9 ">
        {/* Dashboard Cards */}
        {/* <div className="flex w-full relative items-center gap-3">
          <h2 className="text-lg instrument-serif italic uppercase">
            Interviewing
          </h2>
          <div className="w-full h-px bg-linear-to-r from-gray-300 to-white" />
        </div> */}
        <div className="flex gap-4 p-4 border border-gray-100  bg-white rounded-2xl h-fit w-full ">
          <div
            onClick={handleOpen}
            className="w-100 relative flex-col border-3 group gap-1 overflow-hidden hover:scale-101 shadow-md shadow-black/8     active:scale-98 transition-all duration-200 cursor-pointer  text-white h-30 bg-linear-to-r from-orange-500 to-orange-600  rounded-xl p-4"
          >
            <p className=" text-2xl font-semibold">Start</p>
            <p className="instrument-serif italic text-lg">Interviewing</p>
            <Starticon className="absolute -bottom-3  -right-3 w-32" />
          </div>
          <div className="flex-1 p-px shadow-sm grow shadow-black/6 bg-linear-to-r from-gray-200/75  to-white overflow-hidden rounded-xl ">
            <div className="relative flex w-full flex-col bg-white justify-between h-full rounded-[11px] p-4">
              <p className=" text-2xl font-medium">4</p>
              <p className="">Interviews Today</p>
              <Timeline className="absolute -top-8  -right-3 w-32" />
            </div>
          </div>
          <div className="flex-1 p-px shadow-sm grow shadow-black/6 bg-linear-to-r from-gray-200/75  to-white overflow-hidden rounded-xl ">
            <div className=" relative flex w-full flex-col bg-white justify-between h-full rounded-[11px] p-4">
              <p className=" text-2xl font-medium">10</p>
              <p>Day Streak</p>
              <Timeline className="absolute -top-8  -right-3 w-32" />
            </div>
          </div>

          <div className="flex-1 p-px shadow-sm grow shadow-black/6 bg-linear-to-r from-gray-200/75  to-white overflow-hidden rounded-xl ">
            <div className=" relative flex w-full flex-col bg-white justify-between h-full rounded-[11px] p-4">
              <p className=" text-2xl font-medium">8</p>
              <p>Total Interviews</p>
              <Timeline className="absolute -top-8  -right-3 w-32" />
            </div>
          </div>
        </div>

        {/* Dashboard History */}
        <div className="flex w-full items-center gap-3">
          <h2 className="text-xl instrument-serif italic">History</h2>
          <div className="w-full h-px bg-linear-to-r from-gray-300 to-white" />
        </div>
        <CalendarHeatmap />

        {/* Dashboard Past Entries */}

        {/* Dashboard Past Entries Table Header*/}
        <div className="flex w-full items-center gap-3">
          <h2 className="text-xl instrument-serif text-nowrap italic">
            Past Entries
          </h2>
          <div className="w-full h-px bg-linear-to-r from-gray-300 to-white" />
        </div>
        <div className="w-full">
          <div className="w-full border-b py-4 px-6 border-gray-200 flex gap-6">
            <div className="w-1/2">Interview Question</div>
            <div className="flex flex-1">
              <div className="flex-1 justify-center items-center flex">
                Grade
              </div>
              <div className="flex-1 justify-center items-center flex">
                Difficulty
              </div>
              <div className="flex-1 justify-center items-center flex">
                Time
              </div>
              <div className="flex-1 justify-center items-center flex">
                Date
              </div>
            </div>
          </div>

          {/* Dashboard Past Entries Table Row*/}
          <div className="w-full flex border-b border-gray-200 items-center gap-6 px-6">
            <div className="w-1/2 flex py-4 border-r border-gray-200 flex-col gap-2">
              <div className="flex  gap-2">
                <div className=" w-[2px] bg-orange-500" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
            </div>
            <div className="flex flex-1">
              <div className="flex-1 justify-center items-center flex">
                <div className=" bg-green-500 text-white  px-3 py-1 rounded-full flex justify-center items-center">
                  48%
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <div className=" border border-dashed border-green-500  text-green-500  px-3 py-1 rounded-full flex justify-center items-center">
                  Easy
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                30 Min
              </div>
              <div className="flex-1 justify-center items-center flex">
                12/01/2026
              </div>
            </div>
          </div>
          <div className="w-full flex border-b border-gray-200 items-center gap-6 px-6">
            <div className="w-1/2 flex py-4 border-r border-gray-200 flex-col gap-2">
              <div className="flex  gap-2">
                <div className=" w-[2px] bg-orange-500" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
            </div>
            <div className="flex flex-1">
              <div className="flex-1 justify-center items-center flex">
                <div className=" bg-green-500 text-white  px-3 py-1 rounded-full flex justify-center items-center">
                  48%
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <div className=" border border-dashed border-green-500  text-green-500  px-3 py-1 rounded-full flex justify-center items-center">
                  Easy
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                30 Min
              </div>
              <div className="flex-1 justify-center items-center flex">
                12/01/2026
              </div>
            </div>
          </div>
          <div className="w-full flex border-b border-gray-200 items-center gap-6 px-6">
            <div className="w-1/2 flex py-4 border-r border-gray-200 flex-col gap-2">
              <div className="flex  gap-2">
                <div className=" w-[2px] bg-orange-500" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
              <div className="bg-gray-300 w-full h-px" />
              <div className="flex gap-2">
                <div className="h-full w-[2px] bg-white" />
                Design a FAQ Page
              </div>
            </div>
            <div className="flex flex-1">
              <div className="flex-1 justify-center items-center flex">
                <div className=" bg-green-500 text-white  px-3 py-1 rounded-full flex justify-center items-center">
                  48%
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <div className=" border border-dashed border-green-500  text-green-500  px-3 py-1 rounded-full flex justify-center items-center">
                  Easy
                </div>
              </div>
              <div className="flex-1 justify-center items-center flex">
                30 Min
              </div>
              <div className="flex-1 justify-center items-center flex">
                12/01/2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
