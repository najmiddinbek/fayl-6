import React from 'react'


const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/pupils', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Failed to fetch topics');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading topics: ', error);
        return { mavzula: [] }; // Provide a default value for 'mavzula' in case of an error
    }
};

export default async function FilterOption() {
    const [mavzula, setMavzula] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const { mavzula } = await getTopics();
            setMavzula(mavzula);
        };

        fetchTopics();
    }, []);

    return (
        <div>
            <div className="flex gap-4">
                <select>
                    <option>Tanlang</option>
                    {mavzula.map((mavzu, index) => (
                        <option key={index} value={mavzu}>{mavzu.shaxs}</option>
                    ))}
                </select>
                <button className="bg-[#FEAF00] rounded-md font-bold text-white py-3 px-6">Filter</button>
            </div>
        </div>
    )
}