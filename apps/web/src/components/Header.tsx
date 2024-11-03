import Image from "next/image";

export const Header = () => {
  return (
    <div className="absolute z-50 top-0 flex w-full justify-between items-center p-4 bg-slate-100/50 backdrop-blur-sm ">
      <div className="w-[150px]">
            <Image src={'/nexventtext.png'} alt="Next.js Logo" width={150} height={100} />
      </div>
      <div className="w-[450px]">
      <input
              type="text"
              placeholder="Search your 'ventss...!'"
              // value={search}
              // onChange={handleSearchChange}
              // onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 border border-main rounded-full focus:outline-none"
            />
      </div>
      <div className="w-[150px]">
        Profile
        </div>
    </div>
  )
};
