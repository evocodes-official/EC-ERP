import React, { useState } from 'react';
import { Grid, ArrowLeft, FileText, Shield, Copyright, Menu, X } from 'lucide-react';

const LegalPages = ({ onBack }) => {
  const [activePage, setActivePage] = useState('terms');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pages = [
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'copyright', label: 'Copyright', icon: Copyright }
  ];

  const termsSections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the EVO ERP platform ("the Service") provided by EvoCodes, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions of this agreement, you should not access or use the Service.'
    },
    {
      title: '2. Description of Service',
      content: 'EVO ERP is an enterprise resource planning platform that provides modules for HR management, CRM & sales, finance & invoicing, project management, inventory control, and reports & analytics. EvoCodes reserves the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.'
    },
    {
      title: '3. User Accounts',
      content: 'To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify EvoCodes immediately of any unauthorized use of your account.'
    },
    {
      title: '4. Acceptable Use',
      content: 'You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service. You shall not attempt to gain unauthorized access to any part of the Service, other accounts, or systems connected to the Service.'
    },
    {
      title: '5. Intellectual Property',
      content: 'The Service, including all content, software, design elements, logos, and branding, is the property of EvoCodes and is protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service without prior written consent from EvoCodes.'
    },
    {
      title: '6. Subscription and Billing',
      content: 'Certain features of the Service may require a paid subscription. Subscription fees are billed in advance on a monthly or annual basis. You agree to pay all fees associated with your subscription. Fees are non-refundable except as required by applicable law.'
    },
    {
      title: '7. Data and Privacy',
      content: 'Your use of the Service is subject to our Privacy Policy. By using the Service, you consent to the collection and use of your data as described in the Privacy Policy. EvoCodes implements reasonable security measures to protect your data.'
    },
    {
      title: '8. Limitation of Liability',
      content: 'To the maximum extent permitted by law, EvoCodes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.'
    },
    {
      title: '9. Termination',
      content: 'EvoCodes may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.'
    },
    {
      title: '10. Changes to Terms',
      content: 'EvoCodes reserves the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page. Your continued use of the Service after any changes constitutes acceptance of the new Terms.'
    },
    {
      title: '11. Governing Law',
      content: 'These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which EvoCodes operates, without regard to its conflict of law provisions.'
    },
    {
      title: '12. Contact Information',
      content: 'If you have any questions about these Terms, please contact us at support@evocodes.com.'
    }
  ];

  const privacySections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and other details necessary to provide the Service.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our Service; to process transactions; to send you technical notices and support messages; to respond to your comments and questions; and to monitor and analyze trends, usage, and activities.'
    },
    {
      title: '3. Data Security',
      content: 'EvoCodes takes reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use industry-standard security measures including encryption and secure data storage.'
    },
    {
      title: '4. Data Sharing and Disclosure',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, or when required by law, or to protect the rights, property, or safety of EvoCodes, our users, or the public.'
    },
    {
      title: '5. Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can control the use of cookies through your browser settings.'
    },
    {
      title: '6. Your Rights and Choices',
      content: 'You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.'
    },
    {
      title: '7. Data Retention',
      content: 'We retain your personal information for as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.'
    },
    {
      title: '8. Children\'s Privacy',
      content: 'The Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.'
    },
    {
      title: '9. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.'
    },
    {
      title: '10. Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at privacy@evocodes.com.'
    }
  ];

  const copyrightSections = [
    {
      title: 'Copyright Ownership',
      content: 'All content, software, code, design elements, graphics, logos, and documentation associated with EVO ERP and the EvoCodes brand are the exclusive intellectual property of EvoCodes. All rights reserved.'
    },
    {
      title: 'Usage Rights',
      content: 'Users of EVO ERP are granted a limited, non-exclusive, non-transferable license to use the Service for their internal business purposes. This license does not include the right to copy, modify, distribute, or create derivative works from any part of the Service without explicit written permission from EvoCodes.'
    },
    {
      title: 'Trademark Notice',
      content: 'EVO ERP, EvoCodes, and associated logos are trademarks or registered trademarks of EvoCodes. All other trademarks, service marks, and trade names referenced in the Service are the property of their respective owners.'
    },
    {
      title: 'Third-Party Content',
      content: 'The Service may include content from third-party sources. Such content remains the property of its respective owners and is used under license or with permission. EvoCodes does not claim ownership of any third-party content displayed within the Service.'
    },
    {
      title: 'Reporting Copyright Infringement',
      content: 'If you believe that any content on the Service infringes upon your copyright, please contact us at legal@evocodes.com with the following information: a description of the copyrighted work, the URL where the infringing material is located, your contact information, and a statement of good faith belief that the use is not authorized.'
    },
    {
      title: 'Copyright Year',
      content: '© 2026 EvoCodes. All rights reserved. This copyright notice applies to all content, features, and functionality of the EVO ERP platform.'
    }
  ];

  const getActiveContent = () => {
    switch (activePage) {
      case 'privacy':
        return privacySections;
      case 'copyright':
        return copyrightSections;
      default:
        return termsSections;
    }
  };

  const getActiveTitle = () => {
    switch (activePage) {
      case 'privacy':
        return 'Privacy Policy';
      case 'copyright':
        return 'Copyright Notice';
      default:
        return 'Terms & Conditions';
    }
  };

  const getActiveDescription = () => {
    switch (activePage) {
      case 'privacy':
        return 'How EvoCodes collects, uses, and protects your personal information.';
      case 'copyright':
        return 'Intellectual property rights and usage guidelines for EVO ERP by EvoCodes.';
      default:
        return 'The terms governing your use of the EVO ERP platform by EvoCodes.';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight text-lg">EVO ERP</h1>
                <p className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">by EvoCodes</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`text-sm font-medium transition-colors ${
                    activePage === page.id
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>

            {/* Back Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setActivePage(page.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium py-2 transition-colors ${
                  activePage === page.id
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {page.label}
              </button>
            ))}
            <button
              onClick={() => {
                onBack();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        )}
      </nav>

      {/* PAGE HEADER */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            {activePage === 'terms' && <FileText size={14} className="text-blue-600" />}
            {activePage === 'privacy' && <Shield size={14} className="text-blue-600" />}
            {activePage === 'copyright' && <Copyright size={14} className="text-blue-600" />}
            <span className="text-xs font-semibold text-blue-700">EvoCodes Legal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {getActiveTitle()}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {getActiveDescription()}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Page Tabs */}
          <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activePage === page.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="space-y-10">
                {getActiveContent().map((section, i) => (
                  <div key={i} className={i > 0 ? 'pt-10 border-t border-gray-100' : ''}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Questions About Our Policies?</h3>
            <p className="text-blue-100 mb-6">
              Our legal team is here to help. Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:legal@evocodes.com"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:bg-blue-50 shadow-lg"
              >
                legal@evocodes.com
              </a>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 bg-blue-700/50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:bg-blue-700/70"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Grid className="w-4 h-4" />
              </div>
              <p className="text-xs">© 2026 EvoCodes. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-xs">
              <button onClick={() => setActivePage('terms')} className="hover:text-blue-400 transition-colors">
                Terms & Conditions
              </button>
              <button onClick={() => setActivePage('privacy')} className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setActivePage('copyright')} className="hover:text-blue-400 transition-colors">
                Copyright
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPages;