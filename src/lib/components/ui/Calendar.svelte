<script>
    import MonthView from "./MonthView.svelte";
    import WeekView from "./WeekView.svelte";

    let { view } = $props();
    let currentDay = $state(new Date());

    $inspect(currentDay);
    const nextMonth = () => {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
    };

    const prevMonth = () => {
        currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1);
    };
</script>

<section class="calendar">
    <nav>
        <button onclick={prevMonth} type="button" class="bg-glass backdrop-blur-lg px-8 py-2 cursor-pointer"
            >Prev</button
        >
        <button onclick={nextMonth} type="button" class="bg-glass backdrop-blur-lg px-8 py-2 cursor-pointer"
            >Next</button
        >
    </nav>
    <main>
        {#if view === "week"}
            <WeekView />
        {:else}
            <MonthView {currentDay} />
        {/if}
    </main>
</section>
