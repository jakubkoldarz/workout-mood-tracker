<script>
    let { mood = $bindable("") } = $props();

    const emojis = [
        "😢", // bardzo smutny
        "🙁", // smutny
        "😐", // neutralny
        "🙂", // zadowolony
        "😃", // szczęśliwy
        "🥰", // bardzo szczęśliwy
    ];

    function onclick(emoji) {
        mood = emoji;
    }
</script>

<div class="overflow-hidden h-20 rounded-[10px_0_0_0] flex justify-center">
    {#each emojis as emoji}
        {#if emoji === mood}
            <button type="button" class="w-full text-5xl p-2 bg-pink-50 cursor-pointer" onclick={() => onclick(emoji)}
                >{emoji}</button
            >
        {:else}
            <button
                type="button"
                class="w-full text-5xl p-2 hover:bg-pink-50 cursor-pointer"
                onclick={() => onclick(emoji)}>{emoji}</button
            >
        {/if}
    {/each}
</div>
