import { Grid2 as Grid, Stack } from "@mui/material";
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
import DataMap, { IMapReturnData } from "../../../components/Map/DataMap";
import FileFieldCustom from "../../../components/Forms/Inputs/FileFieldCustom";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_MAP_DATA: IMapReturnData = {
  coords: [43.23751463756601, 76.90362260589355],
  street: "",
  building: "",
};

const PublicationCreate = () => {
  const [postRoom, { isLoading }] = useCreateRoomMutation();

  const [mapData, setMapData] = useState<IMapReturnData>(DEFAULT_MAP_DATA);

  const updateMapData = useCallback((newData: IMapReturnData) => {
    setMapData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const formMethods = useForm<IRoom>({
    defaultValues: {
      title: "Название",
      price: "500000",
      priceUnit: "PER_MONTH",
      physControlInstructions: "",
      accessInstructions: "",
      street: "",
      building: "",
      appartment: "",
      isCommercial: false,
      hasDeposit: false,
      square: 25,
      lat: 43.23751463756601,
      lon: 76.90362260589355,
      roomTypeId: "fsd",
      cityId: "",
      districtId: "",
      sections: [],
      files: undefined,
    },
  });

  const { setValue } = formMethods;

  const onSubmit: SubmitHandler<IRoom> = (data) => {
    const formData = new FormData();
    console.log(data);

    if (data.files) {
      formData.append("files", data.files);
    }

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        return;
      }
      formData.append(key, data[key as keyof IRoom] as string);
    });

    postRoom(formData);
  };

  useEffect(() => {
    setValue("lat", mapData.coords[0]);
    setValue("lon", mapData.coords[1]);
    if (mapData.street) setValue("street", mapData.street);
    if (mapData.building) setValue("building", mapData.building);
  }, [mapData]);

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
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom name={"title"} label={"Название"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"price"} label={"Цена"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <PriceUnit />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"street"} label={"Улица"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom
                name={"building"}
                label={"Номер дома"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"appartment"} label={"Квартира"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <NumberFieldCustom name={"square"} label={"Площадь"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SwitchFieldCustom
                name={"isCommercial"}
                label={"Подходит для коммерции"}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SwitchFieldCustom
                name={"hasDeposit"}
                label={"Нужен депозит"}
                required
              />
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom
                name={"roomTypeId"}
                label={"Room Type ID"}
                required
              />
            </Grid> */}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CitiesField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <DistrictsField />
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"sections"} label={"Sections"} />
            </Grid> */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom
                name={"physControlInstructions"}
                label={"Инструкции для физической проверки"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom
                name={"accessInstructions"}
                label={"Инструкции для доступа"}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FileFieldCustom />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DataMap setCoords={updateMapData} coords={mapData.coords} />
            </Grid>
          </Grid>
        </FormContainer>
      </FormProvider>
    </Page>
  );
};

export default PublicationCreate;
