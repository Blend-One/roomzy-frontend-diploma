export interface ISpace {
    id: string;
    image: string;
    title: string;
    price: number;
    location: string;
  }

export interface IRentalData extends ISpace {
    onMoreDetails: () => void;
  }
  
  
export interface TSpacesSearchParams {
    rentType?: ERentType;
    priceFrom?: number;
    priceTo?: number;
};

type ERentType = "DAY" |"MONTH" | "HOUR"

  