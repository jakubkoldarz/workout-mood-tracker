<script>
    import { scale } from "svelte/transition";
    import { modalState } from "$lib/monthModal.svelte.js";
    import Modal from "../Modal.svelte";

    let { day, dayIndex } = $props();
    let element = $state();

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
            {#if day.hasData}
                <div class="data-indicator"></div>
            {/if}
        </button>
    {:else}
        <div type="button" class={["month-day", "empty-day"]} in:scale={{ duration: 200, delay: dayIndex * 10 }}></div>
    {/if}
{/key}
