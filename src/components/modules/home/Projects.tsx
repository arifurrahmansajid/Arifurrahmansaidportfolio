import ProjectCard from "@/components/shared/ProjectCard";
import { IProject } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";

const Projects = async () => {
  try {
    const url = `/project`;
    const result = await fetchWithTag<IProject | IProject[]>(url, { tag: "project" });

    // Normalize data to always be an array
    let projects: IProject[] = [];
    if (result?.data) {
      projects = Array.isArray(result.data) ? result.data : [result.data];
    }

    return (
      <section className="relative py-24 px-6 overflow-hidden bg-[var(--color-bg-base)]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10 animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white tracking-tight">
              Selected <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Works</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
            <p className="text-gray-400 text-center max-w-2xl font-medium leading-relaxed">
              A showcase of my latest work — blending creativity, code, and high-performance design.
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project: IProject, index) => (
                <div key={project._id || index} className="h-full">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-10">No projects available yet.</p>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading projects:", error);
    return (
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Selected Works</h2>
        <p className="text-red-400">Failed to load projects. Please try again later.</p>
      </section>
    );
  }
};

export default Projects;
