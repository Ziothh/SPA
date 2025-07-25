"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { useStateObject } from "~/modules/react";

const VARIANTS = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground",
                destructive: "bg-destructive text-destructive-foreground",
                outline: "border border-input bg-background",
                secondary: "bg-secondary text-secondary-foreground",
                ghost: null,
                link: "text-primary underline-offset-4",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
    },
);

const HOVERED_VARIANTS: Record<ButtonProps["variant"] & string, string> = {
    default: "[&.btn-active]:bg-primary/90",
    destructive: "[&.btn-active]:bg-destructive/90",
    outline: "[&.btn-active]:bg-accent [&.btn-active]:text-accent-foreground",
    secondary: "[&.btn-active]:bg-secondary/80",
    ghost: "[&.btn-active]:bg-accent [&.btn-active]:text-accent-foreground",
    link: "[&.btn-active]:underline",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof VARIANTS> & {
        asChild?: boolean;
        /** Whether or not to show the button als being hovered
         * @default false */
        isActive?: boolean;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "default",
            size = "default",
            asChild = false,
            isActive: isActiveExt = false,
            ...props
        },
        ref,
    ) => {
        const isActive = useStateObject(false);

        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                {...props}
                className={cx(
                    VARIANTS({ variant, size, className }),
                    (isActive.value || isActiveExt) &&
                        variant !== null && [
                            "btn-active",
                            HOVERED_VARIANTS[variant],
                        ],
                )}
                onMouseEnter={(e) => {
                    isActive.setValue(true);
                    props.onMouseEnter?.(e);
                }}
                onMouseLeave={(e) => {
                    isActive.setValue(false);
                    props.onMouseLeave?.(e);
                }}
                onClick={async (event) => {
                    await props.onClick?.(event);
                }}
                ref={ref}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, VARIANTS as buttonVariants };
