import { describe, expect, it, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DiaryDemo } from "@/components/demos/diary-demo";
import { AskTwinDemo } from "@/components/demos/ask-twin-demo";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { diary } from "@/content/copy";

vi.mock("sonner", () => ({ toast: { success: vi.fn() } }));

/** Advance fake time in small steps so React flushes effects between phases. */
async function advance(ms: number, step = 100) {
  for (let t = 0; t < ms; t += step) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(step);
    });
  }
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("<DiaryDemo />", () => {
  it("plays the sample entry and toggles My words / Polished", async () => {
    vi.useFakeTimers();
    render(<DiaryDemo />);
    const mic = screen.getByTestId("diary-mic");
    expect(mic).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(mic);
    expect(mic).toHaveAttribute("aria-pressed", "true");

    await advance(15_000);
    expect(screen.getByTestId("diary-entry")).toBeInTheDocument();
    expect(screen.getByText(diary.demo.entry.date)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("diary-toggle-polished"));
    await advance(1000);
    expect(screen.getByTestId("diary-toggle-polished")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(diary.demo.polished)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("diary-replay"));
    await advance(1000);
    expect(screen.queryByTestId("diary-entry")).not.toBeInTheDocument();
  });
});

describe("<AskTwinDemo />", () => {
  it("answers an example question with a source memory", async () => {
    vi.useFakeTimers();
    render(<AskTwinDemo />);
    fireEvent.click(screen.getByTestId("twin-chip-gym"));
    expect(screen.getByTestId("twin-chip-idea")).toBeDisabled();

    await advance(10_000);
    expect(screen.getByTestId("twin-answer")).toHaveTextContent(/Gold's Gym, Prahlad Nagar/);
    expect(screen.getByText(/Location memory/)).toBeInTheDocument();
    expect(screen.getByTestId("twin-chip-idea")).toBeEnabled();
  });
});

describe("<WaitlistForm />", () => {
  it("shows a validation error and does not submit an invalid email", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<WaitlistForm variant="inline" />);
    await user.type(screen.getByLabelText(/email address/i), "nope");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits and shows the success state", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ status: "joined" }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<WaitlistForm variant="full" />);
    await user.type(screen.getByLabelText(/email address/i), "Me@Example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));
    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument();
    expect(screen.getByText(/me@example.com/)).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.email).toBe("me@example.com");
  });

  it("shows the already-joined state", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ status: "already_joined" }) }),
    );
    const user = userEvent.setup();
    render(<WaitlistForm variant="inline" />);
    await user.type(screen.getByLabelText(/email address/i), "a@b.co");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));
    expect(await screen.findByText(/already on the list/i)).toBeInTheDocument();
  });
});
