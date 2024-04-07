import { PageHeaderAction, QuizResult, QuizResultSkeleton } from "@/components";
import { useTranslate } from "@/hooks";
import { Table, TableProps } from "antd";
import { useState } from "react";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
    id: number;
    test: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: null,
        dataIndex: "id",
        width: "10%",
        className: "id",
    },
    {
        title: null,
        dataIndex: "test",
        width: "90%",
    },
];

export default function TestsPage() {
    const { t } = useTranslate();

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

    const quizzes = [
        {
            question,
            answers,
            selected: 2,
        },
        {
            question,
            answers,
            selected: 4,
        },
        {
            question,
            answers,
            selected: 1,
        },
        {
            question,
            answers,
            selected: 2,
        },
        {
            question,
            answers,
            selected: 2,
        },
    ];

    const [data, setData] = useState<DataType[]>([
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
        {
            id: 1,
            test: "test",
        },
    ]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    return (
        <main>
            <PageHeaderAction
                title={t("Test yaratish")}
                btnText={t("Test yaratish")}
                onAction={() => {}}
            />
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
            />
            {/* <QuizResult quizzes={quizzes} />
            <QuizResultSkeleton /> */}
        </main>
    );
}
