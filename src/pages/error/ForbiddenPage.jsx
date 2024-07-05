import Img403 from "../../assets/403.svg";

const ForbiddenPage = () => {
  return (
    <section>
      <div>
        <div className="flex min-h-screen justify-center items-center">
          <img className="max-h-screen" src={Img403} alt="forbidden" />
        </div>
      </div>
    </section>
  );
};

export default ForbiddenPage;
