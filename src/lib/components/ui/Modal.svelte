<script>
    import { modalState } from "$lib/monthModal.svelte.js";
    import { flyToCenter } from "$lib/transitions/flyToCenter";
    import { fade } from "svelte/transition";
    import EmojiSelect from "./EmojiSelect.svelte";
    import Description from "./Description.svelte";

    let modalElement = $state();

    let mood = $state(null);
    let description = $state("");

    function closeModal() {
        modalState.isModalVisible = false;
        localStorage.setItem(
            modalState.date?.toISOString().split("T")[0], // save only date part as key
            JSON.stringify({
                mood,
                description,
            })
        );
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
        <div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 10 }} class="flex flex-col h-full">
            <EmojiSelect bind:mood />
            <Description bind:description />
        </div>
    </div>
{/if}
