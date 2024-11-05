import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalInformationCreateDialogComponent from "../PersonalInformationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalInformation create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalInformationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalInformation-create-dialog-component")).toBeInTheDocument();
});
