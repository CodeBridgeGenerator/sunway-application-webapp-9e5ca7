import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammePage from "../ProgrammePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programme page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programme-datatable")).toBeInTheDocument();
    expect(screen.getByRole("programme-add-button")).toBeInTheDocument();
});
