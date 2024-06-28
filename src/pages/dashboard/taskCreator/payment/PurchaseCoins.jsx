import { FaBolt, FaCoins, FaCrown, FaFire, FaStar } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle";
import { useNavigate } from "react-router-dom";

const PurchaseCoins = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Basic",
      subtitle: "Starter Pack",
      coins: 10,
      dollars: 1,
      icon: <FaBolt />,
    },
    {
      title: "Standard",
      subtitle: "Most Popular",
      coins: 100,
      dollars: 9,
      icon: <FaFire />,
    },
    {
      title: "Premium",
      subtitle: "Best Value",
      coins: 500,
      dollars: 19,
      icon: <FaStar />,
    },
    {
      title: "Ultimate",
      subtitle: "All You Need",
      coins: 1000,
      dollars: 39,
      icon: <FaCrown />,
    },
  ];

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Coin Store"}
          subHeading={
            "Boost your balance to continue your tasks without interruption"
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative text-gray-500 shadow-lg p-6 mt-8 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigate(`${card.title}`)}
          >
            <div className="absolute bg-neutral -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-2 border-customOrange flex items-center justify-center shadow-lg">
              <div className="text-3xl text-customOrange">{card.icon}</div>
            </div>
            <div className="pt-6 text-center mt-4">
              <h2 className="text-xl font-extrabold mb-1">{card.title}</h2>
              <p className="mb-2">{card.subtitle}</p>
              <h3 className="text-xl text-customOrange font-extrabold mt-4 mb-2">
                <FaCoins className="inline" /> {card.coins}
              </h3>
              <p className="mb-2">${card.dollars} USD</p>
              <button className="btn btn-md w-48 bg-neutral text-white hover:text-customOrange uppercase mt-4">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchaseCoins;
