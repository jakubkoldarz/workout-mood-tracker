<script>
    import { getMonthRows } from "$lib/utils/date";
    import MonthRow from "./MonthRow.svelte";

    let { currentDay } = $props();
    const monthRows = $derived(getMonthRows(currentDay));
</script>

<div class="calendar-view flex justify-center flex-wrap max-w-[1400px] mx-auto mt-4 gap-4">
    {#each monthRows as row}
        <MonthRow {row} />
    {/each}
</div>
