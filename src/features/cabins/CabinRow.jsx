import styled from "styled-components";
import {formatCurrency} from '../../utils/helpers'
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

import { IoDuplicateOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import {  MdOutlineEdit } from "react-icons/md";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from "../../ui/Menus";

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

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

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

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

/*eslint-disable*/

function CabinRow({cabin}){
  const {id:cabinId, name, maxCapacity, regularPrice, discount, image, description} = cabin;

 

  // const [showForm, setShowForm] = useState(false)

  const {isDeleting, deleteCabin} = useDeleteCabin()

  const {createCabin, isCreating} = useCreateCabin()
  // if(isDeleting)
  //   return <p>Deleting the cabin...</p>
  function handleDuplicate(){
    createCabin({
      name:`Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    })
  }

  return (
    
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
      <button onClick={() => handleDuplicate()}><IoDuplicateOutline /></button>

      <Modal>
      <Modal.Open opens="delete" >
      <button><RiDeleteBin6Line /></button>
      </Modal.Open>

      <Modal.Window name="delete" >
        <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)}/>
      </Modal.Window>

      <Modal.Open opens="edit">
      <button><MdOutlineEdit /></button>
      </Modal.Open>

      <Modal.Window name="edit">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
      </Modal>

      <Menus.Menu>
        <Menus.Toggle id={cabinId} />

        <Menus.List id={cabinId} >
          <Menus.Button icon={<IoDuplicateOutline />} onClick={handleDuplicate}>Duplicate</Menus.Button>
          <Menus.Button icon={<MdOutlineEdit />}>Edit</Menus.Button>
          <Menus.Button icon={<RiDeleteBin6Line />}>Delete</Menus.Button>
        </Menus.List>
      </Menus.Menu>
      </div>
    </Table.Row>

   
  )

}

export default CabinRow;