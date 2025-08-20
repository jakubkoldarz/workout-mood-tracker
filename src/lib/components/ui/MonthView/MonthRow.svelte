<script>
    import MonthDay from "./MonthDay.svelte";

    let { row } = $props();
</script>

<div class="month-row grid grid-cols-7 w-full gap-4 min-h-[100px]">
    {#each row as day}
        <MonthDay {day} />
    {/each}
</div>
