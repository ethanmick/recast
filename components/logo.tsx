import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => (
  <Link href="/" className="flex items-center py-2">
    <Image src="/icon.png" width={40} height={40} alt="Recast Logo" priority />
    <div className="text-xl font-semibold ml-4">Recast</div>
  </Link>
)
