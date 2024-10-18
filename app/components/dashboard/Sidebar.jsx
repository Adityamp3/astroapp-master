import Link from 'next/link';
const navItems = [
  { name: 'Dashboard', icon: '/assets/diagram-up-streamline-ultimate-png.svg', href: '/' },
  { name: 'Profile', icon: '/assets/user-single-neutral-streamline-core-remix-png.svg', href: '/profile' },
  { name: 'Numerology', icon: '/assets/tools-wrench-streamline-ultimate-png.svg', href: '/numerology' },
  { name: 'Vedic Astrology', icon: '/assets/graph-bar-streamline-core-png.svg', href: '/vedic-astrology' },
  { name: 'Activity', icon: '/assets/diagram-up-streamline-ultimate-png.svg', href: '/activity' },
  { name: 'Contact us', icon: '/assets/new-contact.svg', href: '/contact' },
  { name: 'Download', icon: '/assets/download.svg', href: '/download' },
];

export default function Sidebar() {
  return (
    <div className="bg-[#FFB38A] h-full w-60 fixed flex flex-col justify-between pb-5">
      <div className="text-white text-2xl font-bold p-5">
        AstroArunPandit
      </div>
      <nav className="flex-grow">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="cursor-pointer flex items-center space-x-4 pl-5 py-3 hover:bg-[#FEDCC5] hover:bg-opacity-80 p-2 rounded transition duration-300">
              <img src={item.icon} alt={item.name} className="w-4 h-4" />
              <span className="text-black font-medium text-xl">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="text-white text-lg pl-7 flex p-4">
        <img src="/assets/settings.svg" alt="Settings Icon" className="w-6 h-6" />
        My Account Settings
      </div>
    </div>
  );
}
