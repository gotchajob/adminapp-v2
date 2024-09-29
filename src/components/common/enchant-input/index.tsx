import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

export const EnchantInput = ({
  initValue,
  onBlur,
  onChange,
}: {
  onBlur?: any;
  initValue: string;
  onChange?: (value: string) => void;
}) => {
  const [data, setData] = useState(initValue);

  const handleBlur = () => {
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <Editor
      inline={true}
      //@ts-ignore
      onEditorChange={(value: string) => {
        setData(value);
      }}
      onBlur={(e) => {
        console.log(e.target.value);
        handleBlur();
      }}
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
          "bold italic forecolor | fontsize | lineheight | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | ",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};
