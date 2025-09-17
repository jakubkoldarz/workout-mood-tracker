<script>
    import { scale } from "svelte/transition";
    import MonthDay from "./MonthDay.svelte";

    let { row, rowIndex } = $props();
</script>

<div class="month-row grid grid-cols-7 w-full gap-4 min-h-[100px]">
    {#each row as day, index (day.id)}
        <div in:scale={{ duration: 200, delay: day.index * 10 }}>
            <MonthDay {day} />
        </div>
    {/each}
</div>
