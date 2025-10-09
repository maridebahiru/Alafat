import Layout from '../components/Layout';
import { About3 } from '@/components/ui/about-3';

const AboutPage = () => {
  return (
    <Layout>
      <About3
        title="About Us - Ethiopian Janderebaw Generation"
        description="Ethiopian Janderebaw Generation is a spiritual movement dedicated to empowering young believers through faith, prayer, and fellowship. Our mission is to raise a generation deeply rooted in Orthodox Christian values, spiritual growth, and community impact."
        mainImage={{
          src: "https://img.youtube.com/vi/9Ac79SHYPIk/hqdefault.jpg",
          alt: "21 Days Spiritual Course",
        }}
        secondaryImage={{
          src: "https://img.youtube.com/vi/IyXEBB49LXY/hqdefault.jpg",
          alt: "Friday Prayer Mahberean Abe Tselot",
        }}
        breakout={{
          src: "/logo.png",
          alt: "Ethiopian Janderebaw Generation Logo",
          title: "A Movement for Faith, Growth, and Unity",
          description:
            "We offer a 21-day spiritual course for newcomers, weekly prayer fellowships, and monthly programs that strengthen believers in their faith journey.",
          buttonText: "Watch on YouTube",
          buttonUrl: "https://www.youtube.com/@EthiopianJanderebawGeneration",
        }}
        companiesTitle="Supported and Recognized by Faith Communities"
        companies={[
          { src: "/partners/church1.svg", alt: "Orthodox Community" },
          { src: "/partners/church2.svg", alt: "Youth Fellowship" },
          { src: "/partners/church3.svg", alt: "Media Ministry" },
          { src: "/partners/church4.svg", alt: "Prayer Network" },
          { src: "/partners/church5.svg", alt: "Mission Group" },
          { src: "/partners/church6.svg", alt: "Gospel Partners" },
        ]}
        achievementsTitle="Our Achievements in Numbers"
        achievementsDescription="Through dedication, prayer, and service, Ethiopian Janderebaw Generation continues to inspire thousands of youth across Ethiopia and beyond."
        achievements={[
          { label: "21-Day Courses Completed", value: "200+" },
          { label: "Weekly Prayer Meetings", value: "150+" },
          { label: "Active Members", value: "10,000+" },
          { label: "Projects Completed", value: "12" },
        ]}
      />
    </Layout>
  );
};

export default AboutPage;
