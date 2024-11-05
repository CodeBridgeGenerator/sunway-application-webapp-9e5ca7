import React from "react";
import { render, screen } from "@testing-library/react";

import LocationCreateDialogComponent from "../LocationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders location create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LocationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("location-create-dialog-component")).toBeInTheDocument();
});
