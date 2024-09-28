'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// third party
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});
import 'react-quill/dist/quill.snow.css';

// ==============================|| QUILL EDITOR ||============================== //

const ReactQuillDemo = ({
  data,
  setData,
}: {
  data: string;
  setData: (data: string) => void;
}) => {
  const [text, setText] = useState(data);
  const handleChange = (value: string) => {
    setText(value);
  };
  const handleBlur = () => {
    console.log("rời khỏi thẻ")
    setData(text);
  }
  useEffect(() => {
    setText(data);
  }, [data]);
  return <ReactQuill value={text} onChange={handleChange} onBlur={handleBlur} />;
};

export default ReactQuillDemo;
