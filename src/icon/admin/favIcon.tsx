
"use client";
import React, { useState } from "react";
import { adminIcon } from "./list";

const icons = { ...adminIcon } as const;

type IconName = keyof typeof icons;

interface IconProps {
    name: IconName;
    className?: string;
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    groupHover?: boolean;
}

export default function FavIcon({
    name,
    className,
    color,
    hoverColor,
    activeColor,
    groupHover,
}: IconProps) {
    const [internalHover, setInternalHover] = useState(false);
    const hovered = groupHover ?? internalHover;

    const icon = icons[name];
    if (!icon) return null;

    const applyFill = (element: React.ReactElement): React.ReactElement => {
        const props = element.props as {
            className?: string;
            fill?: string;
            children?: React.ReactNode;
            [key: string]: any;
        };

        const newProps: any = {
            ...props,
            className: className
                ? `${props.className ? props.className + " " : ""}${className}`.trim()
                : props.className,
            fill: hovered && hoverColor ? hoverColor : activeColor ? activeColor : color || props.fill,
        };

        if (props.children) {
            newProps.children = React.Children.map(props.children, (child) =>
                React.isValidElement(child) ? applyFill(child) : child
            );
        }

        return React.cloneElement(element, newProps);
    };


    // Cast the element so TypeScript allows onMouseEnter/onMouseLeave props
    const iconWithHover = React.cloneElement(
        applyFill(icon) as React.ReactElement<React.DOMAttributes<any>>,
        {
            onMouseEnter: () => !groupHover && setInternalHover(true),
            onMouseLeave: () => !groupHover && setInternalHover(false),
        }
    );

    return iconWithHover;
}

