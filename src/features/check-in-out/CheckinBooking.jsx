import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
import {useBooking} from '../bookings/useBooking'
import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import {useSettings} from '../settings/useSettings';


const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  const {settings = {}, isLoadingSettings } = useSettings()
  const {booking={}, isLoading} = useBooking()


  useEffect(() => {
      setConfirmPaid(booking?.isPaid || false)
  },[booking?.isPaid])

  const moveBack = useMoveBack();
  const {checkin, isCheckingIn} = useCheckin()

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
  
  function handleCheckin() {
      if(!confirmPaid)return;

      if(addBreakfast)
        checkin({bookingId, breakfast:{
            hasBreakfast:true,
            extrasPrice:optionalBreakfastPrice,
            totalPrice:totalPrice + optionalBreakfastPrice
            }})

      else
      checkin({bookingId, breakfast:{}})
  }

  if(isLoading || isLoadingSettings)
    return <Spinner />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {hasBreakfast && 
      <Box>
        <Checkbox checked={addBreakfast} id="breakfast" onChange={() => {
          setAddBreakfast(add => !add);
          setConfirmPaid(false)
        }} >
          Want to add breakfast for X ? 
        </Checkbox>
      </Box>
      }

      <Box>
        <Checkbox checked={confirmPaid} id="confirm" onChange={() => setConfirmPaid(paid => !paid)} disabled={confirmPaid === true || isCheckingIn}>
          I confirm that {guests.fullName} has payed the total amount of {!addBreakfast ? 
          formatCurrency(totalPrice) : 
          `${(formatCurrency(totalPrice) + formatCurrency(optionalBreakfastPrice))} 
          ${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)}`
        }
        </Checkbox>
      </Box>

      

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
