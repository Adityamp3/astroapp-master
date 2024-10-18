export default function Dashboard() {

  const reportItems = [
    { name: 'Fortune Report', description: 'Lorem Ipsum is simply dummy text...  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reprehenderit commodi libero error quo illum, ab obcaecati exercitationem reiciendis molestias neque, tempore maxime autem magnam sequi cum dolorum! Officiis, necessitatibus!', icon: '/assets/nice-png-store-icon-png-1392630-1.svg' },
    { name: 'Baby Name Report', description: 'Lorem Ipsum is simply dummy text...   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reprehenderit commodi libero error quo illum, ab obcaecati exercitationem reiciendis molestias neque, tempore maxime autem magnam sequi cum dolorum! Officiis, necessitatibus!', icon: '/assets/nice-png-store-icon-png-1392630-2.svg' },
    { name: 'Name Correction Report', description: 'Lorem Ipsum is simply dummy text...   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reprehenderit commodi libero error quo illum, ab obcaecati exercitationem reiciendis molestias neque, tempore maxime autem magnam sequi cum dolorum! Officiis, necessitatibus!', icon: '/assets/nice-png-store-icon-png-1392630-3.svg' },
    { name: 'Mobile Numerology', description: 'Lorem Ipsum is simply dummy text..   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reprehenderit commodi libero error quo illum, ab obcaecati exercitationem reiciendis molestias neque, tempore maxime autem magnam sequi cum dolorum! Officiis, necessitatibus!.', icon: '/assets/nice-png-store-icon-png-1392630-4.svg' },
    { name: 'Love Report', description: 'Lorem Ipsum is simply dummy text...  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reprehenderit commodi libero error quo illum, ab obcaecati exercitationem reiciendis molestias neque, tempore maxime autem magnam sequi cum dolorum! Officiis, necessitatibus!', icon: '/assets/nice-png-store-icon-png-1392630-5.svg' },
  ];

  return (
    <main className="pt-20 px-8 ml-72 h-screen">
      <h1 className="text-2xl font-bold mb-8">Welcome! Here's Your Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        {reportItems.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <img src={item.icon} alt="Report Icon" className="w-12 h-12" />
              <h2 className="text-xl font-semibold">{item.name}</h2>
            </div>
            <p className="mt-4 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
