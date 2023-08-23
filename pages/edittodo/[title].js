import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Edit = () => {
  const router = useRouter();
  const { title } = router.query;

  const [todo, setTodo] = useState({ title: "", description: "" });
  const [noPage, setNoPage] = useState(false);
    
    useEffect(() => {
      let todos = localStorage.getItem("todos");
      if (todos) {
        let todosJson = JSON.parse(todos);
        let fetchTodo = todosJson?.filter((e) => title === e.title);
        if (fetchTodo?.length > 0) {
          setTodo(fetchTodo[0]);
          setNoPage(false);
          document.title = "Edit a TODO | TODO List | Varun Soni | Next.js"
        } else {
          setNoPage(true);
          document.title = "No TODO found"
        }
      }
  }, [title]);
  
  const saveTodo = async () => {
    try {
      let todos = localStorage.getItem("todos");
      if (todos) {
        let todosJson = JSON.parse(todos);
        if (
          todosJson?.filter((item) => {
            return item.title === title;
          })?.length > 0
        ) {
          let index = todosJson?.findIndex((item) => {
            return item.title === title;
          });
          todosJson[index].title = todo?.title;
          todosJson[index].description = todo?.description;
          await toast.promise(
            new Promise((resolve, reject) => {
              try {
                setTimeout(() => {
                  localStorage.setItem("todos", JSON.stringify(todosJson));
                  resolve();
                  setTimeout(() => {
                    router.push('/todos')
                  }, 1000);
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
          toast.error("TODO does't exists.");
        }
      } else {
        localStorage.setItem("todos", JSON.stringify(todo));
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
      {noPage ? (
        <>
          <div className="text-center mb-8 mt-36">
            <h1 className="text-2xl font-semibold text-gray-900">
              TODO not found.
            </h1>
          </div>
        </>
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
                    type="text"
                    placeholder={`Title was: ${todo?.title}`}
                    id="title"
                    name="title"
                    className="w-full bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    value={todo?.description}
                    onChange={onChange}
                    type="text"
                    placeholder={`Description was: ${todo?.description}`}
                    id="description"
                    name="description"
                    className="w-full bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  onClick={saveTodo}
                  className="inline-flex items-center text-white bg-orange-500 border-0 py-2 px-6 w-fit focus:outline-none transition-colors duration-300 hover:bg-orange-300 rounded-3xl text-base mt-4 md:mt-0"
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
