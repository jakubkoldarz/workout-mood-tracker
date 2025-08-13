<script>
    import { scale } from "svelte/transition";

    let { day } = $props();
</script>

{#key day?.id}
    <div class={["month-day", { "empty-day": !day.date }]} in:scale={{ duration: 200 }}>
        <div class="text-2xl pl-2">{day.date?.getDate()}</div>
    </div>
{/key}
