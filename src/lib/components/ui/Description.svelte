<script>
    let { description = $bindable("") } = $props();
</script>

<div class="overflow-hidden h-full rounded-[0_0_10px_0] p-4 flex flex-col gap-4">
    <textarea
        bind:value={description}
        class="w-full bg-pink-50 h-full text-black text-lg p-2 font-normal leading-tight outline-none border-none border-0 rounded resize-none"
        placeholder="How was your day?"
    ></textarea>
</div>
