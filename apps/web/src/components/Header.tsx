'use client'

import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export const Header = () => {
  const [route, setRoute] = useState<string>()
  const [role, setRole] = useState<string>()

  const fetchData = async () => {
    try {
      let cookie = await Cookies.get("token");
      if (cookie) {
        let payload = JSON.parse(atob(cookie.split('.')[1]));
        setTimeout(() => {
          console.log(payload.role)
          if (payload.role == "ADMIN") {
            setRoute("admin-dashboard")
            setRole("ADMIN")
          } else if (payload.role == "USER") {
            setRoute("user")
            setRole("USER")
          }
        }, 500)
      } else {
        setRoute("login-user")
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(role)

  useEffect(() => {
    fetchData()
  }, [route])

  return (
    <div className="absolute px-8 z-50 top-0 flex w-full justify-between items-center py-4 bg-slate-100/50 backdrop-blur-sm  ">
      <a href={"/"} className="w-[150px]">
        <Image src={'/nexventtext2.png'} alt="Next.js Logo" width={150} height={100} className="shadow-sm" />
      </a>
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
      <div className="w-[150px] justify-end flex gap-8 items-center">
        {
          role == "USER" && (
            <a href="/user/cart">
              <FaCartArrowDown size={28} />
            </a>
          )
        }
        <a href={`/${route}`}><CgProfile size={32} /></a>
      </div>
    </div>
  )
};
