import React, { FormEventHandler, JSX, ReactNode } from "react";
import { cn, getChildByType } from "@/shared/lib/utils";

import { CenteringLayout } from "@/shared/layouts/centering";
import { Header, Subtitle, Title } from "@/features/auth/ui/form-components";

export interface BaseProps {
  children?: ReactNode;
}

const Split = (props: BaseProps) => (
  <div className="flex items-center gap-2" {...props}>
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

const Actions = ({ children }: BaseProps) => (
  <div className="flex flex-col gap-2 w-full items-center justify-center">
    {children}
  </div>
);

interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface AuthFormCompound {
  (props: AuthFormProps): JSX.Element;
  Header: typeof Header;
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Form: typeof Form;
  Actions: typeof Actions;
  Split: typeof Split;
}

export const AuthForm = (({
  children,
  onSubmit,
  className,
  ...rest
}: AuthFormProps) => {
  const header = getChildByType(children, AuthForm.Header);
  const form = getChildByType(children, AuthForm.Form);
  const actions = getChildByType(children, AuthForm.Actions);

  return (
    <form
      {...rest}
      className={cn(className, "flex p-4 h-full min-h-screen")}
      onSubmit={onSubmit}
    >
      <div className="w-[30%] sm:flex hidden grow flex-1/4 bg-accent rounded-xl" />
      <CenteringLayout className="flex-1/2">
        <div className="flex flex-col gap-12 w-full max-w-[420px]">
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
AuthForm.Actions = Actions;
