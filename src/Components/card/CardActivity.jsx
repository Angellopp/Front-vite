"use client";

import { Card, Kbd } from "flowbite-react";
import useActivityEmail from "../../hooks/activitiesEmail/useActivityEmail";

export default function CardsActivity() {
  const { data: activityEmails } = useActivityEmail(
    "mail.activity",
    "search_read",
    [[], []]
  );
  // const user = JSON.parse(localStorage.getItem("user")) || {};
  // const { data: activityEmails } = useActivityEmail("mail.activity","search_read",[[["user_id","=",user.id]], []]);
  return (
    <>
      {activityEmails && activityEmails.length > 0 ? (
        <div className="text text-center text-xl dark:text-white">
          Hay{" "}
            <Kbd>{activityEmails.length}</Kbd>
          {" "}
          notificaciones
        </div>
      ) : (
        <div />
      )}
      <Card href="#" className="max-w-sm">
        {/* // <div>
                //     <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto">

                //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                //     <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                //     </a>
                // </div>
                // : <div/> */}
        {activityEmails && activityEmails.length > 0 ? (
          activityEmails.map((email) => (
            <div className="text text-center text-3xl" key={email.id}>
              <div className="text text-center text-3xl">
                {" "}
                {email.res_name}{" "}
              </div>
              <div className="text text-center text-3xl">
                {" "}
                {email.display_name}{" "}
              </div>
              Deadline: {email.date_deadline}
            </div>
          ))
        ) : (
          <div />
        )}
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Card>
    </>
  );
}
