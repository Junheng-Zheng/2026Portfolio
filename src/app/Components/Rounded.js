const Rounded = ({ width, height, fill, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.925 23.9104C23.925 10.7051 13.8244 1.29167e-06 0 0H23.925V23.9104Z"
        fill={fill}
      />
    </svg>
  );
};

export default Rounded;
