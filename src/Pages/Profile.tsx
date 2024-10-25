import { useSelector } from "react-redux";
import { TRootState } from "../Store/BigPie";
import { Card } from "flowbite-react";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);

    return (
        <Card>
            <main className="min-h-[90vh] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="h-[80vh] flex flex-col gap-4 items-center">
                    <Card className="bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <img
                            className="m-auto h-60"
                            src={user?.image.url}
                            alt={user?.image.alt}
                        />
                        <div className="p-4">
                            <p className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                                Name: {user?.name.first} {user?.name.last}
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-400">
                                Phone Number: {user?.phone}
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-400">
                                Email: {user?.email}
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-400">
                                Address: {user?.address.country}, {user?.address.city}, {user?.address.street} {user?.address.houseNumber}
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-400">
                                Zip: {user?.address.zip}
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-400">
                                Status: {user?.isBusiness ? 'Business' : 'Regular'}
                            </p>
                        </div>
                    </Card>

                </div>
            </main>
        </Card>
    );
};

export default Profile;
