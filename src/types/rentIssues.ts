export interface IModerationsIssues {
  controversialIssues: IRentIssues[];
  rentId: string;
}
export interface IRentIssues {
  id: string;
  roomId: string;
  rentId: string;
  imageId: string;
  description: string;
  date: string;
}
