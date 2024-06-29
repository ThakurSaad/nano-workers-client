import { useRouteError } from "react-router-dom";
import Img404 from "../../assets/404.svg";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <section>
      <div>
        <div className="flex min-h-screen justify-center items-center">
          <img className="max-h-screen" src={Img404} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
