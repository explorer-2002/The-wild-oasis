// import { useState } from "react";

// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import ProfilePictureUpload from "../../ui/ProfilePictureUpload";
import { useState } from "react";
import toast from "react-hot-toast";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const data = useSelector((state) => state.user.user);

  const defaultValues = {
    email: data?.email || '',
    name: data?.userName || '',
    mobileNumber: data?.phone || ''
  };

  // reset, formState, getValues
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

  const [file, setFile] = useState(null);

  // const {
  //   user: {
  //     email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useUser();


  // const [fullName, setFullName] = useState(currentFullName);
  // const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit(userData) {

    console.log('Form data to be submitted: ', userData);

    const formData = new FormData();
    formData.append('userName', userData?.name);

    if(file !== null){
        formData.append('avatar', file);
    }

    if(userData?.mobileNumber !== ''){
        formData.append('mobileNumber', userData?.mobileNumber);
    }

    updateUser({ updateData: formData, id: data?.id }, {
      onSuccess: () => {
        toast.success("User data updated successfully");
      }
    })
  }

  // function handleCancel() {
  //   setFullName(currentFullName);
  //   setAvatar(null);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ProfilePictureUpload file={file} setFile={setFile} initialPreview={data?.avatar ?? null} />
      <FormRow label="Name" type="centered">
        <Input type="text" id="name" {...register("name", {
          required: "This field is mandatory"
        })} disabled={isUpdating} />
      </FormRow>

      <FormRow label="Phone number" type="centered">
        <Input type="text" id="mobileNumber" {...register("mobileNumber", {
          required: "This field is mandatory"
        })} disabled={isUpdating} />
      </FormRow>

      <FormRow type="centered">
        <Button type="reset" variation="secondary" disabled={true} onClick={() => { }}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
