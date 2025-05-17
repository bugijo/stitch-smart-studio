
import Layout from '@/components/layout/Layout';
import StoriesSection from '@/components/home/StoriesSection';
import FeedSection from '@/components/home/FeedSection';

export default function Home() {
  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-6">
        <StoriesSection />
        <FeedSection />
      </div>
    </Layout>
  );
}
