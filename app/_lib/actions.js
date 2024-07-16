"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not signed in");
  }
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID)) {
    throw new Error("Invalid national ID");
  }

  const updatedFields = {
    nationality,
    countryFlag,
    nationalID,
  };

  await updateGuest(session?.user?.guestId, updatedFields);
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(id) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not signed in");
  }
  const guestBooking = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBooking.map((booking) => booking.id);
  if (!guestBookingIds.includes(id)) {
    throw new Error("You do not have permission to delete this reservation");
  }
  await deleteBooking(id);

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const id = Number(formData.get("id"));
  const session = await auth();
  if (!session) {
    throw new Error("You are not signed in");
  }
  const guestBooking = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBooking.map((booking) => booking.id);
  if (!guestBookingIds.includes(id)) {
    throw new Error("You do not have permission to update this reservation");
  }

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const updatedFields = {
    numGuests,
    observations,
  };

  await updateBooking(id, updatedFields);
  revalidatePath("/account/reservations");
  revalidatePath("/account/reservations/edit/" + id);

  redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not signed in");
  }

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const newReservation = {
    ...bookingData,
    guestId: session?.user?.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };
  await createBooking(newReservation);
  // revalidatePath("/account/reservations");
  revalidatePath("/cabins/" + bookingData.cabinId);
  redirect("/cabins/thankyou");
}
