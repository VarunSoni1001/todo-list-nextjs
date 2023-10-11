import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

import { getDatabase, set, get, ref } from "firebase/database";

const db = getDatabase();

const Edit = () => {
  const router = useRouter();
  const { title } = router.query;
  const { user, isLoggedIn } = useContext(AuthContext);  

  const userUID = user ? user.uid : null;

  const [todo, setTodo] = useState({ title: "", description: "" });
  const [noPage, setNoPage] = useState(false);
  const [prevTitle, setPrevTitle] = useState("");
  const [prevDescription, setPrevDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveTodo();
    }
  };

  useEffect(() => {
    if (title) {
      if (userUID) {
        const todosRef = ref(db, `todos/${userUID}`);
        get(todosRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const todos = snapshot.val();
              const fetchTodo = todos.find((todo) => todo.title === title);
              if (fetchTodo) {
                setTodo({
                  title: fetchTodo.title,
                  description: fetchTodo.description,
                });
                setPrevTitle(fetchTodo.title);
                setPrevDescription(fetchTodo.description);
                setNoPage(false);
                document.title = "Edit a TODO | TODO List | Varun Soni | Next.js";
                setIsLoading(false);
              } else {
                setNoPage(true);
                document.title = "No TODO found | TODO List | Varun Soni | Next.js";
              }
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching TODO:", error);
            setIsLoading(false);
          });
      }
    }
  }, [title]);

  const saveTodo = async () => {
    try {
      if (!todo.title) {
        toast.error("Title cannot be empty.");
        return;
      }

      if (!userUID) {
        toast.error("Please login to save TODOs.");
        return;
      }

      const todosRef = ref(db, `todos/${userUID}`);
      const snapshot = await get(todosRef);
      const todos = snapshot.val() || [];

      const index = todos.findIndex((item) => item.title === title);

      if (index >= 0) {
        todos[index].title = todo.title;
        todos[index].description = todo.description;
        await toast.promise(
          new Promise((resolve, reject) => {
            try {
              setTimeout(() => {
                set(todosRef, todos);
                resolve();
                if (userUID) {
                  setTimeout(() => {
                    router.push("/todos");
                  }, 1000);
                } else {
                  router.push("/");
                }
              }, 1000);
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: "Saving TODO...",
            success: <b>TODO saved successfully!</b>,
            error: <b>Error while saving TODO.</b>,
          }
        );
      } else {
        toast.error("TODO doesn't exist.");
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
      {noPage && !isLoading ? (
        <>
          <div className="text-center mb-8 mt-36">
            <h1 className="text-2xl font-semibold text-gray-900">
              TODO not found.
            </h1>
          </div>
        </>
      ) : isLoading ? (
        <div className="flex items-center justify-center">
          <img
            src="/loader.svg"
            alt="Loading..."
            className="w-24 ml-12 mt-[15%] lg:w-32 2xl:w-36"
          />
        </div>
      ) : (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Edit a TODO
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
                    placeholder={`Title was: ${prevTitle}`}
                    id="title"
                    name="title"
                    className="w-full disabled:cursor-not-allowed bg-white rounded-xl border focus:border-orange-500 caret-orange-600 text-gray-700 py-1 px-3 leading-8 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    value={todo?.description}
                    onChange={onChange}
                    disabled={!isLoggedIn}
                    title={!isLoggedIn ? "Please login..." : ""}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder={`Description was: ${prevDescription}`}
                    id="description"
                    name="description"
                    className="w-full disabled:cursor-not-allowed bg-white rounded-xl border focus:border-orange-500 caret-orange-600 text-gray-700 py-1 px-3 leading-8 transition-all duration-200 ease-in-out"
                  />
                </div>
                <button
                  onClick={saveTodo}
                  type="button"
                  className="inline-flex items-center text-white bg-orange-500 border-0 py-2 px-6 w-fit focus:outline-none transition-colors duration-300 hover:bg-orange-800 rounded-3xl text-base mt-4 md:mt-0"
                >
                  Save TODO
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Edit;
