import Image from "next/image";
import type { Project } from "@/lib/content";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

interface ProjectGalleryProps {
  projects: Project[];
  limit?: number;
}

export default function ProjectGallery({ projects, limit }: ProjectGalleryProps) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayProjects.map((project) => (
        <div
          key={project.id}
          className="group relative overflow-hidden rounded-xl bg-[var(--concrete-200)] aspect-square"
        >
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded mb-1">
              {project.service}
            </span>
            <p className="text-white font-bold text-sm">{project.title}</p>
            <p className="text-white/70 text-xs">{project.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
