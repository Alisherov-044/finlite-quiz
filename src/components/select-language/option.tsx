import { Flex, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type SelectOptionProps = {
    img: string;
    label: string;
};

export function SelectOption({ img, label }: SelectOptionProps) {
    return (
        <Flex className="items-center gap-x-3">
            <LazyLoadImage
                loading="lazy"
                effect="blur"
                width={23}
                height={23}
                src={img}
                alt={`${label} flag`}
            />
            <Typography className="font-semibold">{label}</Typography>
        </Flex>
    );
}
