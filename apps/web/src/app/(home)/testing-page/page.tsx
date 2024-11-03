import Image from "next/image";

export default function TestingPage() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[url('/bg-loginregis.webp')] bg-cover bg-center  blur-lg"></div>
            <div className="relative z-10 ">
                <h1 className="text-3xl font-bol underline text-lightestcream font-['HelveticaNeueCyr'] font-light ">
                    Hello world!
                </h1>
                <h1 className="text-3xl font-bol underline text-lightestcream  font-['HelveticaNeueCyr'] font-roman">
                    Hello world!
                </h1>
                <h1 className="text-3xl font-bol underline text-lightestcream  font-['HelveticaNeueCyr'] font-medium ">
                    Hello world!
                </h1>
                <h1 className="text-3xl font-bol underline text-lightestcream font-['HelveticaNeueCyr'] font-bold">
                    Hello world!
                </h1>
                <Image src={'/nexventtext.png'} alt="Next.js Logo" width={200} height={200} />
                <Image src={'/nexvent.png'} alt="Next.js Logo" width={200} height={200} />
            </div>
        </div>
    )
}
