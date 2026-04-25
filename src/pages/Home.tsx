import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { stateManagementZustandUI } from "@/lib/stateManagementZustandUI";

const Home = (): ReactElement => {
  let navigate = useNavigate();
  const lastVisitedPage = stateManagementZustandUI(
    (state) => state.lastVisitedPage,
  );

  //cursor-pointer
  useEffect(() => {
    if (lastVisitedPage && lastVisitedPage !== "/") {
      navigate(lastVisitedPage);
    }
  }, []);

  return (
    <div className=" m-auto mt-50 flex flex-col justify-center items-center  w-8/12">
      <p className="font-bold text-7xl">Home page</p>
    </div>
  );
};

export default Home;
