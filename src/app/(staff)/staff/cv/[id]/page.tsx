"use client";

import { CreateCV } from "components/cv-component/cv";
import {
  CVTemplate,
  CVTemplateData,
  Column,
  PersonalComponent,
} from "components/cv-component/interface";
import { useEffect, useRef, useState } from "react";
import data from "views/widget/data";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MainCard from "ui-component/cards/MainCard";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { HeaderComponent } from "components/cv-component/header-component";
import TabsTable from "./_component/edit-tab";
import ManageCVHeader from "./_component/header";
import { PostCVTemplate } from "package/api/cv-template";
import { StaffToken } from "hooks/use-login";
import { PatchCVTemplate } from "package/api/cv-template/id";
import { UseGetCVTemplateById } from "hooks/use-get-cv-template";
import { enqueueSnackbar } from "notistack";
import { useGetSearchParams } from "hooks/use-get-params";

export default function Page({ params }: { params: { id: string } }) {
  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>();

  const onChangeCV = (cv: CVTemplate) => {
    // setHistoryTemplate([...historyTemplate, currentTemplate]);
    setCurrentTemplate(cv);
  };

  const CVRef = useRef(null);

  const handleDownload = async () => {
    if (CVRef.current) {
      const canvas = await html2canvas(CVRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv.pdf");
    }
  };

  const handleReview = useReactToPrint({
    content: () => CVRef.current,
    documentTitle: "CV",
  });

  const { staffToken } = StaffToken();

  //@ts-ignore
  const { CVTemplateById } = UseGetCVTemplateById({ id: params.id });

  const { categoryId} =useGetSearchParams(["categoryId"])

  const handleSaveToDatabase = async () => {
    try {
      const imageUrl = await handleGetImage();
      if (currentTemplate && staffToken !== "") {
        if (params.id === "create") {
          const res = await PostCVTemplate(
            {
              image: imageUrl,
              cvCategoryId: categoryId,
              name: currentTemplate.name,
              templateJson: JSON.stringify(currentTemplate),
            },
            staffToken
          );
          if (res.status === "error") {
            throw new Error(res.responseText);
          }
        } else {
          if (CVTemplateById) {
            const res = await PatchCVTemplate(
              {
                id: CVTemplateById.id,
                image: imageUrl,
                name: currentTemplate.name,
                templateJson: JSON.stringify(currentTemplate),
              },
              staffToken
            );
          }
        }
      } else {
        throw new Error("Lỗi không tìm thấy cv");
      }
      enqueueSnackbar("Cập nhật thành công", {variant: "success"})
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
    }
  };

  const handleGetImage = async () => {
    if (CVRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(CVRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "my3ib4l5");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfwqbf3xr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error("Không thể lưu ảnh cv");
    }
  };

  useEffect(() => {
    if (CVTemplateById) {
      try {
        setCurrentTemplate(JSON.parse(CVTemplateById.templateJson));
      } catch (error) {
        setCurrentTemplate(CVTemplateData);
      }
    }
  }, [CVTemplateById]);

  return (
    <Grid container spacing={3}>
      {currentTemplate && (
        <>
          {" "}
          <Grid item xs={12}>
            <ManageCVHeader
              cv={currentTemplate}
              onChangeCV={onChangeCV}
              download={handleDownload}
              review={handleReview}
              save={handleSaveToDatabase}
            />
          </Grid>
          <Grid item xs={8}>
            <CreateCV
              onChangeCV={onChangeCV}
              cv={currentTemplate}
              cvRef={CVRef}
            />
          </Grid>
          <Grid item xs={4}>
            <TabsTable cv={currentTemplate} onChangeCV={onChangeCV} />
          </Grid>
        </>
      )}
    </Grid>
  );
}
