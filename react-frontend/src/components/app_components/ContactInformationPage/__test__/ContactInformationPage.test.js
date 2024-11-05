import React from "react";
import { render, screen } from "@testing-library/react";

import ContactInformationPage from "../ContactInformationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders contactInformation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContactInformationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contactInformation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("contactInformation-add-button")).toBeInTheDocument();
});
