import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import profile from "../../../assets/profile.jpg";

const ProfileUI = ({
  user,
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}) => {
  const { _id, display_name, user_email, photo_url, role, coin } = user || {};

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

      <div>
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

export default ProfileUI;
