import { Grid2 as Grid, Typography } from "@mui/material";
import AccountWrapperWidget from "../../../../widgets/AccountWrapperWidget";
import Page from "../../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../../../../components/Forms/FormContainer";
import TextFieldCustom from "../../../../components/Forms/Inputs/TextFieldCustom";
import { ICreateRoomTypes } from "../../../../types/roomTypes";
import { useCreateRoomTypesMutation } from "../../../../services/roomTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const RoomTypesCreate = () => {
  const [postTypes, { isLoading, isSuccess }] = useCreateRoomTypesMutation();
  const navigate = useNavigate();

  const formMethods = useForm<ICreateRoomTypes>({
    defaultValues: {
      fallbackName: "",
      ru: "",
      kz: "",
      sectionIds: [],
    },
  });

  const onSubmit: SubmitHandler<ICreateRoomTypes> = (data) => {
    data.fallbackName = data.ru;
    postTypes(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/account/room-types");
    }
  }, [isSuccess, navigate]);

  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <FormProvider {...formMethods}>
          <FormContainer
            onSubmit={onSubmit}
            isLoading={isLoading}
            formId={"create-worker-form"}
          >
            <Typography variant="h5">Создание типа помещения</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldCustom name={"ru"} label={"Название (RU)"} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldCustom name={"kz"} label={"Название (KZ)"} required />
              </Grid>
            </Grid>
          </FormContainer>
        </FormProvider>
      </AccountWrapperWidget>
    </Page>
  );
};

export default RoomTypesCreate;
