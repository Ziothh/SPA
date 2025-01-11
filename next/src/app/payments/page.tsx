import { columns } from "./columns";
import { PAYMENTS } from "./data";
import { DataTable } from "~/components/DataTable";

const Page: React.FC = (_props) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={PAYMENTS} />
        </div>
    );
};

export default Page;
