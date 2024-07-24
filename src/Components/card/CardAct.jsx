import { Card, Toast } from "flowbite-react";
import { BiCalendarExclamation, BiArrowFromLeft } from "react-icons/bi";
import PropTypes from "prop-types";
export default function CardAct({ email }) {
  const dateString = email.date_deadline;
  const date = new Date(dateString);
  var today = new Date();
  var dateFormat = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  var status = "";
  var color = "";
  if (date < today) {
    status = "VENCIDO: ";
    color += "red";
  }
  else if(date == today){
    status = "VENCE HOY: ";
    color = "yellow";
  }
  else {
    status = "VENCE EN: ";
    color = "green";
  }
  return (
    <Card className="max-w-sm h-full">
      <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {email.activity_type_id[1]}
        <br/>
        {email.res_name}
      </h6>
      <div className="font-normal text-gray-700 dark:text-gray-400 text-left">
        <p dangerouslySetInnerHTML={{__html: email.note}} />
      </div>
      <Toast className="bg-cyan-100 dark:bg-cyan-900">
        <BiArrowFromLeft className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
        <div className="pl-4 text-sm font-normal">{email.display_name}</div>
      </Toast>
      <Toast className={`bg-${color}-100 dark:bg-${color}-900`}>
        <BiCalendarExclamation className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
        <div className="pl-4 text-sm font-normal">
          {status+dateFormat}
        </div>
      </Toast>
    </Card>
  );
}

CardAct.propTypes = {
  email: PropTypes.object.isRequired,
};
