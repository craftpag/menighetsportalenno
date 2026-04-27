import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { PricingPage } from '@/pages/PricingPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { RegistrerPage } from '@/pages/RegistrerPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { HelpPage } from '@/pages/HelpPage';
import { StatusPage } from '@/pages/StatusPage';
import { VilkarPage } from '@/pages/legal/VilkarPage';
import { PersonvernPage } from '@/pages/legal/PersonvernPage';
import { AngrerettPage } from '@/pages/legal/AngrerettPage';
import { InformasjonskapserPage } from '@/pages/legal/InformasjonskapserPage';
import { BruksvilkarPage } from '@/pages/legal/BruksvilkarPage';
import { DonasjonsvilkarPage } from '@/pages/legal/DonasjonsvilkarPage';
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
          <Route path="/registrer" element={<RegistrerPage />} />
          <Route path="/prov-gratis" element={<Navigate to="/registrer" replace />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/hjelp" element={<HelpPage />} />
          <Route path="/vilkar" element={<VilkarPage />} />
          <Route path="/personvern" element={<PersonvernPage />} />
          <Route path="/angrerett" element={<AngrerettPage />} />
          <Route path="/informasjonskapsler" element={<InformasjonskapserPage />} />
          <Route path="/bruksvilkar" element={<BruksvilkarPage />} />
          <Route path="/donasjonsvilkar" element={<DonasjonsvilkarPage />} />
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
