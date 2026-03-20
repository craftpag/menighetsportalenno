import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { PricingPage } from '@/pages/PricingPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { TrialPage } from '@/pages/TrialPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { HelpPage } from '@/pages/HelpPage';
import { StatusPage } from '@/pages/StatusPage';
import { AdminLayout } from '@/admin/AdminLayout';
import { AdminOversikt } from '@/admin/AdminOversikt';
import { AdminForesposler } from '@/admin/AdminForesposler';
import { AdminKunder } from '@/admin/AdminKunder';
import { AdminInnhold } from '@/admin/AdminInnhold';

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/maler" element={<TemplatesPage />} />
          <Route path="/funksjoner" element={<FeaturesPage />} />
          <Route path="/priser" element={<PricingPage />} />
          <Route path="/kunder" element={<CustomersPage />} />
          <Route path="/veikart" element={<RoadmapPage />} />
          <Route path="/prov-gratis" element={<TrialPage />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/hjelp" element={<HelpPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        {/* Status — egen layout */}
        <Route path="/status" element={<StatusPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOversikt />} />
          <Route path="foresposler" element={<AdminForesposler />} />
          <Route path="kunder" element={<AdminKunder />} />
          <Route path="innhold" element={<AdminInnhold />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
