import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import { navPrimaryLinks } from "@/constants";

import Header from "@/components/ui/Header";

describe("Header", () => {
  it("header component was rendered", () => {
    render(<Header />, { wrapper: BrowserRouter });
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
  });

  it("header contains primary links", () => {
    render(<Header />, { wrapper: BrowserRouter });

    navPrimaryLinks.forEach((link) => {
      const linkEl = screen.queryAllByText(link.title);
      expect(linkEl[0].textContent).toBe(link.title);
    });
  });
});
