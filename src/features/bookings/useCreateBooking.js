import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBooking as createBookingApi} from "../../services/apiBookings"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export function useCreateBooking(){


const navigate = useNavigate()
const queryClient = useQueryClient()



const {isLoading:isCreating, mutate:createBooking}  = useMutation({
  mutationFn: createBookingApi,
  onSuccess:() => {

    queryClient.invalidateQueries({
      queryKey:['bookings'],
    })

    toast.success("Booking successfully created")
    navigate(-1)
  },
  onError:(err) => toast.error(err.message)
})

return {isCreating, createBooking}
}