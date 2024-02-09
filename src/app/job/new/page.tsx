import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

interface pageProps {}

export const metadata: Metadata = {
  title: "New Job",
};

function page({}: pageProps) {
  return <NewJobForm />;
}
export default page;
