"use client";
import Image from "next/image";
import Link from "next/link";
import Rounded from "../../Components/Rounded";
import Footer from "../../Components/Footer";
import Constraints from "../../Components/casestudy/Constraints";
import P from "../../Components/casestudy/P";
import Statbox from "../../Components/casestudy/Statbox";
import Marketresearch from "../../Components/casestudy/Marketresearch";
import Marketanalysis from "../../Components/casestudy/Marketanalysis";
import { Star, Briefcase, Palette, Clock, Circle } from "lucide-react";
import { Gamepad } from "lucide-react";
const Pack = () => {
  return (
    <div className="flex flex-col gap-8 py-12  font-light text-black/70   ">
      <div className="flex flex-col xl:px-64 text-base opacity-90   gap-3">
        <Link className="cursor-pointer text-sm  " href="/">
          Back to Home
        </Link>
        <p className="z-20 text-lg w-full md:w-1/2 ">
          PACK! is a conceptual mobile game coommisioned by Tiger Snack Box. I
          worked as the lead UI Designer for this project.
        </p>
      </div>

      <div className="flex flex-col gap-3 xl:px-64 ">
        <div className="w-full lg:gap-3 grid grid-cols-2">
          <div className="w-full h-[280px] lg:h-[600px] relative  col-span-2 rounded-lg overflow-hidden bg-blue-100">
            <Image
              src="/pack/pack1.png"
              alt="cover"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="w-full h-full relative row-span-2 col-span-1 rounded-lg overflow-hidden bg-blue-100">
            <Image
              src="/pack/pack2.png"
              alt="1"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="w-full h-[200px]  lg:h-[500px] relative row-span-1 col-span-1 rounded-lg overflow-hidden bg-blue-100">
            <Image
              src="/pack/pack3.png"
              alt="2"
              fill
              className="object-cover object-center"
            />
            {/* <div className="flex flex-col z-10 items-end right-0 bottom-0  absolute ">
              <Rounded
                width={24}
                height={24}
                className="rotate-90"
                fill="#ffffff"
              />
              <div className="flex items-end  ">
                <Rounded
                  width={24}
                  height={24}
                  className="rotate-90"
                  fill="#ffffff"
                />
                <div className="pl-3 pr-2 cursor-pointer group flex items-center gap-1 pt-2 pb-1   bg-white text-black/50 text-sm italic  rounded-tl-xl">
                  Textures, noise, and details
                </div>
              </div>
            </div> */}
          </div>
          <div className="w-full h-[200px] lg:h-[500px] relative row-span-1 col-span-1 rounded-lg overflow-hidden bg-blue-100">
            <Image
              src="/pack/pack4.png"
              alt="3"
              fill
              className="object-cover object-bottom"
            />
          </div>
          <div className="w-full h-[280px] lg:h-[600px] relative  col-span-2 rounded-lg overflow-hidden bg-blue-100">
            <Image
              src="/pack/pack5.png"
              alt="4"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="xl:px-64 ">
        <Footer />
      </div>
    </div>
  );
};

export default Pack;

const Paragraph = ({ color, children, title, className }) => {
  return (
    <div
      className={`flex items-center      bg-white w-full justify-center ${className}`}
    >
      <div className="flex w-1/3 flex-col  bg-white   justify-center   rounded-lg    gap-3">
        <h2
          className={`text-${color}-400 pl-2   text-base w-fit border-l-2 border-${color}-400`}
        >
          {title}
        </h2>
        <p className="text-lg">{children}</p>
      </div>
    </div>
  );
};

// Put this near the top of Pack/Page.js (or in its own component file)
const CircleProgress = ({ value = 0, size = 72, stroke = 4 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value));
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="w-fit h-fit border-r border-gray-200 p-3 ">
      <div className="relative w-[72px] aspect-square flex items-center justify-center rounded-full bg-white">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="rgba(0,0,0,0.08)"
            fill="none"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="oklch(82.7% 0.119 306.383)" /* purple */
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>

        {/* Center text */}
        <p className="relative z-10 text-center font-bold ">{progress}%</p>
      </div>
    </div>
  );
};

