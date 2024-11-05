import React from "react";
import { render, screen } from "@testing-library/react";

import TermsandconditionsCreateDialogComponent from "../TermsandconditionsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders termsandconditions create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TermsandconditionsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("termsandconditions-create-dialog-component")).toBeInTheDocument();
});
