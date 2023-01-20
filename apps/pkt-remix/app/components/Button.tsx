import { forwardRef } from "react";
import clsx from "clsx";
import { Link } from "@remix-run/react";
import React from "react";

// type Variant = "solid" | "outline";
// type VariantStyles = {
//     [key in Variant]: Record<string, string>;
// }

interface QueryOptions {
  throwIfNotFound: boolean;
}
type QueryResult<Options extends QueryOptions> =
  Options["throwIfNotFound"] extends true ? string : string | undefined;

const qo1 = { throwIfNotFound: true };
const qo2 = { throwIfNotFound: true } as const;
type QR1 = QueryResult<QueryOptions>;
type QR2 = QueryResult<{ throwIfNotFound: true }>;
type QR3 = QueryResult<typeof qo1>;
type QR4 = QueryResult<typeof qo2>;

type T = string & number;

declare function retrieve<Options extends QueryOptions>(
  key: string,
  options?: Options
): Promise<QueryResult<Options>>;

// Returned type: string | undefined
await retrieve("Biruté Galdikas");
// Returned type: string | undefined
await retrieve("Jane Goodall", { throwIfNotFound: Math.random() > 0.5 });
// Returned type: string
await retrieve("Dian Fossey", { throwIfNotFound: true });

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

// interface CustomButtonProps {
//   variant: keyof typeof variantStyles;
//   color:
//     | keyof (typeof variantStyles)["solid"]
//     | keyof (typeof variantStyles)["outline"];
//   href: string;
// }

// type ButtonProps = CustomButtonProps &
//   Omit<React.ComponentPropsWithoutRef<"button">, keyof CustomButtonProps>;

// export const Button = forwardRef(function Button(
//   { variant = "solid", color = "gray", className, href, ...props }: ButtonProps,
//   ref
// ) {
//   className = clsx(
//     baseStyles[variant],
//     variantStyles[variant][color],
//     className
//   );
//   const v = variantStyles[variant];

//   return href ? (
//     <Link ref={ref} href={href} className={className} {...props} />
//   ) : (
//     <button ref={ref} className={className} {...props} />
//   );
// });

type LinkRef = NonNullable<Parameters<typeof Link>[0]["ref"]>;

type ButtonRef<HrefType extends string | undefined> = HrefType extends string
  ? LinkRef
  : React.ComponentPropsWithRef<"button">["ref"];

type ButtonProps<
  HrefType extends string | undefined = undefined,
  Props = {
    variant?: keyof typeof variantStyles;
    color?: string;
    className: string;
    href?: HrefType;
  },
  Component = HrefType extends string
    ? React.ComponentPropsWithoutRef<"button">
    : typeof Link
> = React.PropsWithChildren<Props> &
  Omit<Component, keyof Props> & { ref?: ButtonRef<HrefType> };

export const Button = forwardRef(function Button<
  HrefType extends string | undefined
>(
  {
    variant = "solid",
    color = "gray",
    className,
    href,
    ...props
  }: ButtonProps<HrefType>,
  ref?: ButtonRef<HrefType>
) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <Link
      ref={ref as ButtonRef<string>}
      to={href}
      className={className}
      {...props}
    />
  ) : (
    <button
      ref={ref as ButtonRef<undefined>}
      className={className}
      {...props}
    />
  );
});
