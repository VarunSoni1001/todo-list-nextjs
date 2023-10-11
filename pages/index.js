import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

import { getDatabase, ref, set, get } from "firebase/database";
import RecentTodos from "@/components/RecentTodos";
const db = getDatabase();

export default function Home() {
  const [todo, setTodo] = useState({ title: "", description: "", isCompleted: false });

  const { user, isLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        setIsLoading(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const userUID = user ? user.uid : null;

  useEffect(() => {
    document.title = "TODO List | Varun Soni | Next.js";
  }, []);

  const addTodo = async () => {
    try {
      if (!userUID) {
        toast.error("Please login to start adding TODOs.");
        return;
      }

      if (todo.title !== "") {
        const todosRef = ref(db, "todos/" + userUID);
        const snapshot = await get(todosRef);
        const todos = snapshot.val() || [];

        if (todos.some((item) => item.title === todo.title)) {
          toast.error("TODO already exists.");
        } else {
          todos.push(todo);
          await toast.promise(
            new Promise((resolve, reject) => {
              try {
                setTimeout(() => {
                  set(todosRef, todos);
                  resolve();
                }, 1000);
              } catch (error) {
                reject(error);
              }
            }),
            {
              loading: "Adding TODO...",
              success: <b>TODO added!</b>,
              error: <b>Error while adding TODO.</b>,
            }
          );
          setTodo({ title: "", description: "", isCompleted: false });
        }
      } else {
        toast.error("Please provide a title to add TODO.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!isLoading ? (
        <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Add a TODO
            </h2>
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <div className="relative mb-4">
                <input
                  value={todo?.title}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                  disabled={!isLoggedIn}
                  title={!isLoggedIn ? "Please login..." : ""}
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  className="w-full disabled:cursor-not-allowed bg-white rounded-xl border focus:border-orange-500 caret-orange-600 text-gray-700 py-1 px-3 leading-8 transition-all duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <input
                  value={todo?.description}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                  disabled={!isLoggedIn}
                  title={!isLoggedIn ? "Please login..." : ""}
                  type="text"
                  placeholder="Description"
                  id="description"
                  name="description"
                  className="w-full disabled:cursor-not-allowed bg-white rounded-xl border focus:border-orange-500 caret-orange-600 text-gray-700 py-1 px-3 leading-8 transition-all duration-200 ease-in-out"
                />
              </div>

              <span
                className={`font-semibold text-red-500 ${
                  !isLoggedIn ? "mb-4" : "hidden"
                }`}
              >
                Please login to start adding TODOs.
              </span>

              <button
                onClick={addTodo}
                disabled={!isLoggedIn}
                title={!isLoggedIn ? "Please login..." : ""}
                className={`inline-flex items-center text-white border-0 py-2 px-6 w-fit focus:outline-none transition-colors duration-300 rounded-3xl text-base mt-4 md:mt-0 ${
                  !isLoggedIn
                    ? "disabled cursor-not-allowed bg-orange-200 hover:bg-orange-200"
                    : "bg-orange-500 hover:bg-orange-800"
                }`}
              >
                Add TODO
              </button>
            </div>
          </div>
        </section>
        {isLoggedIn && <RecentTodos />}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <img
            src="/loader.svg"
            alt="Loading..."
            className="w-24 ml-12 mt-[15%] lg:w-32 2xl:w-36"
          />
        </div>
      )}
    </>
  );
}
