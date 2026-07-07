const SKEW_Y_DEG = 30;
const SKEW_Y_RAD = (SKEW_Y_DEG * Math.PI) / 180;
const SKEW_WIDTH_SCALE = Math.cos(SKEW_Y_RAD);

function buildOutlinePath(size, depth, step) {
  const depthOffset = (depth - 1) * step;
  const cap = `M 0,0 L ${size},0 L ${size},${size} L 0,${size} Z`;

  if (depth <= 1) {
    return cap;
  }

  const extrusion = [
    `M ${size},0 L ${size + depthOffset},${-depthOffset}`,
    `M ${depthOffset},${-depthOffset} L ${size + depthOffset},${-depthOffset}`,
    `M 0,0 L ${depthOffset},${-depthOffset}`,
    `M ${depthOffset},${-depthOffset} L ${depthOffset},${size - depthOffset}`,
    `M ${size},${size} L ${size + depthOffset},${size - depthOffset}`,
  ].join(" ");

  return `${cap} ${extrusion}`;
}

export default function ThreeDBlock({
  size = 64,
  depth = 8,
  step = 1,
  faceColor = "#0a0a0a",
  extrusionColor = "#2a2a2a",
  strokeColor = "#ff2a2a",
  strokeWidth = 1,
}) {
  const depthOffset = (depth - 1) * step;
  const containerWidth = size + depthOffset;
  const skewOverflow = size * Math.tan(SKEW_Y_RAD) * SKEW_WIDTH_SCALE;
  const outlinePath = buildOutlinePath(size, depth, step);

  return (
    <div
      className="w-fit h-fit shrink-0"
      style={{
        paddingTop: depthOffset,
        paddingRight: depthOffset,
        paddingBottom: skewOverflow,
      }}
    >
      <div
        className="relative origin-top-left"
        style={{
          width: containerWidth,
          height: size,
          transform: `skewY(${SKEW_Y_DEG}deg) scaleX(${SKEW_WIDTH_SCALE})`,
        }}
      >
        {Array.from({ length: depth }, (_, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              width: size,
              height: size,
              backgroundColor: extrusionColor,
              transform: `translate(${index * step}px, ${-index * step}px)`,
              zIndex: depth - index,
            }}
          />
        ))}

        <div
          className="absolute"
          style={{
            width: size,
            height: size,
            backgroundColor: faceColor,
            transform: "translate(0, 0)",
            zIndex: depth + 1,
            boxShadow: `inset 0 0 24px ${strokeColor}33`,
          }}
        />

        <svg
          className="absolute left-0 top-0 pointer-events-none overflow-visible"
          style={{
            width: containerWidth,
            height: size,
            zIndex: depth + 2,
          }}
          aria-hidden
        >
          <path
            d={outlinePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
