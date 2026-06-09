import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';
import caseStudies from '@/public/case-studies/case-studies.json';

export const metadata: Metadata = {
  title: 'Marketing Case Studies',
  description:
    'Selected marketing case studies showing campaign execution, content performance, and measurable growth outcomes.',
  alternates: {
    canonical: '/marketing/case-studies',
  },
  openGraph: {
    title: 'Marketing Case Studies | Centauri',
    description:
      'Selected marketing case studies showing campaign execution, content performance, and measurable growth outcomes.',
    url: absoluteUrl('/marketing/case-studies'),
    type: 'website',
  },
};

export default function CaseStudies() {
  const studies = caseStudies;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Centauri Marketing Case Studies',
    itemListElement: studies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/marketing/case-studies#${study.slug}`),
      item: {
        '@type': 'Article',
        headline: `${study.company} case study`,
        description: study.overview,
        about: study['solution-type'],
        articleBody: study.fullDescription || study.overview,
        hasPart: [
          {
            '@type': 'WebPageElement',
            name: 'Challenge',
            text: study.challenge || '',
          },
          {
            '@type': 'WebPageElement',
            name: 'Solution',
            text: study.solution || '',
          },
        ],
      },
    })),
  };

  return (
    <div className="container mx-auto py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <h1 className="mb-3 text-center text-4xl font-bold">Case Studies</h1>
      <p className="mx-auto mb-8 max-w-3xl text-center text-sm font-medium text-gray-600">
        Evidence-first snapshots of execution and outcomes across content marketing, social media, and paid growth.
      </p>

      <div className="space-y-8">
        {studies.map((study) => (
          <section key={study.slug} id={study.slug}>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <img
                src={study.heroImage}
                alt={`${study.company} case study`}
                className="mb-4 h-auto w-full max-w-xl rounded-md object-cover"
              />
              <h2 className="mb-1 text-2xl font-semibold">{study.company}</h2>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {study['solution-type']} • {study.industry}
              </p>
              <p className="mb-4 max-w-3xl font-bold text-gray-600">{study.overview}</p>
              {study.metrics.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2">
                  {study.metrics.slice(0, 3).map((metric) => (
                    <span
                      key={`${study.slug}-${metric.label}`}
                      className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700"
                    >
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}