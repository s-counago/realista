import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-accent selection:text-white">
      {/* Navigation Bar */}
      <nav className="border-b-4 border-black p-6 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="text-2xl font-black uppercase tracking-tighter">
          Realista
        </div>
        <Link 
          href="/login" 
          className="px-8 py-3 text-lg font-bold border-4 border-black bg-white hover:bg-black hover:text-white transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          Log In
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="border-b-4 border-black">
        <div className="container mx-auto px-6 py-32 md:py-48">
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter mb-12 break-words">
            Real<span className="text-accent">ista</span>
          </h1>
          <div className="max-w-4xl">
            <p className="text-3xl md:text-5xl font-bold uppercase leading-tight border-l-8 border-accent pl-8 mb-12">
              Transparency in rental housing. No BS.
            </p>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mb-12">
              A platform where tenants share honest reviews about rental properties 
              and their managers—helping you make informed decisions before signing a lease.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
               <Link 
                href="/buscar-piso" 
                className="inline-block px-12 py-4 text-xl font-black uppercase border-4 border-black bg-accent text-black hover:bg-black hover:text-accent transition-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px]"
              >
                Start Searching
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* How it works - Grid Layout */}
      <section className="border-b-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
          
          {/* Step 1 */}
          <div className="p-12 hover:bg-accent transition-colors group">
            <div className="text-8xl font-black mb-6 text-transparent [-webkit-text-stroke:2px_black] group-hover:text-black group-hover:[-webkit-text-stroke:0px] transition-all">
              01
            </div>
            <h3 className="text-3xl font-black uppercase mb-4">Search</h3>
            <p className="text-lg font-medium">
              Find reviews on houses, flats, and property managers in your area.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-12 hover:bg-black hover:text-white transition-colors group">
            <div className="text-8xl font-black mb-6 text-transparent [-webkit-text-stroke:2px_black] group-hover:text-white group-hover:[-webkit-text-stroke:0px] transition-all">
              02
            </div>
            <h3 className="text-3xl font-black uppercase mb-4">Read</h3>
            <p className="text-lg font-medium">
              Learn from fellow tenants about maintenance, communication, and living conditions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-12 hover:bg-accent transition-colors group">
            <div className="text-8xl font-black mb-6 text-transparent [-webkit-text-stroke:2px_black] group-hover:text-black group-hover:[-webkit-text-stroke:0px] transition-all">
              03
            </div>
            <h3 className="text-3xl font-black uppercase mb-4">Share</h3>
            <p className="text-lg font-medium">
              Help others by writing honest reviews about your rental experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-black text-white py-32 px-6 border-b-4 border-black">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] mb-8 text-accent">
            Our Mission
          </h2>
          <p className="text-4xl md:text-6xl font-black uppercase leading-tight">
            Every tenant deserves to know what they're getting into. 
            <span className="text-accent"> Information flows freely here.</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="text-4xl font-black uppercase tracking-tighter mb-4">
              Realista
            </div>
            <p className="font-bold">© 2024 Realista Inc.</p>
          </div>
          <div className="flex gap-6 font-bold uppercase text-sm">
            <Link href="#" className="hover:bg-black hover:text-white px-2 py-1">Privacy</Link>
            <Link href="#" className="hover:bg-black hover:text-white px-2 py-1">Terms</Link>
            <Link href="#" className="hover:bg-black hover:text-white px-2 py-1">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
