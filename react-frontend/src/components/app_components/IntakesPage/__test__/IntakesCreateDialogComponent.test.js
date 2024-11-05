import React from "react";
import { render, screen } from "@testing-library/react";

import IntakesCreateDialogComponent from "../IntakesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders intakes create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IntakesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("intakes-create-dialog-component")).toBeInTheDocument();
});
