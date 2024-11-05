import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeDetailsCreateDialogComponent from "../ProgrammeDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmeDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmeDetails-create-dialog-component")).toBeInTheDocument();
});
