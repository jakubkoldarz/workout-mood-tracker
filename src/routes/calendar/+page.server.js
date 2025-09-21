export const ssr = false;

export function load() {
    return {
        title: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "numeric",
        }),
    };
}

export const actions = {
    create: async ({ request }) => {
        console.log("Action triggered");
        const formData = await request.formData();
        const action = formData.get("action");
        return { success: false, message: "Invalid action." };
    },
};
