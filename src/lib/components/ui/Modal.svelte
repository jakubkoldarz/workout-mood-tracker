<script>
    import { modalState } from "$lib/monthModal.svelte.js";
    import { flyToCenter } from "$lib/transitions/flyToCenter";
    import { fade } from "svelte/transition";

    let modalElement = $state();

    function closeModal() {
        modalState.isModalVisible = false;
        console.log(modalElement.scrollWidth, modalElement.scrollHeight);
    }
</script>

{#if modalState.isModalVisible}
    <div
        tabindex="0"
        role="button"
        onkeydown={closeModal}
        class="fixed inset-0 bg-black/50 z-0"
        onclick={closeModal}
        transition:fade={{ duration: 300 }}
    ></div>

    <div
        bind:this={modalElement}
        tabindex="0"
        role="button"
        onkeydown={closeModal}
        class="month-day-modal z-10"
        in:flyToCenter={{
            duration: 800,
            startingPosition: modalState.coords,
            startingSize: modalState.size,
            finalSize: {
                width: 600,
                height: 400,
            },
        }}
        out:flyToCenter={{
            duration: 300,
            startingPosition: modalState.coords,
            startingSize: modalState.size,
            finalSize: {
                width: 600,
                height: 400,
            },
        }}
    >
        <div class="text-2xl text-left pl-2">
            {modalState.day}
        </div>
        <span transition:fade={{ duration: 50 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestiae cum magni eligendi, aliquam
            facere et consectetur expedita beatae, praesentium optio quis? Vel, debitis quos excepturi dolorum nisi
            officiis possimus.
        </span>
    </div>
{/if}
