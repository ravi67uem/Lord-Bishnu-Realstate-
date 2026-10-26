import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h2>
      <p className="text-sm text-slate-600 mb-6 max-w-sm">
        The plot, product, or portal page you are looking for does not exist or has been relocated.
      </p>
      <Link 
        href="/"
        className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors shadow-md"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
