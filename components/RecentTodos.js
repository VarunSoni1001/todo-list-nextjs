import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { MdDelete, MdEditNote, MdTaskAlt } from "react-icons/md";
import { getDatabase, ref, get, set } from "firebase/database";
import toast from "react-hot-toast";
import Link from "next/link";

const db = getDatabase();

const RecentTodos = () => {
  const [todoList, setTodoList] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const toggleCompletedStatus = (title, isCompleted) => {
    if (userUID) {
      const updatedTodoList = todoList?.map((item) => {
        if (item.title === title) {
          item.isCompleted = !isCompleted;
        }
        return item;
      });

      const todosRef = ref(db, `todos/${userUID}`);
      set(todosRef, updatedTodoList)
        .then(() => {
          setTodoList(updatedTodoList);
        })
        .catch((error) => {
          console.error("Error updating TODO:", error);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        setIsLoading(false);
      }
      setIsLoading(false);
    }, 1500);
  }, [user]);

  const userUID = user ? user.uid : null;

  useEffect(() => {
    if (userUID) {
      const todosRef = ref(db, `todos/${userUID}`);
      get(todosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const todos = snapshot.val();
            setTodoList(todos);
          }
        })
        .catch((error) => {
          console.error("Error fetching TODOs:", error);
        });
    }
  }, [user, todoList]);

  useEffect(() => {
    document.title = "Your TODO's | TODO List | Varun Soni | Next.js";
  }, []);

  const deleteTodo = async (title) => {
    const updatedTodoList = todoList.filter((item) => item.title !== title);

    if (userUID) {
      const todosRef = ref(db, `todos/${userUID}`);
      await toast.promise(
        new Promise((resolve, reject) => {
          try {
            setTimeout(() => {
              set(todosRef, updatedTodoList)
                .then(() => {
                  setTodoList(updatedTodoList);
                })
                .catch((error) => {
                  console.error("Error deleting TODO:", error);
                });
              resolve();
            }, 1000);
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: "Deleting TODO...",
          success: <b>TODO deleted!</b>,
          error: <b>Error while deleting TODO.</b>,
        }
      );
    }
  };

  return (
    <>
      {!isLoading && isLoggedIn ? (
        <section className="text-black-500 body-font">
          <div className="container px-5 py-12 mx-auto">
            {todoList?.length > 0 && (
              <div className="overflow-x-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Your recent TODO's
                  </h1>
                </div>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-orange-400 text-black">
                      <th className="px-4 py-3 text-left border-b-[1px] border-t-[1px] border-black"></th>
                      <th className="px-4 py-3 text-left border-b-[1px] border-t-[1px] border-black">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left border-b-[1px] border-t-[1px] border-black">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left border-b-[1px] border-t-[1px] border-black"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList?.slice(0, 5)?.map((todo, index) => (
                      <tr
                        key={index}
                        className={`
                          ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} ${
                          todo.isCompleted ? "line-through" : ""
                        }
                        `}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 cursor-pointer accent-orange-600 transition-all duration-300 ease-in-out"
                            checked={todo.isCompleted}
                            onClick={() =>
                              toggleCompletedStatus(
                                todo.title,
                                todo.isCompleted
                              )
                            }
                          />
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold`}
                        >
                          {todo?.title}
                        </td>
                        <td className="px-4 py-3">
                          {todo?.description}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end gap-5">
                        <MdTaskAlt
                              className={`text-green-700 ${todo.isCompleted ? "" : "opacity-0"}`}
                              size={20}
                            />
                          <button
                            title="Delete TODO"
                            onClick={() => deleteTodo(todo?.title)}
                            className="text-red-500"
                          >
                            <MdDelete size={20} />
                          </button>
                          <Link
                            href={`/edittodo/${encodeURIComponent(
                              todo?.title
                            )}`}
                            title="Edit TODO"
                            className="text-black-500"
                          >
                            <MdEditNote size={25} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {todoList.length > 5 && (
                  <p className="w-full text-sm lg:text-base pr-4 mt-6 text-right">
                    <Link
                      href={"/todos"}
                      className="text-orange-700 hover:underline"
                    >
                      view all
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center">
          <img
            src="/inline_loader.svg"
            alt="Loading..."
            className="w-24 ml-20 lg:w-32 2xl:w-36"
          />
        </div>
      )}
    </>
  );
};

export default RecentTodos;