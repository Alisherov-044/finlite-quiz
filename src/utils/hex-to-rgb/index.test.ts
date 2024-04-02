import { hexToRgb } from ".";

describe("hex to rgb", () => {
    it("should convert hex color to rgb color", () => {
        expect(hexToRgb("#000")).toEqual([0, 0, 0]);
        expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
        expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
        expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
        expect(hexToRgb("#2d0b939a")).toEqual([45, 11, 147, 0.604]);
    });
});
