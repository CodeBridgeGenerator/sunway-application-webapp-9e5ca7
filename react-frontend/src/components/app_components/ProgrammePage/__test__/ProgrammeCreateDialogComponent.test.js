import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeCreateDialogComponent from "../ProgrammeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programme create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programme-create-dialog-component")).toBeInTheDocument();
});
