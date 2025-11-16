import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'


import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
// import { Img } from "../../ui/Img";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    _id: bookingId,
    // created_at,
    checkInDate,
    checkOutDate,
    numberOfNights,
    roomId,
    // numGuests,
    totalPrice,
    status,
    guestName,
    guestEmail
  },
}) {

  console.log("Booking in Row: ", bookingId, roomId, guestName);

  const navigate = useNavigate();

  const { isDeleting, deleteBooking } = useDeleteBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const statusToTagName = {
    "pending": "blue",
    "completed": "green",
    "cancelled": "red",
    "confirmed": "silver"
  };

  return (
    <Table.Row>
      <Cabin>
        {roomId?.roomNumber}
      </Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(checkInDate))
            ? "Today"
            : formatDistanceFromNow(checkInDate)}{" "}
          &rarr; {numberOfNights} night stay
        </span>
        <span>
          {format(new Date(checkInDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(checkOutDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye />} onClick={() => navigate(`${bookingId}`)}>
              See details
            </Menus.Button>

            {status === "unconfirmed" &&
              <Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Menus.Button>
            }

            {status === "checked-in" &&
              <Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut} >
                Check out
              </Menus.Button>
            }

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>
                Delete booking
              </Menus.Button>
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(bookingId)} disabled={isDeleting} />
            </Modal.Window>

          </Menus.List>
        </Menus.Menu>
      </Modal>
    
    </Table.Row>
  );
}

export default BookingRow;
