import "./globals.css";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Providers } from "@/src/app/providers";
import {
  getAllMappedAudiences,
  getAllMappedExperiences,
  getEntryById,
} from "@/src/lib/client";
import { ComponentResolver } from "@/src/components/ComponentResolver";
import { TrackPage } from "@/src/components/events/TrackPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contentful Live Preview & Personalization Demo",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }) => {
  // TODO: How can we pass Draft Mode down to all components instead of having to check in multiple levels?
  // TODO: Maybe `useContext` or custom React hooks like Aubrie did with her "global context" stuff?
  let { isEnabled } = draftMode();
  // TODO: Can't set the cookie on localhost with Live Preview, so preview can be forced to `true` here.
  // isEnabled = true;

  const siteConfigEntry = await getEntryById({
    entryId: "1Q8WgkDuU4s45pyvrandn9",
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-36">
          <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col">
            <Providers
              draftModeEnabled={isEnabled}
              audiences={(await getAllMappedAudiences()) || []}
              experiences={(await getAllMappedExperiences()) || []}
            >
              {/* Add page tracking event in order to kickoff personalizations. */}
              <TrackPage />
              {/* Add Banner that renders on all pages to show Merge Tag functionality. */}
              <ComponentResolver
                key={siteConfigEntry.fields.persistentBanner.sys.id}
                entry={siteConfigEntry.fields.persistentBanner}
              />
              {children}
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
