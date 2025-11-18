import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = 'bg-white p-6 rounded-lg shadow-md';
  
  // Añade clases interactivas solo si se proporciona onClick
  const interactiveClasses = onClick 
    ? 'cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1' 
    : '';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      // Previene el scroll por defecto de la barra espaciadora
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${className}`} 
      onClick={onClick}
      // Añade tabIndex para hacerlo enfocable si es cliqueable, por accesibilidad
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

export default Card;