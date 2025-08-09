import { createMachine, fromPromise, setup } from "xstate";

export const viewMachine = setup({}).createMachine({
    id: "view",
    initial: "week",
    states: {
        week: {
            on: {
                CHANGE_VIEW: "month",
            },
        },
        month: {
            on: {
                CHANGE_VIEW: "week",
            },
        },
    },
});
