import { Navbar, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { DarkThemeToggle } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Link } from "react-router-dom";
import { userActions } from "../../Store/UserSlice";
import Swal from "sweetalert2";
import { searchActions } from "../../Store/SearchSlice";


const Header = () => {

    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.SearchWord(value));
    };

    const logout = () => {
        dispatch(userActions.logout());
        Swal.fire({
            title: 'Success',
            text: 'You Logged out',
            icon: 'success',
            toast: true,
            timer: 3500,
            position: 'top-end',
            showConfirmButton: false,
            background: '#fff',
            iconColor: '#28a745',
        })
    }

    return (
        <div >

            <Navbar className="bg-blue-400 dark:bg-gray-800">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <span style={{ fontSize: '2em' }} className="font-bold text-blue-700 dark:text-blue-300">BCard</span>

                    <Navbar.Link
                        as={Link}
                        to={"/"}
                        className="text-white">
                        Home
                    </Navbar.Link>

                    <Navbar.Link
                        as={Link}
                        to={"/about"}
                        className="text-white">
                        About
                    </Navbar.Link>



                    {!user && <>
                        <Navbar.Link
                            as={Link}
                            to={"/signin"}
                            className="text-white">
                            Sign In
                        </Navbar.Link>

                        <Navbar.Link
                            as={Link}
                            to={"/register"}
                            className="text-white">
                            Register
                        </Navbar.Link>
                    </>
                    }


                    {user && <>
                        <Navbar.Link
                            as={Link}
                            to={"/profile"}
                            className="text-white">
                            Profile
                        </Navbar.Link>

                        <Navbar.Link
                            as={Link}
                            to={"/favorites"}
                            className="text-white">
                            Favorites
                        </Navbar.Link>

                        {user?.isBusiness && <>
                            <Navbar.Link
                                as={Link}
                                to={'/mycards'}
                                className="text-white">
                                My Cards
                            </Navbar.Link>
                        </>
                        }

                        {user?.isAdmin && <>
                            <Navbar.Link
                                as={Link}
                                to={'/crm'}
                                className="text-white">
                                CRM
                            </Navbar.Link>
                        </>
                        }

                        <Navbar.Link
                            as={Link}
                            to={"/"}
                            onClick={() => logout()}
                            className="text-white">
                            Sign Out
                        </Navbar.Link>
                    </>
                    }

                </Navbar.Collapse>

                <div className="flex gap-2">
                    <TextInput
                        onChange={search}
                        placeholder="Search..."
                        rightIcon={FaSearch}
                    />
                    <DarkThemeToggle />
                </div>
            </Navbar>
        </div>
    );
}

export default Header;