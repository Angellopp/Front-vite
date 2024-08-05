"use client";

import { Card, Kbd } from "flowbite-react";
import useActivityEmail from "../../hooks/activitiesEmail/useActivityEmail";
import CardAct from "./CardAct";
import Loading from "../indicators/Loading";
export default function CardsActivity() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { data: activityEmails, isLoading: isLoadingActivities } = useActivityEmail("mail.activity","search_read",[[["user_id","=",user.id]], []]);
  // const { data: activityEmails, isLoading: isLoadingActivities } =
    useActivityEmail("mail.activity", "search_read", [[], []]);
  if (isLoadingActivities) {
    return (
      <>
        <Card className="min-h-2">
          <Loading />
        </Card>
      </>
    );
  }
  return (
    <>
      {activityEmails && activityEmails.length > 0 ? (
        <div className="text text-center text-xl dark:text-white">
          Hay <Kbd>{activityEmails.length}</Kbd> notificaciones
        </div>
      ) : (
        <div />
      )}
      <div className="grid gap-12 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto shadow-md sm:rounded-lg">
        {activityEmails && activityEmails.length > 0 ? (
          activityEmails.map((email) => (
            <div className="text text-center" key={email.id}>
              <CardAct email={email} />
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
