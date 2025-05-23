import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Typography, IconButton } from "@mui/material";
import { Image, Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

interface FileFieldProps {
  name: string;
}

interface PreviewProps {
  previews: { id: string; src: string; file: File }[];
  onRemove: (id: string) => void;
}

const ImagePreviews: React.FC<PreviewProps> = ({ previews, onRemove }) => (
  <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
    {previews.map(({ id, src }) => (
      <Box
        key={id}
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
            onRemove(id);
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
          src={src}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    ))}
  </Box>
);

const FileFieldCustom: React.FC<FileFieldProps> = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [previews, setPreviews] = useState<
    { id: string; src: string; file: File }[]
  >([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 10,
    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: URL.createObjectURL(file),
        src: URL.createObjectURL(file),
        file,
      }));
      setPreviews((prev) => [...prev, ...newFiles]);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Нужно загрузить минимум 1 фото",
      }}
      render={({ field: { onChange, value = [] } }) => {
        const handleDrop = (acceptedFiles: File[]) => {
          const newFiles = acceptedFiles.map((file) => ({
            id: URL.createObjectURL(file),
            src: URL.createObjectURL(file),
            file,
          }));
          setPreviews((prev) => [...prev, ...newFiles]);
          onChange([...value, ...acceptedFiles]);
        };

        const handleRemove = (id: string) => {
          const previewToRemove = previews.find((p) => p.id === id);
          if (!previewToRemove) return;

          setPreviews((prev) => prev.filter((p) => p.id !== id));

          const updatedFiles = value.filter(
            (file: File) => file !== previewToRemove.file,
          );
          onChange(updatedFiles);
        };

        return (
          <Box
            sx={{
              border: "1px dashed gray",
              padding: 3,
              borderRadius: 2,
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
                : "Перетащите фото сюда (максимум 10 файлов, 5 МБ каждое)"}
            </Typography>
            <IconButton component="span">
              <Image fontSize="large" />
            </IconButton>
            {previews.length > 0 && (
              <ImagePreviews previews={previews} onRemove={handleRemove} />
            )}
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

export default FileFieldCustom;
