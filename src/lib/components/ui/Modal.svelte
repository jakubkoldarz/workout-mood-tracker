<script>
    import { modalState } from "$lib/monthModal.svelte.js";
    import { flyToCenter } from "$lib/transitions/flyToCenter";

    function closeModal() {
        modalState.isModalVisible = false;
    }
</script>

{#key modalState.coords.x + modalState.coords.y + modalState.isModalVisible}
    <button
        type="button"
        class={["month-day-modal z-10", modalState.isModalVisible ? "" : "opacity-0 pointer-events-none"]}
        in:flyToCenter={{
            duration: 800,
            startingPosition: modalState.coords,
            startingSize: modalState.size,
        }}
        out:flyToCenter={{
            duration: 300,
            startingPosition: modalState.coords,
            startingSize: modalState.size,
        }}
    >
        <div class="text-2xl text-left pl-2">{modalState?.day}</div>
    </button>
    {#if modalState.isModalVisible}
        <div onkeydown={closeModal} onclick={closeModal} class="fixed inset-0 bg-black opacity-50 z-0"></div>
    {/if}
{/key}
