import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalInformationEditDialogComponent from "../PersonalInformationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalInformation edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalInformationEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalInformation-edit-dialog-component")).toBeInTheDocument();
});
