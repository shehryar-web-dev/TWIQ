import React from 'react';
export const Table = (p:any)=> <table className={`w-full text-sm ${p.className||''}`} {...p.props}>{p.children}</table>;
export const TableHeader = (p:any)=> <thead className="text-left text-muted-foreground" {...p.props}>{p.children}</thead>;
export const TableHead = (p:any)=> <th className={`py-2 px-2 font-medium ${p.className||''}`} {...p.props}>{p.children}</th>;
export const TableBody = (p:any)=> <tbody className="divide-y divide-border" {...p.props}>{p.children}</tbody>;
export const TableRow = (p:any)=> <tr className="hover:bg-muted/50" {...p.props}>{p.children}</tr>;
export const TableCell = (p:any)=> <td className={`py-2 px-2 ${p.className||''}`} colSpan={p.colSpan} {...p.props}>{p.children}</td>;
