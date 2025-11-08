import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Add onClick prop to allow the card to be clickable.
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
