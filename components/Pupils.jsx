'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FilterOptions from "./FilterOption"
// import Pupil from "./Pupil"

const PupilsAddClient = () => {
    const [shaxs, setShaxs] = useState("");
    const [maktab, setMaktab] = useState("");
    const [sinf, setSinfi] = useState("");
    const [pupil, setPupil] = useState("");

    const router = useRouter();
    const maktablar = Array.from({ length: 54 }, (_, index) => index + 1);
    const sinflar = Array.from({ length: 11 }, (_, index) => index + 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/pupils`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ shaxs, maktab, sinf, pupil }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/pupilsAdd");
                toast.success("O`quvchi malumotlari muvaffaqiyatli qo`shildi!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-[18px] poppins font-bold" htmlFor="">
                    Maktabni tanlang
                </label>
                <select
                    onChange={(e) => setMaktab(e.target.value)}
                    value={maktab}
                    className="px-2 py-3 cursor-pointer"
                >
                    <option>Bu yerdan tanlang</option>
                    {maktablar.map((maktab) => (
                        <option key={maktab} value={maktab}>
                            {maktab}-maktab
                        </option>
                    ))}
                </select>

                <label className="text-[18px] font-bold poppins" htmlFor="">
                    Sinfni tanlang
                </label>
                <select
                    onChange={(e) => setSinfi(e.target.value)}
                    value={sinf}
                    className="px-2 py-3 cursor-pointer"
                >
                    <option>Bu yerdan tanlang</option>
                    {sinflar.map((sinf) => (
                        <option key={sinf} value={sinf}>
                            {sinf}-sinf
                        </option>
                    ))}
                </select>
                <label className="text-[18px] poppins font-bold" htmlFor="">
                    Familiya,Ismi hamda Otasining ismi
                </label>
                <input
                    className="w-[900px] py-3 px-2 border outline-none"
                    onChange={(e) => setShaxs(e.target.value)}
                    value={shaxs}
                    type="text"
                    placeholder="Ota onasi telefon raqami"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#FEAF00] rounded-md font-bold text-white py-3 px-6 w-fit"
                    >
                        Qo`shish
                    </button>
                </div>
            </form>
        </>
    );
};

export default PupilsAddClient;