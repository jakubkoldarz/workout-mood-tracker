<script>
    import MonthView from "./MonthView/MonthView.svelte";
    import WeekView from "./WeekView/WeekView.svelte";

    let { view } = $props();
    let currentDay = $state(new Date());

    const nextMonth = () => {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
    };

    const prevMonth = () => {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1);
    };
</script>

<section class="calendar">
    <nav class="flex justify-center gap-4 items-center">
        <button onclick={prevMonth} type="button" class="button">Prev</button>
        <span class="w-32 text-center text-lg">
            {currentDay.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button onclick={nextMonth} type="button" class="button">Next</button>
    </nav>
    <main>
        {#if view === "week"}
            <WeekView />
        {:else}
            <MonthView {currentDay} />
        {/if}
    </main>
</section>
