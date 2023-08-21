export default async function About() {
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Who We Are:</h1>
        <p className="mb-6">
          Welcome to Recast, the digital chameleon of the software world. Born
          from a passion for seamless integration and a vision to abolish the
          boundaries between file formats, we're here to transform the way you
          view, use, and manage your files.
        </p>

        <h1 className="text-2xl font-bold mb-4">What We Do:</h1>
        <p className="mb-6">
          At Recast, we believe that a file format should never stand in the way
          of your productivity. With an ever-growing landscape of software
          tools, the need for interoperability between different file formats
          has never been more crucial.
        </p>
        <p className="mb-6">
          From video and audio formats to documents, spreadsheets, and beyond,
          Recast stands as the bridge between them all. Our platform offers a
          comprehensive solution to convert files without compromising on
          quality, integrity, or security.
        </p>

        <h1 className="text-2xl font-bold mb-4">Our Promise:</h1>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            Simplicity: Our user-friendly interface ensures that converting
            files is as easy as a few clicks. No technical jargon, no convoluted
            processes.
          </li>
          <li className="mb-2">
            Speed: Powered by a robust backend infrastructure, Recast promises
            swift conversions no matter the size or complexity of your files.
          </li>
          <li className="mb-2">
            Security: Your privacy matters. Files uploaded are encrypted, and we
            guarantee they are deleted from our servers once the conversion is
            complete. We never share, sell, or distribute your data.
          </li>
          <li className="mb-2">
            Quality: We uphold the highest standards of conversion quality,
            ensuring that no data is lost and the end product remains true to
            its original form.
          </li>
        </ul>

        <h1 className="text-2xl font-bold mb-4">Who We Serve:</h1>
        <p className="mb-6">
          Whether you're a student trying to manage academic files, a
          professional juggling between tools, a creative navigating various
          software, or an enterprise with a need for bulk conversions, Recast is
          designed for you.
        </p>

        <h1 className="text-2xl font-bold mb-4">Join the Evolution:</h1>
        <p className="mb-6">
          Don't be held back by file incompatibilities. Dive into the world
          where conversions are effortless, quick, and secure. Let Recast
          redefine the way you interact with your files.
        </p>

        <p className="font-semibold text-xl">
          Discover the magic of seamless conversion.{' '}
          <span className="text-blue-500 underline">
            Recast your world today!
          </span>
        </p>
      </section>
    </main>
  )
}
