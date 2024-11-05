import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammeDetailsPage from "../ProgrammeDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmeDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammeDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmeDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("programmeDetails-add-button")).toBeInTheDocument();
});
