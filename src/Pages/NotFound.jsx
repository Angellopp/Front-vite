import { useRouteError, Link } from "react-router-dom";
export default function Component() {
    const error = useRouteError();
    return (
        <div className="container mx-auto w-full text-center mt-20 mb-20">
            <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg className="w-10 h-10 text-gray-800 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 17v-2h1a1 1 0 0 0 0-2h-1a6 6 0 0 0-.4-1H17a2 2 0 0 0 2-2V8a1 1 0 0 0-2 0v2h-.5l-.5-.5V8a4 4 0 0 0-1-2.6l.7-.7c.2-.2.3-.4.3-.7V3a1 1 0 0 0-2 0v.6l-.7.6c-.8-.3-1.8-.3-2.6 0l-.7-.6V3a1 1 0 0 0-2 0v1c0 .3.1.5.3.7l.7.7A4 4 0 0 0 8 8v1.5l-.5.5H7V8a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h-.7a6 6 0 0 0-.2 1H5a1 1 0 0 0 0 2h1v2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h.8a6 6 0 0 0 4.2 3V12a1 1 0 0 1 2 0v10a6 6 0 0 0 4.2-3h.8v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2Zm-4-8.7a5.5 5.5 0 0 0-3-.3v.1a6 6 0 0 0-1 .3V8a2 2 0 1 1 4 0v.3Z"/>
                </svg>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Oops! 404</h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{error.statusText }{error.message ? ": " + error.message : ""} </p>
                <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                    <Link to="/" >Go Home</Link>
                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}