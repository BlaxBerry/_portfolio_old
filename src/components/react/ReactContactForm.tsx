import { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { sendMailByEmailjs } from "@libs/emailJS";
import { Button, Typography } from "@material-tailwind/react";

// interface ContactFormValue extends Record<string, unknown> {
//   userName: string;
//   emailAddress: string;
//   contactMessage: string;
// }

function ReactContactForm() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="mb-5">
        <Typography variant="h6" className="mb-3">
          Email Address
        </Typography>
        <input className="block w-full rounded-md px-2 py-2 ring-1 ring-inset ring-gray-300" />
      </div>

      <div className="mb-5">
        <Typography variant="h6" className="mb-3">
          User Name
        </Typography>
        <input className="block w-full rounded-md px-2 py-2 ring-1 ring-inset ring-gray-300" />
      </div>

      <div className="mb-5">
        <Typography variant="h6" className="mb-3">
          Contact Message
        </Typography>
        <textarea
          rows={10}
          className="block w-full resize-none rounded-md px-2 py-2 ring-1 ring-inset ring-gray-300"
        />
      </div>

      <div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default ReactContactForm;
