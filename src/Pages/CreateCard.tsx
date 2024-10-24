import axios from "axios"
import { useForm } from "react-hook-form"
import { CreateCardSchema } from "../Validation/CreateCardSchema.joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { Button, FloatingLabel } from "flowbite-react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const CreateCard = () => {

    const nav = useNavigate();

    const initialCardData = {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initialCardData,
        mode: 'onChange',
        resolver: joiResolver(CreateCardSchema)
    });

    const submit = async (form: typeof initialCardData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', form);
            Swal.fire({
                title: 'Success',
                text: 'New Card Added',
                icon: 'success',
                toast: true,
                timer: 3500,
                position: 'top-end',
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#28a745',
            })
            nav("/mycards")

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while adding the card.",
                icon: "error",
            });
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-4 p-4">
                <h1 className="text-2xl font-bold text-cyan-400 dark:text-cyan-700">Create Card</h1>
                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='Title'
                    variant="filled"
                    {...register('title')}
                />
                <span className="text-sm text-red-500">{errors.title?.message}</span>


                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='Subtitle'
                    variant="filled"
                    {...register('subtitle')}

                />
                <span className="text-sm text-red-500">{errors.subtitle?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='Description'
                    variant="filled"
                    {...register('description')}

                />
                <span className="text-sm text-red-500">{errors.description?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='number'
                    label='Phone Number'
                    variant="filled"
                    {...register('phone')}


                />

                <FloatingLabel
                    className="w-[70vw]"
                    type='email'
                    variant="filled"
                    label='Email'
                    {...register('email')}
                />
                <span className="text-sm text-red-500">{errors.email?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    variant="filled"
                    label='Web'
                    {...register('web')}

                />
                <span className="text-sm text-red-500">{errors.web?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='link'
                    variant="filled"
                    label='Image URL'
                    {...register('image.url')}

                />
                <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='link'
                    variant="filled"
                    label='Image ALT'
                    {...register('image.alt')}

                />
                <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='State'
                    variant="filled"
                    {...register('address.state')}

                />
                <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='Country'
                    variant="filled"
                    {...register('address.country')}

                />
                <span className="text-sm text-red-500">{errors.address?.country?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='City'
                    variant="filled"
                    {...register('address.city')}

                />
                <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='text'
                    label='Street'
                    variant="filled"
                    {...register('address.street')}

                />
                <span className="text-sm text-red-500">{errors.address?.street?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='number'
                    label='House Number'
                    variant='filled'
                    {...register('address.houseNumber')}
                />
                <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    type='number'
                    label='Zip Number'
                    variant="filled"
                    {...register('address.zip')}
                />
                <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>



                <Button type="submit" disabled={!isValid} >Add Card</Button>

            </form>
        </>
    )
}

export default CreateCard;