import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi} from "../../services/apiBookings"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export function useDeleteBooking(){


const navigate = useNavigate()
const queryClient = useQueryClient()



const {isLoading:isDeleting, mutate:deleteBooking}  = useMutation({
  mutationFn: (bookingId) => deleteBookingApi(bookingId),
  onSuccess:() => {

    queryClient.invalidateQueries({
      queryKey:['bookings'],
    })

    toast.success("Booking successfully deleted")
    navigate(-1)
  },
  onError:(err) => toast.error(err.message)
})

return {isDeleting, deleteBooking}
}