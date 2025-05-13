import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Typography, IconButton } from "@mui/material";
import { Image, Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

interface FileFieldProps {
  name: string;
}

interface PreviewProps {
  preview: { id: string; src: string; file: File } | null;
  onRemove: () => void;
}

const ImagePreview: React.FC<PreviewProps> = ({ preview, onRemove }) => {
  if (!preview) return null;

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
      <Box
        key={preview.id}
        sx={{
          width: 200,
          height: 200,
          border: "1px solid #ccc",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            zIndex: 1,
          }}
          size="small"
        >
          <Close fontSize="small" />
        </IconButton>
        <img
          src={preview.src}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

const OneFileFieldCustom: React.FC<FileFieldProps> = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = useState<{
    id: string;
    src: string;
    file: File;
  } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const previewObj = {
        id: URL.createObjectURL(file),
        src: URL.createObjectURL(file),
        file,
      };

      setPreview(previewObj);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Нужно загрузить фото",
      }}
      render={({ field: { onChange } }) => {
        const handleDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          if (!file) return;

          const previewObj = {
            id: URL.createObjectURL(file),
            src: URL.createObjectURL(file),
            file,
          };

          setPreview(previewObj);
          onChange(file);
        };

        const handleRemove = () => {
          setPreview(null);
          onChange(null);
        };

        return (
          <Box
            sx={{
              border: "1px solid black",
              padding: 3,
              borderRadius: "8px 8px 0 0",
            }}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              onChange={(event) => {
                const files = event.target.files ? [...event.target.files] : [];
                handleDrop(files);
              }}
            />
            <Typography variant="subtitle1" gutterBottom>
              {isDragActive
                ? "Отпустите фото для загрузки"
                : "Перетащите фото сюда (только 1 файл, до 5 МБ)"}
            </Typography>
            <IconButton component="span">
              <Image fontSize="large" />
            </IconButton>
            <ImagePreview preview={preview} onRemove={handleRemove} />
            {errors[name] && (
              <Typography color="error">
                {typeof errors[name]?.message === "string"
                  ? errors[name]?.message
                  : ""}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};

export default OneFileFieldCustom;
