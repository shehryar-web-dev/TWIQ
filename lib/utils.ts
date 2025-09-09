export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatAddress(address: string, start: number, end: number) {
  if (!address) return "";
  return address.slice(0, start) + "..." + address.slice(-end);
}
