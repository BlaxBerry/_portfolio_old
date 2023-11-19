import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendMailByEmailjs } from "@libs/emailJS";
import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useStore } from "@nanostores/react";
import { $store } from "@store/index";
import { DEFAULT_LANGUAGE, TRANSLATIONS } from "src/constants";
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

  const { language } = useStore($store);

  useEffect(() => {
    if (!language) $store.setKey("language", DEFAULT_LANGUAGE);
  }, [language]);

  const message = TRANSLATIONS[language]?.pages?.contact;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Typography variant="h1" className="mb-10 text-white">
        {message?.title ?? "..."}
      </Typography>

      {/* emailAddress */}
      <div className="mb-5">
        <Input
          {...register("emailAddress", {
            required: message?.form?.emailAddress?.errorRequired,
            pattern: {
              value: /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/,
              message: message?.form?.emailAddress?.errorPattern,
            },
          })}
          error={Boolean(errors.userName)}
          disabled={loading}
          label={message?.form?.emailAddress?.label}
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
            required: message?.form?.userName?.errorRequired,
            pattern: {
              value:
                /^[\u4e00-\u9fff\u3400-\u4dbf\u0041-\u005a\u0061-\u007a\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+$/i,
              message: message?.form?.userName?.errorPattern,
            },
            minLength: {
              value: 6,
              message: message?.form?.userName?.errorLength,
            },
          })}
          error={Boolean(errors.userName)}
          disabled={loading}
          label={message?.form?.userName?.label}
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
            required: message?.form?.contentMessage?.errorRequired,
            minLength: {
              value: 20,
              message: message?.form?.contentMessage?.errorLength,
            },
          })}
          error={Boolean(errors.contactMessage)}
          disabled={loading}
          label={message?.form?.contentMessage?.label}
          rows={6}
          size="lg"
          color="blue-gray"
          className="!border-2 text-white"
          labelProps={{ className: "!text-white !font-bold" }}
        />
        <Typography variant="small" className="h-5 font-bold text-red-500">
          {errors.contactMessage?.message ?? " "}
        </Typography>
      </div>

      <div className=" h-10 text-white">
        {loading && (
          <div className="flex items-center justify-center space-x-4 ">
            <Spinner className="mr-4" />
            {message?.messages?.loading}
          </div>
        )}

        {!loading && (
          <>
            {!Boolean(result) && (
              <div className="space-x-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-cyan-500"
                  style={{ minWidth: 100 }}
                >
                  {message?.buttons?.submit ?? "..."}
                </Button>
                <Button
                  type="reset"
                  className="bg-gradient-to-r from-red-500 to-pink-300"
                  style={{ minWidth: 100 }}
                  onClick={() => reset()}
                >
                  {message?.buttons?.reset ?? "..."}
                </Button>
              </div>
            )}

            {result === "SUCCESS" && (
              <p className="flex items-center justify-center text-lg font-bold text-green-400">
                {message?.messages?.success ?? "..."}
              </p>
            )}

            {result === "FAILED" && (
              <p className="flex items-center justify-center text-lg font-bold text-red-400">
                {message?.messages?.failed ?? "..."}
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
}

export default ReactContactForm;
