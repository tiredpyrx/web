import Form from "./form";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 60;

async function AdminPage() {
  return <Form />
}

export default AdminPage;
