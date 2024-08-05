import { Editor } from "@tinymce/tinymce-react";

export const EnchantInput = ({
  initValue,
  onBlur,
  onChange,
}: {
  onBlur?: any;
  initValue: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Editor
      inline={true}
      //@ts-ignore
      onEditorChange={onChange}
      onBlur={onBlur}
      apiKey="gvvfxt64x0hg3cpxxu16ftwrn23hiz8u4hm9s6rto4d65mdl"
      initialValue={initValue}
      init={{
        width: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo  | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | ",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};
