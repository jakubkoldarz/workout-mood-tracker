<script>
    import { scale } from "svelte/transition";
    import { modalState } from "$lib/monthModal.svelte.js";
    import Modal from "../Modal.svelte";

    let { day, dayIndex } = $props();
    let element = $state();
    let emoji = $derived.by(() => {
        if (!day?.hasData || !day.data) return null;
        try {
            const parsed = JSON.parse(day.data);
            return parsed.mood || null;
        } catch {
            return null;
        }
    });

    let hasWorkout = $derived.by(() => {
        if (!day?.hasData || !day.data) return false;
        try {
            const parsed = JSON.parse(day.data);
            return parsed.hasWorkout || false;
        } catch {
            return false;
        }
    });

    let workoutType = $derived.by(() => {
        if (!day?.hasData || !day.data) return null;
        try {
            const parsed = JSON.parse(day.data);
            return parsed.workoutType || null;
        } catch {
            return null;
        }
    });

    let workoutEmoji = $derived.by(() => {
        if (!workoutType) return null;
        const workoutEmojis = {
            gym: "🏋️",
            running: "🏃‍♂️",
            cycling: "🚴‍♂️",
            swimming: "🏊‍♂️",
            yoga: "🧘‍♀️",
            other: "⚡",
        };
        return workoutEmojis[workoutType] || "💪";
    });

    function toggleModal() {
        const rect = element.getBoundingClientRect();
        modalState.isModalVisible = true;
        modalState.coords = { x: rect.left - 25 + rect.width / 2, y: rect.top - 25 + rect.height / 2 };
        modalState.size = { x: rect.width, y: rect.height };
        modalState.date = day?.date || null;
        modalState.day = day.date?.getDate() || null;
    }
</script>

{#key day?.id}
    {#if day?.date}
        <button
            bind:this={element}
            type="button"
            onclick={toggleModal}
            class={["month-day", day.hasData ? "has-data" : ""]}
            in:scale={{ duration: 200, delay: dayIndex * 10 }}
        >
            <div class="text-2xl text-left pl-2">{day.date?.getDate()}</div>

            <!-- Data indicators container -->
            {#if day.hasData}
                <div class="indicators-container">
                    <!-- Mood indicator -->
                    {#if emoji}
                        <div class="mood-indicator">
                            {emoji}
                        </div>
                    {/if}

                    <!-- Workout indicator -->
                    {#if hasWorkout && workoutEmoji}
                        <div class="workout-indicator" title="Workout completed">
                            {workoutEmoji}
                        </div>
                    {/if}
                </div>
            {/if}
        </button>
    {:else}
        <div type="button" class={["month-day", "empty-day"]} in:scale={{ duration: 200, delay: dayIndex * 10 }}></div>
    {/if}
{/key}
