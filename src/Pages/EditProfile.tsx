import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { FloatingLabel, Label, Checkbox, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import RegisterSchema from "../Validation/RegisterSchema.joi";

const EditProfile = () => {
    const initialData = {
        "name": {
            "first": "",
            "middle": "",
            "last": ""
        },
        "phone": "",
        "email": "",
        "password": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "state": "",
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": "",
            "zip": ""
        },
        "isBusiness": false
    }



    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialData,
        mode: 'onChange',
        resolver: joiResolver(RegisterSchema)
    });

    const onSubmit = async (form: typeof initialData) => {
        try {
            await axios.put('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/' + user?._id, form);
            Swal.fire({
                title: 'Success',
                text: 'You Successfuly Register!',
                icon: 'success',
                toast: true,
                timer: 3500,
                position: 'top-end',
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#28a745',
            })
        }
        catch {
            Swal.fire({
                title: "Error",
                text: "An error occurred while register",
                icon: "error",
            });
        }

    }


    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-2xl font-bold text-cyan-400 dark:text-cyan-700">Register</h1>
            <FloatingLabel
                className="w-[70vw]"
                type='text'
                label='First Name'
                variant="filled"
                {...register('name.first')}
            />
            <span className="text-sm text-red-500">{errors.name?.first?.message}</span>


            <FloatingLabel
                className="w-[70vw]"
                type='text'
                label='Middle Name'
                variant="filled"
                {...register('name.middle')}

            />
            <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>

            <FloatingLabel
                className="w-[70vw]"
                type='text'
                label='Last Name'
                variant="filled"
                {...register('name.last')}

            />
            <span className="text-sm text-red-500">{errors.name?.last?.message}</span>

            <FloatingLabel
                className="w-[70vw]"
                type='number'
                label='Phone Number'
                variant="filled"
                {...register('phone')}
            />
            <span className="text-sm text-red-500">{errors.phone?.message}</span>

            <FloatingLabel
                className="w-[70vw]"
                type='text'
                variant="filled"
                label='Image URl'
                {...register('image.url')}
            />
            <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

            <FloatingLabel
                className="w-[70vw]"
                type='text'
                variant="filled"
                label='Image Alt'
                {...register('image.alt')}
            />
            <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>

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

            <Button type="submit" disabled={!isValid} >Update User</Button>

        </form>
    </>
}

export default EditProfile;