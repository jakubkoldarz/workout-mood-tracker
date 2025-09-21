<script>
    import { modalState } from "$lib/monthModal.svelte.js";
    import { flyToCenter } from "$lib/transitions/flyToCenter";
    import { fade } from "svelte/transition";
    import EmojiSelect from "./EmojiSelect.svelte";
    import Description from "./Description.svelte";

    let modalElement = $state();

    let mood = $state(null);
    let description = $state("");

    // Funkcja do tworzenia klucza dla localStorage
    function getStorageKey(date) {
        if (!date) return null;
        return date.toISOString().split("T")[0];
    }

    // Funkcja do odczytywania danych z localStorage
    function loadDayData() {
        const key = getStorageKey(modalState.date);
        if (!key) return;

        const savedData = localStorage.getItem(key);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                mood = data.mood || null;
                description = data.description || "";
            } catch (e) {
                console.error("Error parsing saved data:", e);
                mood = null;
                description = "";
            }
        } else {
            // Reset wartości jeśli nie ma zapisanych danych
            mood = null;
            description = "";
        }
    }

    // Funkcja do zapisywania danych do localStorage
    function saveDayData() {
        const key = getStorageKey(modalState.date);
        if (!key) return;

        localStorage.setItem(
            key,
            JSON.stringify({
                mood,
                description,
            })
        );
    }

    // Reaktywnie ładuj dane gdy zmienia się data
    $effect(() => {
        if (modalState.isModalVisible && modalState.date) {
            loadDayData();
        }
    });

    // Automatycznie zapisuj dane gdy się zmieniają
    $effect(() => {
        if (modalState.isModalVisible && modalState.date && (mood !== null || description !== "")) {
            saveDayData();
        }
    });

    function closeModal() {
        saveDayData();
        modalState.isModalVisible = false;
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
