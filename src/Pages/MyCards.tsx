import axios from "axios";
import { useEffect, useState } from "react"
import { TCard } from "../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../Store/BigPie";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";
import EditCard from "./EditCardModal";

const MyCards = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<TCard | null>(null);

    const handleEditClick = (card: TCard) => {
        setSelectedCard(card);
        setOpenModal(true);
    };

    const getCards = async () => {
        try {
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
            setCards(res.data);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while getting the cards.",
                icon: "error",
            });
        }
    };

    const SearchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(SearchWord));
    };

    const deleteCard = async (card: TCard) => {
        try {
            const res = await axios.delete('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + card._id);
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "You deleted this card",
                    toast: true,
                    timer: 3500,
                    position: 'top-end',
                    showConfirmButton: false,
                    icon: "success",
                });
                setCards(cards => cards.filter(item => item._id !== card._id));
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });
        }
    };

    const updateCard = (updatedCard: TCard) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card
            )
        );
    }
    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
            if (res.status === 200) {
                const cardIndex = cards.indexOf(card);
                const userIndex = card.likes.indexOf(user.user!._id);
                const newCards = [...cards];
                if (userIndex === -1) {
                    newCards[cardIndex].likes.push(user.user!._id);
                    Swal.fire({
                        title: 'Card Liked!',
                        text: "You've liked this card",
                        icon: 'info',
                        toast: true,
                        timer: 3500,
                        position: 'top-end',
                        showConfirmButton: false,
                        background: '#fff',
                        iconColor: '#f49ac2',
                    });
                } else {
                    newCards[cardIndex].likes.splice(userIndex, 1);
                    Swal.fire({
                        title: 'Card Unliked!',
                        text: "You've unliked this card",
                        icon: 'info',
                        toast: true,
                        timer: 3500,
                        position: 'top-end',
                        showConfirmButton: false,
                        background: '#fff',
                        iconColor: '#f49ac2',
                    });
                }
                setCards(newCards);
            }
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true,
            });
        }
    };

    const isLikedCard = (card: TCard) => {
        return user && user.user && card.likes.includes(user.user._id);
    };

    useEffect(() => {
        getCards();
    }, []);

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const navToCreate = () => {
        nav("/createcard");
    };

    return (
        <>
            <div className="p-8 font-sans h-[25vh] bg-sky-200 dark:bg-gray-500 dark:shadow-lg">
                <div className="text-center dark:text-white">
                    <h1 className="m-3 text-6xl">Cards Page</h1>
                    <p className="text-2xl">Here you can find your own cards</p>
                </div>
            </div>
            {cards.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-5 m-5">
                    {searchCards()!.map((item: TCard) => (
                        <Card key={item._id} className="w-[25vw]">
                            <img
                                className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]"
                                src={item.image.url}
                                onClick={() => navToCard(item._id)}
                                alt={item.image.alt} />
                            <h1 className="text-2xl dark:text-white">{item.title}</h1>
                            <h4 className="text-lg dark:text-white">{item.subtitle}</h4>
                            <p className="text-sm dark:text-white">{item.description}</p>
                            <p className="text-sm dark:text-white">{item.phone}</p>
                            <p className="text-sm dark:text-white">{item.address.city}, {item.address.street} {item.address.houseNumber}</p>
                            <hr />
                            <div className="flex gap-4">
                                {user.user && (
                                    <FaHeart
                                        className="cursor-pointer"
                                        color={!isLikedCard(item) ? 'black' : 'red'}
                                        onClick={() => likeUnlikeCard(item)}
                                    />
                                )}
                                <FaTrashAlt
                                    onClick={() => deleteCard(item)}
                                    className="cursor-pointer"
                                />
                                <FaPencil
                                    className="cursor-pointer"
                                    onClick={() => handleEditClick(item)}
                                />
                            </div>
                        </Card>
                    ))}
                    <button
                        onClick={navToCreate}
                        className="flex items-center justify-center w-24 h-24 pb-4 text-white bg-blue-500 rounded-full text-8xl m-7">
                        +
                    </button>
                </div>
            ) : (
                <div className="h-[100vh] flex justify-center">
                    <button
                        onClick={navToCreate}
                        className="flex items-center justify-center w-24 h-24 pb-4 text-white bg-blue-500 rounded-full text-8xl m-7">
                        +
                    </button>
                </div>
            )}
            {openModal && selectedCard && (
                <EditCard onUpdateCard={updateCard} openModal={openModal} setOpenModal={setOpenModal} card={selectedCard} />
            )}
        </>
    );
};
export default MyCards;
