import axios from "axios";
import { Modal, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TUser } from "../Types/TUser";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { TRootState } from "../Store/BigPie";

const CRM = () => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const SearchWord = useSelector((state: TRootState) => state.SearchSlice.search);
    const searchUser = () => {
        return users.filter((item: TUser) => item.name.first.includes(SearchWord) ||
            item.name.last.includes(SearchWord) ||
            item.email.includes(SearchWord));
    }

    const getUsers = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
        try {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
            setUsers(res.data);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const EditStatus = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
        try {
            if (selectedUser) {
                const updatedUser = { ...selectedUser, isBusiness: !selectedUser.isBusiness };
                await axios.patch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/' + selectedUser._id, updatedUser);

                const updatedUsers = users.map(user => user._id === selectedUser._id ? updatedUser : user);
                setUsers(updatedUsers);
                Swal.fire({
                    title: "Success",
                    text: "You've changed the Status'",
                    toast: true,
                    timer: 3500,
                    position: 'top-end',
                    showConfirmButton: false,
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });
        }
    }

    const DeleteUser = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
        try {
            if (selectedUser) {
                await axios.delete('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/' + selectedUser._id);
                const updatedUser = users.filter(user => user._id !== selectedUser._id);
                setUsers(updatedUser);
                Swal.fire({
                    title: "Deleted",
                    text: "User has been deleted",
                    icon: "success",
                });
                closeModal();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete the user",
                icon: "error",
            });
        }
    }


    const handleUserClick = (user: TUser) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };


    return (
        <>
            <div className="p-8 font-sans h-[25vh] bg-sky-200 dark:bg-gray-500 dark:shadow-lg">
                <div className="text-center dark:text-white ">
                    <h1 className="m-3 text-6xl">Cards Page</h1>
                    <p className="text-2xl">Here you can find business cards from all categories</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5 m-5">

                {loading ? (
                    <div className="flex items-center justify-center w-full h-64 space-x-4">
                        <p className="text-xl font-semibold text-gray-600 dark:text-white">Just a moment...</p>
                        <Spinner size="xl" aria-label="Loading users" />
                    </div>
                ) : (
                    <>

                        < Table className="hidden lg:table w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]" >
                            <Table.Head>
                                <Table.HeadCell>Full Name</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Phone</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="bg-white dark:bg-gray-800">
                                {searchUser().map((item: TUser) => (
                                    <Table.Row key={item._id} onClick={() => handleUserClick(item)} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <Table.Cell>{item.name.first} {item.name.last}</Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>{item.phone}</Table.Cell>
                                        <Table.Cell>{item.isBusiness ? 'Business' : 'Regular'}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>





                        {selectedUser && (
                            <Modal
                                show={showModal}
                                onClose={closeModal}
                            >
                                <Modal.Header>
                                    {selectedUser.name.first} {selectedUser.name.last} - Details
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="space-y-4">
                                        <p><strong>Email:</strong> {selectedUser.email}</p>
                                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                                        <p><strong>Address:</strong> {selectedUser.address?.street}, {selectedUser.address?.city}</p>
                                        <p><strong>Status:</strong> {selectedUser.isBusiness ? 'Business' : 'Regular'}</p>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="flex gap-3">
                                    <button
                                        onClick={(EditStatus)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={DeleteUser}
                                        className="text-red-600 hover:text-bred-800 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        )}




                        <div className="flex flex-col w-full gap-4 lg:hidden">
                            {users.map((item: TUser) => (
                                <div key={item._id} onClick={() => handleUserClick(item)} className="p-4 bg-white rounded-lg shadow-lg cursor-pointer dark:bg-gray-800">
                                    <p className="text-lg font-bold">{item.name.first} {item.name.last}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Email: {item.email}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Phone: {item.phone}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(EditStatus)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={DeleteUser}
                                            className="text-red-600 hover:text-bred-800 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div >
        </>
    );
};

export default CRM;
