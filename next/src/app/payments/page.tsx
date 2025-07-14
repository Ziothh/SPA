import { DataTable } from "~/components/DataTable";
import { columns } from "./columns";
import { PAYMENTS } from "./data";

const Page: React.FC = (_props) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={PAYMENTS} searchable="email" />
        </div>
    );
};

export default Page;
