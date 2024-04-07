export function latinToCyrillic(input: string): string {
    const latinToCyrillicMap: { [key: string]: string } = {
        a: "а",
        b: "б",
        c: "c",
        d: "д",
        e: "э",
        f: "ф",
        g: "г",
        h: "х",
        i: "и",
        j: "ж",
        k: "к",
        l: "л",
        m: "м",
        n: "н",
        o: "о",
        p: "п",
        q: "қ",
        r: "р",
        s: "с",
        t: "т",
        u: "у",
        v: "в",
        w: "w",
        x: "х",
        y: "й",
        z: "з",
        A: "А",
        B: "Б",
        C: "C",
        D: "Д",
        E: "Э",
        F: "Ф",
        G: "Г",
        H: "Ҳ",
        I: "И",
        J: "Ж",
        K: "К",
        L: "Л",
        M: "М",
        N: "Н",
        O: "О",
        P: "П",
        Q: "Қ",
        R: "Р",
        S: "С",
        T: "Т",
        U: "У",
        V: "В",
        W: "W",
        X: "Х",
        Y: "Й",
        Z: "З",
        sh: "ш",
        Sh: "Ш",
        SH: "Ш",
        ch: "ч",
        Ch: "Ч",
        CH: "Ч",
    };

    let result = "";
    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (
            ["sh", "ch"].includes(
                `${input[i]}${input[i + 1]}`.toLocaleLowerCase()
            )
        ) {
            char = input[i] + input[i + 1];
            i += 1;
        }

        if (["'"].includes(input[i])) {
            continue;
        }

        if (latinToCyrillicMap.hasOwnProperty(char)) {
            result += latinToCyrillicMap[char];
        } else {
            result += input[i];
        }
    }
    return result;
}
