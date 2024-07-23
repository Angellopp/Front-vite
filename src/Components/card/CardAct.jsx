import { Card, Toast } from "flowbite-react";
import { BiCalendarExclamation, BiArrowFromLeft } from "react-icons/bi";
import PropTypes from "prop-types";
export default function CardAct({ email }) {
  return (
    <Card className="max-w-sm">
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
      <Toast className="bg-red-100 dark:bg-red-900">
        <BiCalendarExclamation className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
        <div className="pl-4 text-sm font-normal">{email.date_deadline}</div>
      </Toast>
    </Card>
  );
}

CardAct.propTypes = {
  email: PropTypes.object.isRequired,
};
