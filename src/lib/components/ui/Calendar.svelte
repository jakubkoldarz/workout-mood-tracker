<script>
    import MonthView from "./MonthView.svelte";
    import WeekView from "./WeekView.svelte";

    let { view } = $props();
    // let currentDay = $state(new Date("2025-07-01"));
    let currentDay = $state(new Date());
</script>

<section class="calendar">
    <nav>
        <button type="button" class="bg-glass backdrop-blur-lg px-8 py-2 cursor-pointer">Prev</button>
        <button type="button" class="bg-glass backdrop-blur-lg px-8 py-2 cursor-pointer">Next</button>
    </nav>
    <main>
        {#if view === "week"}
            <WeekView />
        {:else}
            <MonthView {currentDay} />
        {/if}
    </main>
</section>
