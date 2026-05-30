import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – MyPawAdvisor",
  description:
    "How MyPawAdvisor collects, uses, and protects your information, including our use of analytics cookies and Amazon affiliate links.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 text-lg mb-8">Last updated: May 30, 2026</p>

      <div className="space-y-8">
        <section>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how MyPawAdvisor (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects information when you visit{" "}
            <a href="https://mypawadvisor.com" className="text-emerald-600 underline">mypawadvisor.com</a>{" "}
            (the &ldquo;Site&rdquo;). By using the Site, you agree to the practices described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We do not require you to create an account or provide personal information to browse the Site. We collect limited information automatically:
          </p>
          <ul className="space-y-3 text-gray-700 text-sm">
            {[
              "Usage data such as pages visited, time on page, referring site, browser type, and device type, collected through analytics tools.",
              "Cookies and similar technologies used to understand how visitors interact with the Site (see Cookies & Analytics below).",
              "If you contact us by email, the information you choose to include in your message.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Cookies &amp; Analytics</h2>
          <p className="text-gray-700 leading-relaxed">
            We use Google Analytics to understand how visitors use the Site. Google Analytics sets cookies that collect anonymized information such as your approximate location, the pages you view, and how you arrived at the Site. This data helps us improve our content. You can opt out of Google Analytics by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-600 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>{" "}
            or by disabling cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Affiliate Links &amp; Amazon Associates</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <p className="mb-2">
              MyPawAdvisor is a participant in the Amazon Services LLC Associates Program and other affiliate programs. This means we may earn a commission when you click an affiliate link and make a purchase, at no additional cost to you.
            </p>
            <p>
              When you click an affiliate link, the destination site (such as Amazon) may set its own cookies to attribute the referral. Those third parties operate under their own privacy policies, which we encourage you to review.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            The Site relies on third-party services that may process limited data on our behalf, including Google Analytics, our hosting provider (Vercel), and affiliate networks such as Amazon Associates. We do not sell your personal information to anyone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Children&rsquo;s Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            The Site is not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Your Choices</h2>
          <p className="text-gray-700 leading-relaxed">
            You can disable cookies in your browser, opt out of Google Analytics, and choose not to click affiliate links. Depending on your location, you may have rights to access, correct, or delete personal information we hold about you. To make such a request, contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the Site after changes take effect constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this Privacy Policy or how we handle your information, you can reach us at{" "}
            <a href="mailto:contact@mypawadvisor.com" className="text-emerald-600 underline">contact@mypawadvisor.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
