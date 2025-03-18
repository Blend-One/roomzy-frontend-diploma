import { Grid2 as Grid } from "@mui/material";
import Page from "../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IRoom } from "../../../types/rooms";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import NumberFieldCustom from "../../../components/Forms/Inputs/NumberFieldCustom";
import SwitchFieldCustom from "../../../components/Forms/Inputs/SwitchFieldCustom";
import FormContainer from "../../../components/Forms/FormContainer";
import { useCreateRoomMutation } from "../../../services/rooms";
import CitiesField from "../../../components/Forms/CitiesField";
import DistrictsField from "../../../components/Forms/DistrictsField";
import PriceUnit from "../../../components/Forms/Inputs/PriceUnit";

const PublicationCreate = () => {
  const [postRoom, { isLoading }] = useCreateRoomMutation();

  const formMethods = useForm<IRoom>({
    defaultValues: {
      title: "",
      price: "",
      priceUnit: "",
      physControlInstructions: "",
      accessInstructions: "",
      street: "",
      building: 1,
      appartment: "",
      isCommercial: false,
      hasDeposit: false,
      square: 1,
      lat: "1",
      lon: "1",
      roomTypeId: "",
      cityId: "",
      districtId: "",
      sections: [],
    },
  });

  // const {
  //   formState: { isValid },
  // } = formMethods;

  const onSubmit: SubmitHandler<IRoom> = (data) => {
    postRoom(data);
  };

  return (
    <Page withPadding>
      <FormProvider {...formMethods}>
        <FormContainer
          onSubmit={onSubmit}
          isLoading={isLoading}
          formId={"create-worker-form"}
          // btnDisabled={!isValid}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"title"} label={"Название"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"price"} label={"Цена"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <PriceUnit />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"street"} label={"Street"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <NumberFieldCustom
                name={"building"}
                label={"Building"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"appartment"} label={"Apartment"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SwitchFieldCustom
                name={"isCommercial"}
                label={"Is Commercial"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SwitchFieldCustom
                name={"hasDeposit"}
                label={"Has Deposit"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <NumberFieldCustom name={"square"} label={"Square"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom
                name={"roomTypeId"}
                label={"Room Type ID"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CitiesField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <DistrictsField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"sections"} label={"Sections"} />
            </Grid>
          </Grid>
        </FormContainer>
      </FormProvider>
    </Page>
  );
};

export default PublicationCreate;
