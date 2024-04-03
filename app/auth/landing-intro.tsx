import Image from 'next/image';

export const runtime = 'edge';
export default function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-center text-3xl font-bold">
            <Image
              src="/logo.svg"
              className="mask mask-circle mr-2 inline-block"
              alt="dashwind-logo"
              width={48}
              height={48}
            />
            BASE
          </h1>

          <div className="mt-12 text-center">
            <Image
              src="/intro.png"
              alt="Dashwind Admin Template"
              className="inline-block w-48"
              width={192}
              height={192}
              priority
            />
          </div>

          {/* Importing pointers component */}
          <h1 className="mt-8 text-2xl font-bold">
            Admin Dashboard Starter Kit
          </h1>
          <p className="mt-4 py-2">
            ✓ <span className="font-semibold">Light/dark</span> mode toggle
          </p>
          <p className="py-2 ">
            ✓ <span className="font-semibold">Redux toolkit</span> and other
            utility libraries configured
          </p>
          <p className="py-2">
            ✓ <span className="font-semibold">Calendar, Modal, Sidebar </span>{' '}
            components
          </p>
          <p className="py-2">
            ✓ User-friendly <span className="font-semibold">documentation</span>
          </p>
          <p className="mb-4 py-2">
            ✓ <span className="font-semibold">Daisy UI</span> components,{' '}
            <span className="font-semibold">Tailwind CSS</span> support
          </p>
        </div>
      </div>
    </div>
  );
}
