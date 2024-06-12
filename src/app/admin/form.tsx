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
      } else toastr.success(data.message)

    } catch (error) {
      console.error({ error });
    }
    return;
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-2">CREATE POST</h1>
      <form
        className="grid gap-4 bg-black !text-black p-4"
        onSubmit={onFormSubmit}
      >
        <input name="title" className="px-2 py-1" type="text" />
        <textarea
          name="description"
          className="px-2 py-1"
          defaultValue={"hello world this is a default value asdsad"}
        ></textarea>
        <input type="number" name="qty" />
        <button className="text-white bg-blue-500 px-4 py-2 rounded">
          submit
        </button>
      </form>
    </div>
  );
}
