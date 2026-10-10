import { expect, test } from "@playwright/test";

test.describe("MindTwin smoke test", () => {
  test("home page loads", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto("/");
    await expect(page).toHaveTitle(/MindTwin — Your mind, remembered\./);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your mind,");
    await expect(page.getByRole("link", { name: /join (the )?waitlist/i }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("navigation works", async ({ page, isMobile }) => {
    await page.goto("/");
    const targets = [
      { name: "Features", url: /\/features$/, h1: /memory that works/i },
      { name: "Pricing", url: /\/pricing$/, h1: /honest pricing/i },
      { name: "About", url: /\/about$/, h1: /think more/i },
    ];
    for (const t of targets) {
      if (isMobile) {
        await page.getByRole("button", { name: /open menu/i }).click();
        await page.getByRole("dialog").getByRole("link", { name: t.name, exact: true }).click();
      } else {
        await page
          .getByRole("navigation", { name: "Main" })
          .getByRole("link", { name: t.name, exact: true })
          .click();
      }
      await expect(page).toHaveURL(t.url);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(t.h1);
    }
  });

  test("Ask-your-twin chip produces an answer", async ({ page }) => {
    await page.goto("/#ask");
    await page.getByTestId("twin-chip-gym").click();
    await expect(page.getByTestId("twin-answer").last()).toContainText(
      "Gold's Gym, Prahlad Nagar",
      {
        timeout: 15_000,
      },
    );
    await expect(page.getByText(/Location memory/).first()).toBeVisible();
  });

  test("diary demo produces an entry card and toggles My words / Polished", async ({ page }) => {
    await page.goto("/#diary");
    await page.getByTestId("diary-mic").click();
    const entry = page.getByTestId("diary-entry");
    await expect(entry).toBeVisible({ timeout: 20_000 });
    await expect(entry).toContainText("Thursday, 9 October");

    const text = page.getByTestId("diary-text");
    await expect(text).toContainText("um,");
    await page.getByTestId("diary-toggle-polished").click();
    await expect(text).toHaveAttribute("data-mode", "polished");
    await expect(text).toContainText("Today was a good day.");
    await expect(text).not.toContainText("um,");

    await page.getByTestId("diary-toggle-mine").click();
    await expect(text).toHaveAttribute("data-mode", "mine");
    await expect(text).toContainText("um,");
  });

  test("waitlist form submits successfully", async ({ page }, testInfo) => {
    await page.goto("/waitlist");
    const form = page.getByTestId("waitlist-form-full");
    const email = `e2e+${testInfo.project.name}-${Date.now()}@example.com`;
    await form.getByLabel(/email address/i).fill(email);
    await form.getByLabel(/name/i).fill("E2E Tester");
    await form.getByLabel(/i am a/i).selectOption("founder");
    await form.getByText("Android", { exact: true }).click();
    await form.getByRole("button", { name: /join the waitlist/i }).click();
    const success = page.getByTestId("waitlist-success");
    await expect(success).toContainText("You're on the list!");
    await expect(success).toContainText(email);
  });

  test("unknown pages show the friendly 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Even your twin can't remember",
    );
  });
});
