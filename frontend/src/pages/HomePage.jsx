import CategoryItems from "../components/CategoryItems";

const categories = [
	{ href: "/Jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/T-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/Shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/Glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/Jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/Suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/Bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-orange-400 mb-4">Explore Our Categories</h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest fashion trends 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <CategoryItems category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage