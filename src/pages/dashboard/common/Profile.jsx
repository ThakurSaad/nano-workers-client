import Loader from "../../../components/Loader";
import useUser from "../../../hooks/useUser";
import profile from "../../../assets/profile.jpg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";

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
  const { _id, display_name, user_email, photo_url, role, coin } = user;

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
      <div className="xs:flex">
        <div className="max-w-60 w-full">
          <img
            className="rounded-lg"
            src={photo_url ? photo_url : profile}
            alt="profile"
          />
        </div>
        <div className="xs:ml-6 mt-4 xs:mt-0">
          <h3>Name</h3>
          <p className="text-gray-500">{display_name}</p>
          <h3>Account</h3>
          <p className="text-gray-500">{_id}</p>
          <h3>Email</h3>
          <p className="text-gray-500">{user_email}</p>
          <h3>Role</h3>
          <p className="text-gray-500">{role}</p>
          <h3>Coins</h3>
          <p className="text-gray-500">{coin}</p>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <div>
          <h3 className="text-2xl text-customOrange font-semibold">
            Upload Photo to ImageBB
          </h3>
          <p className="text-gray-500 mb-4">
            If you want to add your image as your profile picture you can upload
            it below.
          </p>

          <h3 className="text-xl">Requirements</h3>
          <ol className="list-decimal text-gray-500 pl-8 mb-4">
            <li>Best photo is 450*450 px (height*width).</li>
            <li>
              Height and width max variation
              <ul className="list-disc text-gray-500 pl-8 mb-4">
                <li>Height 446-450 px</li>
                <li>Width 446-450 px</li>
              </ul>
            </li>
            <li>Other dimensions will not be accepted.</li>
            <li>Please provide a headshot photo like this one.</li>
            <li>Please provide a optimized photo.</li>
          </ol>

          <h3 className="text-xl">How to Resize</h3>
          <ul className="list-disc text-gray-500 pl-8 mb-4">
            <li>
              Go to{" "}
              <a
                className="text-blue-600 hover:underline"
                href="https://www.photopea.com/"
                target="_blank"
              >
                Photopea <FaExternalLinkAlt className="inline text-sm" />
              </a>
            </li>
            <li>Upload photo</li>
            <li>Select crop tool from sidebar.</li>
            <li>Select fixed size from the dropdown above.</li>
            <li>Enter H: 450 W: 450.</li>
            <li>
              Select <FaCheck className="inline" /> sign from above.
            </li>
            <li>Select file &gt; export as &gt; webp.</li>
          </ul>
          <h3 className="text-xl mb-2">Upload Now</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Your Headshot Photo*
            </label>
            <input
              id="image"
              type="file"
              className="text-sm text-stone-500
              file:mr-2 file:py-1 file:px-3 file:border-[2px]
              file:rounded-lg file:text-sm file:font-medium
              file:bg-stone-100 file:text-stone-500
              hover:file:cursor-pointer hover:file:bg-blue-50
              hover:file:text-blue-700"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is required",
                },
              })}
            />
            <input type="hidden" {...register("imageWidth")} />
            <input type="hidden" {...register("imageHeight")} />
            <div className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </div>
            {/* <input
              type="submit"
              value="upload"
              className="btn btn-sm bg-customOrange text-white hover:text-neutral uppercase tracking-wide"
            /> */}
            <button
              type="submit"
              className="btn btn-sm bg-customOrange text-white hover:text-neutral uppercase tracking-wide"
              disabled={loading}
            >
              {loading ? (
                <>
                  Processing
                  <div className="flex items-center justify-center">
                    <div>
                      <div className="w-6 h-6 border-t-4 border-b-4 border-neutral rounded-full animate-spin"></div>
                    </div>
                  </div>
                </>
              ) : (
                "upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
