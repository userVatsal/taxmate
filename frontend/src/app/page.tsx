import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI-Powered Tax Management for Freelancers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your tax management with intelligent automation, real-time insights, and expert guidance. Save time, reduce stress, and stay compliant.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="btn-primary"
              >
                Get started
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Tax Management Made Simple</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your taxes
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered platform helps you stay on top of your tax obligations with minimal effort.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Smart Transaction Categorization',
    description: 'Our AI automatically categorizes your transactions, saving you hours of manual work.',
  },
  {
    name: 'Real-time Tax Estimates',
    description: 'Get instant estimates of your tax liability based on your current financial data.',
  },
  {
    name: 'Automated Tax Filing',
    description: 'Prepare and file your tax returns with confidence using our guided process.',
  },
]
