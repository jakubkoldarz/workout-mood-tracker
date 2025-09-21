<script>
    import { getMonthRows, getDateKey } from "$lib/utils/date";
    import { getContext } from "svelte";
    import { browser } from "$app/environment";
    import Modal from "../Modal.svelte";
    import MonthRow from "./MonthRow.svelte";
    import { modalState } from "$lib/monthModal.svelte.js";

    let { currentDay } = $props();
    const monthRows = $derived(getMonthRows(currentDay));

    let dataRefreshTrigger = $state(0);
    let wasModalVisible = $state(false);

    $effect(() => {
        if (wasModalVisible && !modalState.isModalVisible) {
            dataRefreshTrigger++;
        }
        wasModalVisible = modalState.isModalVisible;
    });

    const monthRowsWithData = $derived.by(() => {
        dataRefreshTrigger;

        return monthRows.map((row) =>
            row.map((day) => {
                if (!day?.date) return { ...day, hasData: false };

                const key = getDateKey(day.date);
                const data = localStorage.getItem(key);
                return { ...day, hasData: data && data !== '{"mood":null,"description":""}' && data !== "null", data };
            })
        );
    });
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<div class="calendar-view flex justify-center flex-wrap max-w-[1400px] mx-auto mt-4 gap-4">
    <div class="w-full grid grid-cols-7">
        {#each weekDays as day}
            <div class="text-center">{day}</div>
        {/each}
    </div>
    {#each monthRowsWithData as row, rowIndex}
        <MonthRow {row} {rowIndex} />
    {/each}
</div>

<Modal />
