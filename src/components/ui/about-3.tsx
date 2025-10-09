import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AboutImage {
  src: string;
  alt: string;
}

interface Breakout {
  src: string;
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
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <a
            href="https://youtu.be/9Ac79SHYPIk"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>

          <a
            href="https://youtu.be/IyXEBB49LXY"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Breakout Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-full min-h-[400px]">
                  <img
                    src={breakout.src}
                    alt={breakout.alt}
                    className="w-full h-full object-contain p-8 bg-gradient-to-br from-primary/5 to-secondary/5"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {breakout.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {breakout.description}
                  </p>
                  <a
                    href={breakout.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full md:w-auto">
                      {breakout.buttonText}
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {companiesTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-card rounded-xl border hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={company.src}
                alt={company.alt}
                className="w-full h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%23ddd' width='100' height='50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='12'%3EPartner%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {achievementsTitle}
            </h2>
            <p className="text-lg opacity-90">
              {achievementsDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center p-8 bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-foreground">
                    {achievement.value}
                  </div>
                  <div className="text-sm md:text-base text-primary-foreground/80">
                    {achievement.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
