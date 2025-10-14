const Icon = ({ name, size = 24, className = "", color }) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
