import { Icons, Quiz, QuizSkeleton } from "@/components";
import { Select } from "antd";

export default function MaterialsPage() {
    const options = [
        {
            label: "A-B Bo'yicha",
            value: "a",
        },
        {
            label: "A-B Bo'yicha",
            value: "b",
        },
        {
            label: "A-B Bo'yicha",
            value: "c",
        },
        {
            label: "A-B Bo'yicha",
            value: "d",
        },
    ];

    const question = {
        id: 1,
        uz: "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
        ru: "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
    };

    const answers = [
        {
            id: 1,
            uz: "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
            ru: "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
            isCorrect: false,
        },
        {
            id: 2,
            uz: "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату.",
            ru: "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату.",
            isCorrect: true,
        },
        {
            id: 3,
            uz: "Необходимо создать отчет о состоянии эксплуатируемого",
            ru: "Необходимо создать отчет о состоянии эксплуатируемого",
            isCorrect: false,
        },
        {
            id: 4,
            uz: "Необходимо создать отчет о состоянии эксплуатируемого",
            ru: "Необходимо создать отчет о состоянии эксплуатируемого",
            isCorrect: false,
        },
    ];

    const quiz = {
        question,
        answers,
        selected: 2,
    };

    return (
        <main>
            <Select
                placeholder="Saralash"
                dropdownAlign={{ points: ["b"] }}
                suffixIcon={<Icons.arrow.select />}
                prefixCls="sort-select"
                options={options}
            />
            <Quiz quiz={quiz} />
            <QuizSkeleton />
        </main>
    );
}
