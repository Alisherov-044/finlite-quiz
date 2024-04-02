import { LazyLoadImage } from "react-lazy-load-image-component";

export type LogoProps = {
    className?: string;
};

export function Logo({ className }: LogoProps) {
    return (
        <div className={className}>
            <LazyLoadImage
                loading="lazy"
                effect="blur"
                src="/logo.webp"
                width={197}
                height={38}
                alt="logo"
            />
        </div>
    );
}
