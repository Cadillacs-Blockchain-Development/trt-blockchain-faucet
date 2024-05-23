"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

type Props = {
  message: string;
};

export default function SuccessModal(props: Props) {
  const { message } = props;
  const [msg, setMsg] = useState(message);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  console.log(process.env.NEXT_PUBLIC_EXPLORER_URL);

  const router = useRouter();
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Transaction Successful
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-700 text-center break-words">
                  {message.slice(0, 10) + "..." + message.slice(-10)}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction className="mt-4 md:mt-0">
              <div
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/` + message,
                    "_blank"
                  )
                }
              >
                View on explorer
              </div>
            </AlertDialogAction>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
