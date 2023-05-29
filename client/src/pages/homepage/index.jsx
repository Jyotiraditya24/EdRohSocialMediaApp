import { useSelector } from "react-redux";
import useMediaQuery from "../../hooks/useMediaQuery";
import { UserWidget } from "../../widget/UserWidget";
import Navbar from "../navbar";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <section className={`p-8 ${isNonMobileScreen?"flex":"block"} gap-2  justify-between`}>
        <div className={`${isNonMobileScreen?"basis-[26%]":undefined}`}>
        <UserWidget userId={_id} picturePath={picturePath}/>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
