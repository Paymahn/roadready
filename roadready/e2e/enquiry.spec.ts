import { test, expect } from "./fixtures";

// Mocked CRM/Meta success response — the suite never touches real services.
const ok = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({ success: true, leadStored: true }),
};

test.describe("enquiry submission (money path)", () => {
  test("inline homepage form submits and shows success", async ({ page }) => {
    await page.route("**/api/enquiry", (route) => route.fulfill(ok));
    await page.goto("/");

    // Scope to the inline form (its name placeholder is unique to it).
    const form = page.locator("form").filter({ has: page.getByPlaceholder("Your full name *") });
    await form.getByPlaceholder("Your full name *").fill("Test Tester");
    await form.getByPlaceholder("Phone number *").fill("07700900123");
    await form.getByRole("button").click();

    await expect(page.getByRole("heading", { name: /enquiry received/i })).toBeVisible();
  });

  test("modal form submits and shows success", async ({ page }) => {
    await page.route("**/api/enquiry", (route) => route.fulfill(ok));
    await page.goto("/");

    await page.getByRole("button", { name: /get free quote/i }).first().click();
    await expect(page.getByRole("heading", { name: /get your free quote/i })).toBeVisible();

    // Scope to the modal's form (the inline form also has name/phone labels now).
    const modalForm = page.locator("form").filter({ has: page.getByRole("button", { name: /send enquiry/i }) });
    await modalForm.getByLabel(/full name/i).fill("Test Tester");
    await modalForm.getByLabel(/phone number/i).fill("07700900123");
    await modalForm.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByRole("heading", { name: /enquiry sent/i })).toBeVisible();
  });

  test("inline form surfaces a server error to the user", async ({ page }) => {
    await page.route("**/api/enquiry", (route) =>
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ error: "Too many requests. Please try again shortly." }),
      }),
    );
    await page.goto("/");

    const form = page.locator("form").filter({ has: page.getByPlaceholder("Your full name *") });
    await form.getByPlaceholder("Your full name *").fill("Test Tester");
    await form.getByPlaceholder("Phone number *").fill("07700900123");
    await form.getByRole("button").click();

    // Scope to the form's error text — Next injects its own role="alert" route announcer.
    await expect(form.getByText(/too many requests/i)).toBeVisible();
  });
});
