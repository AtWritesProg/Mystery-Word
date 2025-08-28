export const categories = {
  'Animals': [
    'Elephant', 'Lion', 'Penguin', 'Dolphin', 'Tiger', 'Monkey', 'Eagle', 'Shark', 'Giraffe', 'Bear',
    'Zebra', 'Kangaroo', 'Whale', 'Snake', 'Butterfly', 'Horse', 'Dog', 'Cat', 'Rabbit', 'Wolf',
    'Fox', 'Deer', 'Owl', 'Parrot', 'Turtle', 'Frog', 'Crocodile', 'Hippo', 'Rhino', 'Panda'
  ],
  'Food': [
    'Pizza', 'Burger', 'Ice Cream', 'Chocolate', 'Apple', 'Sandwich', 'Pasta', 'Cookie', 'Cake', 'Banana',
    'Coffee', 'Tea', 'Bread', 'Rice', 'Chicken', 'Fish', 'Salad', 'Soup', 'Cheese', 'Orange',
    'Mango', 'Grapes', 'Strawberry', 'Donut', 'Pancake', 'Noodles', 'Taco', 'Sushi', 'Popcorn', 'Honey'
  ],
  'Movies': [
    'Superhero', 'Comedy', 'Horror', 'Romance', 'Action', 'Cartoon', 'Thriller', 'Musical', 'Drama', 'Adventure',
    'Sci-Fi', 'Fantasy', 'Mystery', 'Western', 'Documentary', 'Animation', 'War', 'Crime', 'Family', 'Biography',
    'Sports', 'Historical', 'Disaster', 'Zombie', 'Vampire', 'Space', 'Time Travel', 'Magic', 'Pirate', 'Ninja'
  ],
  'Places': [
    'Beach', 'Mountain', 'Forest', 'Desert', 'City', 'Hospital', 'School', 'Park', 'Airport', 'Mall',
    'Library', 'Restaurant', 'Hotel', 'Museum', 'Zoo', 'Stadium', 'Theater', 'Bank', 'Church', 'Market',
    'Bridge', 'Island', 'Cave', 'Waterfall', 'Garden', 'Factory', 'Office', 'Gym', 'Pool', 'Farm'
  ],
  'Sports': [
    'Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cricket', 'Baseball', 'Soccer', 'Boxing', 'Golf',
    'Volleyball', 'Badminton', 'Hockey', 'Wrestling', 'Skiing', 'Cycling', 'Surfing', 'Bowling', 'Archery', 'Karate',
    'Yoga', 'Dancing', 'Climbing', 'Racing', 'Fishing', 'Sailing', 'Skating', 'Diving', 'Gymnastics', 'Martial Arts'
  ],
  'Objects': [
    'Phone', 'Car', 'Book', 'Chair', 'Computer', 'Watch', 'Camera', 'Guitar', 'Bicycle', 'Umbrella',
    'Key', 'Mirror', 'Lamp', 'Pen', 'Glasses', 'Bag', 'Shoes', 'Hat', 'Clock', 'Pillow',
    'Blanket', 'Knife', 'Spoon', 'Plate', 'Cup', 'Bottle', 'Television', 'Radio', 'Fan', 'Window'
  ],
  'Professions': [
    'Doctor', 'Teacher', 'Chef', 'Pilot', 'Artist', 'Engineer', 'Singer', 'Dancer', 'Writer', 'Farmer',
    'Police', 'Firefighter', 'Nurse', 'Lawyer', 'Soldier', 'Driver', 'Carpenter', 'Plumber', 'Electrician', 'Mechanic',
    'Actor', 'Musician', 'Photographer', 'Designer', 'Scientist', 'Judge', 'Dentist', 'Barber', 'Baker', 'Tailor'
  ],
  'Technology': [
    'Smartphone', 'Laptop', 'Internet', 'Robot', 'Drone', 'VR Headset', 'AI Assistant', 'Smart Watch', 'Tablet', 'Gaming Console',
    'Satellite', 'GPS', 'Bluetooth', 'WiFi', 'Social Media', 'Video Call', 'Cloud Storage', 'Cryptocurrency', 'Streaming', 'App Store',
    '3D Printer', 'Electric Car', 'Solar Panel', 'Fitness Tracker', 'Smart TV', 'Voice Assistant', 'Wireless Charger', 'Podcast', 'Emoji', 'QR Code'
  ]
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};