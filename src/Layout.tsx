type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
    {/* HEADER */}
    {children}
    {/* FOOTER */}
    </>
  );
};