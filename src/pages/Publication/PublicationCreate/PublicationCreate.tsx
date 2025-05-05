/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid2 as Grid, Stack } from "@mui/material";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { ICreateRoom } from "../../../types/rooms";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import NumberFieldCustom from "../../../components/Forms/Inputs/NumberFieldCustom";
import SwitchFieldCustom from "../../../components/Forms/Inputs/SwitchFieldCustom";
import FormContainer from "../../../components/Forms/FormContainer";
import { useCreateRoomMutation } from "../../../services/rooms";
import CitiesField from "../../../components/Forms/Custom/CitiesField";
import DistrictsField from "../../../components/Forms/Custom/DistrictsField";
import PriceUnit from "../../../components/Forms/Custom/PriceUnit";
import DataMap, { IMapReturnData } from "../../../components/Map/DataMap";
import FileFieldCustom from "../../../components/Forms/Inputs/FileFieldCustom";
import { useCallback, useEffect, useState } from "react";
import RoomTypes from "../../../components/Forms/Custom/RoomTypes";
import SectionsBlock from "./SectionsBlock";
import { getSections } from "./tools/getSections";
import { useNavigate } from "react-router";

const DEFAULT_MAP_DATA: IMapReturnData = {
  coords: [43.23751463756601, 76.90362260589355],
  street: "",
  building: "",
};

interface SectionData {
  characteristicId: { value: string; label: string } | null;
  attributeId: { value: string; label: string } | null;
}

interface Section {
  sectionData: SectionData[];
  sectionId: { value: string; label: string };
}

interface Floor {
  sectionTypes: Section[];
  floorNumber: number;
}

function transformData(data: Floor[]): any {
  function traverse(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => traverse(item));
    } else if (typeof obj === "object" && obj !== null) {
      const transformed: Record<string, any> = {};

      for (const key in obj) {
        if (
          key === "sectionId" &&
          obj[key] &&
          typeof obj[key] === "object" &&
          "value" in obj[key]
        ) {
          transformed[key] = obj[key].value;
        } else if (
          (key === "characteristicId" || key === "attributeId") &&
          obj[key] &&
          typeof obj[key] === "object" &&
          "value" in obj[key]
        ) {
          transformed[key] = obj[key]?.value ?? null;
        } else {
          transformed[key] = traverse(obj[key]);
        }
      }

      return transformed;
    }
    return obj;
  }

  return traverse(data);
}

const PublicationCreate = () => {
  const [postRoom, { isLoading, isSuccess }] = useCreateRoomMutation();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState<IMapReturnData>(DEFAULT_MAP_DATA);

  const updateMapData = useCallback((newData: IMapReturnData) => {
    setMapData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const formMethods = useForm<ICreateRoom>({
    defaultValues: {
      title: "",
      price: "",
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
      roomTypeId: "",
      cityId: "",
      districtId: "",
      files: undefined,
      sections: [
        {
          floorNumber: 1,
          sectionTypes: [
            {
              sectionId: null,
              sectionData: [
                {
                  characteristicId: null,
                  attributeId: null,
                },
              ],
            },
          ],
        },
      ],
    },
  });
  const { setValue, control } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "sections",
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<ICreateRoom> = (data) => {
    const formData = new FormData();
    if (data.sections.length !== 0) {
      data.sections[0].floorNumber = 1;
    }

    const PAYLOAD = {
      ...data,
      sections: getSections(transformData(data.sections as unknown as Floor[])),
    };

    Object.keys(PAYLOAD).forEach((key) => {
      if (key === "files" && Array.isArray(PAYLOAD.files)) {
        Array.from(PAYLOAD.files).forEach((file) => {
          formData.append("files", file);
        });
      } else if (key === "sections") {
        formData.append(key, JSON.stringify(PAYLOAD.sections));
      } else {
        formData.append(key, PAYLOAD[key as keyof ICreateRoom] as string);
      }
    });

    postRoom(formData);
  };

  const handleAddFloor = () => {
    append({
      floorNumber: fields.length + 1,
      sectionTypes: [
        {
          sectionId: "",
          sectionData: [
            {
              characteristicId: "",
              attributeId: "",
            },
          ],
        },
      ],
    });
  };

  const handleDeleteFloor = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    setValue("lat", mapData.coords[0]);
    setValue("lon", mapData.coords[1]);
    if (mapData.street) setValue("street", mapData.street);
    if (mapData.building) setValue("building", mapData.building);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/account/publications");
    }
  }, [isSuccess, navigate]);

  return (
    <Stack sx={{ flexGrow: 1, px: 5 }}>
      <FormProvider {...formMethods}>
        <FormContainer
          onSubmit={onSubmit}
          isLoading={isLoading}
          formId={"create-worker-form"}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom name={"title"} label={"Название"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom name={"price"} label={"Цена"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <PriceUnit />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextFieldCustom name={"street"} label={"Улица"} required />
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
              <RoomTypes required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <SwitchFieldCustom
                name={"isCommercial"}
                label={"Подходит для коммерции"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <SwitchFieldCustom name={"hasDeposit"} label={"Нужен депозит"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <CitiesField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <DistrictsField />
            </Grid>
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
              <FileFieldCustom name="files" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2}>
                {fields.map((item, index) => (
                  <Stack
                    spacing={2}
                    key={item.id}
                    direction={"column"}
                    sx={{
                      border: "1px dashed gray",
                      padding: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      flexGrow={1}
                      p="8px 8px 0px 8px"
                    >
                      Этаж {index + 1}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteFloor(index)}
                      >
                        Удалить этаж
                      </Button>
                    </Stack>
                    <Stack
                      spacing={2}
                      sx={{
                        backgroundColor: "#fffsdf",
                        padding: 1,
                        // border: "1px solid black",
                      }}
                    >
                      <SectionsBlock control={control} index={index} />
                    </Stack>
                  </Stack>
                ))}
                <Button variant="contained" onClick={handleAddFloor}>
                  Добавить этаж
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DataMap setCoords={updateMapData} coords={mapData.coords} />
            </Grid>
          </Grid>
        </FormContainer>
      </FormProvider>
    </Stack>
  );
};

export default PublicationCreate;
