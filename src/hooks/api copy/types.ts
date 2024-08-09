interface ResponseBody<T> {
  data: T;
  status: "success" | "error" | "warning";
  responseText: string;
}
