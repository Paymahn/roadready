import type { Metadata } from "next";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RoadReady HGV collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 text-white pt-28 pb-20 lg:pt-36 lg:pb-28 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-slate-300 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Who we are</h2>
            <p>
              RoadReady HGV (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
              <span className="text-emerald-400">roadready.co.uk</span>. We act as the data controller
              for personal information collected through this site and our enquiry processes. If you have
              questions about this policy, contact us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-emerald-400 hover:underline">
                {CONTACT.email}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. What data we collect</h2>
            <p className="mb-3">When you use our website or contact us, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong className="text-white">Identity data</strong> — full name</li>
              <li><strong className="text-white">Contact data</strong> — phone number, email address</li>
              <li><strong className="text-white">Enquiry data</strong> — course interest, messages, and how you heard about us</li>
              <li><strong className="text-white">Technical data</strong> — IP address, browser type, pages visited, and referral source (including UTM campaign parameters from advertising links)</li>
            </ul>
            <p className="mt-3">
              We do not knowingly collect data from anyone under the age of 18. We do not collect
              sensitive personal data (e.g. health information, criminal records) through this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How we use your data</h2>
            <p className="mb-3">We use personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>To respond to your enquiry and provide information about our training courses</li>
              <li>To call you back as requested when you submit a form</li>
              <li>To manage your training application and booking if you proceed</li>
              <li>To understand which advertising campaigns generate enquiries so we can improve our marketing</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Lawful basis for processing</h2>
            <p className="mb-3">Under the UK General Data Protection Regulation (UK GDPR), we rely on:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong className="text-white">Consent</strong> — when you voluntarily submit an enquiry form, you consent to us contacting you about your enquiry</li>
              <li><strong className="text-white">Legitimate interests</strong> — to improve our services, monitor website performance, and measure advertising effectiveness</li>
              <li><strong className="text-white">Contractual necessity</strong> — to process bookings and manage your training if you become a customer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Who we share your data with</h2>
            <p className="mb-3">We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong className="text-white">Training providers</strong> — partner training centres where your course takes place</li>
              <li><strong className="text-white">CRM and email tools</strong> — we use third-party platforms (e.g. HubSpot, Zapier) to manage enquiries and communications</li>
              <li><strong className="text-white">Hosting providers</strong> — our website is hosted on infrastructure that may process data outside the UK, with appropriate safeguards in place</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data to third parties. We do not share your data with unrelated
              marketing companies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. How long we keep your data</h2>
            <p>
              Enquiry data is retained for up to <strong className="text-white">24 months</strong> from
              the date of your last interaction with us, unless you become a customer, in which case we
              retain records for as long as necessary to fulfil our contractual and legal obligations.
              You can request deletion at any time (see section 8).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Cookies and tracking</h2>
            <p>
              This website may use cookies or similar technologies to remember preferences, measure
              traffic, and track advertising campaign performance (e.g. UTM parameters stored in your
              browser session). We do not currently use third-party advertising cookies. If this changes,
              we will update this policy and, where required, seek your consent before setting such cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Your rights</h2>
            <p className="mb-3">Under UK data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Object to processing based on legitimate interests</li>
              <li>Lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  ico.org.uk
                </a>
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-emerald-400 hover:underline">
                {CONTACT.email}
              </a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal data
              against unauthorised access, alteration, or loss. All form submissions are transmitted
              over HTTPS (TLS encryption). Access to enquiry data is limited to authorised personnel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date at the top
              of this page will reflect the most recent revision. We encourage you to review this page
              periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Contact</h2>
            <p>
              If you have any questions about this privacy policy or how we handle your data, please
              contact us:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li>
                Email:{" "}
                <a href={`mailto:${CONTACT.email}`} className="text-emerald-400 hover:underline">
                  {CONTACT.email}
                </a>
              </li>
              <li>Website: roadready.co.uk</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
