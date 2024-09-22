import { BlogForm } from "./_component/form";
import { apiServerFetch } from "package/api/api-fetch";

export default async function Page({ params }: { params: { id: string } }) {
  let initData = {
    id: 0,
    title: "",
    shortDescription: "",
    content: "<p></p>",
    categoryId: 0,
    thumbnail: "/assets/images/upload/upload.svg",
  };

  if (params.id !== "create") {
    const res = await apiServerFetch("/blog/" + params.id, "GET");
    if (res.status === "error") {
      return <></>;
    }
    initData = res.data;
  }
  return <BlogForm initData={initData} />;
}
