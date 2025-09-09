import React from 'react';
export const Card = ({ className='', ...p }: any) => <div className={`card ${className}`} {...p}/>;
export const CardHeader = ({ className='', ...p }: any) => <div className={`p-4 ${className}`} {...p}/>;
export const CardTitle = ({ className='', ...p }: any) => <h3 className={`text-lg font-semibold ${className}`} {...p}/>;
export const CardDescription = ({ className='', ...p }: any) => <p className={`text-sm text-muted-foreground ${className}`} {...p}/>;
export const CardContent = ({ className='', ...p }: any) => <div className={`p-4 pt-0 ${className}`} {...p}/>;
