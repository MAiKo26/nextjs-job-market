import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResult";
import { jobFilteredSchema } from "@/lib/validation";

interface HomeProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

function getTitle({ q, type, location, remote }: jobFilteredSchema) {
  const titlePrefix = q
    ? `${q}`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "Developer jobs";
  const titleSuffix = location ? ` in ${location}` : "";
  return titlePrefix + titleSuffix;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: HomeProps) {
  const filteredValues: jobFilteredSchema = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return {
    title: `Market Jobs | ${getTitle(filteredValues)} `,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: HomeProps) {
  const filteredValues: jobFilteredSchema = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filteredValues)}
        </h1>
        <p className="text-muted-foreground">Search for your next job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row ">
        <JobFilterSidebar defaultValues={filteredValues} />
        <JobResult filteredValues={filteredValues} />
      </section>
    </main>
  );
}
