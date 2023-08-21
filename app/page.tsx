import { Dropzone } from '@/components/dropzone'
import { Manager } from '@/components/files/manager'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { container } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { OpenButton } from './open-button'

const HeroBackground = dynamic(() => import('./hero'), {
  ssr: false,
})

type HeroProps = {}

const Hero = ({}: HeroProps) => (
  <section className={container('py-32 flex flex-col items-center gap-16')}>
    <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
      Convert any file to{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-sky-500 animate-text">
        anything
      </span>
    </h1>
    <OpenButton />
  </section>
)

const WhyRecast = () => {
  return (
    <section className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Why Choose Recast?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Seamless Conversions</h3>
          <p>
            Convert any file format without the hassle. Our cutting-edge
            technology ensures your conversions are efficient, accurate, and
            fast. No more glitches or compatibility issues.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">
            Supports Multiple File Types
          </h3>
          <p>
            From documents to videos, images to audio, and everything in between
            - Recast supports a wide range of file formats. We've got your back,
            no matter what you need converting.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Safe & Secure</h3>
          <p>
            Your files are important to you, and their privacy is paramount to
            us. With end-to-end encryption, rest assured your files are in safe
            hands. We never store your data or share it.
          </p>
        </div>
      </div>
    </section>
  )
}

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">1. Upload Your File</h3>
          <p>
            Drag and drop your file or click to upload. Recast supports large
            files to ensure you're never left hanging.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">
            2. Choose Your Desired Format
          </h3>
          <p>
            Select from a list of popular formats or search for the one you
            need. Can't find it? Let us know, and we'll add it!
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">3. Click Convert</h3>
          <p>
            Sit back and relax as Recast works its magic. Your file will be
            ready in moments.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">4. Download & Enjoy</h3>
          <p>
            Once converted, download your file instantly. Need multiple
            conversions? We support batch processing, too.
          </p>
        </div>
      </div>
    </section>
  )
}

const KeyFeatures = () => {
  return (
    <section className="bg-white p-8 rounded shadow-lg max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Batch Conversions</h3>
          <p>
            Save time by converting multiple files simultaneously. Recast
            handles bulk conversions with ease.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Cloud-Based Platform</h3>
          <p>
            No need to download hefty software. Recast operates entirely in the
            cloud, ensuring quick conversions without slowing down your device.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">24/7 Customer Support</h3>
          <p>
            Run into an issue or have a question? Our dedicated support team is
            here round the clock to assist you.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Regular Updates</h3>
          <p>
            As technology evolves, so does Recast. We're continually updating to
            support newer formats and provide you with the best conversion
            experience.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroBackground />
      <Dropzone>
        <>
          <Header />
          <main>
            <Hero />
            <div className={container()}>
              <Manager />
            </div>
            <WhyRecast />
            <HowItWorks />
            <KeyFeatures />
          </main>
          <Footer />
        </>
      </Dropzone>
    </>
  )
}
