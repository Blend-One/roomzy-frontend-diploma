import Page from "../../../components/Page";
import {
  Button,
  Grid2 as Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormContainer from "../../../components/Forms/FormContainer";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import { useParams } from "react-router";
import OneFileFieldCustom from "../../../components/Forms/Custom/OneFileFieldCustom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { usePostIssuesMutation } from "../../../services/rentIssues";

const transformToFormData = (data: {
  id: string;
  data: { file: File; description: string }[];
}) => {
  const formData = new FormData();

  // Добавляем файлы в виде отдельных полей "files"
  data.data.forEach((item) => {
    if (item.file) {
      formData.append("files", item.file);
    }
  });

  const descriptions = data.data.map(({ description }) => ({ description }));
  formData.append("descriptions", JSON.stringify(descriptions));

  return formData;
};

const CreateRentIssues = () => {
  const { id } = useParams();
  const [postIssues] = usePostIssuesMutation();
  const formMethods = useForm({
    defaultValues: {
      data: [
        {
          file: null,
          description: "",
        },
      ],
    },
  });

  const { control } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit = (data: {
    id: string;
    data: { file: File; description: string }[];
  }) => {
    const formData = transformToFormData(data);
    postIssues({ id: id ?? "", data: formData });
    console.log(formData);
  };

  return (
    <Page withPadding>
      <FormProvider {...formMethods}>
        <FormContainer
          isLoading={false}
          onSubmit={onSubmit}
          formId={"create-issues"}
        >
          <Typography variant="h5">Создание типа помещения</Typography>
          <Grid spacing={2} container>
            {fields.map((row, index) => (
              <Grid key={row.id} spacing={2} size={{ xs: 12, sm: 6, md: 3 }}>
                <Stack spacing={1} direction="row">
                  <Stack>
                    <OneFileFieldCustom name={`data.${index}.file`} />
                    <TextFieldCustom
                      sx={{
                        borderRadius: "0 0 8px 8px",
                        marginTop: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "black",
                            borderRadius: "0 0 8px 8px",
                          },
                        },
                      }}
                      name={`data.${index}.description`}
                      label={"Описание"}
                      required
                    />
                  </Stack>
                  <Stack>
                    <IconButton
                      disabled={fields.length <= 1}
                      color="error"
                      aria-label="add an alarm"
                    >
                      <DeleteIcon onClick={() => remove(index)} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Grid spacing={2} size={{ xs: 4 }}>
            <Stack>
              <Button
                variant="contained"
                disabled={fields.length >= 10}
                startIcon={<AddIcon />}
                onClick={() => append({ file: null, description: "" })}
              >
                Добавить ещё замечание
              </Button>
            </Stack>
          </Grid>
        </FormContainer>
      </FormProvider>
    </Page>
  );
};

export default CreateRentIssues;
