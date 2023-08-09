import { Dropzone } from '@/components/dropzone'
import { Manager } from '@/components/files/manager'
import { Header } from '@/components/header'
import { container } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { OpenButton } from './open-button'

const HeroBackground = dynamic(() => import('./hero'), {
  ssr: false,
})

type HeroProps = {}

const Hero = ({}: HeroProps) => (
  <section className="py-32 flex flex-col items-center gap-16">
    <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
      Convert any file to{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-sky-500 animate-text">
        anything
      </span>
    </h1>
    <OpenButton />
  </section>
)

const About = () => (
  <section className={container('flex-col flex gap-[30rem]')}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet nulla
      a dui pharetra, nec viverra nisl sollicitudin. Fusce ac orci non nunc
      tristique tincidunt. Etiam euismod, felis eu gravida sollicitudin, erat
      est dictum lectus, id iaculis justo enim nec erat. Nunc nec bibendum nunc.
      Proin sed nisi quis augue tincidunt scelerisque eu a quam. Vestibulum quis
      neque eget felis suscipit pellentesque non non dui.
    </p>
    <p>
      Vivamus et neque eu dui facilisis dapibus. Nullam bibendum id libero at
      bibendum. Mauris a ligula nec turpis tincidunt vestibulum. Phasellus id
      metus dolor. Maecenas vel neque ut nisi porttitor scelerisque. Mauris in
      felis vel nisl laoreet egestas nec at ligula. Sed sed eros quis enim
      varius fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et
      ultrices posuere cubilia curae; Proin sagittis erat in nisl aliquet, sit
      amet iaculis purus bibendum.
    </p>
    <p>
      Cras sed sem sed diam ullamcorper commodo a nec erat. In hac habitasse
      platea dictumst. Sed sit amet mollis tortor. Vivamus in tellus a sapien
      fermentum auctor id quis justo. Sed in quam vel ex congue faucibus sit
      amet non dui. Proin mollis neque nec diam malesuada, et condimentum libero
      ultrices. Morbi eu orci vel lectus facilisis pellentesque.
    </p>
  </section>
)

export default function Home() {
  return (
    <>
      <HeroBackground />
      <Dropzone>
        <>
          <Header />
          <main>
            <Hero />
            <Manager />
            <About />
          </main>
        </>
      </Dropzone>
    </>
  )
}
