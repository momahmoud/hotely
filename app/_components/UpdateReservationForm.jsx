"use client";
import { useFormStatus } from "react-dom";

import { updateBookingAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function UpdateReservationForm({ reservationId, reservation, maxCapacity }) {
  const { numGuests, observations } = reservation || {};

  return (
    <form
      action={updateBookingAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input type="hidden" name="id" value={reservationId} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          defaultValue={numGuests}
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          defaultValue={observations}
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>
      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? <SpinnerMini /> : "Update reservation"}
    </button>
  );
}

export default UpdateReservationForm;
