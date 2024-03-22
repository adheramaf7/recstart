import { HTMLAttributes, ImgHTMLAttributes } from "react";

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    return <img {...props} src="/images/dark-logo.png" alt="Logo" />;
}
