import React from "react";
import { render, screen } from "@testing-library/react";

import LocationPage from "../LocationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders location page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LocationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("location-datatable")).toBeInTheDocument();
    expect(screen.getByRole("location-add-button")).toBeInTheDocument();
});
