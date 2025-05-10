import { Button } from "@mui/material";

import {
  useDownloadDocumentByIdMutation,
  useGetDocumentByRentIdQuery,
} from "../../../services/documents";

const Document = ({ rentId }: { rentId: string }) => {
  const { data, isSuccess } = useGetDocumentByRentIdQuery({ rentId });
  const [downloadDoc, { isLoading }] = useDownloadDocumentByIdMutation();

  function downloadPdf() {
    if (data) {
      downloadDoc({ documentId: data?.id })
        .unwrap()
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "downloaded.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch((error) => {
          console.error("Failed to download the PDF file: ", error);
        });
    }
  }

  return (
    <Button
      sx={{ borderRadius: 1 }}
      variant="outlined"
      loading={isLoading}
      disabled={!isSuccess}
      onClick={downloadPdf}
    >
      Скачать
    </Button>
  );
};

export default Document;
