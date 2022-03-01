import Grid from "@components/Grid"
import PageHeader from "@components/PageHeader"
import { Link } from "react-router-dom"

const Dashboard: React.FC = () => {
    return (
        <>
            <PageHeader title="Dashboard"/>
            <Grid>
                <div>
                    <h2>Expense tracker</h2>
                    <button className="btn btn-primary">
                        <Link to={"/expense"}>To expense tracker</Link>
                    </button>
                </div>
                <h2>Section 2</h2>
                <h2>Section 3</h2>
                <h2>Section 4</h2>
            </Grid>
        </>
    )
}


export default Dashboard