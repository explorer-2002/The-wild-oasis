// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
import { useForm } from 'react-hook-form'
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// import FormRow from "../../ui/FormRow";
/* eslint-disable */

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {

  const { _id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const defaultEditValues = {
    'roomNumber': editValues?.name,
    'maxGuests': editValues?.maxGuests,
    'roomType': editValues?.capacity,
    'pricePerNight': editValues?.price
  };

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? defaultEditValues : {}
  })

  console.log("cabin-to-edit", cabinToEdit);

  const { createCabin, isCreating } = useCreateCabin()

  const { editCabin, isEditing } = useEditCabin()


  const isWorking = isCreating || isEditing

  const { errors } = formState
  // console.log(errors)

  // data.image[0]
  function onSubmit(data) {
    // mutate({...data})
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    const formData = new FormData();
    formData.append('maxGuests', data.maxGuests);
    formData.append('roomType', data.roomType);
    formData.append('pricePerNight', data.pricePerNight);


    if (!isEditSession) {
      formData.append('roomNumber', data.roomNumber);
      formData.append('image', image);
      formData.append('isActive', true);
    }

    if (isEditSession) {

      const updateObject = { 'maxGuests': data.maxGuests, 'pricePerNight': data.pricePerNight, 'roomType': data.roomType };

      editCabin({ newCabin: updateObject, id: editId }, {
        onSuccess: () => { reset(); onCloseModal?.(); }
      })
    }

    else
      createCabin({ newCabin: formData }, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        }
      })
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'} >
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="roomNumber" {...register("roomNumber", {
          required: "This field is mandatory"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxGuests" {...register("maxGuests", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Price Per Night" error={errors?.regularPrice?.message} >
        <Input type="number" id="pricePerNight" {...register("pricePerNight", {
          required: "This field is mandatory"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Room Type" error={errors?.roomType?.message} >
        <Input type="text" id="roomType" {...register("roomType", {
          required: "Thid field is mandatory"
        })} disabled={isWorking} />
      </FormRow>
      {/* <FormRow label="Discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{
          required:"This field is required",
          validate: (value) => (Number(value) < Number(getValues().regularPrice)) || "Discount should be less than the regular price"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} />
      </FormRow> */}

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", {
          required: isEditSession ? false : "This field id mandatory"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking} onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
