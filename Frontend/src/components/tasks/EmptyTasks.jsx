import { ClipboardList } from "lucide-react";

const EmptyTasks = () => {

    return (

        <div
            className="
            bg-white
            rounded-3xl
            border
            p-24
            text-center
            mt-10
            "
        >

            <ClipboardList
                size={70}
                className="mx-auto text-gray-300"
            />

            <h2 className="text-3xl mt-8 font-semibold">

                No Tasks Yet

            </h2>

            <p className="text-gray-500 mt-4">

                Create your first task to start being productive.

            </p>

        </div>

    );

};

export default EmptyTasks;