import React from "react";
import { render, screen } from "@testing-library/react";

import SchoolEditDialogComponent from "../SchoolEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders school edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchoolEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("school-edit-dialog-component")).toBeInTheDocument();
});
