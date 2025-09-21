<script>
    import { modalState } from "$lib/monthModal.svelte.js";
    import { flyToCenter } from "$lib/transitions/flyToCenter";
    import { fade } from "svelte/transition";
    import EmojiSelect from "./EmojiSelect.svelte";
    import { getDateKey } from "$lib/utils/date.js";
    import Description from "./Description.svelte";

    let modalElement = $state();

    let mood = $state(null);
    let description = $state("");
    let hasWorkout = $state(false);
    let workoutType = $state("");

    function getStorageKey(date) {
        return getDateKey(date);
    }

    function loadDayData() {
        const key = getStorageKey(modalState.date);
        if (!key) return;

        const savedData = localStorage.getItem(key);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                mood = data.mood || null;
                description = data.description || "";
                hasWorkout = data.hasWorkout || false;
                workoutType = data.workoutType || "";
            } catch (e) {
                console.error("Error parsing saved data:", e);
                mood = null;
                description = "";
                hasWorkout = false;
                workoutType = "";
            }
        } else {
            mood = null;
            description = "";
            hasWorkout = false;
            workoutType = "";
        }
    }

    function saveDayData() {
        const key = getStorageKey(modalState.date);
        if (!key) return;

        localStorage.setItem(
            key,
            JSON.stringify({
                mood,
                description,
                hasWorkout,
                workoutType,
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
        if (
            modalState.isModalVisible &&
            modalState.date &&
            (mood !== null || description !== "" || hasWorkout || workoutType !== "")
        ) {
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
                height: 855,
            },
        }}
        out:flyToCenter={{
            duration: 300,
            startingPosition: modalState.coords,
            startingSize: modalState.size,
            finalSize: {
                width: 600,
                height: 855,
            },
        }}
    >
        <div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 10 }} class="flex flex-col h-full p-6 gap-6">
            <!-- Header with date -->
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800">
                    {modalState.day}
                    {new Date(modalState.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
            </div>

            <!-- Mood Selection -->
            <div class="bg-white/50 rounded-xl p-4 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>😊</span> Mood
                </h3>
                <div class="grid grid-cols-6 gap-2">
                    {#each [{ emoji: "😢", label: "Very sad" }, { emoji: "🙁", label: "Sad" }, { emoji: "😐", label: "Neutral" }, { emoji: "🙂", label: "Happy" }, { emoji: "😃", label: "Very happy" }, { emoji: "🥰", label: "Excellent" }] as moodOption}
                        <button
                            type="button"
                            class="mood-btn {mood === moodOption.emoji ? 'selected' : ''}"
                            onclick={() => (mood = moodOption.emoji)}
                            title={moodOption.label}
                        >
                            {moodOption.emoji}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Workout Section -->
            <div class="bg-white/50 rounded-xl p-4 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>💪</span> Physical Activity
                </h3>

                <div class="flex items-center gap-3 mb-3">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <!-- Custom Checkbox -->
                        <div class="relative">
                            <input type="checkbox" bind:checked={hasWorkout} class="sr-only" />
                            <div class="custom-checkbox {hasWorkout ? 'checked' : ''}">
                                {#if hasWorkout}
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                {/if}
                            </div>
                        </div>
                        <span class="text-gray-700 font-medium">I worked out today</span>
                    </label>
                </div>

                {#if hasWorkout}
                    <div class="grid grid-cols-2 gap-2 mt-3">
                        {#each [{ value: "gym", emoji: "🏋️", label: "Gym", color: "bg-red-100 text-red-800" }, { value: "running", emoji: "🏃‍♂️", label: "Running", color: "bg-green-100 text-green-800" }, { value: "yoga", emoji: "🧘‍♀️", label: "Yoga", color: "bg-purple-100 text-purple-800" }, { value: "other", emoji: "⚡", label: "Other", color: "bg-gray-100 text-gray-800" }] as workout}
                            <button
                                type="button"
                                class="workout-btn {workoutType === workout.value ? 'selected' : ''} {workout.color}"
                                onclick={() => (workoutType = workout.value)}
                            >
                                <span class="bg-white/70 rounded-full p-1 mr-2 text-xl">
                                    {workout.emoji}
                                </span>
                                {workout.label}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Notes Section -->
            <div class="bg-white/50 rounded-xl p-4 shadow-sm flex-1">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📝</span> Notes
                </h3>
                <textarea
                    bind:value={description}
                    class="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="What happened today? How are you feeling?"
                    maxlength="200"
                ></textarea>
                <div class="text-right text-xs text-gray-500 mt-1">
                    {description.length}/200
                </div>
            </div>

            <!-- Close Button -->
            <button
                onclick={closeModal}
                class="bg-white/90 cursor-pointer backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-white border border-gray-200 transition-all duration-200"
            >
                Save & Close
            </button>
        </div>
    </div>
{/if}
