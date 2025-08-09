<script>
    let { day } = $props();
</script>

<div
    class="month-day bg-glass shadow-lg backdrop-blur-xl px-2 py-3 flex flex-col rounded-[10px_0_10px] hover:scale-105 transition-all"
>
    <div class="text-2xl pl-2">{day?.getDate()}</div>
</div>
