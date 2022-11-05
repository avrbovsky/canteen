import { Header } from "./components/Header";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <div style={{height: '90vh', backgroundColor: 'lightgray', paddingTop: '40px'}}>
        {children}
      </div>
    </>
  );
};