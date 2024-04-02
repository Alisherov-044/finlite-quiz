export function hexToRgb(color: string): number[] | null {
    const match =
        color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i) ||
        color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);

    if (!match) {
        return null;
    }

    const [, r, g, b, a] = match;

    const alpha =
        a !== undefined ? parseFloat((parseInt(a, 16) / 255).toFixed(3)) : 1;

    const rgb = [
        color.length === 4 ? parseInt(r.repeat(2), 16) : parseInt(r, 16),
        color.length === 4 ? parseInt(g.repeat(2), 16) : parseInt(g, 16),
        color.length === 4 ? parseInt(b.repeat(2), 16) : parseInt(b, 16),
    ];

    return alpha < 1 ? [...rgb, alpha] : rgb;
}
