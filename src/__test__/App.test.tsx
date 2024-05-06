import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import TubeStatus from "../components/tube-status/TubeStatus";
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<TubeStatus />);
    const h1 = await screen.queryByText("TFL TUBE STATUS");

    // Expectations
    expect(h1).not.toBeNull();
  });
});
