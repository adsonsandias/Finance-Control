import { ReactComponent as IconArt } from "../../../assets/category/art.svg";
import { ReactComponent as IconBeauty } from "../../../assets/category/beauty.svg";
import { ReactComponent as IconCar } from "../../../assets/category/car.svg";
import { ReactComponent as IconHealth } from "../../../assets/category/cheers.svg";
import { ReactComponent as IconClothes } from "../../../assets/category/clothes.svg";
import { ReactComponent as IconEducation } from "../../../assets/category/education.svg";
import { ReactComponent as IconEvent } from "../../../assets/category/event.svg";
import { ReactComponent as IconFood } from "../../../assets/category/food.svg";
import { ReactComponent as IconGames } from "../../../assets/category/games.svg";
import { ReactComponent as IconGym } from "../../../assets/category/gym.svg";
import { ReactComponent as IconIdeas } from "../../../assets/category/ideas.svg";
import { ReactComponent as IconInternet } from "../../../assets/category/internet.svg";
import { ReactComponent as IconInvestment } from "../../../assets/category/investment.svg";
import { ReactComponent as IconPersonalDeposit } from "../../../assets/category/personal-deposit.svg";
import { ReactComponent as IconPet } from "../../../assets/category/pet.svg";
import { ReactComponent as IconPhoneCall } from "../../../assets/category/phone-call.svg";
import { ReactComponent as IconRestaurant } from "../../../assets/category/restaurant.svg";
import { ReactComponent as IconCart } from "../../../assets/category/shopping.svg";
import { ReactComponent as IconStreaming } from "../../../assets/category/streaming.svg";
import { ReactComponent as IconTravel } from "../../../assets/category/travel.svg";

export const themeCategory = (category: string) => {
  let item;
  let text: string;
  let icone: React.ReactNode;
  switch (category) {
    case "art":
      item = "var(--category-1)";
      icone = <IconArt />;
      text = "Arte";
      break;
    case "beauty":
      item = "var(--category-2)";
      icone = <IconBeauty />;
      text = "Beleza";
      break;
    case "car":
      item = "var(--category-3)";
      icone = <IconCar />;
      text = "Carro";
      break;
    case "health":
      item = "var(--category-4)";
      icone = <IconHealth />;
      text = "Saúde";
      break;
    case "clothes":
      item = "var(--category-5)";
      icone = <IconClothes />;
      text = "Roupas";
      break;
    case "education":
      item = "var(--category-6)";
      icone = <IconEducation />;
      text = "Educação";
      break;
    case "event":
      item = "var(--category-7)";
      icone = <IconEvent />;
      text = "Eventos";
      break;
    case "food":
      item = "var(--category-8)";
      icone = <IconFood />;
      text = "Alimentação";
      break;
    case "games":
      item = "var(--category-9)";
      icone = <IconGames />;
      text = "Jogos";
      break;
    case "gym":
      item = "var(--category-10)";
      icone = <IconGym />;
      text = "Academia";
      break;
    case "ideas":
      item = "var(--category-11)";
      icone = <IconIdeas />;
      text = "Idéia";
      break;
    case "internet":
      item = "var(--category-12)";
      icone = <IconInternet />;
      text = "Internet";
      break;
    case "investment":
      item = "var(--category-13)";
      icone = <IconInvestment />;
      text = "Investimento";
      break;
    case "personal-deposit":
      item = "var(--category-14)";
      icone = <IconPersonalDeposit />;
      text = "Depósito Pessoal";
      break;
    case "pet":
      item = "var(--category-15)";
      icone = <IconPet />;
      text = "Bicho de Estimação";
      break;
    case "phone-call":
      item = "var(--category-16)";
      icone = <IconPhoneCall />;
      text = "Chamada Telefónica";
      break;
    case "restaurant":
      item = "var(--category-17)";
      icone = <IconRestaurant />;
      text = "Restaurante";
      break;
    case "streaming":
      item = "var(--category-18)";
      icone = <IconStreaming />;
      text = "Serviço de Vídeo";
      break;
    case "travel":
      item = "var(--category-19)";
      icone = <IconTravel />;
      text = "Viagem";
      break;
    case "shopping":
      item = "var(--category-20)";
      icone = <IconCart />;
      text = "Compras";
      break;
    default:
      return { item, icone };
  }
  return { item, icone, text };
};
