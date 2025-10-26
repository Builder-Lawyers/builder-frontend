interface VerifyPageProps {
  code: string;
}

export const VerifyPage = ({ code }: VerifyPageProps) => {
  return <div>code: {code}</div>;
};
