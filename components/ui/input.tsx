import React from 'react';
export const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`input ${p.className||''}`}/>;
