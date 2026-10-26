
import { describe, expect, it } from "vitest";
import {
  authenticateDemo,
  createDemoData,
  validateEmail,
  validatePassword,
} from "../src/auth.js";

describe("Email validation", () => {
  it("accepts a basic valid email", () => {
    expect(validateEmail("ayse@example.test")).toBe(true);
  });

  it("rejects malformed email addresses", () => {
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("ayse @example.test")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});

describe("Password validation", () => {
  it("accepts a password in the demo length range", () => {
    expect(validatePassword("DemoAyse123!")).toBe(true);
  });

  it("rejects passwords outside the permitted length", () => {
    expect(validatePassword("short")).toBe(false);
    expect(validatePassword("x".repeat(129))).toBe(false);
  });
});

describe("Demo authentication", () => {
  it("accepts the first local demo account", () => {
    const result = authenticateDemo(
      "ayse@example.test",
      "DemoAyse123!",
    );

    expect(result.ok).toBe(true);
    expect(result.user.email).toBe("ayse@example.test");
  });

  it("accepts the second local demo account", () => {
    const result = authenticateDemo(
      "mehmet@example.test",
      "DemoMehmet123!",
    );

    expect(result.ok).toBe(true);
    expect(result.user.email).toBe("mehmet@example.test");
  });

  it("uses the same message for invalid account and password", () => {
    const unknownEmail = authenticateDemo(
      "unknown@example.test",
      "WrongPass123!",
    );

    const wrongPassword = authenticateDemo(
      "ayse@example.test",
      "WrongPass123!",
    );

    expect(unknownEmail.ok).toBe(false);
    expect(wrongPassword.ok).toBe(false);
    expect(unknownEmail.message).toBe(
      "Bu e-posta veya parola hatalı",
    );
    expect(wrongPassword.message).toBe(
      "Bu e-posta veya parola hatalı",
    );
  });
});

describe("User data isolation", () => {
  it("creates separate data for each user", () => {
    const ayseData = createDemoData("ayse@example.test");
    const mehmetData = createDemoData("mehmet@example.test");

    ayseData.items.push("Ayse-only-record");

    expect(ayseData.ownerEmail).toBe("ayse@example.test");
    expect(mehmetData.ownerEmail).toBe("mehmet@example.test");
    expect(mehmetData.items).toEqual([]);
    expect(mehmetData.items).not.toContain("Ayse-only-record");
    expect(ayseData).not.toBe(mehmetData);
    expect(ayseData.items).not.toBe(mehmetData.items);
  });
});
