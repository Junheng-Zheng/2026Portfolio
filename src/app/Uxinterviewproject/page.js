import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home} from "lucide-react";
import Footer from "../Components/Footer";
const Page = () => {
  return (
   <div className = "flex  text-black/70  w-full font-light">
   {/* <div className = "h-dvh sticky top-0 border-r  border-gray-200/80">
     <div className = "flex   flex-col p-8  gap-2 border-gray-200/80">
      <a href = "+" className = "p-3 px-0 rounded-xl instrument-serif text-lg font-normal   w-fit   flex gap-1 items-center">
        Design
      </a>
      <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
       <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Display
      </div>
      <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
        <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Prototype
      </div>
        <a href = "+" className = "p-3 px-0 rounded-xl instrument-serif text-lg font-normal   w-fit   flex gap-1 items-center">
        Process
      </a>
        <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
       <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Discover
      </div>
      <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
        <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Define
      </div>
      <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
        <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Design
      </div>
      <div href = "+" className = "p-3 px-5 bg-gray-100 rounded-xl  w-fit flex gap-1 items-center">
        <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Deliver
      </div>
    </div>
   </div> */}
     <div className= "flex  w-full xl:px-48 flex-col xl:gap-12 gap-8 py-8 px-8">
    <Link href="/" className = "cursor-pointer w-fit active:scale-98 z-2 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
          <Home
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110  transition-transform duration-300"
          />
          Back to Home  
          
        </Link>
     <div className = "flex flex-col gap-4 ">
       <div className = "w-full h-[320px]  bg-gray-200  rounded-xl relative"/>
        <h1 className = "instrument-serif text-2xl font-normal">UXInterviewer</h1>
        <div className = "flex gap-3 flex-wrap text-xs w-2/3">
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Figma</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">React</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Next.js</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Node.js</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Javascript</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Vercel</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Tailwind CSS</div>
          <div className = "px-3 py-2 bg-gray-100 rounded-md">Zustand</div>
        </div>
        <div className = "flex flex-1  gap-3">
          <div className = "w-full flex cursor-pointer active:scale-98  transition-transform duration-300 items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
            <div className = "w-10 h-10 rounded-md flex bg-gray-100 items-center justify-center">
              <Image src="/isometrics/team.png" alt="Team" width={32} height={32} loading="lazy" quality={75} />
            </div>
            <div className = "flex flex-col">
              <p className = "text-lg instrument-serif font-normal">Team</p>
              <p className = "text-xs text-gray-500">1 Design Engineer</p>
              <p className = "text-xs text-gray-500">1 Backend Developer</p>
            </div>
          </div>
          <div className = "w-full flex cursor-pointer active:scale-98 transition-transform duration-300 items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
            <div className = "w-10 h-10 rounded-md flex bg-gray-100 items-center justify-center">
              <Image src="/isometrics/job.png" alt="Role" width={32} height={32} loading="lazy" quality={75} />
            </div>
            <div className = "flex flex-col">
              <p className = "text-lg instrument-serif font-normal">Role</p>
              <p className = "text-xs text-gray-500">UI/UX Designer</p>
              <p className = "text-xs text-gray-500">Frontend Developer</p>
            </div>
          </div>
           <div className = "w-full flex cursor-pointer active:scale-98 transition-transform duration-300 items-start gap-3 h-fit p-4 border border-gray-100/80 rounded-md">
            <div className = "w-10 h-10 rounded-md flex bg-gray-100 items-center justify-center">
              <Image src="/isometrics/calendar.png" alt="Timeframe" width={32} height={32} loading="lazy" quality={75} />
            </div>
            <div className = "flex flex-col">
              <p className = "text-lg instrument-serif font-normal">Timeframe</p>
              <p className = "text-xs text-gray-500">December 2025 - Present</p>
              <p className = "text-xs text-gray-500">~2 Months</p>
            </div>
          </div>
        </div>
     </div>
      <div className = "flex flex-col gap-8">
          <div className = "p-3 px-5 bg-blue-100 rounded-xl  w-fit flex gap-1 items-center">
          <div className = "w-4 h-4 relative">
          <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
        </div>
          Finalized Design
        </div>

        <div className = "flex flex-col w-1/2 gap-2">
          <p>Display</p>
          <h1 className = "instrument-serif text-2xl font-normal">Whiteboard Prep for UI/UX Designers</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>

        <div className = "grid grid-cols-2 gap-3">
          <div className = "w-full aspect-video bg-gray-200 overflow-hidden rounded-xl relative">
            <Image src="/projects/uxinterviewer/home.png" alt="Landing" fill loading="lazy" quality={75} className="object-cover object-center"/>
          </div>
            <div className = "w-full aspect-video bg-gray-200 overflow-hidden rounded-xl relative">
            <Image src="/projects/uxinterviewer/dash.png" alt="Landing" fill loading="lazy" quality={75} className="object-cover object-center"/>
          </div>
            <div className = "w-full aspect-video bg-gray-200 overflow-hidden rounded-xl relative">
            <Image src="/projects/uxinterviewer/dash.png" alt="Landing" fill loading="lazy" quality={75} className="object-cover object-center"/>
          </div>
        </div>

        <div className = "flex flex-col w-1/2 gap-2">
          <p>Prototype</p>
          <h1 className = "instrument-serif text-2xl font-normal">UXInterviewer in Action</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div className = "w-full p-8 flex flex-col gap-6 bg-gray-100/80 rounded-xl relative">

          <div className = "flex gap-8   ">
            <div className = "border-b border-black pb-1 w-fit">Landing</div>
            <div className = "border-b border-none w-fit">Authorization</div>
            <div className = "border-b border-none w-fit">Dashboard</div>
            <div className = "border-b border-none w-fit">Interview</div>
            <div className = "border-b border-none w-fit">Result</div>
            <div className = "border-b border-none w-fit">Settings</div>
          </div>

          <div className = "w-full aspect-video bg-white rounded-xl relative"/>
        </div>
      </div>
      <div className = "flex flex-col gap-8">
      <div className = "p-3 px-5 bg-blue-100 rounded-xl  w-fit flex gap-1 items-center">
        <div className = "w-4 h-4 relative">
         <Image src="/isometrics/website.png" alt="Plus" fill loading="lazy" quality={75} />
       </div>
        Process
      </div>
      
      <div className = "flex flex-col w-1/2 gap-2">
          <p>Discover</p>
        <h1 className = "instrument-serif text-2xl font-normal">The lack of Viable UX Interview Prep Tools</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>

    <div className = "flex gap-3">
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
    </div>
        <div className = "flex gap-3">
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
    </div>
       <div className = "flex flex-col w-1/2 gap-2">
          <p>Define</p>
        <h1 className = "instrument-serif text-2xl font-normal">Encapsulating the Problem </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
        <div className = "flex gap-3">
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
    </div>
    
       <div className = "flex flex-col w-1/2 gap-2">

        <h1 className = "instrument-serif text-2xl font-normal">Iteration and Testing </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>

       <div className = "w-full p-8 flex flex-col gap-6 bg-gray-100/80 rounded-xl relative">

          <div className = "flex gap-8   ">
            <div className = "border-b border-black pb-1 w-fit">User Flows</div>
            <div className = "border-b border-none w-fit">Low Fidelity Wireframes</div>
            <div className = "border-b border-none w-fit">High Fidelity Wireframes</div>
            <div className = "border-b border-none w-fit">Finished Design</div>
          </div>

          <div className = "w-full aspect-video bg-white rounded-xl relative"/>
        </div>

       <div className = "flex flex-col w-1/2 gap-2">
        <h1 className = "instrument-serif text-2xl font-normal">Decisions in Design</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
      <div className = "flex gap-3">
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      </div>

       <div className = "flex flex-col w-1/2 gap-2">
          <p>Delivery</p>
        <h1 className = "instrument-serif text-2xl font-normal">Bridging the Gap between Design and Development </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>


      <div className = "flex flex-col w-1/2 gap-2">
          <p>Delivery</p>
        <h1 className = "instrument-serif text-2xl font-normal">Success Shown through Metrics </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
        <div className = "flex gap-3">
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
        <div className = "w-full h-[200px] border border-gray-200 rounded-xl relative"/>
      </div>
      
      
</div>
    <div className = "flex justify-between items-center">
        <Link href="/" className = "cursor-pointer w-fit active:scale-98 z-2 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
       <Home
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110  transition-transform duration-300"
          />
          Back to Home  
          
        </Link>
        <div className = "flex gap-3  p-4 border border-gray-100/80 items-start rounded-xl">
                    <div className = "w-10 h-10 rounded-md flex bg-gray-100 items-center justify-center">
              <Image src="/isometrics/website.png" alt="Role" width={32} height={32} loading="lazy" quality={75} />
            </div>
       <div className = "flex flex-col gap-3">
       <p className = "instrument-serif text-lg font-normal">You might also like</p>
         <div className="flex gap-3 items-center">
                    <Link href="/" className = "cursor-pointer w-fit active:scale-98 z-2 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">

          Design @ Liberty Mutual  

        <ArrowUpRight
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          
        </Link>
        
          <Link href="/" className = "cursor-pointer w-fit active:scale-98 z-2 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">

          Balance 

        <ArrowUpRight
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          
        </Link>
        </div> 
       </div>
       </div>
    </div>
      <Footer/>
    </div>
   </div>
  );
};

export default Page;



      // <div className = "px-32">
      //       <div className = "p-4  bg-red-100 text-red-500/60  rounded-xl flex gap-3">
      //     <div className = "w-10 h-10  rounded-md flex bg-gray-100 items-center justify-center">
      //       <Image src="/isometrics/question.png" alt="Email" width={32} height={32} loading="lazy" quality={75} />
      //     </div>
      //    <div className = "flex flex-1 flex-col gap-2">
      //      <h1 className = "instrument-serif text-2xl font-normal">The Problem</h1>
      //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      //    </div>
      //   </div>
      // </div>




      //   <div className = "px-32">
      //       <div className = "p-4  bg-green-100 text-green-800/60  rounded-xl flex gap-3">
      //     <div className = "w-10 h-10  rounded-md flex bg-gray-100 items-center justify-center">
      //       <Image src="/isometrics/question.png" alt="Email" width={32} height={32} loading="lazy" quality={75} />
      //     </div>
      //    <div className = "flex flex-1 flex-col gap-2">
      //      <h1 className = "instrument-serif text-2xl font-normal">The Solution</h1>
      //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      //    </div>
      //   </div>
      // </div>