import Link from "next/link";
import { motion } from "framer-motion";
const Animatedlink = ({
  href,
  children,
  link,
  download = false,
  delay = 0,
  className,
}) => {
  const Wrapper = link ? Link : "a";
  const wrapperProps = link ? { href: link } : { href };

  return (
    <div className={`relative overflow-hidden group pb-1 w-fit ${className}`}>
      <div className="absolute -translate-x-full group-hover:translate-x-0 transition-all duration-300 top-0 left-0 w-full h-full border-b border-gray1" />
      <Wrapper {...wrapperProps} className="relative group">
        <div className="flex flex-col h-5 overflow-hidden">
          <p className="group-hover:-translate-y-full group-hover:scale-80 transition-all duration-300">
            {children}
          </p>
          <p className="group-hover:-translate-y-full transition-all duration-300">
            {children}
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Animatedlink;
