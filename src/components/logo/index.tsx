export type LogoProps = {
    className?: string;
};

export function Logo({ className }: LogoProps) {
    return (
        <img
            src="/logo.webp"
            className={className}
            width={197}
            height={38}
            alt="logo"
        />
    );
}
