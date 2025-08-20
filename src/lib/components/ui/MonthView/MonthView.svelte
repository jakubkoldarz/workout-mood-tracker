<script>
    import { getMonthRows } from "$lib/utils/date";
    import { getContext } from "svelte";
    import Modal from "../Modal.svelte";
    import MonthRow from "./MonthRow.svelte";

    let { currentDay } = $props();
    const monthRows = $derived(getMonthRows(currentDay));
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<div class="calendar-view flex justify-center flex-wrap max-w-[1400px] mx-auto mt-4 gap-4">
    <div class="w-full grid grid-cols-7">
        {#each weekDays as day}
            <div class="text-center">{day}</div>
        {/each}
    </div>
    {#each monthRows as row}
        <MonthRow {row} />
    {/each}
</div>

<Modal />
