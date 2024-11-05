import React from "react";
import { render, screen } from "@testing-library/react";

import IntakesPage from "../IntakesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders intakes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IntakesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("intakes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("intakes-add-button")).toBeInTheDocument();
});
