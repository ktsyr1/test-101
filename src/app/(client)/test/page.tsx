export default function AppTest() {
    return (

        <div className="p-10 m-auto w-full" dir="ltr">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">Featured Projects</h2>
                <p className="text-muted-foreground">Check out some of our latest and greatest projects.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map(a => <ProjectCard data={a} />)}
            </div>
        </div>
    )
}


interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    date: string;
    thumbnail: string;
}

const ProjectCard = ({ data: { title, description, technologies, date, thumbnail } }: { data: ProjectCardProps }) => {
    return (
        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-6 grid gap-6"
            data-v0-t="card"
        >
            <a href="#">
                <img
                    src={"/images/user-7.webp"}
                    alt={`${title} Thumbnail`}
                    width="400"
                    height="240"
                    className="rounded-lg object-cover aspect-[4/3]"
                />
            </a>
            <div className="space-y-2">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
                    </svg>
                    <span>{technologies.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                    </svg>
                    <span className="inline-block px-2 py-1 rounded-md bg-primary text-primary-foreground">{date}</span>
                </div>
                <div className="flex items-center gap-2  text-muted-foreground p-4 font-bold text-xl border-1 bg-blue-600 text-white text-center justify-center rounded-lg"> View Project </div>
            </div>
        </div>
    );
};


let data =
    [
        {
            "title": "Acme Web App",
            "description": "A modern web application built with the latest technologies.",
            "technologies": ["React", "Next.js", "Tailwind CSS"],
            "date": "2023-06-15",
            "thumbnail": "Ecommerce Platform Thumbnail"
        },
        {
            "title": "Ecommerce Platform",
            "description": "A robust ecommerce platform with a sleek and intuitive interface.",
            "technologies": ["React", "Redux", "Stripe"],
            "date": "2023-04-30",
            "thumbnail": "Ecommerce Platform Thumbnail"
        },
        {
            "title": "Fitness Tracker App",
            "description": "A comprehensive fitness tracking application to help users achieve their health goals.",
            "technologies": ["React Native", "Firebase", "Expo"],
            "date": "2023-09-01",
            "thumbnail": "Fitness Tracker App Thumbnail"
        },
        {
            "title": "Productivity Suite",
            "description": "A suite of productivity tools to help teams collaborate and stay organized.",
            "technologies": ["React", "Node.js", "MongoDB"],
            "date": "2023-11-20",
            "thumbnail": "Productivity Suite Thumbnail"
        },
        {
            "title": "Social Media Platform",
            "description": "A modern social media platform that connects people from around the world.",
            "technologies": ["React", "GraphQL", "Apollo"],
            "date": "2023-08-10",
            "thumbnail": "Social Media Platform Thumbnail"
        },
        {
            "title": "Fintech App",
            "description": "A cutting-edge fintech application that simplifies personal finance management.",
            "technologies": ["React", "Redux", "Firebase"],
            "date": "2023-07-01",
            "thumbnail": "Fintech App Thumbnail"
        }
    ]
