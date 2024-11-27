import { test, expect } from "@playwright/test";

import data from "../src/lib/stubs/users";

test.describe("SignInForm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/account/signin");
  });

  test("should display sign in form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Sign in or create an account" })
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByText("Forgot your password?")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("should allow user to sign in", async ({ page }) => {
    await page.fill('input[name="email"]', data.user.email);
    await page.fill('input[name="password"]', data.user.password);
    await page.click('button[type="submit"]');
    await page.waitForURL("http://localhost:5173");
  });

  test("should forbid user to sign in with invalid credentials", async ({
    page,
  }) => {
    await page.fill('input[name="email"]', data.user.email);
    await page.fill('input[name="password"]', "z0i8@IGY056");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
