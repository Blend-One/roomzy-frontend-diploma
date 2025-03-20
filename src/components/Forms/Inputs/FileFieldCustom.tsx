import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Typography, IconButton } from "@mui/material";
import { Image } from "@mui/icons-material";

const FileFieldCustom = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [previews, setPreviews] = useState([]);

  return (
    <Controller
      control={control}
      name={"files"}
      rules={{
        required: "Recipe picture is required",
        validate: (files) => {
          if (!files || files.length === 0) {
            return "At least one image is required";
          }
          if (files.length > 10) {
            return "You can upload up to 10 images";
          }
          for (let file of files) {
            if (file.size > 5 * 1024 * 1024) {
              return "Each image must be under 5MB";
            }
          }
          return true;
        },
      }}
      render={({ field: { value, onChange, ...field } }) => (
        <Box sx={{ border: "1px dashed gray", padding: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Images (max 10, up to 5MB each)
          </Typography>
          <input
            {...field}
            multiple
            type="file"
            id="picture"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              const files = [...event.target.files];
              onChange(files);
              setPreviews(files.map((file) => URL.createObjectURL(file)));
            }}
          />
          <label htmlFor="picture">
            <IconButton component="span">
              <Image fontSize="large" />
            </IconButton>
          </label>
          {previews.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              {previews.map((src, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "1px solid #ccc",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
          {errors.files && (
            <Typography color="error">{errors.files.message}</Typography>
          )}
        </Box>
      )}
    />
  );
};

export default FileFieldCustom;
