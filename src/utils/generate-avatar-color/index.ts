export function generateAvatarColor(first_name: string) {
    const colors: Record<string, string> = {
        a: "bg-orange-500",
        b: "bg-blue-500",
        c: "bg-gray-500",
        d: "bg-red-500",
        e: "bg-yellow-500",
        f: "bg-teal-500",
        g: "bg-indigo-500",
        h: "bg-purple-500",
        i: "bg-amber-500",
        j: "bg-green-500",
        k: "bg-slate-500",
        l: "bg-fuchsia-500",
        m: "bg-lime-500",
        n: "bg-sky-500",
        o: "bg-zinc-500",
        p: "bg-cyan-500",
        q: "bg-violet-500",
        r: "bg-pink-500",
        s: "bg-emerald-500",
        t: "bg-sky-500",
        u: "bg-yellow-500",
        v: "bg-orange-500",
        w: "bg-neutral-500",
        x: "bg-amber-500",
        y: "bg-violet-500",
        z: "bg-orange-500",
    };

    return colors[first_name[0].toLocaleLowerCase()];
}
