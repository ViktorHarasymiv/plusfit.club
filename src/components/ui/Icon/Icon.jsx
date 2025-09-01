const Icon = ({ name, size = 24, className = "" }) => (
  <svg className={`icon ${className}`} width={size} height={size}>
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
