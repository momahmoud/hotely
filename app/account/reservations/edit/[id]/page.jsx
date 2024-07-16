import { getBooking, getCabin } from "@/app/_lib/data-service";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";

export default async function Page({ params }) {
  const reservationId = params.id;
  const reservation = await getBooking(reservationId);
  const cabin = await getCabin(reservation.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm
        reservationId={reservationId}
        reservation={reservation}
        maxCapacity={cabin.maxCapacity}
      />
    </div>
  );
}
