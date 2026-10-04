import DestinationsExplorer from "@/components/DestinationsExplorer";
import { getCountries } from "@/lib/api";

export const metadata = {
  title: "Study Destinations",
};

export default async function DestinationsPage() {
  const countries = await getCountries();

  return <DestinationsExplorer countries={countries} />;
}