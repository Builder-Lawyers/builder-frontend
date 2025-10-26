import React, { FormEventHandler, JSX, ReactNode } from "react";
import { cn, getChildByType } from "@/shared/lib/utils";

import { CenteringLayout } from "@/shared/layouts/centering";
import { Header, Subtitle, Title } from "@/features/auth/ui/form-components";

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

const Split = (props: BaseProps) => (
  <div className="flex w-full items-center gap-2" {...props}>
    <div className="h-[1px] w-full bg-foreground/10" />
    <p className="text-foreground/40 text-[12px] uppercase ">
      {props.children}
    </p>
    <div className="h-[1px] w-full bg-foreground/10" />
  </div>
);
const Form = ({ children }: BaseProps) => (
  <div className="flex flex-col gap-6 w-full">{children}</div>
);

const Actions = ({ children, className }: BaseProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 w-full items-center justify-center",
      className,
    )}
  >
    {children}
  </div>
);

const Image = () => (
  <div className="w-[30%] h-full md:flex hidden grow flex-1/4 bg-accent rounded-xl" />
);

interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  formGap?: number;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

interface AuthFormCompound {
  (props: AuthFormProps): JSX.Element;
  Header: typeof Header;
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Form: typeof Form;
  Image: typeof Image;
  Actions: typeof Actions;
  Split: typeof Split;
}

export const AuthForm = (({
  children,
  formGap,
  onSubmit,
  className,
  ...rest
}: AuthFormProps) => {
  const header = getChildByType(children, AuthForm.Header);
  const form = getChildByType(children, AuthForm.Form);
  const actions = getChildByType(children, AuthForm.Actions);
  const image = getChildByType(children, AuthForm.Image);

  return (
    <form
      {...rest}
      className={cn("flex p-4 h-screen items-center", className)}
      onSubmit={onSubmit}
    >
      {image}
      <CenteringLayout className="flex-1/2">
        <div
          style={{
            gap: formGap,
          }}
          className="flex flex-col gap-12 w-full max-w-[420px]"
        >
          {header}
          {form}
          {actions}
        </div>
      </CenteringLayout>
    </form>
  );
}) as AuthFormCompound;

AuthForm.Header = Header;
AuthForm.Title = Title;
AuthForm.Subtitle = Subtitle;
AuthForm.Form = Form;
AuthForm.Split = Split;
AuthForm.Image = Image;
AuthForm.Actions = Actions;
