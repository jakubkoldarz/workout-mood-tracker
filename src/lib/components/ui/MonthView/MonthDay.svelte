<script>
    import { scale } from "svelte/transition";
    import { modalState } from "$lib/monthModal.svelte.js";
    import Modal from "../Modal.svelte";

    let { day } = $props();
    let element = $state();

    function toggleModal() {
        const rect = element.getBoundingClientRect();
        modalState.isModalVisible = true;
        modalState.coords = { x: rect.left - 25 + rect.width / 2, y: rect.top - 25 + rect.height / 2 };
        modalState.size = { x: rect.width, y: rect.height };
        modalState.day = day.date?.getDate() || null;
    }
</script>

{#if day?.date}
    <button bind:this={element} type="button" onclick={toggleModal} class={["month-day"]}>
        <div class="text-2xl text-left pl-2">{day.date?.getDate()}</div>
    </button>
{:else}
    <div type="button" class={["month-day", "empty-day"]}></div>
{/if}
