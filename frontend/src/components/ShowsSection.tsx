import { useState, useMemo } from 'react';
import { Tv, Search, X } from 'lucide-react';
import { useGetAllShows } from '@/hooks/useQueries';
import { ShowCard } from './ShowCard';
import { VideoPlayer } from './VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import type { Show } from '../backend';

const FALLBACK_SHOWS: (Show & { badge?: string; genre?: string })[] = [
  // Drama
  { title: 'Breaking Bad', description: 'A high school chemistry teacher turned drug kingpin in this critically acclaimed crime drama.', embedUrl: 'https://www.youtube.com/embed/HhesaQXLuRY', thumbnailUrl: 'https://img.youtube.com/vi/HhesaQXLuRY/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'The Sopranos', description: 'New Jersey mob boss Tony Soprano balances family life and organized crime in this landmark HBO series.', embedUrl: 'https://www.youtube.com/embed/WRuHzYx-8Go', thumbnailUrl: 'https://img.youtube.com/vi/WRuHzYx-8Go/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'The Wire', description: 'Gritty crime drama exploring Baltimore through the eyes of law enforcement, drug dealers, and residents.', embedUrl: 'https://www.youtube.com/embed/9qK-VGjMr8g', thumbnailUrl: 'https://img.youtube.com/vi/9qK-VGjMr8g/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Better Call Saul', description: "The origin story of Breaking Bad's beloved con-man lawyer Jimmy McGill becoming Saul Goodman.", embedUrl: 'https://www.youtube.com/embed/HN4oydykJFc', thumbnailUrl: 'https://img.youtube.com/vi/HN4oydykJFc/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Peaky Blinders', description: 'British crime drama following the ruthless Shelby crime family in post-WWI Birmingham.', embedUrl: 'https://www.youtube.com/embed/oVzVdvGIC7U', thumbnailUrl: 'https://img.youtube.com/vi/oVzVdvGIC7U/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Succession', description: 'A wealthy media dynasty tears itself apart as the patriarch\'s children fight for control.', embedUrl: 'https://www.youtube.com/embed/OzYxJV_rmE8', thumbnailUrl: 'https://img.youtube.com/vi/OzYxJV_rmE8/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Ozark', description: 'A financial advisor launders money for a drug cartel and relocates his family to the Ozarks.', embedUrl: 'https://www.youtube.com/embed/5hAXVqrljbs', thumbnailUrl: 'https://img.youtube.com/vi/5hAXVqrljbs/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'The Crown', description: 'The political rivalries and romance of Queen Elizabeth II\'s reign told across decades.', embedUrl: 'https://www.youtube.com/embed/JWtnJjn6ng0', thumbnailUrl: 'https://img.youtube.com/vi/JWtnJjn6ng0/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Mad Men', description: 'The glamorous and cutthroat world of 1960s Madison Avenue advertising agencies.', embedUrl: 'https://www.youtube.com/embed/YGDL1mFxFDk', thumbnailUrl: 'https://img.youtube.com/vi/YGDL1mFxFDk/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'House of Cards', description: 'A ruthless politician and his wife scheme their way to the top of American politics.', embedUrl: 'https://www.youtube.com/embed/ULwUzF1q5w4', thumbnailUrl: 'https://img.youtube.com/vi/ULwUzF1q5w4/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Yellowstone', description: 'The Dutton family fights to protect their Montana ranch from land developers and politicians.', embedUrl: 'https://www.youtube.com/embed/UKe816QVLBA', thumbnailUrl: 'https://img.youtube.com/vi/UKe816QVLBA/hqdefault.jpg', badge: 'Series', genre: 'Drama' },
  { title: 'Boardwalk Empire', description: 'Prohibition-era Atlantic City ruled by a corrupt politician and his criminal empire.', embedUrl: 'https://www.youtube.com/embed/aSXV7_nyMGs', thumbnailUrl: 'https://img.youtube.com/vi/aSXV7_nyMGs/hqdefault.jpg', badge: 'Series', genre: 'Drama' },

  // Comedy
  { title: 'The Office', description: 'A hilarious mockumentary sitcom about the everyday lives of office employees at Dunder Mifflin.', embedUrl: 'https://www.youtube.com/embed/dVHo1dU1GSo', thumbnailUrl: 'https://img.youtube.com/vi/dVHo1dU1GSo/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Parks and Recreation', description: 'A mockumentary following the Parks Department of a small Indiana town and its quirky employees.', embedUrl: 'https://www.youtube.com/embed/VwgKMDbe8n4', thumbnailUrl: 'https://img.youtube.com/vi/VwgKMDbe8n4/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Brooklyn Nine-Nine', description: 'A diverse group of detectives in a New York police precinct solve crimes and crack jokes.', embedUrl: 'https://www.youtube.com/embed/SUMHlMFHFHo', thumbnailUrl: 'https://img.youtube.com/vi/SUMHlMFHFHo/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Arrested Development', description: 'A formerly wealthy family struggles to stay together after their patriarch is arrested for fraud.', embedUrl: 'https://www.youtube.com/embed/1MRBEMeRoC4', thumbnailUrl: 'https://img.youtube.com/vi/1MRBEMeRoC4/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Seinfeld', description: 'Four friends navigate the absurdities of everyday life in New York City in this iconic sitcom.', embedUrl: 'https://www.youtube.com/embed/yjLCFSIfmgI', thumbnailUrl: 'https://img.youtube.com/vi/yjLCFSIfmgI/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Friends', description: 'Six friends living in New York City navigate love, careers, and life together over ten seasons.', embedUrl: 'https://www.youtube.com/embed/hDNNmeeJs1Q', thumbnailUrl: 'https://img.youtube.com/vi/hDNNmeeJs1Q/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'It\'s Always Sunny in Philadelphia', description: 'Five depraved friends run a bar in Philadelphia and scheme their way through outrageous situations.', embedUrl: 'https://www.youtube.com/embed/Ug-Ot3IQHWM', thumbnailUrl: 'https://img.youtube.com/vi/Ug-Ot3IQHWM/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'Schitt\'s Creek', description: 'A wealthy family loses everything and must rebuild their lives in a small town they once bought as a joke.', embedUrl: 'https://www.youtube.com/embed/yCMEzFsGSoU', thumbnailUrl: 'https://img.youtube.com/vi/yCMEzFsGSoU/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },
  { title: 'What We Do in the Shadows', description: 'A mockumentary following vampire roommates navigating modern life on Staten Island.', embedUrl: 'https://www.youtube.com/embed/aSXV7_nyMGs', thumbnailUrl: 'https://img.youtube.com/vi/aSXV7_nyMGs/hqdefault.jpg', badge: 'Series', genre: 'Comedy' },

  // Sci-Fi
  { title: 'Stranger Things', description: 'A group of kids uncover supernatural mysteries in their small Indiana town.', embedUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU', thumbnailUrl: 'https://img.youtube.com/vi/b9EkMc79ZSU/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Dark', description: 'German sci-fi thriller about families uncovering a time travel conspiracy spanning generations.', embedUrl: 'https://www.youtube.com/embed/ESEUoa-mz2c', thumbnailUrl: 'https://img.youtube.com/vi/ESEUoa-mz2c/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Black Mirror', description: 'Anthology series exploring the dark side of technology and its impact on society.', embedUrl: 'https://www.youtube.com/embed/jDiYGjp5iFg', thumbnailUrl: 'https://img.youtube.com/vi/jDiYGjp5iFg/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Westworld', description: 'A futuristic theme park populated by AI hosts begins to gain consciousness and rebel.', embedUrl: 'https://www.youtube.com/embed/BdN8iBhMFBM', thumbnailUrl: 'https://img.youtube.com/vi/BdN8iBhMFBM/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'The Expanse', description: 'Humanity has colonized the solar system and political tensions threaten to ignite a war.', embedUrl: 'https://www.youtube.com/embed/EsqTMBFMFpk', thumbnailUrl: 'https://img.youtube.com/vi/EsqTMBFMFpk/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Altered Carbon', description: 'In a future where consciousness can be transferred between bodies, a soldier investigates a murder.', embedUrl: 'https://www.youtube.com/embed/d0UU3FELnCc', thumbnailUrl: 'https://img.youtube.com/vi/d0UU3FELnCc/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Battlestar Galactica', description: 'Humanity\'s last survivors flee robot Cylons across the galaxy in search of a new home.', embedUrl: 'https://www.youtube.com/embed/YGDL1mFxFDk', thumbnailUrl: 'https://img.youtube.com/vi/YGDL1mFxFDk/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },
  { title: 'Lost', description: 'Survivors of a plane crash are stranded on a mysterious island full of secrets and danger.', embedUrl: 'https://www.youtube.com/embed/KTu8iDynwNc', thumbnailUrl: 'https://img.youtube.com/vi/KTu8iDynwNc/hqdefault.jpg', badge: 'Series', genre: 'Sci-Fi' },

  // Fantasy
  { title: 'Game of Thrones', description: "Epic fantasy series of power, betrayal, and dragons based on George R.R. Martin's novels.", embedUrl: 'https://www.youtube.com/embed/BpJYNVhGf1s', thumbnailUrl: 'https://img.youtube.com/vi/BpJYNVhGf1s/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },
  { title: 'The Witcher', description: 'Fantasy drama based on the book series, following monster hunter Geralt of Rivia.', embedUrl: 'https://www.youtube.com/embed/ndl1W4ltcmg', thumbnailUrl: 'https://img.youtube.com/vi/ndl1W4ltcmg/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },
  { title: 'House of the Dragon', description: 'The prequel to Game of Thrones — the Targaryen civil war known as the Dance of the Dragons.', embedUrl: 'https://www.youtube.com/embed/DotnJ7tTA34', thumbnailUrl: 'https://img.youtube.com/vi/DotnJ7tTA34/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },
  { title: 'The Rings of Power', description: 'Epic prequel series set in the Second Age of Middle-earth, thousands of years before The Hobbit.', embedUrl: 'https://www.youtube.com/embed/JrZxL8BplKU', thumbnailUrl: 'https://img.youtube.com/vi/JrZxL8BplKU/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },
  { title: 'Shadow and Bone', description: 'A young soldier discovers a rare power that could free her country from a dark force.', embedUrl: 'https://www.youtube.com/embed/P3Oy-HBCkAI', thumbnailUrl: 'https://img.youtube.com/vi/P3Oy-HBCkAI/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },
  { title: 'Merlin', description: 'Young Merlin arrives in Camelot and secretly uses magic to protect Prince Arthur.', embedUrl: 'https://www.youtube.com/embed/Ug-Ot3IQHWM', thumbnailUrl: 'https://img.youtube.com/vi/Ug-Ot3IQHWM/hqdefault.jpg', badge: 'Series', genre: 'Fantasy' },

  // Thriller / Crime
  { title: 'Narcos', description: 'Drama series chronicling the rise and fall of drug cartels in Colombia.', embedUrl: 'https://www.youtube.com/embed/U7elNhHwgBU', thumbnailUrl: 'https://img.youtube.com/vi/U7elNhHwgBU/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Money Heist', description: 'Spanish drama about a criminal mastermind leading a group of robbers for the perfect heist.', embedUrl: 'https://www.youtube.com/embed/p_PJbmrX4uk', thumbnailUrl: 'https://img.youtube.com/vi/p_PJbmrX4uk/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Mindhunter', description: 'FBI agents interview serial killers to understand and catch other murderers in the 1970s.', embedUrl: 'https://www.youtube.com/embed/jDiYGjp5iFg', thumbnailUrl: 'https://img.youtube.com/vi/jDiYGjp5iFg/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'True Detective', description: 'Anthology crime series following detectives investigating complex and disturbing cases.', embedUrl: 'https://www.youtube.com/embed/U7elNhHwgBU', thumbnailUrl: 'https://img.youtube.com/vi/U7elNhHwgBU/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Dexter', description: 'A blood spatter analyst for the Miami police moonlights as a vigilante serial killer.', embedUrl: 'https://www.youtube.com/embed/5hAXVqrljbs', thumbnailUrl: 'https://img.youtube.com/vi/5hAXVqrljbs/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Sherlock', description: 'A modern-day Sherlock Holmes solves complex crimes in contemporary London.', embedUrl: 'https://www.youtube.com/embed/JWtnJjn6ng0', thumbnailUrl: 'https://img.youtube.com/vi/JWtnJjn6ng0/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Fargo', description: 'Anthology crime series inspired by the Coen Brothers film — dark, funny, and violent.', embedUrl: 'https://www.youtube.com/embed/OzYxJV_rmE8', thumbnailUrl: 'https://img.youtube.com/vi/OzYxJV_rmE8/hqdefault.jpg', badge: 'Series', genre: 'Crime' },
  { title: 'Ozark', description: 'A financial advisor launders money for a drug cartel and relocates his family to the Ozarks.', embedUrl: 'https://www.youtube.com/embed/5hAXVqrljbs', thumbnailUrl: 'https://img.youtube.com/vi/5hAXVqrljbs/hqdefault.jpg', badge: 'Series', genre: 'Crime' },

  // Action
  { title: 'The Last of Us', description: 'A post-apocalyptic survival drama following Joel and Ellie across a fungus-ravaged America.', embedUrl: 'https://www.youtube.com/embed/uLtkt8BonwM', thumbnailUrl: 'https://img.youtube.com/vi/uLtkt8BonwM/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'The Boys', description: 'Superheroes abuse their powers while a group of vigilantes fights to expose them.', embedUrl: 'https://www.youtube.com/embed/M1bhOaLV4FU', thumbnailUrl: 'https://img.youtube.com/vi/M1bhOaLV4FU/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'Invincible', description: 'A teenager discovers his father is the most powerful superhero on Earth — and a villain.', embedUrl: 'https://www.youtube.com/embed/8BO-GNGiNFg', thumbnailUrl: 'https://img.youtube.com/vi/8BO-GNGiNFg/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'The Mandalorian', description: 'A lone bounty hunter navigates the outer reaches of the galaxy far from the New Republic.', embedUrl: 'https://www.youtube.com/embed/aOC8E8z_ifw', thumbnailUrl: 'https://img.youtube.com/vi/aOC8E8z_ifw/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'Jack Ryan', description: 'CIA analyst Jack Ryan uncovers a dangerous conspiracy and is thrust into the field.', embedUrl: 'https://www.youtube.com/embed/BdN8iBhMFBM', thumbnailUrl: 'https://img.youtube.com/vi/BdN8iBhMFBM/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'Reacher', description: 'A drifting ex-military cop is falsely accused of murder and uncovers a conspiracy in a small town.', embedUrl: 'https://www.youtube.com/embed/EsqTMBFMFpk', thumbnailUrl: 'https://img.youtube.com/vi/EsqTMBFMFpk/hqdefault.jpg', badge: 'Series', genre: 'Action' },
  { title: 'Daredevil', description: 'A blind lawyer fights crime as a masked vigilante in the streets of Hell\'s Kitchen.', embedUrl: 'https://www.youtube.com/embed/ruNrdmjcNTc', thumbnailUrl: 'https://img.youtube.com/vi/ruNrdmjcNTc/hqdefault.jpg', badge: 'Series', genre: 'Action' },

  // Anime
  { title: 'Attack on Titan', description: 'Humanity fights for survival against giant humanoid Titans behind massive walls.', embedUrl: 'https://www.youtube.com/embed/MGRm4IzK1SQ', thumbnailUrl: 'https://img.youtube.com/vi/MGRm4IzK1SQ/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Death Note', description: 'A high school student finds a supernatural notebook that kills anyone whose name is written in it.', embedUrl: 'https://www.youtube.com/embed/NlJZ-YgAt-c', thumbnailUrl: 'https://img.youtube.com/vi/NlJZ-YgAt-c/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Demon Slayer', description: 'A young boy becomes a demon slayer after his family is slaughtered and his sister turned into a demon.', embedUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4', thumbnailUrl: 'https://img.youtube.com/vi/VQGCKyvzIM4/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Fullmetal Alchemist: Brotherhood', description: 'Two brothers use alchemy to search for the Philosopher\'s Stone after a failed resurrection attempt.', embedUrl: 'https://www.youtube.com/embed/--IcmZkvL0Q', thumbnailUrl: 'https://img.youtube.com/vi/--IcmZkvL0Q/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'One Punch Man', description: 'A superhero who can defeat any enemy with a single punch searches for a worthy opponent.', embedUrl: 'https://www.youtube.com/embed/0C6tBHMJDQk', thumbnailUrl: 'https://img.youtube.com/vi/0C6tBHMJDQk/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Naruto', description: 'A young ninja with a powerful demon sealed inside him dreams of becoming the greatest ninja.', embedUrl: 'https://www.youtube.com/embed/QczyDMpBPsA', thumbnailUrl: 'https://img.youtube.com/vi/QczyDMpBPsA/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Dragon Ball Z', description: 'Goku and his friends defend Earth from increasingly powerful alien threats and villains.', embedUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk', thumbnailUrl: 'https://img.youtube.com/vi/ByXuk9QqQkk/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'My Hero Academia', description: 'In a world where most people have superpowers, a powerless boy dreams of becoming a hero.', embedUrl: 'https://www.youtube.com/embed/EPVkcwyLQQ8', thumbnailUrl: 'https://img.youtube.com/vi/EPVkcwyLQQ8/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Jujutsu Kaisen', description: 'A high school student joins a secret organization of sorcerers to fight cursed spirits.', embedUrl: 'https://www.youtube.com/embed/4A_X-Dvl0ws', thumbnailUrl: 'https://img.youtube.com/vi/4A_X-Dvl0ws/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },
  { title: 'Hunter x Hunter', description: 'A boy sets out to find his missing father and become a Hunter — an elite member of society.', embedUrl: 'https://www.youtube.com/embed/D9iTQHGIjwM', thumbnailUrl: 'https://img.youtube.com/vi/D9iTQHGIjwM/hqdefault.jpg', badge: 'Anime', genre: 'Anime' },

  // Horror
  { title: 'The Haunting of Hill House', description: 'A family is haunted by their experiences in a terrifying mansion years after leaving it.', embedUrl: 'https://www.youtube.com/embed/4mSN2LFXOS8', thumbnailUrl: 'https://img.youtube.com/vi/4mSN2LFXOS8/hqdefault.jpg', badge: 'Series', genre: 'Horror' },
  { title: 'American Horror Story', description: 'Anthology horror series exploring different terrifying scenarios each season.', embedUrl: 'https://www.youtube.com/embed/Ug-Ot3IQHWM', thumbnailUrl: 'https://img.youtube.com/vi/Ug-Ot3IQHWM/hqdefault.jpg', badge: 'Series', genre: 'Horror' },
  { title: 'The Walking Dead', description: 'Survivors navigate a zombie apocalypse and the dangers posed by other desperate humans.', embedUrl: 'https://www.youtube.com/embed/gKgVgCiXPmg', thumbnailUrl: 'https://img.youtube.com/vi/gKgVgCiXPmg/hqdefault.jpg', badge: 'Series', genre: 'Horror' },
  { title: 'Squid Game', description: "Korean thriller series about contestants competing in deadly children's games for a cash prize.", embedUrl: 'https://www.youtube.com/embed/oqxAJKy0ii4', thumbnailUrl: 'https://img.youtube.com/vi/oqxAJKy0ii4/hqdefault.jpg', badge: 'Series', genre: 'Horror' },
  { title: 'Midnight Mass', description: 'A charismatic priest arrives on a remote island and brings miraculous — and terrifying — events.', embedUrl: 'https://www.youtube.com/embed/2Nt_8BHjCBo', thumbnailUrl: 'https://img.youtube.com/vi/2Nt_8BHjCBo/hqdefault.jpg', badge: 'Series', genre: 'Horror' },
  { title: 'Ratched', description: 'The origin story of the iconic villain Nurse Ratched from One Flew Over the Cuckoo\'s Nest.', embedUrl: 'https://www.youtube.com/embed/Ug-Ot3IQHWM', thumbnailUrl: 'https://img.youtube.com/vi/Ug-Ot3IQHWM/hqdefault.jpg', badge: 'Series', genre: 'Horror' },

  // Documentary
  { title: 'Planet Earth II', description: 'David Attenborough narrates stunning footage of wildlife in their natural habitats around the globe.', embedUrl: 'https://www.youtube.com/embed/c8aFcHFu8QM', thumbnailUrl: 'https://img.youtube.com/vi/c8aFcHFu8QM/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },
  { title: 'Making a Murderer', description: 'Documentary series following the case of Steven Avery, accused of murder after being exonerated.', embedUrl: 'https://www.youtube.com/embed/jDiYGjp5iFg', thumbnailUrl: 'https://img.youtube.com/vi/jDiYGjp5iFg/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },
  { title: 'The Last Dance', description: 'The story of Michael Jordan and the Chicago Bulls\' dynasty through the 1997-98 NBA season.', embedUrl: 'https://www.youtube.com/embed/HDG3bmFMgBs', thumbnailUrl: 'https://img.youtube.com/vi/HDG3bmFMgBs/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },
  { title: 'Tiger King', description: 'The bizarre world of big cat owners and the feud between Joe Exotic and Carole Baskin.', embedUrl: 'https://www.youtube.com/embed/acL3E8RNMOA', thumbnailUrl: 'https://img.youtube.com/vi/acL3E8RNMOA/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },
  { title: 'Our Planet', description: 'David Attenborough explores the natural wonders of our world and the impact of climate change.', embedUrl: 'https://www.youtube.com/embed/aETNYyrqNYE', thumbnailUrl: 'https://img.youtube.com/vi/aETNYyrqNYE/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },
  { title: 'Wild Wild Country', description: 'The story of the controversial Rajneeshee cult that built a utopian city in rural Oregon.', embedUrl: 'https://www.youtube.com/embed/aSXV7_nyMGs', thumbnailUrl: 'https://img.youtube.com/vi/aSXV7_nyMGs/hqdefault.jpg', badge: 'Documentary', genre: 'Documentary' },

  // Movies
  { title: 'Inception', description: 'Mind-bending thriller film by Christopher Nolan about dreams within dreams.', embedUrl: 'https://www.youtube.com/embed/YoHD9XEInc0', thumbnailUrl: 'https://img.youtube.com/vi/YoHD9XEInc0/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Interstellar', description: 'Epic sci-fi adventure about astronauts traveling through a wormhole in search of a new home for humanity.', embedUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E', thumbnailUrl: 'https://img.youtube.com/vi/zSWdZVtXT7E/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Dark Knight', description: 'Batman faces the Joker in this iconic superhero crime thriller by Christopher Nolan.', embedUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY', thumbnailUrl: 'https://img.youtube.com/vi/EXeTwQWrcwY/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Pulp Fiction', description: "Quentin Tarantino's iconic crime anthology weaving together multiple stories in Los Angeles.", embedUrl: 'https://www.youtube.com/embed/s7EdQ4FqbhY', thumbnailUrl: 'https://img.youtube.com/vi/s7EdQ4FqbhY/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.', embedUrl: 'https://www.youtube.com/embed/6hB3S9bIaco', thumbnailUrl: 'https://img.youtube.com/vi/6hB3S9bIaco/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', embedUrl: 'https://www.youtube.com/embed/sY1S34973zA', thumbnailUrl: 'https://img.youtube.com/vi/sY1S34973zA/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Avengers: Endgame', description: 'The Avengers assemble one final time to undo Thanos\'s destruction and restore the universe.', embedUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c', thumbnailUrl: 'https://img.youtube.com/vi/TcMBFSGVi1c/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Matrix', description: 'A computer hacker discovers reality is a simulation and joins a rebellion against machine overlords.', embedUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8', thumbnailUrl: 'https://img.youtube.com/vi/vKQi3bBA1y8/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Parasite', description: 'A poor family schemes to become employed by a wealthy family in this Oscar-winning Korean thriller.', embedUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY', thumbnailUrl: 'https://img.youtube.com/vi/5xH0HfJHsaY/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Joker', description: 'A failed comedian descends into madness and becomes the iconic Batman villain in Gotham City.', embedUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY', thumbnailUrl: 'https://img.youtube.com/vi/zAGVQLHvwOY/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Oppenheimer', description: 'The story of J. Robert Oppenheimer and the development of the atomic bomb during WWII.', embedUrl: 'https://www.youtube.com/embed/uYPbbksJxIg', thumbnailUrl: 'https://img.youtube.com/vi/uYPbbksJxIg/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Dune', description: 'A noble family becomes embroiled in a war for control of the galaxy\'s most valuable resource.', embedUrl: 'https://www.youtube.com/embed/8g18jFHCLXk', thumbnailUrl: 'https://img.youtube.com/vi/8g18jFHCLXk/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Top Gun: Maverick', description: 'Maverick returns to train a new generation of Top Gun graduates for a dangerous mission.', embedUrl: 'https://www.youtube.com/embed/qSqVVswa420', thumbnailUrl: 'https://img.youtube.com/vi/qSqVVswa420/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Spider-Man: No Way Home', description: 'Spider-Man asks Doctor Strange for help and accidentally opens the multiverse.', embedUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA', thumbnailUrl: 'https://img.youtube.com/vi/JfVOs4VSpmA/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Everything Everywhere All at Once', description: 'A laundromat owner discovers she can access parallel universes and must save the multiverse.', embedUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g', thumbnailUrl: 'https://img.youtube.com/vi/wxN1T1uxQ2g/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Batman', description: 'Batman investigates a serial killer targeting Gotham\'s elite in this dark and gritty reboot.', embedUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4', thumbnailUrl: 'https://img.youtube.com/vi/mqqft2x_Aa4/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'John Wick', description: 'A retired hitman seeks vengeance against the gangsters who killed his dog and stole his car.', embedUrl: 'https://www.youtube.com/embed/2AUmvWm5ZDQ', thumbnailUrl: 'https://img.youtube.com/vi/2AUmvWm5ZDQ/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in a high-octane chase.', embedUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8', thumbnailUrl: 'https://img.youtube.com/vi/hEJnMQG9ev8/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Get Out', description: 'A Black man visits his white girlfriend\'s family estate and uncovers a disturbing secret.', embedUrl: 'https://www.youtube.com/embed/DzfpyUB60YY', thumbnailUrl: 'https://img.youtube.com/vi/DzfpyUB60YY/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Knives Out', description: 'A detective investigates the death of a wealthy crime novelist surrounded by his dysfunctional family.', embedUrl: 'https://www.youtube.com/embed/qGqiHJTsRkQ', thumbnailUrl: 'https://img.youtube.com/vi/qGqiHJTsRkQ/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Tenet', description: 'A secret agent embarks on a mission to prevent World War III using time inversion.', embedUrl: 'https://www.youtube.com/embed/LdOM0x0XDMo', thumbnailUrl: 'https://img.youtube.com/vi/LdOM0x0XDMo/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'Whiplash', description: 'A young drummer pursues greatness under the brutal tutelage of a demanding music conservatory instructor.', embedUrl: 'https://www.youtube.com/embed/7d_jQycdQGo', thumbnailUrl: 'https://img.youtube.com/vi/7d_jQycdQGo/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'La La Land', description: 'A jazz musician and an aspiring actress fall in love while chasing their dreams in Los Angeles.', embedUrl: 'https://www.youtube.com/embed/0pdqf4P9MB8', thumbnailUrl: 'https://img.youtube.com/vi/0pdqf4P9MB8/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
  { title: 'The Grand Budapest Hotel', description: 'A legendary concierge and his lobby boy become embroiled in a murder mystery and art theft.', embedUrl: 'https://www.youtube.com/embed/1Fg5iWmQjwk', thumbnailUrl: 'https://img.youtube.com/vi/1Fg5iWmQjwk/hqdefault.jpg', badge: 'Movie', genre: 'Movie' },
];

const GENRES = ['All', 'Drama', 'Comedy', 'Sci-Fi', 'Fantasy', 'Crime', 'Action', 'Anime', 'Horror', 'Documentary', 'Movie'];

export function ShowsSection() {
  const { data: backendShows, isLoading } = useGetAllShows();
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  const backendValid = (backendShows ?? []).filter(
    (s) => s.embedUrl && !s.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_SHOWS.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const allShows = [...backendValid, ...fallbackFiltered];

  const filteredShows = useMemo(() => {
    return allShows.filter((show) => {
      const matchesSearch = show.title.toLowerCase().includes(search.toLowerCase());
      const fallbackMatch = FALLBACK_SHOWS.find(
        (f) => f.title.toLowerCase() === show.title.toLowerCase()
      );
      const genre = fallbackMatch?.genre ?? 'Drama';
      const matchesGenre = activeGenre === 'All' || genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
  }, [allShows, search, activeGenre]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Tv className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 03
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          📺 <span className="text-neon-blue neon-text-blue">TV Shows & Movies</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Watch trailers for 100+ of the greatest TV shows and movies — Breaking Bad, Game of Thrones, Inception, and so much more.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      {/* Search + Genre Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search shows & movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-neon-blue/50"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border ${
                activeGenre === genre
                  ? 'bg-neon-blue text-background border-neon-blue shadow-sm shadow-neon-blue/40'
                  : 'bg-card text-muted-foreground border-border hover:border-neon-blue/50 hover:text-neon-blue'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Showing <span className="text-neon-blue font-bold">{filteredShows.length}</span> of {allShows.length} titles
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <Skeleton className="w-full h-44" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredShows.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Tv className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">No titles found</p>
          <p className="text-sm mt-1">Try a different search or genre filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredShows.map((show, idx) => {
            const fallbackMatch = FALLBACK_SHOWS.find(
              (f) => f.title.toLowerCase() === show.title.toLowerCase()
            );
            const badge = fallbackMatch?.badge ?? 'Series';
            return (
              <ShowCard
                key={`${show.title}-${idx}`}
                show={show}
                badge={badge}
                onWatch={() => setActiveShow(show)}
              />
            );
          })}
        </div>
      )}

      {activeShow && (
        <VideoPlayer show={activeShow} onClose={() => setActiveShow(null)} />
      )}
    </div>
  );
}
