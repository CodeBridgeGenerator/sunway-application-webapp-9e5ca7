import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalInformationPage from "../PersonalInformationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalInformation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalInformationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalInformation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("personalInformation-add-button")).toBeInTheDocument();
});
