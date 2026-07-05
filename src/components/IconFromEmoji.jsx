import {
  Utensils, UtensilsCrossed, Wine, Beer, Coffee, Mic, Music, Headphones, Volume2,
  Camera, Video, Truck, Car, Package, Building2, Landmark, Castle, Factory, Flame,
  Snowflake, Cloud, Droplets, Calendar, Clock, Timer, DollarSign, Phone, Mail,
  MessageCircle, Shield, Heart, Star, Trophy, Crown, Gift, Sparkles, Zap, Wrench,
  Leaf, Flower2, Sprout, ChefHat, Salad, Fish, Apple, Wheat, IceCream, Candy,
  Pizza, Cake, ClipboardList, FileText, Ruler, Image, Palette, Map, Rocket,
  UserCheck, Sofa, Theater, GraduationCap, Lightbulb, ShoppingCart, Handshake,
  Dumbbell, Laptop, CheckCircle2, Music2, Layers, Brush, Globe, Stethoscope,
  BarChart3, RefreshCw, Ban, Armchair, Tent, Egg, Milk, Ribbon, Users,
  MapPin, PartyPopper, Baby, Circle, CircleDot, Hexagon, Gem, X,
  Scissors, Receipt, Signpost,
} from 'lucide-react'

/** Maps legacy emoji / symbol strings to Lucide icons — no emoji rendered in UI. */
export const EMOJI_MAP = {
  '🍽️': Utensils, '🥗': Salad, '🍝': UtensilsCrossed, '🌮': Utensils,
  '🌭': UtensilsCrossed, '🍔': UtensilsCrossed, '🍕': Pizza, '🍣': Fish, '🍦': IceCream,
  '🍫': Candy, '🍭': Candy, '🍰': Cake, '🎂': Cake, '🍲': UtensilsCrossed,
  '🍷': Wine, '🍸': Wine, '🍹': Wine, '🍾': Wine, '🥂': Wine,
  '🥃': Wine, '🍺': Beer, '🍻': Beer, '☕': Coffee, '🥐': Utensils,
  '🥖': Utensils, '🥘': UtensilsCrossed, '🥙': Utensils,
  '🥚': Egg, '🥛': Milk, '🥜': Leaf, '🥞': Layers, '🍄': Leaf,
  '🍅': Apple, '🍊': Apple, '🍋': Apple, '🍎': Apple, '🍓': Apple,
  '🍞': Utensils, '🍟': Utensils, '🍖': Utensils, '🍗': Utensils,
  '🍚': Utensils, '🍯': Droplets, '🍿': Layers, '🦃': Utensils,
  '🦐': Fish, '🐟': Fish, '🐷': Utensils, '🧀': Utensils,
  '🌽': Wheat, '🌾': Wheat, '🥑': Leaf, '🥒': Leaf, '🥩': Flame, '🫙': Package,
  '💦': Droplets, '❄️': Snowflake, '🌫️': Cloud, '🧃': Droplets, '🥤': Droplets,
  '🎤': Mic, '🎵': Music, '🎶': Music2, '🎧': Headphones, '🔊': Volume2,
  '🎭': Theater, '🎪': Tent, '🎬': Camera, '📸': Camera, '📷': Camera, '🎥': Video,
  '🎨': Palette, '👩‍🎨': Brush, '🖼️': Image,
  '🎊': PartyPopper, '🎈': PartyPopper, '🎀': Ribbon, '🎁': Gift,
  '🎄': Sprout, '🏆': Trophy, '👑': Crown, '💫': Sparkles, '✨': Sparkles,
  '⭐': Star, '🌟': Star,
  '💰': DollarSign, '📋': ClipboardList, '📝': FileText, '📊': BarChart3,
  '💡': Lightbulb, '🔧': Wrench, '⚙️': Wrench, '📅': Calendar,
  '⏱️': Timer, '⏰': Clock, '🔄': RefreshCw, '🚀': Rocket,
  '💻': Laptop, '📦': Package, '🛒': ShoppingCart, '📞': Phone,
  '💬': MessageCircle, '💌': Mail, '🤝': Handshake, '🛡️': Shield,
  '⚡': Zap, '💪': Dumbbell, '🌐': Globe, '📏': Ruler, '📐': Ruler,
  '🎓': GraduationCap, '👨‍⚕️': Stethoscope,
  '🏛️': Landmark, '🏢': Building2, '🏭': Factory, '🏰': Castle, '🏠': Building2,
  '🏗️': Building2, '🏺': Layers, '🗺️': Map, '📍': MapPin,
  '🛋️': Sofa, '🪑': Armchair,
  '👰': Heart, '🤵': UserCheck, '👨‍🍳': ChefHat, '💆': Heart,
  '👥': Users, '👶': Baby,
  '🌱': Sprout, '🌿': Leaf, '🌸': Flower2, '🌹': Flower2, '💐': Flower2,
  '🌶️': Flame, '🔥': Flame,
  '🚚': Truck, '🚗': Car, '🚁': Rocket, '🚫': Ban,
  '✅': CheckCircle2, '✝️': Star, '✡️': Star, '🎛️': Wrench,
  '🥄': Utensils, '🌍': Globe, '💎': Sparkles,
  '🧁': Cake, '🎉': PartyPopper, '🪵': Layers, '🕌': Landmark, '⛺': Tent,
  '🔵': Star, '💼': Laptop, '💃': Music, '🎠': PartyPopper, '🎡': PartyPopper,
  '🎀': Ribbon, '🍜': ChefHat, '🍬': Candy, '🍭': Candy,
  '🍴': UtensilsCrossed, '🍮': Candy, '🥪': UtensilsCrossed, '🥣': Utensils,
  '🥬': Leaf, '🦪': Fish, '🦴': Utensils, '🫒': Leaf, '🫓': Utensils, '🫖': Coffee,
  '🧂': Droplets, '🧅': Leaf, '🧊': Snowflake, '🧡': Heart, '🧹': Brush,
  '🧺': Package, '🧾': Receipt, '🪡': Scissors, '🪧': Signpost, '🫧': Droplets,
  '💍': Heart, '🕯️': Flame, '🔀': RefreshCw, '🔢': BarChart3, '🔩': Wrench,
  // Decorative symbols (legacy unicode placeholders)
  '✓': CheckCircle2, '✿': Flower2, '○': Circle, '✦': Sparkles, '◎': CircleDot,
  '◈': Gem, '♪': Music, '⬡': Hexagon,
}

export default function IconFromEmoji({ emoji, className = 'w-6 h-6' }) {
  const Icon = EMOJI_MAP[emoji] ?? Star
  return <Icon className={className} aria-hidden="true" />
}

/** List bullet: included / features */
export function BulletCheck({ className = 'w-4 h-4 text-[#162040]/75 mt-0.5 flex-shrink-0' }) {
  return <CheckCircle2 className={className} aria-hidden="true" />
}

/** List bullet: ideal para / highlights */
export function BulletStar({ className = 'w-4 h-4 text-[#162040]/75 mt-0.5 flex-shrink-0' }) {
  return <Sparkles className={className} aria-hidden="true" />
}

/** Empty image placeholder by category symbol */
export function PlaceholderIcon({ symbol = '◈', className = 'w-16 h-16 text-[#162040]/20' }) {
  return <IconFromEmoji emoji={symbol} className={className} />
}

export { CheckCircle2, X, MapPin, Music, Gem, Hexagon, CircleDot, Sparkles, Flower2, Circle }
