<script>
    import { getMonthDays, daysToFill, getMonthRows } from "$lib/utils/date";
    import MonthDay from "./MonthDay.svelte";
    import MonthRow from "./MonthRow.svelte";

    let { currentDay } = $props();
    const monthRows = getMonthRows(currentDay);
    console.log(monthRows);
</script>

<div class="calendar-view flex justify-center gap-2">
    {#each Array(monthRows) as row}
        <MonthRow {row} />
    {/each}
</div>
