import BgColor from "./BgColor"
import poeple from '../../assets/poeple.jpg'
import Image from "next/image"
function Hero() {
  return (
    <div className="relative px-6 md:px-20 flex items-center text-center justify-center">
        <BgColor left={'40%'} top={'10%'}/>
<div className="text-center">
           <div className="flex items-center  m-auto justify-center gap-4 mt-8 justi  px-4 py-2 rounded-full   w-fit">
  <div className="flex -space-x-3 ">
{[
  "https://ui-avatars.com/api/?name=John+Doe&background=random",
  "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
  "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
  "https://ui-avatars.com/api/?name=Sara+Lee&background=random",
  "https://ui-avatars.com/api/?name=Mark+Wilson&background=random"
].map((url, i) => (
  <img key={i} src={url} alt="User" className="w-10 h-10  rounded-full  object-cover" />
))}
  </div>
  <div className="flex flex-col items-start">
    <div className="flex text-[#00C950] text-sm">★★★★★</div>
    <span className="text-[10px] font-semibold text-gray-600">Used by 10,000+ users</span>
  </div>
</div>
<div>

    <h1 className="capitalize text-[30px]  md:text-[60px] font-bold text-[#090909]">Land your dream job with <br /> <span className="text-[#009C3B]">AI-powered</span> resumes.</h1>
    <h2 className="pt-10 text-[16px] font-medium ">Create, edit and download professional resumes with <br /> AI-powered assistance.</h2>

    <div className="flex items-center gap-6 m-auto mt-6 justify-center  ">
        <button className="bg-[#00C950] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#00a342] transition-all shadow-md">Get Started</button>
        <button className="bg-[gray] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#00a342] transition-all shadow-md">Demo</button>
    </div>
</div>
      
</div>
    </div>
  )
}

export default Hero
