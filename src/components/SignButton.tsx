import { Button, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import {
  useGetDocumentByRentIdQuery,
  usePostDocumentMutation,
} from "../services/documents";

interface SignButtonProps {
  rentId: string;
}

const NCA_LAYER_HOST = "wss://127.0.0.1:13579";

const extractPureBase64 = (pem: string): string =>
  pem
    .replace(/-----BEGIN CMS-----/g, "")
    .replace(/-----END CMS-----/g, "")
    .replace(/[\r\n]/g, "")
    .trim();

const SignButton: FC<SignButtonProps> = ({ rentId }) => {
  const { data: doc } = useGetDocumentByRentIdQuery({ rentId });
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState("Ожидание подключения...");
  const [postDoc, { isSuccess }] = usePostDocumentMutation();

  useEffect(() => {
    const ws = new WebSocket(NCA_LAYER_HOST);
    wsRef.current = ws;

    const timeout = setTimeout(() => {
      ws.close();
      setStatus("Не удалось подключмться к NCALayer");
    }, 3000);

    ws.onopen = () => {
      clearTimeout(timeout);
      setStatus("Подключение к NCALayer установлено ");
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      setStatus("Ошибка подключения к NCALayer");
    };

    ws.onmessage = ({ data }) => {
      const cms = JSON.parse(data)?.body?.result?.[0];
      if (!cms) return;

      const pureCms = extractPureBase64(cms);
      if (pureCms && doc) {
        postDoc({ documentId: doc?.id, cms: pureCms });
      }
    };

    return () => {
      ws.close();
    };
  }, [doc, postDoc]);

  const handleSign = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setStatus("Соединение с NCALayer не установлено");
      return;
    }
    if (!doc) {
      return;
    }

    const message = {
      method: "sign",
      module: "kz.gov.pki.knca.basics",
      args: {
        allowedStorages: null,
        data: doc.base64Xml,
        format: "cms",
        locale: "ru",
        signingParams: {
          decode: true,
          digested: false,
          encapsulate: false,
        },
        signerParams: {
          extKeyUsageOids: ["1.3.6.1.5.5.7.3.4"],
        },
      },
    };

    wsRef.current.send(JSON.stringify(message));
    setStatus("Ожидание подписи...");
  };

  useEffect(() => {
    if (isSuccess) {
      setStatus("Документ подписан успешно!");
    }
  }, [isSuccess]);

  return (
    <>
      <Typography variant="body2" gutterBottom>
        {status}
      </Typography>{" "}
      <Button variant="contained" color="primary" onClick={handleSign}>
        Подписать договор
      </Button>
    </>
  );
};

export default SignButton;
