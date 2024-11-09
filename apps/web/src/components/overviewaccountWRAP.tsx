"use client"

import { useEffect, useState } from "react";
import OverviewAccount from "./overviewaccount";
import Cookies from "js-cookie";
import { IUserData } from "./types/types";


export default function OverviewAccountWrapper() {
    const [data, setData] = useState<IUserData>()
    const token = Cookies.get("token")


    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result.user);

            console.log(result.user);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <OverviewAccount name={`${data?.first_name} ${data?.last_name}`} email={`${data?.email}`} point={data && +data?.point ? +data?.point : 0} referral_code={`${data?.referral_code}`} success={0} pending={0} failed={0} image={`/${data?.avatar}`} />
        </div>
    )
}