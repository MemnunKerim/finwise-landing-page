import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Source_Sans_3, Manrope } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from '@/data/siteDetails';
import WhatsAppFloating from "@/components/WhatsAppFloating";
import "./globals.css";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  keywords: siteDetails.metadata.keywords,
  alternates: {
    canonical: siteDetails.siteUrl,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6', // Primary blue color
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: 'website',
    images: [
      {
        url: '/images/warehouse-hero.webp',
        width: 1200,
        height: 675,
        alt: siteDetails.siteName + ' - Palet Depolama Hizmetleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/warehouse-hero.webp'],
  },
};

// Schema markup için JSON-LD
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.paletdepo.com/#business",
      "name": "PaletDepo - Memnun Depo Nakliyat Lojistik",
      "alternateName": "PaletDepo",
      "description": "İstanbul Esenyurt merkezli palet depolama ve lojistik hizmetleri. Günlük ve aylık palet kiralama, güvenli depolama çözümleri.",

      "url": "https://www.paletdepo.com",
      "logo": "https://www.paletdepo.com/images/logo.png",
      "image": "https://www.paletdepo.com/images/warehouse-hero.webp",

      "telephone": "+902127584214",
      "email": "selam@paletdepo.com",

      "industry": "Logistics and Storage",
      "category": "Pallet Storage Service",
      "foundingDate": "2020",
      "currenciesAccepted": "TRY",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zafer Mah. 118.Sk. No 10",
        "addressLocality": "Esenyurt",
        "addressRegion": "İstanbul",
        "postalCode": "34197",
        "addressCountry": "TR",
        "addressCountryCode": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.0214,
        "longitude": 28.6736,
        "address": "Zafer Mah. 118.Sk. No 10, Esenyurt, İstanbul"

      },
"areaServed": [
  {
    "@type": "Place",
    "name": "Esenyurt",
    "containedInPlace": {
      "@type": "City",
      "name": "İstanbul"
    }
  },
  {
    "@type": "Place",
    "name": "Büyükçekmece",
    "containedInPlace": {
      "@type": "City", 
      "name": "İstanbul"
    }
  },
  {
    "@type": "Place",
    "name": "Beylikdüzü",
    "containedInPlace": {
      "@type": "City",
      "name": "İstanbul"
    }
  },
  {
    "@type": "Place",
    "name": "Avcılar",
    "containedInPlace": {
      "@type": "City",
      "name": "İstanbul"
    }
  },
  {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates", 
      "latitude": 41.0214,
      "longitude": 28.6736
    },
    "geoRadius": "100000",
    "description": "İstanbul merkezli 100km yarıçapında hizmet alanı"
  }
],
      "priceRange": "₺₺",
      "openingHours": [
        "Mo 00:00-23:59",
        "Tu 00:00-23:59", 
        "We 00:00-23:59",
        "Th 00:00-23:59",
        "Fr 00:00-23:59",
        "Sa 00:00-23:59",
        "Su 00:00-23:59"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Palet Depolama Hizmetleri",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Günlük Palet Depolama",
              "description": "Günlük bazda esnek palet depolama hizmeti"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Aylık Palet Aboneliği",
              "description": "Sabit aylık ücretli palet depolama aboneliği"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Lojistik ve Nakliye",
              "description": "İstanbul genelinde palet nakliye hizmeti"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.linkedin.com/company/paletdepo",
        "https://www.instagram.com/paletdepo",
        "https://www.facebook.com/paletdepo"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.paletdepo.com/#organization", 
      "name": "Memnun Depo Nakliyat Lojistik San. ve Tic. Ltd. Şti.",
      "legalName": "Memnun Depo Nakliyat Lojistik San. ve Tic. Ltd. Şti.",
      "url": "https://www.paletdepo.com",
      "logo": "https://www.paletdepo.com/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+902127584214",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English"],
        "areaServed": "TR"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.paletdepo.com/#website",
      "url": "https://www.paletdepo.com",
      "name": "PaletDepo",
      "description": "İstanbul Esenyurt merkezli palet depolama ve lojistik hizmetleri",
      "publisher": {
        "@id": "https://www.paletdepo.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.paletdepo.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}/>
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <Header />
        <main>
          {children}
        </main>
        <WhatsAppFloating />
        <Footer />
      </body>
    </html>
  );
}
