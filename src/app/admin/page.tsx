<<<<<<< HEAD
// "use server"
"use client"

=======
>>>>>>> af0adce (blog editor)
import Form from "./form";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function AdminPage() {
  return <p>admin page</p>; // <Form />
}

export default AdminPage;
