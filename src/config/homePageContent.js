import servingFood from '../assets/homePageImages/serving_food.jpeg';
import happyChef from '../assets/homePageImages/happy_chef.jpeg';
import ingredients from '../assets/homePageImages/ingredients.jpeg';

const carouselContent = [
  {
    title: 'Cook Safe, Serve Safe, Succeed',
    subtitle:
      'Our app ensures that your restaurant follows all necessary sanitary rules, providing peace of mind to both your staff and customers. Cook safe, serve safe, and watch your business thrive!',
    image: {
      src: servingFood,
      alt: 'A waiter serving food',
    },
    textPosition: 'left',
  },
  {
    title: 'Enhance Your Culinary Confidence',
    subtitle:
      "Gain culinary confidence with our app's comprehensive guidelines, temperature monitoring, and allergen management. Elevate your dishes to new heights and delight your customers every time",
    image: {
      src: happyChef,
      alt: 'A happy chef',
    },
    textPosition: 'right',
  },
  {
    title: 'Food Safety Made Simple',
    subtitle:
      'Simplify food safety protocols with our intuitive app. From ingredient handling to cross-contamination prevention, our tool streamlines the process, allowing you to focus on what you do best: creating exceptional dining experiences.',
    image: {
      src: ingredients,
      alt: 'Food ingredients',
    },
    textPosition: 'left',
  },
];

const valueProposition = [
  {
    title: 'Effortless compliance',
    description:
      'Ensure compliance with food safety regulations effortlessly. Our app guides you through each step, helping you maintain the highest standards of hygiene and safety in your kitchen.',
  },
  {
    title: 'Enhanced Customer Confidence',
    description:
      'Build trust and loyalty among your customers. By using our app, you demonstrate your commitment to their well-being, providing them with a safe and enjoyable dining experience.',
  },
  {
    title: 'Unleash Culinary Excellence',
    description:
      'Unleash your culinary creativity without compromising safety. Our app equips you with the knowledge and tools to handle ingredients safely, allowing you to explore new flavors and wow your patrons with your culinary expertise.',
  },
];

export { carouselContent, valueProposition };
