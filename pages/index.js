import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    document.title = "TODO List | Varun Soni | Next.js";
  }, []);


  const addTodo = async () => {
    try {
      let todos = localStorage.getItem('todos');
      if (todos) {
        let todosJson = JSON.parse(todos);
        if (todosJson?.filter(title => title.title === todo.title)?.length > 0) {
          toast.error('TODO already exists.');
        } else {
          if (todo.title !== '') {
            todosJson?.push(todo);
            await toast.promise(
              new Promise((resolve, reject) => {
                try {
                  setTimeout(() => {
                    localStorage.setItem('todos', JSON.stringify(todosJson));
                    resolve();
                  }, 1000);
                } catch (error) {
                  reject(error);
                }
              }),
              {
                loading: 'Adding TODO...',
                success: <b>TODO added!</b>,
                error: <b>Error while adding TODO.</b>,
              }
            );
            setTodo({ title: '', description: '' });
          } else {
            toast.error("Please provide a title to add TODO.");
          }
        }
      } else {
        if (todo.title !== '') {
          localStorage.setItem('todos', JSON.stringify([todo]));
        } else {
          toast.error('Please provide a title to add TODO.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    }
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
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
                type="text"
                placeholder="Title"
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
                placeholder="Description"
                id="description"
                name="description"
                className="w-full bg-white rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <span className={`text-red-500 font-semibold ${!isLoggedIn ? 'mb-4' : 'hidden'}`}>
    Please login to start adding TODOs.
  </span>

            <button
              onClick={addTodo}
              disabled={!isLoggedIn} // Fix: Use 'disabled' prop with '!isLoggedIn' condition
              className={`inline-flex items-center text-white border-0 py-2 px-6 w-fit focus:outline-none transition-colors duration-300 hover:bg-orange-300 rounded-3xl text-base mt-4 md:mt-0 ${!isLoggedIn ? 'disabled cursor-not-allowed bg-orange-200' : 'bg-orange-500 hover:bg-orange-300'}`}
            >
              Add TODO
            </button>

          </div>
        </div>
      </section>
    </>
  );
}
