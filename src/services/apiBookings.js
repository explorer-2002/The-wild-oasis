// import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// sortBy, page
export async function getBookings(filter, page) {
  console.log("Filter: ", filter);
  // let query = supabase.from('bookings')
  //   .select("*,cabins(name), guests(fullName, email)", { count: "exact" })

  const queryParams = new URLSearchParams();

  if(filter){
    queryParams.append(filter.field, filter.value);
  }
  // if (filter)
  //   query = query.eq(filter.field, filter.value)

  // if (sortBy) {
  //   query = query.order(sortBy.field, {
  //     ascending: (sortBy.direction === "asc")
  //   })
  // }

  if (page) {
    // const from = (page - 1) * PAGE_SIZE;
    // const to = page * PAGE_SIZE - 1;
    // query = query.range(from, to)
    queryParams.append("page", page);
  }

  // const { data, error, count } = await query;

  // if (error) {
  //   console.error(error);
  //   throw new Error("Bookings could not be loaded")
  // }

  console.log("Query Params: ", queryParams.toString());

  const result = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/bookings?${queryParams}`, {
    method: 'GET'
  });

  const data = await result.json();
  const bookings = data?.data || [];
  console.log("Bookings: ", bookings);
  
  return { bookings, count: bookings.length };
}

export async function getBooking(id) {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("*, cabins(*), guests(*)")
  //   .eq("id", id)
  //   .single();

  // if (error) {
  //   console.error(error);
  //   throw new Error("Booking not found");
  // }

  const data = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/bookings/${id}`, {
    method: 'GET'
  });

  const result = await data.json();

  return result?.data || {};
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function createBooking({ newBooking }) {
  console.log("newBooking: ", newBooking);
  let data;

  try {
    const result = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newBooking)
    });

    if (!result.ok) {
      // If not, get the error message from the body and throw an error
      const errorData = await result.json();
      throw new Error(errorData.message || `HTTP error! status: ${result.status}`);
    }

    data = await result.json();
  } catch (error) {
    console.log("Error: ", error);
  }

  return data || [];
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  // const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  // if (error) {
  //   console.error(error);
  //   throw new Error("Booking could not be deleted");
  // }
  // return data;
  const result = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/bookings/${id}`, {
    method: 'DELETE'
  });

  const deletedData = await result.json();
  return deletedData;
}
