import { Grid2 as Grid, Typography } from "@mui/material";
import AccountWrapperWidget from "../../../../widgets/AccountWrapperWidget";
import Page from "../../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../../../../components/Forms/FormContainer";
import TextFieldCustom from "../../../../components/Forms/Inputs/TextFieldCustom";
import { ICreateRoomTypes } from "../../../../types/roomTypes";
import {
  useGetRoomTypesByIdQuery,
  useUpdateRoomTypesMutation,
} from "../../../../services/roomTypes";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const defaultValues: ICreateRoomTypes = {
  fallbackName: "",
  ru: "",
  kz: "",
  sectionIds: [],
};

const RoomTypesEdit = () => {
  const [postTypes, { isLoading, isSuccess }] = useUpdateRoomTypesMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRoomTypesByIdQuery(id || "");

  const formMethods = useForm<ICreateRoomTypes>({
    defaultValues: defaultValues,
    values: data,
  });

  const onSubmit: SubmitHandler<ICreateRoomTypes> = (data) => {
    postTypes({ id: id || "", data });
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
            btnText={"Редактировать"}
            formId={"create-worker-form"}
          >
            <Typography variant="h5">Редактирование типа помещения</Typography>
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

export default RoomTypesEdit;
