import React from "react";
import { render, screen } from "@testing-library/react";

import CampusPage from "../CampusPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders campus page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CampusPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("campus-datatable")).toBeInTheDocument();
    expect(screen.getByRole("campus-add-button")).toBeInTheDocument();
});
