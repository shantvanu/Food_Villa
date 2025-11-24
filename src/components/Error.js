import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div>
      <h1>Ooopppsss...!!!! </h1>
      <h2>Something went wrong!!!</h2>
      <h3>
        Error {err.status} Page {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
