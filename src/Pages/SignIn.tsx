import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInJoiSchema } from "../Validation/SighInSchema.joi.ts"
import axios from "axios";
import { decode } from "../Services/TokenServise.ts";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/UserSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { Button, FloatingLabel } from "flowbite-react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'



function SignIn() {

    const dispatch = useDispatch();
    const nav = useNavigate();


    const initialFormData = {
        email: '',
        password: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initialFormData,
        mode: 'onChange',
        resolver: joiResolver(SignInJoiSchema)
    });

    const submit = async (form: typeof initialFormData) => {
        try {
            const token = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', form);
            localStorage.setItem('token', token.data);
            const id = decode(token.data)._id;

            axios.defaults.headers.common["x-auth-token"] = token.data;
            const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);
            dispatch(userActions.login(user.data));
            Swal.fire({
                title: 'Success',
                text: 'You Successfuly Signed in!',
                icon: 'success',
                toast: true,
                timer: 3500,
                position: 'top-end',
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#28a745',
            });
            nav('/');
        } catch (error) {
            Swal.fire({
                title: 'Oops..',
                text: 'Email or Password is wrong',
                icon: 'error',
                toast: true,
                timer: 3500,
                position: 'top-end',
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#dc143c',
            });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}
                className="flex flex-col gap-4 p-4 h-[100vh] items-center"
            >
                <h1 className="text-2xl font-bold text-cyan-400 dark:text-cyan-700">Sigh In</h1>
                <FloatingLabel
                    className="w-[70vw]"
                    label="Email"
                    type="email"
                    variant="filled"
                    {...register('email')} />
                <span className="font-mono text-red-700">{errors['email']?.message}</span>

                <FloatingLabel
                    className="w-[70vw]"
                    label="Password"
                    type="password"
                    variant={"filled"}
                    {...register('password')} />
                <span className="font-mono text-red-600">{errors['password']?.message}</span>

                <Button type="submit" disabled={!isValid}>Submit</Button>

                <Link
                    to={'/register'}
                    className="m-3 italic font-bold text-blue-800 underline hover:text-blue-700"
                >
                    "If you don't have an account yet, you can sign up here!"
                </Link>

            </form>
        </div>
    )

}

export default SignIn;
