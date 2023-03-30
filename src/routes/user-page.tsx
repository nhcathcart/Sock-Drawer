import { useAppSelector, useAppDispatch } from "../hooks";
import {
  chooseFresh,
  chooseCompleted,
  chooseInProgress,
  chooseDashboard,
} from "../reducers/viewReducer";
import { Dashboard } from "../components/Dashboard";
import { Fresh } from "../components/Fresh";
import { Completed } from "../components/Completed";
import { InProgress } from "../components/InProgress";

export function UserPage() {
  const state = useAppSelector((state) => state.viewChoice);
  const dispatch = useAppDispatch();
  return (
    <div className="relative min-h-screen md:flex">
      {/* navbar */}
      <div className="bg-blue-800 text-stone-200 font-bold flex justify-between items-center md:hidden">
        <a href="" className="block p-4">
          sockdrawer
        </a>
        <button
          className="p-4"
          onClick={() => {
            const sidebar = document.querySelector(".side-bar-menu");
            sidebar?.classList.toggle("-translate-x-full");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div className="side-bar-menu bg-blue-800 text-stone-200 w-64 p-4 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <h1 className="text-3xl py-2 px-4 text-white">sockdrawer</h1>
        <nav>
          <button
            className="block py-2 px-4 transition duration-100 hover:bg-blue-500 hover:text-white rounded"
            onClick={() => dispatch(chooseDashboard())}
          >
            dashboard
          </button>
          <button
            className="block py-2 px-4 transition duration-100 hover:bg-blue-500 hover:text-white rounded"
            onClick={() => dispatch(chooseInProgress())}
          >
            folding
          </button>
          <button
            className="block py-2 px-4 transition duration-100 hover:bg-blue-500 hover:text-white rounded"
            onClick={() => dispatch(chooseFresh())}
          >
            fresh
          </button>
          <button
            className="block py-2 px-4 transition duration-100 hover:bg-blue-500 hover:text-white rounded"
            onClick={() => dispatch(chooseCompleted())}
          >
            put away
          </button>
          <button
            className="block py-2 px-4 transition duration-100 hover:bg-blue-500 hover:text-white rounded mt-20"
            onClick={() => dispatch(chooseCompleted())}
          >
            logout
          </button>
        </nav>
      </div>
      {/* content */}
        <div className="p-0 flex-1 flex justify-center items-center bg-slate-50 md:p-10">
            <div className="flex flex-col items-center h-full w-full bg-white shadow-xl rounded-3xl ">
                {state.fresh ? <Fresh /> : null}
                {state.dashboard ? <Dashboard /> : null}
                {state.completed ? <Completed /> : null}
                {state.inProgress ? <InProgress /> : null}
            </div>
        </div>
    </div>
  );
}
