import { Icons, Quiz, QuizSkeleton } from "@/components";
import { useTranslate } from "@/hooks";
import { Select } from "antd";

export default function MaterialsPage() {
    const { t } = useTranslate();

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
        content:
            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
    };

    const answers = [
        {
            id: 1,
            content:
                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
            isCorrect: false,
        },
        {
            id: 2,
            content:
                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату.",
            isCorrect: true,
        },
        {
            id: 3,
            content: "Необходимо создать отчет о состоянии эксплуатируемого",
            isCorrect: false,
        },
        {
            id: 4,
            content: "Необходимо создать отчет о состоянии эксплуатируемого",
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
                placeholder={t("Saralash")}
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
