import { describe, it, expect } from "vitest";
import { hello } from "../src";

describe("hello", () => {
    it("should say hello", () => {
        expect(hello("Rifa")).toBe("Hello, Rifa!");
    });
});
