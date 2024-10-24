import { Button, FloatingLabel, Modal, Textarea } from "flowbite-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Swal from "sweetalert2";
import { TCard } from "../Types/TCard";
import EditCardSchema from "../Validation/EditCardSchema.joi";

interface EditCardProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    card: TCard;
    onUpdateCard: (updatedCard: TCard) => void;
}

interface CardFormData {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
}

const EditCard = ({ openModal, setOpenModal, card, onUpdateCard }: EditCardProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CardFormData>({
        defaultValues: {
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            phone: card.phone,
            email: card.email,
            web: card.web,
            image: {
                url: card.image.url,
                alt: card.image.alt,
            },
            address: {
                state: card.address.state,
                country: card.address.country,
                city: card.address.city,
                street: card.address.street,
                houseNumber: card.address.houseNumber,
                zip: card.address.zip,
            },
        },
        mode: "onChange",
        resolver: joiResolver(EditCardSchema),
    });

    const onSubmit = async (formData: CardFormData) => {
        try {
            await axios.put(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + card._id,
                formData
            );

            const updatedCard = { ...card, ...formData };
            onUpdateCard(updatedCard);

            setOpenModal(false);

            Swal.fire({
                title: "Success",
                text: "Card Updated Successfully",
                icon: "success",
                toast: true,
                timer: 3500,
                position: "top-end",
                showConfirmButton: false,
                background: "#fff",
                iconColor: "#28a745",
            });
        } catch (error) {
            console.log(errors);

            Swal.fire({
                title: "Error",
                text: "An error occurred while updating the card.",
                icon: "error",
            });
        }
    };

    return (
        <Modal
            show={openModal}
            size="md"
            popup
            onClose={() => setOpenModal(false)}
            initialFocus={emailInputRef}
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-[20vw] flex flex-col">
                    <h1 className="text-2xl font-bold text-cyan-400 dark:text-cyan-700">
                        Edit Card
                    </h1>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="Title"
                            variant="filled"
                            {...register("title")}
                        />
                        {errors.title && (
                            <span className="text-sm text-red-500">{errors.title.message}</span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="Subtitle"
                            variant="filled"
                            {...register("subtitle")}
                        />
                        {errors.subtitle && (
                            <span className="text-sm text-red-500">
                                {errors.subtitle.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <Textarea
                            className="resize:none"
                            {...register("description")}
                        />
                        {errors.description && (
                            <span className="text-sm text-red-500">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="tel"
                            label="Phone Number"
                            variant="filled"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <span className="text-sm text-red-500">{errors.phone.message}</span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="email"
                            label="Email"
                            variant="filled"
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="url"
                            label="Web"
                            variant="filled"
                            {...register("web")}
                        />
                        {errors.web && (
                            <span className="text-sm text-red-500">{errors.web.message}</span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="url"
                            label="Image URL"
                            variant="filled"
                            {...register("image.url")}
                        />
                        {errors.image?.url && (
                            <span className="text-sm text-red-500">
                                {errors.image.url.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="Image ALT"
                            variant="filled"
                            {...register("image.alt")}
                        />
                        {errors.image?.alt && (
                            <span className="text-sm text-red-500">
                                {errors.image.alt.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="State"
                            variant="filled"
                            {...register("address.state")}
                        />
                        {errors.address?.state && (
                            <span className="text-sm text-red-500">
                                {errors.address.state.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="Country"
                            variant="filled"
                            {...register("address.country")}
                        />
                        {errors.address?.country && (
                            <span className="text-sm text-red-500">
                                {errors.address.country.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="City"
                            variant="filled"
                            {...register("address.city")}
                        />
                        {errors.address?.city && (
                            <span className="text-sm text-red-500">
                                {errors.address.city.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="text"
                            label="Street"
                            variant="filled"
                            {...register("address.street")}
                        />
                        {errors.address?.street && (
                            <span className="text-sm text-red-500">
                                {errors.address.street.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="number"
                            label="House Number"
                            variant="filled"
                            {...register("address.houseNumber")}
                        />
                        {errors.address?.houseNumber && (
                            <span className="text-sm text-red-500">
                                {errors.address.houseNumber.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <FloatingLabel
                            type="number"
                            label="Zip Code"
                            variant="filled"
                            {...register("address.zip")}
                        />
                        {errors.address?.zip && (
                            <span className="text-sm text-red-500">
                                {errors.address.zip.message}
                            </span>
                        )}
                    </div>

                    <Button type="submit" disabled={!isValid}>
                        Update Card
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCard;