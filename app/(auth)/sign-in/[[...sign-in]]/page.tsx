import { ThreeDMarqueeDemo } from '@/app/_components/Marquee'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex h-screen w-screen">

      <div className="relative bg-white h-full w-1/2 hidden md:flex flex-col justify-center items-center p-8 overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-20 h-screen">
          <ThreeDMarqueeDemo />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Welcome to AI Medical Agent
          </h1>
          <p className="text-gray-600 mt-3 max-w-md">
            Your personal AI-powered medical advisor 🩺.<br />
            Get instant health insights and auto-generated reports.
          </p>
        </div>
      </div>

      {/* Right side (full screen on mobile, half on desktop) */}
      <div className="flex justify-center items-center w-screen md:w-1/2 bg-slate-950">
        <SignIn />
      </div>
    </div>
  )
}
