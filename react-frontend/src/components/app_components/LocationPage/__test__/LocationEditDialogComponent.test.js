import React from "react";
import { render, screen } from "@testing-library/react";

import LocationEditDialogComponent from "../LocationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders location edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LocationEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("location-edit-dialog-component")).toBeInTheDocument();
});
