import { getResponseCompare, getRentTypeCompare, getRoomStatusCompare } from "../compare";
import { t } from "i18next";
import { priceUnit, roomStatus, userAuth } from "../../config/dictionaries";

// Mock i18next t function
jest.mock("i18next", () => ({
    t: jest.fn(),
}));

describe("compare utils", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getResponseCompare", () => {
        it("should call t with correct key and namespace", () => {
            (t as unknown as jest.Mock).mockReturnValue("translated");
            const key = Object.keys(userAuth)[0] as keyof typeof userAuth;
            const result = getResponseCompare(key);
            expect(t).toHaveBeenCalledWith(userAuth[key], { ns: "components" });
            expect(result).toBe("translated");
        });

        it("should return label if t returns falsy value", () => {
            (t as unknown as jest.Mock).mockReturnValue("");
            const key = Object.keys(userAuth)[0] as keyof typeof userAuth;
            const result = getResponseCompare(key);
            expect(result).toBe(key);
        });
    });

    describe("getRentTypeCompare", () => {
        it("should call t with correct key and namespace", () => {
            (t as unknown as jest.Mock).mockReturnValue("translated");
            const key = Object.keys(priceUnit)[0] as keyof typeof priceUnit;
            const result = getRentTypeCompare(key);
            expect(t).toHaveBeenCalledWith(priceUnit[key], { ns: "components" });
            expect(result).toBe("translated");
        });

        it("should return label if t returns falsy value", () => {
            (t as unknown as jest.Mock).mockReturnValue("");
            const key = Object.keys(priceUnit)[0] as keyof typeof priceUnit;
            const result = getRentTypeCompare(key);
            expect(result).toBe(key);
        });
    });

    describe("getRoomStatusCompare", () => {
        it("should call t with correct key and namespace", () => {
            (t as unknown as jest.Mock).mockReturnValue("translated");
            const key = Object.keys(roomStatus)[0] as keyof typeof roomStatus;
            const result = getRoomStatusCompare(key);
            expect(t).toHaveBeenCalledWith(roomStatus[key], { ns: "components" });
            expect(result).toBe("translated");
        });

        it("should return label if t returns falsy value", () => {
            (t as unknown as jest.Mock).mockReturnValue("");
            const key = Object.keys(roomStatus)[0] as keyof typeof roomStatus;
            const result = getRoomStatusCompare(key);
            expect(result).toBe(key);
        });
    });
});