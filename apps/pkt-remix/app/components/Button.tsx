import { forwardRef } from "react";
import clsx from "clsx";
import { Link } from "@remix-run/react";
import React from "react";

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
/*
type TProps<
  Variant extends keyof typeof variantStyles,
  Color extends keyof (typeof variantStyles)[Variant]
> = {
  variant?: Variant;
  color?: Color;
};

function foo<
  // Variant extends keyof typeof variantStyles = "solid",
  Variant extends keyof typeof variantStyles,
  // Color extends keyof (typeof variantStyles)[Variant] = "gray"
  Color extends keyof (typeof variantStyles)[Variant]
>({ variant, color }: TProps<Variant, Color>) {
  console.log({ variant, color });
}

foo({});
foo({ variant: "solid", color: "gray" });
foo({ variant: "solid", color: "cyan" });
foo({ variant: "outline", color: "gray" });
foo({ variant: "outline", color: "cyan" });
foo({ color: "cyan" });
foo({ color: "gray" });
*/

// function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

// https://eskridge.dev/articles/typescript-issues
// https://www.erikverweij.dev/blog/making-your-components-extensible-with-typescript/
// https://fettblog.eu/typescript-react-generic-forward-refs/
// declare module "react" {
//   function forwardRef<T, P = {}>(
//     render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
//   ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
// }

type ButtonRef<Href extends string | undefined> = Href extends string
  ? Parameters<typeof Link>[0]["ref"]
  : // : React.ComponentPropsWithRef<"button">["ref"];
    React.Ref<HTMLButtonElement>;

type ButtonProps<
  Href extends string | undefined,
  // Variant extends keyof typeof variantStyles,
  // Color extends keyof (typeof variantStyles)[Variant],
  Props = {
    href?: Href;
    // variant?: Variant;
    variant?: keyof typeof variantStyles;
    // color?: Color;
    color?:
      | keyof (typeof variantStyles)["solid"]
      | keyof (typeof variantStyles)["outline"];
    className?: string;
  },
  Component = Href extends string
    ? typeof Link
    : React.ComponentPropsWithoutRef<"button">
> = React.PropsWithChildren<Props> &
  Omit<Component, keyof Props> & { ref?: ButtonRef<Href> };

export const Button = forwardRef(function Button<
  Href extends string | undefined
  // Variant extends keyof typeof variantStyles,
  // Color extends keyof (typeof variantStyles)[Variant]
>({ variant = "solid", color = "gray", className, href, ...props }: ButtonProps<Href>, ref?: ButtonRef<Href>) {
  className = clsx(
    baseStyles[variant],
    // @ts-ignore TODO: fix types
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

// function ButtonImpl<
//   Href extends string | undefined
//   // Variant extends keyof typeof variantStyles,
//   // Color extends keyof (typeof variantStyles)[Variant]
// >({ variant = "solid", color = "gray", className, href, ...props }: ButtonProps<Href>, ref?: ButtonRef<Href>) {
//   className = clsx(
//     baseStyles[variant],
//     // @ts-ignore TODO: fix types
//     variantStyles[variant][color],
//     className
//   );

//   return href ? (
//     // eslint-disable-next-line jsx-a11y/anchor-has-content
//     <Link
//       ref={ref as ButtonRef<string>}
//       to={href}
//       className={className}
//       {...props}
//     />
//   ) : (
//     <button
//       ref={ref as ButtonRef<undefined>}
//       className={className}
//       {...props}
//     />
//   );
// }

// export const Button = React.forwardRef(ButtonImpl) as typeof ButtonImpl;

function usage() {
  return (
    <>
      <Button variant="solid" color="gray" />
      <Button variant="solid" color="cyan" />
      <Button variant="outline" color="gray" />
      <Button disabled variant="outline" color="gray" />
      <Button type="submit" color="cyan" className="mt-8 w-full">
        Sign in to account
      </Button>
    </>
  );
}
