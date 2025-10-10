import { Button } from "@/components/ui/button";

interface AboutImage {
  src: string;
  alt: string;
  videoUrl?: string;
}

interface Breakout {
  src?: string;
  videoUrl?: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface Company {
  src: string;
  alt: string;
}

interface Achievement {
  label: string;
  value: string;
}

interface About3Props {
  title: string;
  description: string;
  mainImage: AboutImage;
  secondaryImage: AboutImage;
  breakout: Breakout;
  companiesTitle: string;
  companies: Company[];
  achievementsTitle: string;
  achievementsDescription: string;
  achievements: Achievement[];
}

export function About3({
  title,
  description,
  mainImage,
  secondaryImage,
  breakout,
  companiesTitle,
  companies,
  achievementsTitle,
  achievementsDescription,
  achievements,
}: About3Props) {
  return (
    <div className="w-full py-32">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground whitespace-pre-line">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          {mainImage.videoUrl ? (
            <div className="relative w-full max-h-[620px] rounded-xl overflow-hidden lg:col-span-2">
              <iframe
                src={mainImage.videoUrl}
                className="w-full h-full min-h-[400px] lg:min-h-[620px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
            />
          )}
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              {breakout.videoUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={breakout.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={breakout.src}
                  alt={breakout.alt}
                  className="mr-auto h-12"
                />
              )}
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank" rel="noopener noreferrer">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            {secondaryImage.videoUrl ? (
              <div className="relative w-full rounded-xl overflow-hidden grow md:w-1/2 lg:w-auto">
                <iframe
                  src={secondaryImage.videoUrl}
                  className="w-full h-full min-h-[300px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
              />
            )}
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 opacity-60 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%23ddd' width='100' height='50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='12'%3EPartner%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
