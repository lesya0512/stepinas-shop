import TovarsPage from "@/components/templates/TovarsPage/TovarsPage";
import { SearchParams } from "@/types/catalog";

export default function Catalog({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  return <TovarsPage searchParams={searchParams || {}} pageName='catalog'/>
}