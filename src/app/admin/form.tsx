"use client";

import Editor from "@/components/Editor";
import { FormEvent, useEffect, useState } from "react";
import toastr from "toastr";
import { useForm } from "../hooks/useForm";

// todo change formData to const [form, setForm] = useState({title, description})
export default function Form() {
  const { data, setData, post } = useForm({
    title: "",
    description: ""
  })
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await post("/api/posts", JSON.stringify(data))
      const { data: responseData } = response;

      if (responseData.errors?.length) {
        for (const errorMessage of responseData.errors) {
          toastr.error(errorMessage);
        }
      } else toastr.success(responseData.message);
    } catch (error) {
      console.error({ error });
    }
    return;
  };

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="p-12">
      <h1 className="text-center font-bold text-2xl mb-2">CREATE POST</h1>
      <form className="grid gap-4 p-4" onSubmit={onFormSubmit}>
        <input
          type="text"
          onChange={(e) => setData("title", e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="My awesome post!"
        />
        {/* <textarea onChange={(e) => setData("description", e.target.value)}></textarea> */}
        <Editor onChange={(source) => setData("description", source)} />
        <button className="text-white bg-blue-500 px-4 py-2 rounded mt-6">
          submit
        </button>
      </form>
    </div>
  );
}
