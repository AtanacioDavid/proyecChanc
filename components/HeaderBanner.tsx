
import React from 'react';

interface HeaderBannerProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-rose-500 text-white p-6 rounded-lg shadow-md mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 text-rose-100">{subtitle}</p>}
      {children}
    </div>
  );
};

export default HeaderBanner;
