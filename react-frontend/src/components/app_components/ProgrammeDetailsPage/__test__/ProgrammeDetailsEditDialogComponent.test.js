import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeDetailsEditDialogComponent from "../ProgrammeDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmeDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmeDetails-edit-dialog-component")).toBeInTheDocument();
});
