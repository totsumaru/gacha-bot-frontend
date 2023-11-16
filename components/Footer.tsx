const navigation = {
  main: [
    {
      name: '利用規約',
      href: 'https://daffy-hamburger-7f6.notion.site/Gacha-bot-6a6523681689447fb169261db6c327c0?pvs=4'
    },
    {
      name: 'プライバシーポリシー',
      href: 'https://daffy-hamburger-7f6.notion.site/Gacha-bot-0934bf93cb1844b8a86eced8c75e039d?pvs=4'
    },
    {
      name: '特定商取引法に基づく表記',
      href: 'https://daffy-hamburger-7f6.notion.site/Gacha-bot-4255d0cf29d1478f9c0ed5e0a57a4bfd?pvs=4'
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} target="_blank" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 ArGate, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
