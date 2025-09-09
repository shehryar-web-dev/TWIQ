import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'default'|'outline'|'secondary'|'ghost'|'destructive', 
  size?: 'sm'|'icon'|'lg' 
};
export const Button: React.FC<Props> = ({ className='', variant='default', size, ...p }) => {
  const v = variant==='outline' ? 'bg-transparent border'
    : variant==='secondary' ? 'bg-muted'
    : variant==='ghost' ? 'bg-transparent'
    : variant==='destructive' ? 'bg-red-600 text-white hover:bg-red-700'
    : 'bg-primary text-white';
  const s = size==='sm' ? 'px-2 py-1 text-xs' 
    : size==='icon' ? 'p-2 aspect-square' 
    : size==='lg' ? 'px-6 py-3 text-base'
    : 'px-3 py-2';
  return <button className={`btn ${v} ${s} ${className}`} {...p}/>;
};
export default Button;