<div className="flex flex-col py-12 border-t border-gray-200 items-center">
  <div className="flex flex-col lg:justify-between gap-8 px-64 pb-12 w-full">
    <h1 className="text-4xl instrument-serif">PACK! Design Process</h1>
    {/* <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 ">
            <div className="flex flex-col gap-2">
              <p className="text-xs ">Role</p>
              <p>Lead Designer</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs ">Duration</p>
              <p>2 Months</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs ">Tools</p>
              <p>Figma, Qualtrics </p>
            </div>
          </div> */}
    <div className="flex flex-1  gap-3">
      <div className="w-full flex bg-gray-50  items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
        <div className="flex flex-col gap-1">
          <p className="">Team</p>
          <p className="text-xs text-gray-500">1 Design Engineer</p>
          <p className="text-xs text-gray-500">1 Backend Developer</p>
        </div>
      </div>
      <div className="w-full flex bg-gray-50 cursor-pointer active:scale-98 transition-transform duration-300 items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
        <div className="flex flex-col gap-1">
          <p className="">Role</p>
          <p className="text-xs text-gray-500">UI/UX Designer</p>
          <p className="text-xs text-gray-500">Frontend Developer</p>
        </div>
      </div>
      <div className="w-full flex bg-gray-50 cursor-pointer active:scale-98 transition-transform duration-300 items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
        <div className="flex flex-col gap-1">
          <p className="">Timeframe</p>
          <p className="text-xs text-gray-500">February 2025 - May 2025</p>
          <p className="text-xs text-gray-500">~3 Months</p>
        </div>
      </div>
    </div>
  </div>
  {/* <div className="w-full h-[12px] bg-orange-600 z-20 "></div> */}

  <Paragraph color="red" title="Problem" className="py-24">
    Tiger Snack Box sells international snacks to US consumers. How can we
    create a mobile game that increase both brand visibility and engagement
    while coinciding with stakeholders&apos; goals?
  </Paragraph>
  <div className="flex border-t  border-gray-200 h-dvh w-full items-center justify-center">
    <div className="w-1/2 h-full bg-white   flex items-center justify-center">
      <div className="flex w-1/2 flex-col  bg-white   justify-center   rounded-lg    gap-3">
        <h2 className={` pl-2   text-base w-fit border-l-2 `}>Discovery</h2>
        <p className="text-lg">
          To tackle the question, we conducted a requirements gathering session
          with the stakeholders to understand their goals and constraints.
        </p>
      </div>
    </div>
    <div className="w-1/2 h-full relative  bg-blue-100  flex items-center justify-center">
      <Image
        src="/pack/star.png"
        alt="6"
        fill
        className="object-cover opacity-50 object-center "
      />
      <Constraints>
        <P className="font-bold!">Gameplay</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>The gameplay mechanics provided.</P>
          </div>
          <div className="flex items-center gap-1">
            <P>Mobile only experience.</P>
          </div>
          <div className="flex items-center gap-1">
            <P>Has to have a cosy, friendly, aesthetic.</P>
          </div>
        </div>

        <P className="font-bold!">Business</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>Required revenue via ads or in-app purchases</P>
          </div>
        </div>

        <P className="font-bold!">Aesthetics</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-[8px]">
          <div className="flex items-center gap-1">
            <P>Had to follow the brand identity of Tiger Snack Box.</P>
          </div>
        </div>
        <P className="font-bold!">Time</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>3 month deadline to get development started.</P>
          </div>
        </div>
      </Constraints>
    </div>
  </div>
  {/* <div className="flex gap-4 bg-white  w-full  z-10 items-center justify-center ">
          <Constraints>
            <p className="instrument-serif text-2xl">Constraints</p>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P>Gameplay</P>
            <div className="flex  text-black/60 flex-col  pl-2 border-l border-black/20 gap-[8px]">
              <P>The gameplay was given to use by the shareholder.</P>
              <P>Mobile only experience.</P>
              <P>Has to give a cosy, friendly vibe, and aesthetic.</P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P>Business</P>
            <div className="flex  text-black/60 flex-col  pl-2 border-l border-black/20 gap-[8px]">
              <P>
                The game had to have some way of generating revenue, whether
                through paid features, ads or purchases through real world snack
                boxes.
              </P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P>Aesthetics</P>
            <div className="flex  text-black/60 flex-col  pl-2 border-l border-black/20 gap-[8px]">
              <P>Had to follow the brand identity of Tiger Snack Box.</P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P>Time</P>
            <div className="flex  text-black/60 flex-col  pl-2 border-l border-black/20 gap-[8px]">
              <P>
                3 month project with a hard deadline to get development started.
              </P>
            </div>
          </Constraints>
          <Constraints>
            <P className="font-bold!">Guidelines</P>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P className="font-medium!">Gameplay</P>
            <div className="flex  pl-[8px] flex-col gap-[8px]">
              <P>
                Create a mobile only experience - keep hand ergonomics and
                sizing in mind.
              </P>
              <P>Will be touch and swiped based.</P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P className="font-medium!">Business</P>
            <div className="flex  pl-[8px] flex-col gap-[8px]">
              <P>
                Revenue would be generated through increase in revenue or
                increase in customers buying real world snack boxes.
              </P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P className="font-medium!">Visual Design</P>
            <div className="flex  pl-[8px] flex-col gap-[8px]">
              <P>
                Create a visual identity that satisfies both the playful feel
                required and the brand identity of Tiger Snack Box.
              </P>
            </div>
            <div className=" w-full h-[1px] bg-black/10"></div>
            <P className="font-medium!">Time</P>
            <div className="flex  pl-[8px] flex-col gap-[8px]">
              <P>
                Design would be seperated into sprints to allow for feedback and
                timely delivery.
              </P>
            </div>
          </Constraints>
        </div> */}

  {/* <Paragraph title="Competitor Analysis">
          We analyzed competitors in the puzzle game genre to understand their
          strengths and weaknesses.
        </Paragraph>
        <div className=" flex gap-12 items-start justify-center py-12 w-full bg-lime-100 ">
          <Marketresearch
            imagesrc="/pack/Apps/cats.png"
            appName="Cats & Soup"
            rating="4.8"
            pros={[
              "Hand-drawn, pastel visuals feel approachable.",
              "Uses rewarded ads instead of interruptive ones.",
            ]}
            cons={[
              "Cluttered UI feels overwhelming.",
              "Frequent misclicks cause mistakes.",
            ]}
          />
          <Marketresearch
            imagesrc="/pack/Apps/candycrush.png"
            appName="Candy Crush"
            rating="4.7"
            pros={[
              "Animations & haptics boost engagement.",
              "Ergonomic, easy-to-use design.",
            ]}
            cons={[
              "Interruptive ads hurt experience.",
              "Pay-to-win progression frustrates users.",
            ]}
          />
          <Marketresearch
            imagesrc="/pack/Apps/puzzlesanddragons.png"
            appName="Puzzles & Dragons"
            rating="4.2"
            pros={[
              "Idle scenes create continuous flow.",
              "Unique characters + gacha drive engagement.",
            ]}
            cons={["Endgame becomes stale.", "Co-op progression is paywalled."]}
          />
        </div> */}

  <div className="flex border-t  border-gray-200 h-dvh w-full items-center justify-center">
    <div className="w-1/2 h-full bg-white   flex items-center justify-center">
      <div className="flex w-1/2 flex-col  bg-white   justify-center  gap-3 rounded-lg   ">
        <h2 className={` pl-2   text-base w-fit border-l-2 `}>
          Competitor Analysis
        </h2>
        <p className="text-lg">
          We analyzed competitors in the puzzle game genre to understand their
          strengths and weaknesses.
        </p>
      </div>
    </div>
    <div className="w-1/2 h-full relative overflow-hidden flex-col  bg-[#F83E3A] flex items-center justify-center gap-6">
      <Image
        src="/pack/star.png"
        alt="6"
        fill
        className="object-cover opacity-20 object-center "
      />
      <Marketresearch
        imagesrc="/pack/Apps/cats.png"
        appName="Cats & Soup"
        rating="4.8"
        pros={[
          "Hand-drawn, pastel visuals feel approachable.",
          "Uses rewarded ads instead of interruptive ones.",
        ]}
        cons={[
          "Cluttered UI feels overwhelming.",
          "Frequent misclicks cause mistakes.",
        ]}
      />
      <Marketresearch
        imagesrc="/pack/Apps/candycrush.png"
        appName="Candy Crush"
        rating="4.7"
        pros={[
          "Animations & haptics boost engagement.",
          "Ergonomic, easy-to-use design.",
        ]}
        cons={[
          "Interruptive ads hurt experience.",
          "Pay-to-win progression frustrates users.",
        ]}
      />
      <Marketresearch
        imagesrc="/pack/Apps/puzzlesanddragons.png"
        appName="Puzzles & Dragons"
        rating="4.2"
        pros={[
          "Idle scenes create continuous flow.",
          "Unique characters + gacha drive engagement.",
        ]}
        cons={["Endgame becomes stale.", "Co-op progression is paywalled."]}
      />
    </div>
  </div>
  <div className="flex border-t  border-gray-200 h-dvh w-full items-center justify-center">
    <div className="w-1/2 h-full bg-white flex items-center justify-center">
      <div className="flex w-1/2 flex-col  bg-white   justify-center   rounded-lg    gap-3">
        <h2 className={` pl-2   text-base w-fit border-l-2 `}>User Reviews</h2>
        <p className="text-lg">
          We collected 50 reviews from each competitor app to understand how
          users perceive the games.
        </p>
      </div>
    </div>
    <div className="w-1/2 h-full bg-[#F79D0D] relative flex items-center justify-center">
      <Image
        src="/pack/star.png"
        alt="6"
        fill
        className="object-cover opacity-20 object-center "
      />
      <Constraints>
        <P className="font-bold!">Cats & Soup</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>
              78% of users loved the illustrative and cosy feel of Cats & Soup.
            </P>
          </div>
        </div>

        <P className="font-bold!">Candy Crush</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>40% of users disliked the interstitial ads in Candy Crush.</P>
          </div>
          <div className="flex items-center gap-1">
            <P>
              {" "}
              36% of users disliked the pay to win mechanics in Candy Crush.
            </P>
          </div>
        </div>
        <P className="font-bold!">Puzzles & Dragons</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-[8px]">
          <div className="flex items-center gap-1">
            <P>
              36% of users disliked the pay to win mechanics in Candy Crush.
            </P>
          </div>
        </div>
      </Constraints>
    </div>
  </div>
  <div className="flex border-t  border-gray-200 h-dvh w-full items-center justify-center">
    <div className="w-1/2 h-full bg-white flex items-center justify-center">
      <div className="flex w-1/2 flex-col  bg-white   justify-center   rounded-lg    gap-3">
        <h2 className={` pl-2   text-base w-fit border-l-2 `}>
          Insight Summary
        </h2>
        <p className="text-lg">
          We created summaries of our insights to help us understand the market
          and the users.
        </p>
      </div>
    </div>
    <div className="w-1/2 h-full bg-blue-100 relative flex items-center justify-center">
      <Image
        src="/pack/star.png"
        alt="6"
        fill
        className="object-cover opacity-70 object-center "
      />
      <Constraints>
        <P className="font-bold!">Gameplay</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>
              Users prefer progressive gameplay, so we increase difficulty as
              they progress.
            </P>
          </div>
        </div>

        <P className="font-bold!">Business</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-2">
          <div className="flex items-center gap-1">
            <P>
              Offer customization, in-app purchases, and challenges with snack
              box rewards.
            </P>
          </div>
        </div>
        <P className="font-bold!">Aesthetics</P>
        <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
        <div className="flex  text-black/60 flex-col   border-black/20 gap-[8px]">
          <div className="flex items-center gap-1">
            <P>
              We will use hand drawn textures and pastel colors to create a cozy
              and friendly aesthetic.
            </P>
          </div>
        </div>
      </Constraints>
    </div>
  </div>

  <div className="px-64 w-full py-24 gap-12 flex flex-col">
    <Paragraph title="User Flows">
      We created four different personas based on insights and user reviews.
    </Paragraph>
    <div className="aspect-video w-full border border-gray-200 rounded-lg"></div>
  </div>

  {/* <Paragraph title="Low Fidelity Wireframes">
          We created four different personas based on insights and user reviews.
        </Paragraph>
        <Paragraph title="Design Tokens">
          We created four different personas based on insights and user reviews.
        </Paragraph>
        <Paragraph title="High Fidelity Wireframes">
          We created four different personas based on insights and user reviews.
        </Paragraph>
        <Paragraph title="Details and Design Choices">
          We created four different personas based on insights and user reviews.
        </Paragraph>
        <Paragraph title="User Flows & Prototyping">
          We created four different personas based on insights and user reviews.
        </Paragraph>
        <Paragraph title="Delievery & Final Thoughts">
          We created four different personas based on insights and user reviews.
        </Paragraph> */}
</div>;
