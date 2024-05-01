import { getFromagesAction } from "@/actions/fromages";
import { Fromage } from "@/types/fromage";
import Link from "next/link";
import WinesDatatable from "./datatable";

type FetchResponse = {
  fromages: Fromage[];
};

const getFromages = async () => {
  const response = await fetch("http://localhost:3000/api/fromages");
  const data = await response.json();
  console.log(data);
  return data;
};

const Fromages = async () => {
  const fromages = (await getFromagesAction()) as any as Fromage[];

  return (
    <>
      <WinesDatatable data={fromages} />
      <Link href="/fromages/create">Create a Fromage</Link>
    </>
  );
};

export default Fromages;
