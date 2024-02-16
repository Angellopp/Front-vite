import { useNavigate } from "react-router-dom";

const Home = ({ loggedIn, setLoggedIn }) => {

    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    const goDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Bienvenido!</div>
            </div>
            <div>
                Esta es la home page.
            </div>
            {loggedIn ?
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={goDashboard}
                        value="Ir al Dashboard" />
                </div> : <div />
            }
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? "Log out" : "Log in"} />
                {(loggedIn ? <div>
                    Estas logeado
                </div> : <div />)}
            </div>
        </div>
    )
}

export default Home
