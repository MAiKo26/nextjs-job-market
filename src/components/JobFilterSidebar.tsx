import prisma from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilteredSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

interface JobFilterSidebarProps {
  defaultValues: jobFilteredSchema;
}

async function filterJobs(formData: FormData) {
  "use server";
  const result = Object.fromEntries(formData.entries());
  const parseResult = jobFilteredSchema.parse(result);
  const { q, type, location, remote } = parseResult;

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

async function JobFilterSidebar({ defaultValues }: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background  md:w-[260px] ">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 p-1">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc ..."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 p-1">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2 p-1">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <FormSubmitButton type="submit" className="w-full">
            Filter
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
export default JobFilterSidebar;
