import { Editor } from '@tinymce/tinymce-react';

export const EnchantInput = ({ initValue, onChange }: { initValue: string; onChange?: (value: string) => void }) => {
  return (
    <Editor
      inline={true}
      //@ts-ignore
      onChange={onChange}
      apiKey="e2f3pntb5ogxx9hu1lba5p8ef4c29vnogx4n8lid5dw71i4v"
      initialValue={initValue}
      init={{
        width: 500,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount'
        ],
        toolbar:
          'undo redo  | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};
