import React from "react";
import { render, screen } from "@testing-library/react";

import IntakePage from "../IntakePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders intake page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IntakePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("intake-datatable")).toBeInTheDocument();
    expect(screen.getByRole("intake-add-button")).toBeInTheDocument();
});
