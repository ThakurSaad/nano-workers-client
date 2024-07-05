import Loader from "../../../components/Loader";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ProfileUI from "./ProfileUI";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const imageFile = watch("image");
  const { user, isLoading, refetch } = useUser();
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setValue("imageWidth", img.width);
          setValue("imageHeight", img.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile, setValue]);

  const uploadToBBAndSaveToDB = async (uploadImage) => {
    try {
      Swal.fire({
        icon: "question",
        title: "Confirm Upload",
        text: `Uploading ${uploadImage.image.name} to ImageBB`,
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPublic.post(image_hosting_api, uploadImage, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setLoading(false);

          if (res.data.success) {
            const data = {
              photo_url: res.data.data.display_url,
              email: user.user_email,
            };

            setLoading(true);
            const db_res = await axiosPrivate.patch("/user/photo_url", data);
            setLoading(false);
            reset();

            if (db_res.data.modifiedCount) {
              refetch();
              Swal.fire(
                `Upload Successful`,
                `Your image has been successfully uploaded to ImageBB.</br> Photo URL : ${data.photo_url}`,
                "success"
              );
            } else if (!db_res.data.modifiedCount) {
              Swal.fire(
                "Notice",
                `You have already uploaded ${uploadImage.image.name} once.</br>Photo URL : ${data.photo_url}.`,
                "info"
              );
            } else {
              Swal.fire(
                "Something Went Wrong",
                "If this issue persist please try again later after hard reload (ctrl + shift + R)",
                "error"
              );
            }
          } else {
            Swal.fire(
              "ImageBB Not Responding.",
              "If this issue persist please try again later after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (error) {
      setLoading();
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const { image, imageWidth, imageHeight } = data;

    if (
      imageWidth > 445 &&
      imageWidth < 451 &&
      imageHeight > 445 &&
      imageHeight < 451
    ) {
      const uploadImage = { image: image[0] };

      await uploadToBBAndSaveToDB(uploadImage);
    } else {
      Swal.fire(
        "Request Rejected",
        `Your image is ${imageHeight}*${imageWidth}.</br>Please read the requirements`,
        "error"
      );
    }
  };

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <ProfileUI
        user={user}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
      />
    </section>
  );
};

export default Profile;
