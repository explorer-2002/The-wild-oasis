// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

// import FormRow from "../../ui/FormRow";
/* eslint-disable */

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["cabin"]
      })

      reset()
    },

    onError: (err) => {
      toast.error(err.message)
    }
  })



  const { errors } = formState
  // console.log(errors)

  function onSubmit(data) {
    data = { ...data, isActive: true };
    console.log(data);
    // mutate({...data})
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" {...register("name", {
          required: "This field is mandatory"
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "Thid field is mandatory"
        })} disabled={isCreating} />
      </FormRow>

      {/* <FormRow label="Discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{
          required:"This field is required",
          validate: (value) => (Number(value) < Number(getValues().regularPrice)) || "Discount should be less than the regular price"
        })} disabled={isCreating} />
      </FormRow> */}

      {/* <FormRow label="Description for website">
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating} />
      </FormRow> */}

      <FormRow label="Room Type" error={errors?.discount?.message} >
        <Input type="text" id="roomType" defaultValue={0} {...register("roomType", {
          required: "This field is required",
          // validate: (value) => (Number(value) < Number(getValues().regularPrice)) || "Discount should be less than the regular price"
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isCreating} {...register("image", {
          required: "This field id mandatory"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
