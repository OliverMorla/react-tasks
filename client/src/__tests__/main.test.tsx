/* eslint-disable @typescript-eslint/no-unused-vars */
import { it, expect, describe, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Mock DOM structure", () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
            name="description"
            content="React Tasks is a way to easily manage your tasks and collaborate with your team."
            />
            <meta
            name="keywords"
            content="React, Tasks, Task Manager, Collaboration, Team, Management"
            />
            <meta name="author" content="React Tasks" />
            <meta name="creator" content="Oliver Morla" />
            <link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
            />
            <title>React Tasks</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
        </body>
        </html>
        `;
  });

  it("Should have a root element before React app is injected into DOM", () => {
    const root = document.getElementById("root");
    expect(root).not.toBeNull();
    expect(root).toBeInstanceOf(HTMLElement);
  });
});
