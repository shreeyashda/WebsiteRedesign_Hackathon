import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseStyles = "inline-block px-8 py-4 text-sm font-bold uppercase tracking-wide transition-all duration-200";

  const variants = {
    primary: "bg-jet-black text-pure-white hover:bg-electric-purple",
    secondary: "bg-pure-white text-jet-black border-2 border-jet-black hover:bg-jet-black hover:text-pure-white",
    accent: "bg-electric-purple text-pure-white hover:bg-neon-blue",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
