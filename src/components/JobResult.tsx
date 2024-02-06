import { jobFilteredSchema } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filteredValues: jobFilteredSchema;
}

async function JobResult({
  filteredValues: { q, type, location, remote },
}: JobResultProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job, index) => (
        <JobListItem job={job} key={index} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">No results found</p>
      )}
    </div>
  );
}
export default JobResult;
