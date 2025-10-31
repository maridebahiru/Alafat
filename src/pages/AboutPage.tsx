import Layout from '../components/Layout';
import { About3 } from '@/components/ui/about-3';
import { PageLoader } from '../components/PageLoader';
import { useState, useEffect } from 'react';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const description = `መግቢያ

ህንደኬ የተባለች የኢትዮጵያ ንግሥት አዛዥና ጃንደረባ የነበረ በገንዘብዋም ሁሉ የሠለጠነ አንድ የኢትዮጵያ ሰው ሊሰግድ ወደ ኢየሩሳሌም መጥቶ ነበር፤ ሲመለስም በሰረገላ ተቀምጦ የነቢዩን የኢሳይያስን መጽሐፍ ያነብ ነበር።መንፈስም ፊልጶስን። ወደዚህ ሰረገላ ቅረብና ተገናኝ አለው።

ፊልጶስም ሮጦ የነቢዩን የኢሳይያስን መጽሐፍ ሲያነብ ሰማና።በውኑ የምታነበውን ታስተውለዋለህን? አለው።እርሱም። የሚመራኝ ሳይኖር ይህ እንዴት ይቻለኛል?አለው።

ፊልጶስም አፉን ከፈተ፥ከዚህም መጽሐፍ ጀምሮ ስለ ኢየሱስ ወንጌልን ሰበከለት።በመንገድም ሲሄዱ ወደ ውኃ ደረሱ፤ ጃንደረባውም። እነሆ ውኃ፤እንዳልጠመቅ የሚከለክለኝ ምንድር ነው?አለው። 

ፊልጶስም።በፍጹም ልብህ ብታምን፥ተፈቅዶአል አለው። መልሶም። ኢየሱስ ክርስቶስ የእግዚአብሔር ልጅ እንደ ሆነ አምናለሁ አለ። ሰረገላውም ይቆም ዘንድ አዘዘ፥ ፊልጶስና ጃንደረባው ሁለቱም ወደ ውኃ ወረዱ፥ አጠመቀውም። 

የቀድሞ ኢትዮጵያውያን የጃንደረባውን አሠረ፟ፍኖት ተከትለው ቅድስት ሀገር ኢየሩሳሌምን ለመሳለምና ለአምላካቸው ለመስገድ መንፈሳዊ ጉዞ ያደርጉ ነበር።ጉዞአቸውም በእግር፤በፈረስ፤በጀልባ የሚደረግ ነበር।

ይህም ጉዞ ከአውሬ፤ከሽፍታ ከማዕበልና ሞገድ ጋር የሚደረግ ትንቅንቅ ነበረበት።ነገርግን ኢትዮጵያውያኑ ጠንካራ ኦርቶዶክሳዊ ስብዕናና፤ጥልቅ መንፈሳዊነት ስለነበራቸው ለዚህና ይህን ለመሳሳለው ፈተና የሚሸነፉ አልነበሩም ።

ኢትዮጵያዊው ጃንደረባ ባኮስ ለቀድሙት ኢትዮጵያውያን ትዕግስትን፤ንባብን፤አድማጭነትን፤ ማመንንና;መንፈሳዊ ህይወትንም አንዳስተማራቸው ሁሉ በዚህኛውም ዘመን ትውልድ ሁለንተናዊ ኦርቶዶክሳዊነት አርአያና ምሳሌ መሆኑ ታምኖበታል።`;

  return (
    <Layout>
      <About3
        title="ስለ እኛ - ኢትዮጵያዊ ጃንደረባው ትውልድ"
        description={description}
        mainImage={{
          src: "https://img.youtube.com/vi/9Ac79SHYPIk/maxresdefault.jpg",
          alt: "21 Days Spiritual Course",
          videoUrl: "https://www.youtube.com/embed/9Ac79SHYPIk?autoplay=0&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1",
        }}
        secondaryImage={{
          src: "https://img.youtube.com/vi/IyXEBB49LXY/maxresdefault.jpg",
          alt: "Friday Prayer Mahberean Abe Tselot",
          videoUrl: "https://www.youtube.com/embed/IyXEBB49LXY?autoplay=0&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1",
        }}
        breakout={{
          videoUrl: "https://www.youtube.com/embed/W4r5Zo8HJwo?autoplay=1&mute=1&loop=1&playlist=W4r5Zo8HJwo&controls=1&showinfo=1&rel=0&modestbranding=1",
          alt: "Ethiopian Janderebaw Generation Video",
          title: "የእምነት፣ የእድገት እና የአንድነት እንቅስቃሴ",
          description:
            "ለአዲስ ተሳታፊዎች የ21 ቀናት መንፈሳዊ ኮርስ፣ ሳምንታዊ የጸሎት ማህበራት እና አማኞችን በእምነት ጉዞያቸው የሚያጠናክሩ ወርሃዊ ፕሮግራሞችን እናቀርባለን።",
          buttonText: "በዩቲዩብ ይመልከቱ",
          buttonUrl: "https://www.youtube.com/@EthiopianJanderebawGeneration",
        }}
        companiesTitle="በእምነት ማህበረሰቦች የሚደገፉ እና የሚታወቁ"
        companies={[
          { src: "/partners/church1.svg", alt: "Orthodox Community" },
          { src: "/partners/church2.svg", alt: "Youth Fellowship" },
          { src: "/partners/church3.svg", alt: "Media Ministry" },
          { src: "/partners/church4.svg", alt: "Prayer Network" },
          { src: "/partners/church5.svg", alt: "Mission Group" },
          { src: "/partners/church6.svg", alt: "Gospel Partners" },
        ]}
        achievementsTitle="በቁጥር የእኛ ስኬቶች"
        achievementsDescription="በትጋት፣ በጸሎት እና በአገልግሎት፣ ኢትዮጵያዊ ጃንደረባው ትውልድ በመላ ኢትዮጵያ እና ከዚያም በላይ በሺዎች የሚቆጠሩ ወጣቶችን ማነሳሳቱን ይቀጥላል።"
        achievements={[
          { label: "የተጠናቀቁ የ21 ቀናት ኮርሶች", value: "23+" },
          { label: "ሳምንታዊ የጸሎት ስብሰባዎች", value: "1+" },
          { label: "ንቁ አባላት", value: "1,000+" },
          { label: "የተጠናቀቁ ፕሮጀክቶች", value: "12" },
        ]}
      />
    </Layout>
  );
};

export default AboutPage;
