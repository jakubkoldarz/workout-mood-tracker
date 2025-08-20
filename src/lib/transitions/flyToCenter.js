// src/transitions/flyToCenter.js
import { cubicOut } from "svelte/easing";

export function flyToCenter(node, { duration, startingPosition, startingSize }) {
    const fromX = startingPosition.x - startingSize.x / 3;
    const fromY = startingPosition.y - startingSize.y / 3;

    const toX = window.innerWidth / 2 - startingSize.x / 2;
    const toY = window.innerHeight / 2 - startingSize.y / 2;

    const dx = fromX - toX;
    const dy = fromY - toY;

    node.style.position = "fixed";

    return {
        duration,
        easing: cubicOut,
        tick: (t) => {
            const eased_t = cubicOut(t);

            // Liniowa interpolacja (LERP)
            const currentX = fromX - dx * eased_t;
            const currentY = fromY - dy * eased_t;

            node.style.left = `${currentX}px`;
            node.style.top = `${currentY}px`;

            node.style.width = `${startingSize.x}px`;
            node.style.height = `${startingSize.y}px`;
        },
    };
}
