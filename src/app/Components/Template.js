import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
const Template = ({ title, description, extra, image, lessons, metrics }) => {
  return (
    <div className="md:py-12 scroll-smooth p-8 text-[14px] xl:px-60 font-light flex flex-col gap-12">
      <p className="cursor-pointer">
        Back to <Link href="/">Home</Link>
      </p>
      {image && (
        <div className="relative border border-gray1 w-full rounded-xl overflow-hidden h-[400px]">
          <Image
            src={image}
            alt="logo"
            fill
            className="object-cover object-top"
          />
        </div>
      )}
      {/* hero section */}
      <div id="about" className="flex w-full flex-col gap-4">
        <p className="text-sm opacity-80">{extra}</p>
        <h1 className="text-2xl">{title}</h1>
        <p className="md:w-1/2 w-full">{description}</p>
      </div>

      {metrics && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl">Success through Metrics </h2>
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col p-4 bg-gray1/50 rounded-xl justify-between  gap-8"
                >
                  <p className="text-2xl">{metric.percentage}</p>
                  <p>{metric.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {lessons && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl">What I Learned </h2>
          <p className="md:w-1/2 w-full">{lessons}</p>
        </div>
      )}

      <div className="w-full h-px bg-gray1"></div>

      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Template;
