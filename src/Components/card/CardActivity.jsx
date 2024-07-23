"use client";

import { Card, Kbd, Toast } from "flowbite-react";
import useActivityEmail from "../../hooks/activitiesEmail/useActivityEmail";
import { BiCalendarExclamation } from "react-icons/bi";

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
          Hay <Kbd>{activityEmails.length}</Kbd> notificaciones
        </div>
      ) : (
        <div />
      )}
      <div className="grid gap-12 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto shadow-md sm:rounded-lg">
        {activityEmails && activityEmails.length > 0 ? (
          activityEmails.map((email) => (
            <div className="text text-center" key={email.id}>
              <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {email.res_name}
                </h5>
                <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {email.activity_type_id[1]}
                </h6>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {email.note}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {email.display_name}
                </p>
                <Toast className="bg-red-100 dark:bg-red-900">
                  <BiCalendarExclamation className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
                  <div className="pl-4 text-sm font-normal">
                    {email.date_deadline}
                  </div>
                </Toast>
              </Card>
            </div>
          ))
        ) : (
          <div>
            <div className="text text-center text-3xl">
              <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  No hay notificaciones
                </h5>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
