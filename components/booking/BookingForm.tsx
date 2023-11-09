import { Dialog } from "@headlessui/react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import type { Dispatch, FormEvent } from "react";

import Modal from "../Modal";
import Spinner from "../Spinner";
import type { ActionType } from "context/AvailabilityContext";
import { useProvider } from "context/AvailabilityContext";
import { formatLocalDate, formatLocalTime } from "lib/availability/helpers";

const locations = [
  {
    name: "Google Meet",
    value: "meet",
  },
];

export default function BookingForm() {
  const {
    state: { modal, selectedTime, timeZone, duration, programName, priceId, productId},
    dispatch,
  } = useProvider();
  const router = useRouter();
  if (!selectedTime || !timeZone) {
    return <></>;
  }
  const dateString = formatLocalDate(selectedTime.start, { timeZone });
  const startString = formatLocalTime(selectedTime.start, { timeZone });
  const endString = formatLocalTime(selectedTime.end, {
    timeZone,
    timeZoneName: "shortGeneric",
  });

  return (
    <Modal
      open={modal !== "closed"}
      setOpen={(open) => {
        dispatch({ type: "SET_MODAL", payload: open ? "open" : "closed" });
      }}
    >
      <form
        className="mt-3 sm:mt-0 sm:ml-4"
        action={`/api/purchase?productId=${productId}&priceId=${priceId}`}
        method="POST"
      >
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900"
        >
          Request appointment
        </Dialog.Title>

        <input
          type="hidden"
          name="start"
          value={selectedTime.start.toISOString()}
        />
        <input
          type="hidden"
          name="end"
          value={selectedTime.end.toISOString()}
        />
        <input type="hidden" name="duration" value={duration} />
        <input type="hidden" name="timeZone" value={timeZone} />

        <div className="border-l-4 border-l-accent-200 bg-accent-50/30 p-3 mt-3 mb-4 rounded-md">
          <p className="text-sm md:text-base font-semibold text-accent-800">
            {programName}
          </p>
          <p className="text-sm md:text-base text-accent-800">{dateString}</p>
          <p className="text-sm md:text-base text-accent-800">
            {startString} - {endString}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="isolate -space-y-px rounded-md shadow-sm">
            <div className="relative rounded-md rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900"
              >
                Name
              </label>
              <input
                aria-label="Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                required
                aria-required
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Jane Smith"
              />
            </div>
            <div className="relative  px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                aria-label="Email"
                required
                aria-required
                type="email"
                name="email"
                id="email"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="jsmith@gmail.com"
              />
            </div>
            <div className="relative rounded-md rounded-t-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="comments"
                className="block text-xs font-medium text-gray-900"
              >
                Comments
              </label>
              <input
                aria-label="Comments"
                type="comments"
                name="comments"
                id="comments"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Any questions or concerns?"
              />
            </div>
          </div>
          <div className="hidden">
            <p className="text-sm font-medium">How would you like to meet?</p>
            <fieldset className="mt-2">
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                {locations.map((location) => (
                  <div key={location.value} className="flex items-center">
                    <input
                      id={location.value}
                      aria-label={location.name}
                      name="location"
                      type="radio"
                      value={location.value}
                      defaultChecked={location.value === locations[0].value}
                      className="h-4 w-4 border-gray-300 text-accent-600 focus:ring-accent-600"
                    />
                    <label
                      htmlFor={location.value}
                      className="ml-1.5 block text-sm leading-6 text-gray-800">
                      {location.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <div className="hidden">
            <fieldset className="mt-2">
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
              <div key={programName} className="flex items-center">
                    <input
                      id={programName}
                      aria-label={programName}
                      name="programName"
                      type="text"
                      value={programName}
                      className="h-4 w-4 border-gray-300 text-accent-600 focus:ring-accent-600"
                    />
                  </div>
              </div>
            </fieldset>
        </div>
        {modal === "error" && (
          <div className="bg-red-50 text-red-600">
            There was an error submitting your request.
          </div>
        )}
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            disabled={modal === "busy"}
            className="inline-flex w-full justify-center rounded-md bg-highlight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto disabled:opacity-50"
          >
            {modal === "busy" ? (
              <>
                Submitting ... <Spinner className="ml-2" />
              </>
            ) : (
              <>Next</>
            )}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch({ type: "SET_MODAL", payload: "closed" });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

const createAccount = async () => {
  // "use server";

  const data = await fetch(
    `/api/purchase?productId=prod_OwkFBCxkcLNnco&priceId=price_1O8qkoEqnc7ZXyoyNRA2Y2mL`,
    {
      method: "POST",
      // redirect: "manual",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
    }
  );

  // const name = formData.get("name");
  // const email = formData.get("email");
  // const password = formData.get("password");

  // Validate the form data and save it to the database

  // console.log({ name, email, password });
};

/**
 *
 * Handles form submissions by intercepting the native event,
 * passing params to the `/book` endpoint, and redirecting
 * upon success (or showing a failure message).
 *
 */



async function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  dispatch: Dispatch<ActionType>,
  router: AppRouterInstance
) {
  event.preventDefault();
  //save things to local storage
  window.localStorage.setItem(
    "scheduleInfo",
    JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))
  );
  // dispatch({ type: "SET_MODAL", payload: "busy" })

  try {
    console.log("lol");
    await createAccount();
    // if (data.redirected) {
      // console.log(data.response.json());
      // window.location.href = data.url;
    // }
  } catch (e) {
    dispatch({ type: "SET_MODAL", payload: "error" });
    
  }
  // .then(async (data) => {
  //   const json = await data.json()
  //   if (json.success) {
  //     router.push("/confirmation")
  //   } else {
  //     dispatch({ type: "SET_MODAL", payload: "error" })
  //   }
  // })
  // .catch(() => {
  //   dispatch({ type: "SET_MODAL", payload: "error" })
  // })

  // fetch(`/api/request`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
  // })
  //   .then(async (data) => {
  //     const json = await data.json()
  //     if (json.success) {
  //       router.push("/confirmation")
  //     } else {
  //       dispatch({ type: "SET_MODAL", payload: "error" })
  //     }
  //   })
  //   .catch(() => {
  //     dispatch({ type: "SET_MODAL", payload: "error" })
  //   })
}
