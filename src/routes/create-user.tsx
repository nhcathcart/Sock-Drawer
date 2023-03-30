import { Link } from "react-router-dom";
import { CreateUserCard } from "../components/CreateUserCard";
import { updatePassword, updateUsername } from "../reducers/loginReducer";

export function CreateUser () {
  return (
    <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center">
      <CreateUserCard />
    </div>
  );
}