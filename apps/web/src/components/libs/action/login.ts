import { ILogin } from "@/components/types/types"

export const loginUser = async (data: ILogin) => {
    const res = await fetch(`http://localhost:8000/api/auth/loginuser`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return { result: response, ok: res.ok }
}

export const registerUser = async (data: ILogin) => {
    const res = await fetch(`http://localhost:8000/api/auth/createuser`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return { result: response, ok: res.ok }
}
