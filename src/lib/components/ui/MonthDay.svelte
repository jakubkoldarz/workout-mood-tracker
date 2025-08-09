<script>
    let { day } = $props();
</script>

<div class="month-day bg-glass px-2 py-3 flex flex-col">
    {day?.getDate()}
</div>
