import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [location] = useLocation();

  useEffect(() => {
    const slug = location.replace(/^\/+|\/+$/g, '');
    if (slug) {
      window.location.href = `https://brandsenvoy.com/blog/${slug}/`;
    } else {
      window.location.href = `https://brandsenvoy.com/blog/`;
    }
  }, [location]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 mx-auto animate-pulse">
          ⚡
        </div>
        <h1 className="text-2xl font-bold">Redirecting to Blog...</h1>
        <p className="text-slate-400 text-sm">
          Taking you to <span className="text-orange-400 font-mono">brandsenvoy.com/blog</span>
        </p>
      </div>
    </div>
  );
}
