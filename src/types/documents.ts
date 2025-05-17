export interface IDocument {
  id: string;
  xml: string;
  base64Xml: string;
  status: "CREATED" | "SIGNED_BY_LANDLORD" | "SIGNED";
  rentId: string;
  createdDate: string;
  landlordCommonName: string;
  landlordIIN: string;
  renterCommonName: string;
  renterIIN: string;
}
