import Header from '@/components/layout/Header';
import FooterSection from '@/components/layout/FooterSection';
import ScrollToTop from '@/components/common/ScrollToTop';
import InteractionWrappers from '@/components/common/InteractionWrappers';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        {children}
      </main>
      <InteractionWrappers />
      <FooterSection />
    </>
  );
}
