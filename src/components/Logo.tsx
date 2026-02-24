export function Logo() {
  return (
    <svg 
      width="180" 
      height="32" 
      viewBox="0 0 180 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="logo-svg"
    >
      {/* House icon */}
      <path 
        d="M16 2L2 14H6V28H14V20H18V28H26V14H30L16 2Z" 
        fill="#231F20"
      />
      {/* VENTURE text */}
      <text 
        x="38" 
        y="22" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="18" 
        fontWeight="700" 
        fill="#231F20"
        letterSpacing="-0.02em"
      >
        VENTURE
      </text>
      {/* HOME text */}
      <text 
        x="115" 
        y="22" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="18" 
        fontWeight="400" 
        fill="#555555"
        letterSpacing="-0.02em"
      >
        HOME
      </text>
    </svg>
  );
}