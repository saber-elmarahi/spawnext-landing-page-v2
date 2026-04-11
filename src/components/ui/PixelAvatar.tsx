// Generates a deterministic pixel-art style avatar SVG from an agent's initials + color.
// No external images required — works offline and stays on-brand.

interface PixelAvatarProps {
  name: string;
  initials: string;
  color: string;      // hex base color
  size?: number;
  className?: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Generates a 5x5 symmetric pixel grid as SVG rects */
function generatePixelGrid(seed: string, color: string, size: number) {
  const hash = hashCode(seed);
  const cellSize = size / 5;
  const rects: JSX.Element[] = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      // Use bits of the hash to determine if a cell is filled
      const bit = (hash >> (row * 3 + col)) & 1;
      if (bit) {
        const x = col * cellSize;
        const mirrorX = (4 - col) * cellSize;
        const y = row * cellSize;

        rects.push(
          <rect key={`${row}-${col}`}   x={x}       y={y} width={cellSize} height={cellSize} fill={color} opacity={0.9} rx={1} />,
        );
        if (col !== 2) {
          rects.push(
            <rect key={`${row}-m${col}`} x={mirrorX} y={y} width={cellSize} height={cellSize} fill={color} opacity={0.9} rx={1} />,
          );
        }
      }
    }
  }
  return rects;
}

export function PixelAvatar({ name, initials, color, size = 96, className = "" }: PixelAvatarProps) {
  // Lighten the background
  const bgOpacity = "15";
  const bgHex = color + bgOpacity;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={["rounded-full", className].join(" ")}
      aria-label={name}
      role="img"
    >
      {/* Background circle */}
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bgHex} />

      {/* Pixel art layer — centered with padding */}
      <g transform={`translate(${size * 0.15}, ${size * 0.15}) scale(0.7)`}>
        {generatePixelGrid(name, color, size)}
      </g>

      {/* Initials overlay */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={size * 0.3}
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="700"
        fill={color}
        opacity={0.85}
      >
        {initials}
      </text>

      {/* Subtle border ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 1}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.2}
      />
    </svg>
  );
}
