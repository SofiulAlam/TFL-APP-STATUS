import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import TubeStatus from "../components/tube-status/TubeStatus";
import statusService from "../services/status-service";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<TubeStatus />);
    const h1 = await screen.queryByText("TFL TUBE STATUS");

    // Expectations
    expect(h1).not.toBeNull();
  });

  it("renders correctly", () => {
    render(<TubeStatus />);
  });

  it("Should render tube line details correctly", async () => {
    // Mocking the API response
    global.fetch = async () => ({
      json: async () => [
        { id: "1", name: "Bakerloo", status: "Good Service" },
        { id: "2", name: "Central", status: "Good Service" },
      ],
    });
    // Setup
    render(<TubeStatus />);
    // Wait for the API call to resolve
    await screen.findAllByText("Bakerloo : Good Service");
    await screen.findAllByText("Central : Good Service");
    // Expectations
    const bakerlooElement = screen.getAllByText(/Bakerloo : Good Service/i);
    const centralElement = screen.getAllByText(/Central : Good Service/i);
    expect(bakerlooElement).toBeTruthy();
    expect(centralElement).toBeTruthy();
  });

  it("displays TFL logo", () => {
    render(<TubeStatus />);
    const logoElement = screen.getAllByAltText("TFL Logo");
    expect(logoElement).toBeTruthy();
  });
  it("displays tube lines without errors", async () => {
    render(<TubeStatus />);
    await waitFor(() => {
      expect(screen.queryByText("Error:")).toBeNull();
    });
  });
});
