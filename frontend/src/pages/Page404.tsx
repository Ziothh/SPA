const Page404: React.FC = () => {
    return (
        <div className="flex-center" style={{
            height: "100vh",
            maxHeight: "100%",
            flexDirection: "column",
        }}>
            <h1 style={{
                color: "var(--clr-primary)",
                fontSize: "6rem"
            }}>404</h1>
            <h2 style={{
                fontSize: "4rem"
            }}>Page not found</h2>

            <a href="/" className="btn btn-primary" style={{
                marginTop: 20,
                fontSize: "2rem",
            }}>Go to Dashboard</a>
        </div>
    )
}


export default Page404