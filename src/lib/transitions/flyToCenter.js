// src/transitions/flyToCenter.js
import { cubicOut, elasticInOut } from "svelte/easing";

export function flyToCenter(node, { duration, startingPosition, startingSize, finalSize }) {
    // Obliczanie pozycji
    const fromX = startingPosition.x - startingSize.x / 3;
    const fromY = startingPosition.y - startingSize.y / 3;

    const toX = window.innerWidth / 2 - finalSize.width / 2;
    const toY = window.innerHeight / 2 - finalSize.height / 2;

    const dx = fromX - toX;
    const dy = fromY - toY;

    // Obliczanie rozmiaru
    const fromWidth = startingSize.x;
    const fromHeight = startingSize.y;

    const toWidth = finalSize.width;
    const toHeight = finalSize.height;

    const widthDiff = fromWidth - toWidth;
    const heightDiff = fromHeight - toHeight;

    node.style.position = "fixed";

    return {
        duration,
        easing: cubicOut,
        tick: (t) => {
            const eased_t = cubicOut(t);

            // Liniowa interpolacja (LERP)
            const currentX = fromX - dx * eased_t;
            const currentY = fromY - dy * eased_t;

            const currentHeight = fromHeight - heightDiff * eased_t;
            const currentWidth = fromWidth - widthDiff * eased_t;

            node.style.left = `${currentX}px`;
            node.style.top = `${currentY}px`;

            node.style.width = `${currentWidth}px`;
            node.style.height = `${currentHeight}px`;

            node.style.opacity = eased_t;
        },
    };
}
