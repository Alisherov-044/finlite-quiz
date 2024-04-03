import { Icons } from "@/components";
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

    return (
        <main>
            <Select
                placeholder="Saralash"
                dropdownAlign={{ points: ["b"] }}
                suffixIcon={<Icons.arrow.select />}
                prefixCls="sort-select"
                options={options}
            />
        </main>
    );
}
