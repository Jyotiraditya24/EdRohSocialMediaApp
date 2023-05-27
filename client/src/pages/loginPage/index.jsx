import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import useMediaQuery from "../../hooks/useMediaQuery";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  console.log(isNonMobileScreens);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div className="text-white text-center font-bold transition bg-blue-600 p-4">
        <p>SOCIALMEDIA</p>
      </div>
      {/* FORM AND HEADING  */}
      <div
        className={`${
          isNonMobileScreens ? "w-1/2" : "w-[90%]"
        } p-8 my-3 mx-auto bg-blue-600 rounded-2xl text-white`}
      >
        <p className="mb-5">Welcome To Social, The Social Media For You</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 justify-center items-left">
            <p>
              {errors.email?.type === "required" && (
                <p
                  role="alert"
                  className="bg-gradient-to-r from-yellow-200 to-cyan-500 text-transparent bg-clip-text "
                >
                  Email is required
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p
                  role="alert"
                  className="bg-gradient-to-r from-yellow-200 to-cyan-500 text-transparent bg-clip-text "
                >
                  Invalid Email
                </p>
              )}
            </p>

            <input
              {...register("email", {
                required: true,
                min: 3,
                pattern: /^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="text-black mb-5 px-2 py-1 rounded-lg"
              placeholder="email"
            />
            {errors.password?.type === "required" && (
              <p
                role="alert"
                className="bg-gradient-to-r from-yellow-200 to-cyan-500 text-transparent bg-clip-text"
              >
                Password is required
              </p>
            )}

            <input
              {...register("password", {
                required: true,
                min: 3,
              })}
              className="text-black mb-5 px-2 py-1 rounded-lg"
              placeholder="password"
            />
            <Button label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
