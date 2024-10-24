import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { TCard } from "../Types/TCard";

const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>()


    const getData = async () => {
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
        setCard(res.data);
        console.log(res.data);
    }



    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-[90vh] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="h-[80vh] flex flex-col gap-4 items-center">
                <div className="max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <img
                        className="w-full h-80 "
                        src={card?.image.url}
                        alt={card?.image.alt}
                    />
                    <div className="p-4">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            {card?.title}
                        </h1>
                        <h3 className="mb-3 text-xl font-bold text-gray-600 dark:text-gray-300">
                            {card?.subtitle}
                        </h3>
                        <h4 className="mb-1 text-base font-bold text-gray-700 dark:text-gray-400">
                            {card?.description}
                        </h4>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {card?.email}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {card?.phone}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {card?.address.country}, {card?.address.street} {card?.address.houseNumber}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )


}



export default CardDetails;