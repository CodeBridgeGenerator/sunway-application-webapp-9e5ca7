import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeEditDialogComponent from "../ProgrammeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programme edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programme-edit-dialog-component")).toBeInTheDocument();
});
