import { useRouteError , Link } from "react-router-dom";
export default function Component() {
    const error = useRouteError();
    return (<>
        <div>
            <h1>404 Not Found</h1>
            <p>{error.statusText || error.message} </p>
            <Link to="/" >Go Home</Link>
        </div>
    </>);
}