"use client";

import { FormEvent } from "react";
import toastr from "toastr";

export default function Form() {
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          quantity: formData.get("qty"),
        }),
      });
      const data = await response.json();

      if (data.errors?.length) {
        for (const errorMessage of data.errors) {
          toastr.error(errorMessage);
        }
      } else toastr.success(data.message);
    } catch (error) {
      console.error({ error });
    }
    return;
  };

  return (
    <div className="p-12">
      <h1 className="text-center font-bold text-2xl mb-2">CREATE POST</h1>
      <form
        className="grid gap-4 p-4"
        onSubmit={onFormSubmit}
      >
          <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="My awesome post!" />

        <textarea
          name="description"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className="text-white bg-blue-500 px-4 py-2 rounded">
          submit
        </button>
      </form>
    </div>
  );
}
