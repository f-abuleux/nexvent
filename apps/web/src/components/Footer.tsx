import { IoLogoInstagram } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className=" w-full z-40">
      <div className="flex  flex-col sm:flex-row  gap-5 justify-between p-5 items-center text-[14px]">
        <div>© 2024, NexVent, the next gen Event.</div>
        <div className="flex items-center gap-5">
          <p className="font-bold">Follow us</p>
          <p><IoLogoInstagram size={32} /></p>
          <p><IoLogoFacebook size={32} /></p>
          <p><FaXTwitter size={28} /></p>
        </div>
        <div className="flex gap-5 items-center">
          <Link href={'/nexvent-terms&policy'} className="hover:underline">Privacy Policy</Link>
          <Link href={'/nexvent-terms&policy'} className="hover:underline">Terms of Service</Link>
          <Link href={'/nexvent-terms&policy'} className="hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
};
