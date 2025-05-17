import { ITokenData } from "../../types/token";
import { getUserFullNameOrEmail } from "../user";

describe("getUserFullNameOrEmail", () => {
  it("returns full name when both firstName and lastName are present", () => {
    const data: ITokenData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      iat: 0,
      exp: 0,
      jwtid: "",
      id: "",
      role: "ADMIN",
      avatarImageUrl: null,
      phone: "",
      status: "",
    };
    expect(getUserFullNameOrEmail(data)).toBe("John Doe");
  });

  it("returns email when firstName is missing", () => {
    const data: ITokenData = {
      firstName: "",
      lastName: "Doe",
      email: "john.doe@example.com",
      iat: 0,
      exp: 0,
      jwtid: "",
      id: "",
      role: "ADMIN",
      avatarImageUrl: null,
      phone: "",
      status: "",
    };
    expect(getUserFullNameOrEmail(data)).toBe("john.doe@example.com");
  });

  it("returns email when lastName is missing", () => {
    const data: ITokenData = {
      firstName: "John",
      lastName: "",
      email: "john.doe@example.com",
      iat: 0,
      exp: 0,
      jwtid: "",
      id: "",
      role: "ADMIN",
      avatarImageUrl: null,
      phone: "",
      status: "",
    };
    expect(getUserFullNameOrEmail(data)).toBe("john.doe@example.com");
  });

  it("returns email when both firstName and lastName are missing", () => {
    const data: ITokenData = {
      firstName: "",
      lastName: "",
      email: "john.doe@example.com",
      iat: 0,
      exp: 0,
      jwtid: "",
      id: "",
      role: "ADMIN",
      avatarImageUrl: null,
      phone: "",
      status: "",
    };
    expect(getUserFullNameOrEmail(data)).toBe("john.doe@example.com");
  });
});
