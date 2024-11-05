import React from "react";
import { render, screen } from "@testing-library/react";

import TermsandconditionsPage from "../TermsandconditionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders termsandconditions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TermsandconditionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("termsandconditions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("termsandconditions-add-button")).toBeInTheDocument();
});
