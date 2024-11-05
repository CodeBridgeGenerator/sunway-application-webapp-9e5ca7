import React from "react";
import { render, screen } from "@testing-library/react";

import SchoolPage from "../SchoolPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders school page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SchoolPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("school-datatable")).toBeInTheDocument();
    expect(screen.getByRole("school-add-button")).toBeInTheDocument();
});
