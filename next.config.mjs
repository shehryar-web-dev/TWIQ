/** Frontend-only: no API routes. Optional proxy for /api -> backend (uncomment to use). */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
export default {
  reactStrictMode: true,
  // async rewrites() {
  //   return [{ source: "/api/:path*", destination: `${API_BASE}/:path*` }];
  // }
};
