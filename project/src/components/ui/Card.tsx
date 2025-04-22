import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false,
  gradient = false
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  const defaultClasses = 'bg-white dark:bg-slate-800 shadow';
  const gradientClasses = 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg';
  const hoverClasses = hoverable ? 'transition-transform hover:scale-[1.02] hover:shadow-lg' : '';

  return (
    <div className={`
      ${baseClasses}
      ${gradient ? gradientClasses : defaultClasses}
      ${hoverClasses}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-5 pt-0 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-5 bg-gray-50 dark:bg-slate-900 ${className}`}>{children}</div>;
};

export default Card;