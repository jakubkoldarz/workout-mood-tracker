<script>
    import { enhance } from "$app/forms";
    import { getWeekDays } from "$lib/utils/date.js";
    import { viewMachine } from "$lib/machines/viewMachine.js";
    import { useMachine } from "@xstate/svelte";
    import Calendar from "$lib/components/ui/Calendar.svelte";

    const { snapshot, send } = useMachine(viewMachine);
    snapshot.subscribe((state) => {
        console.log("Current state:", state?.value);
    });

    send({ type: "CHANGE_VIEW" });
    let { data, form } = $props();
</script>

<section class="p-4 bg-radial from-pink-200 to-pink-100 h-screen">
    <h1 class="text-3xl font-bold mb-4">Calendar</h1>
    <Calendar />
</section>
