import { test, expect } from "@playwright/test";

import data from "../src/lib/stubs/users";

test.describe("SignUpForm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/account/signup");
  });

  test("should display sign up form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Create your account" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Sarah")).toBeVisible();
    await expect(page.getByPlaceholder("Thomas")).toBeVisible();
    await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
  });

  test("should allow user to sign up", async ({ page }) => {
    await page.fill('input[name="firstName"]', "Sarah");
    await page.fill('input[name="lastName"]', "Thomas");
    await page.fill('input[name="email"]', "sarah@example.com");
    await page.fill('input[name="password"]', "z0i8@IGY056");
    await page.fill('input[name="passwordConfirmation"]', "z0i8@IGY056");
    await page.click('button[type="submit"]');
    await page.waitForURL("http://localhost:5173");
  });

  test("should forbid user to sign up", async ({ page }) => {
    await page.fill('input[name="firstName"]', "Sarah");
    await page.fill('input[name="lastName"]', "Thomas");
    await page.fill('input[name="email"]', data.user.email);
    await page.fill('input[name="password"]', "z0i8@IGY056");
    await page.fill('input[name="passwordConfirmation"]', "z0i8@IGY056");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Email already in use")).toBeVisible();
  });
});
