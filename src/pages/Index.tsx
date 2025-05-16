
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PopularPatterns from '@/components/home/PopularPatterns';
import CategorySection from '@/components/home/CategorySection';
import ImportCTA from '@/components/home/ImportCTA';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <PopularPatterns />
        <FeaturesSection />
        <ImportCTA />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
