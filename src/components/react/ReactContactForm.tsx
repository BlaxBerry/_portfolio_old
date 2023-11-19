import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { sendMailByEmailjs } from "@libs/emailJS";
import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import type { ContactFormValue } from "src/types/contact";

function ReactContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValue>();

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<"SUCCESS" | "FAILED">();

  const onSubmit = useCallback(
    (formData: ContactFormValue): void => {
      setLoading(true);
      sendMailByEmailjs(formData)
        .then((res) => {
          if (res.status === 200) {
            setResult("SUCCESS");
          }
        })
        .catch(() => {
          setResult("FAILED");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          setLoading(false);
        });
    },
    [setLoading],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Typography variant="h1" className="mb-5 text-white">
        Contact Me
      </Typography>

      {/* emailAddress */}
      <div className="mb-5">
        <Input
          {...register("emailAddress", {
            required: "Required",
            pattern: {
              value: /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/,
              message: "Invalid Email address",
            },
          })}
          error={Boolean(errors.userName)}
          disabled={loading}
          label="Email Address"
          autoComplete="off"
          color="blue-gray"
          className="!border-2 text-white"
          labelProps={{ className: "!text-white !font-bold" }}
          crossOrigin={undefined}
        />
        <Typography variant="small" className="h-5 font-bold text-red-500">
          {errors.emailAddress?.message || " "}
        </Typography>
      </div>

      {/* userName */}
      <div className="mb-5">
        <Input
          {...register("userName", {
            required: "Required",
            minLength: {
              value: 6,
              message: "Cannot exceed 6 characters",
            },
            pattern: {
              value:
                /^[\u4e00-\u9fff\u3400-\u4dbf\u0041-\u005a\u0061-\u007a\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+$/i,
              message: "Only Alphabets、Chinese、Japanese、Korean characters",
            },
          })}
          error={Boolean(errors.userName)}
          disabled={loading}
          label="User Name"
          autoComplete="off"
          color="blue-gray"
          className="!border-2 text-white"
          labelProps={{ className: "!text-white !font-bold" }}
          crossOrigin={undefined}
        />
        <Typography variant="small" className="h-5 font-bold text-red-500">
          {errors.userName?.message || " "}
        </Typography>
      </div>

      {/* contactMessage */}
      <div className="mb-5">
        <Textarea
          {...register("contactMessage", {
            required: "Required",
            minLength: {
              value: 20,
              message: "Cannot exceed 20 characters",
            },
          })}
          error={Boolean(errors.contactMessage)}
          disabled={loading}
          label="Contact Message"
          rows={6}
          size="lg"
          color="blue-gray"
          className="!border-2 text-white"
          labelProps={{ className: "!text-white !font-bold" }}
        />
        <Typography variant="small" className="h-5 font-bold text-red-500">
          {errors.contactMessage?.message || " "}
        </Typography>
      </div>

      <div className=" h-10 text-white">
        {loading && (
          <div className="flex items-center justify-center space-x-4 ">
            <Spinner className="mr-4" />
            Loading...
          </div>
        )}

        {!loading && (
          <>
            {!Boolean(result) && (
              <div className="space-x-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-cyan-500"
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  className="bg-gradient-to-r from-red-500 to-pink-300"
                  onClick={() => reset()}
                >
                  reset
                </Button>
              </div>
            )}

            {result === "SUCCESS" && (
              <p className="flex items-center justify-center text-lg font-bold text-green-400">
                Sent Successfully, Thanks for your Message
              </p>
            )}

            {result === "FAILED" && (
              <p className="flex items-center justify-center text-lg font-bold text-red-400">
                Something Went Wrong, Try Again Later
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
}

export default ReactContactForm;
