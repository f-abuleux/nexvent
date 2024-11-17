import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PayCartOnlist({ cart_id, token }: { cart_id: string, token: string | undefined }) {
    const router = useRouter()
    const [midTransUrl, setMidTransUrl] = useState<any>()

    const payCart = async () => {
        const payData = await fetch(`http://localhost:8000/api/cart/create/transaction/${cart_id}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ cart_id })

        })
        console.log(payData)
        const response = await payData.json()
        console.log(response)
        router.push(response.midTransData.redirect_url)

    }

    const deleteCart = async () => {
        try {
            const deleteData = await fetch(`http://localhost:8000/api/cart/delete/transaction/${cart_id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "DELETE",
                body: JSON.stringify({ cart_id })

            })
            console.log(deleteData)
            const response = await deleteData.json()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button onClick={payCart} className="bg-lightestpurple rounded-[6px] text-[12px] text-white w-16 p-1">PAY</button>
            <button onClick={deleteCart} className="bg-darkpurplered rounded-[6px] text-[12px] text-white p-1">REMOVE</button>
        </div>
    )
}