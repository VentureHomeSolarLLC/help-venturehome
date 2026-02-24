interface LogoProps {
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="Venture Home" 
      height={size}
      style={{ display: 'block' }}
    />
  );
}