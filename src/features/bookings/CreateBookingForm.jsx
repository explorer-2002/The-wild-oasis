// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
import { useForm, Controller } from 'react-hook-form'
import FormRow from "../../ui/FormRow";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useEffect } from "react";
import { useCreateBooking } from "./useCreateBooking";
// import { useCreateBooking } from "./useCreateBooking";
// import { useEditCabin } from "./useEditCabin";

// import FormRow from "../../ui/FormRow";

function CreateBookingForm({ cabin = {}, onCloseModal }) {

    const { _id: cabinId, ...editValues } = cabin;
    //   const isEditSession = Boolean(editId)
    console.log(cabinId);

    const defaultEditValues = {
        'numberOfGuests': editValues?.maxGuests,
        'pricePerNight': editValues?.price
    };

    const { register, handleSubmit, formState, reset, setValue, control, watch } = useForm({
        defaultValues: defaultEditValues
    })

    // console.log("cabin-to-edit", cabinToEdit);

    const { createBooking, isCreating } = useCreateBooking()

    // const { editCabin, isEditing } = useEditCabin()

    // const [totalPrice, setTotalPrice] = useState(editValues?.price || 0);

    const isWorking = false;

    const { errors } = formState
    // console.log(errors)

    const checkInDate = watch("checkInDate");
    const checkOutDate = watch("checkOutDate");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // data.image[0]
    function onSubmit(data) {
        // mutate({...data})
        // const image = typeof data.image === 'string' ? data.image : data.image[0]
        console.log("Form Data Submitted: ", data);
        data = { ...data, roomId: cabinId, checkInDate: data.checkInDate.toISOString(), checkOutDate: data.checkOutDate.toISOString() };
        // const formData = new FormData();
        // formData.append('maxGuests', data.maxGuests);
        // formData.append('roomType', data.roomType);
        // formData.append('pricePerNight', data.pricePerNight);


        // if (!isEditSession) {
        //     formData.append('roomNumber', data.roomNumber);
        //     formData.append('image', image);
        //     formData.append('isActive', true);
        // }

        // if (isEditSession) {

        //     const updateObject = { 'maxGuests': data.maxGuests, 'pricePerNight': data.pricePerNight, 'roomType': data.roomType };

        //     editCabin({ newCabin: updateObject, id: editId }, {
        //         onSuccess: () => { reset(); onCloseModal?.(); }
        //     })
        // }


        createBooking({ newBooking: data }, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        })
    }

    function onError(errors) {
        console.log(errors);
    }

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);

            // Calculate the difference in days
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                const calculatedPrice = diffDays * cabin?.price;
                // Use setValue to update the totalPrice field in the form
                setValue('totalPrice', calculatedPrice);
                console.log("Total Price Updated:", calculatedPrice);
            }
        }
    }, [checkInDate, checkOutDate, setValue, cabin?.price]); // Dependencies array

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'} >
            <FormRow label="Guest name" error={errors?.name?.message} >
                <Input type="text" id="guestName" {...register("guestName", {
                    required: "This field is mandatory"
                })} disabled={isCreating} />
            </FormRow>

            <FormRow label="Guest email" error={errors?.maxCapacity?.message} >
                <Input type="email" id="guestEmail" {...register("guestEmail", {
                    required: "This field is required",
                    min: {
                        value: 1,
                        message: "Capacity should be at least 1"
                    }
                })} disabled={isCreating} />
            </FormRow>

            <FormRow label="Guest phone" error={errors?.guestPhone?.message} >
                <Input type="text" id="guestPhone" {...register("guestPhone", {
                    required: "This field is required",
                    min: {
                        value: 1,
                        message: "Capacity should be at least 1"
                    }
                })} disabled={isCreating} />
            </FormRow>

            <FormRow label="Check in date" error={errors?.checkInDate?.message} >
                <Controller
                    name="checkInDate"
                    control={control}
                    rules={{
                        required: "Check-in date is required",
                        validate: (value) => {
                            const selectedDate = new Date(value);
                            selectedDate.setHours(0, 0, 0, 0);
                            return selectedDate >= today || "Check-in date must be today or later";
                        }
                    }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            minDate={today}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select check-in date"
                            disabled={isWorking}
                            className="date-picker-style"
                            popperProps={{
                                positionFixed: true,
                            }}
                        />
                    )}
                />
            </FormRow>

            <FormRow label="Check out date" error={errors?.roomType?.message} >
                <Controller
                    name="checkOutDate"
                    control={control}
                    rules={{
                        required: "Check-out date is required",
                        validate: (value) => {
                            if (!checkInDate) return "Please select check-in date first";
                            const checkIn = new Date(checkInDate);
                            const checkOut = new Date(value);
                            checkIn.setHours(0, 0, 0, 0);
                            checkOut.setHours(0, 0, 0, 0);
                            return checkOut > checkIn || "Check-out date must be after check-in date";
                        }
                    }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => {
                                field.onChange(date);
                            }}
                            minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select check-out date"
                            disabled={isWorking || !checkInDate}
                            className="date-picker-style"
                            popperProps={{
                                positionFixed: true,
                            }}
                        />
                    )}
                />
            </FormRow>

            <FormRow label="Max Guests" error={errors?.numberOfGuests?.message} >
                <Input type="text" id="numberOfGuests" {...register("numberOfGuests", {
                    required: "This field is mandatory"
                })} disabled={isWorking} />
            </FormRow>

            <FormRow label="Price Per Night" error={errors?.pricePerNight?.message} >
                <Input type="text" id="pricePerNight" {...register("pricePerNight", {
                    required: "This field is mandatory"
                })} disabled={isWorking} />
            </FormRow>

            <FormRow label="Total Price" error={errors?.totalPrice?.message} >
                <Input type="text" id="totalPrice" {...register("totalPrice", {
                    required: "This field is mandatory",
                })} readOnly />
            </FormRow>
            {/* <FormRow label="Check out date" error={errors?.roomType?.message} >
        <Input type="text" id="roomType" {...register("roomType", {
          required: "Thid field is mandatory"
        })} disabled={isWorking} />
      </FormRow> */}
            {/* <FormRow label="Discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{
          required:"This field is required",
          validate: (value) => (Number(value) < Number(getValues().regularPrice)) || "Discount should be less than the regular price"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} />
      </FormRow> */}

            {/* <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", {
          required: isEditSession ? false : "This field id mandatory"
        })} />
      </FormRow> */}

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" disabled={isWorking} onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{"Create Booking"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookingForm;
