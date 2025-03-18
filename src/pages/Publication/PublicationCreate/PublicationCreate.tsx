import { Grid2 as Grid } from "@mui/material";
import Page from "../../../components/Page";
import { FormProvider, useForm } from "react-hook-form";
import { IRoom } from "../../../types/rooms";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import NumberFieldCustom from "../../../components/Forms/Inputs/NumberFieldCustom";

const PublicationCreate = () => {
  const formMethods = useForm<IRoom>({
    defaultValues: {
      id: "",
      title: "",
      price: "",
      priceUnit: "",
      street: "",
      building: 4,
      hasDeposit: false,
      isCommercial: false,
      square: 4,
    },
  });

  return (
    <Page withPadding>
      <FormProvider {...formMethods}>
        <Grid mt={3} container spacing={3}>
          <Grid size={12}>
            <TextFieldCustom name={"id"} label={"id"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"imageUrl"} label={"imageUrl"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"title"} label={"title"} />
          </Grid>
          <Grid size={12}>
            <NumberFieldCustom name={"price"} label={"price"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"priceUnit"} label={"priceUnit"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"street"} label={"street"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"building"} label={"building"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"hasDeposit"} label={"hasDeposit"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"isCommercial"} label={"isCommercial"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"square"} label={"square"} />
          </Grid>
          <Grid size={12}>
            <TextFieldCustom name={"floors"} label={"floors"} />
          </Grid>
        </Grid>
      </FormProvider>
    </Page>
  );
};

export default PublicationCreate;
