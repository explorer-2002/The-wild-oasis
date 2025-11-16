import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers'
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

// import { IoDuplicateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
// import Menus from "../../ui/Menus";
import ReactModal from 'react-modal';
import { useState } from "react";
import '../../styles/index.css'
import CreateBookingForm from "../bookings/CreateBookingForm";
import { Img } from "../../ui/Img";
// import Button from "../../ui/Button";
// const TableRow = styled.div
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// ;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

/*eslint-disable*/

function CabinRow({ cabin }) {
  const { _id: cabinId, name, capacity, price, maxGuests, image } = cabin;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };


  // const [showForm, setShowForm] = useState(false)

  const { isDeleting, deleteCabin } = useDeleteCabin()

  const { createCabin, isCreating } = useCreateCabin()
  if (isDeleting)
    return <p>Deleting the cabin...</p>
  // function handleDuplicate(){
  //   createCabin({
  //     name:`Copy of ${name}`,
  //     maxCapacity,
  //     regularPrice,
  //     discount,
  //     image,
  //     description
  //   })
  // }

  return (
    <>
      <Table.Row>
        <Img src={image} onClick={() => openModal(image)} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxGuests} guests</div>
        <Price>{formatCurrency(price)}</Price>
        <div>
          {/* <button onClick={() => handleDuplicate()}><IoDuplicateOutline /></button> */}

          <Modal>
            <Modal.Open opens="delete" >
              <button style={{ position: 'relative', top: '1px' }}><RiDeleteBin6Line color="blue" /></button>
            </Modal.Open>

            <Modal.Window name="delete" >
              <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
            </Modal.Window>

            <Modal.Open opens="edit">
              <button style={{ position: 'relative', top: '1px' }}><MdOutlineEdit color="green" /></button>
            </Modal.Open>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="booking">
              <button style={{ position: 'relative', top: '1px' }}><LuHotel color="green" /></button>
            </Modal.Open>

            <Modal.Window name="booking">
              <CreateBookingForm cabin={cabin} />
            </Modal.Window>
          </Modal>

          {/* <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId} >
              <Menus.Button icon={<IoDuplicateOutline />} onClick={() => { }}>Duplicate</Menus.Button>
              <Menus.Button icon={<MdOutlineEdit />}>Edit</Menus.Button>
              <Menus.Button icon={<RiDeleteBin6Line />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu> */}
        </div>
      </Table.Row>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cabin Image"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-button">&times;</button>
        {selectedImage && <img src={selectedImage} alt="Enlarged cabin" className="modal-image" />}
      </ReactModal>
    </>

  )

}

export default CabinRow;