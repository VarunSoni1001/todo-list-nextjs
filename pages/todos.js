import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditNote } from 'react-icons/md';

const Todos = () => {
    
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
      let todo = localStorage.getItem('todos');
      setTodoList(JSON.parse(todo));
      document.title = "Your TODO's | TODO List | Varun Soni | Next.js";
    }, []);

    const deleteTodo = (title) => {
        let newTodo = todoList.filter(item => { return item.title !== title });
        localStorage.setItem('todos', JSON.stringify(newTodo));
        setTodoList(newTodo);
    }

    return (
        <section className="text-black-500 body-font">
            <div className="container px-5 py-12 mx-auto">
                <div className="text-center mb-8">
                    {todoList.length > 0 && <h1 className="text-3xl font-semibold text-gray-900">Your TODO's</h1>}
                    {todoList.length === 0 && <p className="mt-36 text-gray-500 text-xl">You don't have any TODO.</p>}
                </div>
                {todoList.length > 0 && <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left">S.No.</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList?.map((todo, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-10'}>
                                    <td className="px-4 py-3">{index + 1}.</td>
                                    <td className="px-4 py-3 font-semibold">{todo?.title}</td>
                                    <td className="px-4 py-3">{todo?.description}</td>
                                    <td className="px-4 py-3 flex justify-end">
                                        <button title='Delete TODO' onClick={() => deleteTodo(todo.title)} className="text-red-500 m-3">
                                            <MdDelete size={20} />
                                        </button>
                                        <Link href={`/edittodo/${todo.title}`} title='Edit TODO' className="text-black-500 m-3">
                                            <MdEditNote size={25} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </section>
    );
};

export default Todos;
