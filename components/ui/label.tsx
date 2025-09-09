import React from 'react';
export const Label = (p:any)=> <label className={`text-sm ${p.className||''}`} {...p}/>;
