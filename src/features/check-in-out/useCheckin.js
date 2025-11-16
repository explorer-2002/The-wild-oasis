import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
        mutationFn: ({ bookingId }) => updateBooking(bookingId, {
            status: "confirmed", isPaid: true,
        }),

        onSuccess: (data) => {
            toast.success(`Bokking no. ${data.id} successfully checked in`)
            queryClient.invalidateQueries({
                active: true
            })

            navigate("/")
        },

        onError: () => {
            toast.error("There was an error while checking in")
        }
    })

    return { checkin, isCheckinIn }
}