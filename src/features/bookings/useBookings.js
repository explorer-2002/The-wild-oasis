import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
// import { PAGE_SIZE } from "../../utils/constants"


export function useBookings(){
    // const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get("status")
    const filter = !filterValue || filterValue === "all" ? null : {field:"status", value:filterValue}

    // const sortByRow = searchParams.get('sortBy') || "startDate-desc"
    // const [field,  direction] = sortByRow.split("-")
    // const sortBy = {field, direction}

    // const page = !searchParams.get("page") ? 1:Number(searchParams.get("page"))

    console.log("Filter in useBookings: ", filter);

    const {isLoading, data , error} = useQuery({
        queryKey:['bookings', filter],
        queryFn:() => getBookings(filter),
      })

      // const pageCount = Math.ceil(count/PAGE_SIZE)

    //   if(page < pageCount){
    //   queryClient.prefetchQuery({
    //     queryKey:['bookings', filter, sortBy, page+1],
    //     queryFn:() => getBookings(filter, sortBy, page+1),
    //   })
    // }

    // if(page > 1){
    //   queryClient.prefetchQuery({
    //     queryKey:['bookings', filter, sortBy, page-1],
    //     queryFn:() => getBookings(filter, sortBy, page-1),
    //   })
    // }
      const bookings = data?.bookings || [];
      const count = data?.count || 0;

      console.log("Bookings in useBookings: ", bookings);
      console.log("Count in useBookings: ", count);

      return {isLoading, bookings, error, count}
}