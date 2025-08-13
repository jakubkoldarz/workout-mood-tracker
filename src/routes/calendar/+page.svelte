<script>
    import { enhance } from "$app/forms";
    import { getWeekDays } from "$lib/utils/date.js";
    import { viewMachine } from "$lib/machines/viewMachine.js";
    import { useMachine } from "@xstate/svelte";
    import Calendar from "$lib/components/ui/Calendar.svelte";

    const { snapshot, send } = useMachine(viewMachine);
    snapshot.subscribe((state) => {});

    send({ type: "CHANGE_VIEW" });
    let { data, form } = $props();
</script>

<section class="p-4 bg-radial from-pink-150 to-blue-150 min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Calendar</h1>
    <Calendar />
</section>
