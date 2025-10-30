"use client";
import { useTitle } from "@/context/title";
import { useEffect } from "react";

interface NavTitleProps {
    title: string;
    subTitle: string;
}

export default function NavTitle({ title, subTitle }: NavTitleProps) {
    const { setTitle, setSubtitle } = useTitle();

    useEffect(() => {
        setTitle(title);
        setSubtitle(subTitle);
    }, [setTitle, setSubtitle, title, subTitle]);

    return null;
}
