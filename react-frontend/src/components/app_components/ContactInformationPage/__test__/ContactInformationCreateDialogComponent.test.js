import React from "react";
import { render, screen } from "@testing-library/react";

import ContactInformationCreateDialogComponent from "../ContactInformationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders contactInformation create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContactInformationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contactInformation-create-dialog-component")).toBeInTheDocument();
});
