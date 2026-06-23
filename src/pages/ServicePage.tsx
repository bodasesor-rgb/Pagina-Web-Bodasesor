import { useEffect, useState } from "react";
import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";
import GalleryCarouselSection from "../components/GalleryCarousel";
import { Lightbox } from "../components/Lightbox";
import { getProductBySlug } from "../data/products";
import { stripCityFromSlug } from "../utils/city-url";
import EventTypePage from "./EventTypePage";
import {
  Utensils, UtensilsCrossed, Wine, Beer, Coffee, Mic, Music, Headphones, Volume2,
  Camera, Truck, Car, Package, Building2, Landmark, Castle, Factory, Flame,
  Snowflake, Cloud, Droplets, Calendar, Clock, Timer, DollarSign, Phone, Mail,
  MessageCircle, Shield, Heart, Star, Trophy, Crown, Gift, Sparkles, Zap, Wrench,
  Leaf, Flower2, Sprout, ChefHat, Salad, Fish, Apple, Wheat, IceCream, Candy,
  Pizza, Cake, ClipboardList, FileText, Ruler, Image, Palette, Map, Rocket,
  UserCheck, Sofa, Theater, GraduationCap, Lightbulb, ShoppingCart, Handshake,
  Dumbbell, Laptop, CheckCircle2, Music2, Layers, Brush, Globe, Stethoscope,
  BarChart3, RefreshCw, Ban, Armchair, Tent, Egg, Milk, Ribbon, Users,
  MapPin, PartyPopper, ChevronLeft, ChevronRight,
  type LucideIcon,
} from "lucide-react";

const WHATSAPP_NUMBER = "5215540080373";
const WA_MSG = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20interesa%20cotizar%3A%20${encodeURIComponent(title)}`;

const HERO_IMAGES: Record<string, string> = {
  // Banquetes — imágenes hero dedicadas
  'banquetes':             '/images/banquete-hero.png',
  'banquete-kosher':       '/images/banquete-kosher-hero.png',
  'banquete-mexicano':     '/images/banquete-mexicano-hero.png',
  'banquete-navideno':     '/images/banquete-navideno-hero.png',
  // Catering — imágenes generadas por producto
  'comida-corrida':        '/images/empresas/comida-corrida.png',
  'desayuno-social':       '/images/productos/desayuno-social.png',
  'paella':                '/images/productos/paella.png',
  'pozole-tostadas':       '/images/productos/pozole-tostadas.png',
  'parrillada-argentina':  '/images/productos/parrillada-argentina.png',
  'parrillada-tradicional':'/images/productos/parrillada-tradicional.png',
  'coffee-break':          '/images/empresas/coffee-break.png',
  'bocadillos':            '/images/productos/bocadillos.png',
  'canapes-premium':       '/images/productos/canapes-premium.png',
  // Barras de alimentos — imágenes generadas
  'barra-crepas':          '/images/productos/barra-crepas.png',
  'barra-sushi':           '/images/productos/barra-sushi.png',
  'barra-mariscos':        '/images/productos/barra-mariscos.png',
  'barra-paninis':         '/images/productos/barra-paninis.png',
  'barra-pastas':          '/images/productos/barra-pastas.png',
  'barra-pizzas':          '/images/productos/barra-pizzas.png',
  'barra-americana':       '/images/productos/barra-americana.png',
  'barra-yucateca':        '/images/productos/barra-yucateca.png',
  // Estaciones — imágenes generadas
  'taquiza-guisados':      '/images/productos/taquiza-guisados.png',
  'puestos-antojitos':     '/images/productos/puestos-antojitos.png',
  'puestos-quesadillas':   '/images/productos/puestos-quesadillas.png',
  'carrito-snacks':        '/images/productos/carrito-snacks.png',
  // Barras de bebidas — imágenes generadas
  'barra-bebidas':         '/images/productos/barra-bebidas.png',
  'barra-mocteles':        '/images/productos/barra-mocteles.png',
  'cocteles-mixologia':    '/images/productos/cocteles-mixologia.png',
  'barra-cafe-premium':    '/images/productos/barra-cafe-premium.png',
  'paletas-helados':       '/images/productos/paletas-helados.png',
  // Mesas personalizadas — imágenes generadas
  'mesa-dulces':           '/images/productos/mesa-dulces.png',
  'mesa-postres':          '/images/productos/mesa-postres.png',
  'mesa-quesos':           '/images/productos/mesa-quesos.png',
  'cupcakes-gourmet':      '/images/productos/cupcakes-gourmet.png',
  // Alimentos para empresas — imagen generada
  'alimentos-empresas':    '/images/productos/alimentos-empresas.png',
  // Espacios y servicios — imágenes generadas
  'espacios-eventos':      '/images/productos/espacios-eventos.png',
  'floreria-decoracion':   '/images/productos/floreria-decoracion.png',
  'fotografia-video':      '/images/productos/fotografia-video.png',
  'musica':                '/images/productos/musica.png',
  'wedding-planner':       '/images/productos/wedding-planner.png',
  'reposteria':            '/images/productos/reposteria.png',
  'shows':                 '/images/productos/shows.png',
  'inflables':             '/images/productos/inflables.png',
  'mesas-sillas':          '/images/productos/mesas-sillas.png',
  // Tipos de evento — imágenes generadas
  'bodas':                 '/images/productos/bodas.png',
  'xv-anos':               '/images/productos/xv-anos.png',
  'corporativos':          '/images/productos/corporativos.png',
  'baby-shower':           '/images/productos/baby-shower.png',
  'cumpleanos':            '/images/productos/cumpleanos.png',
  'graduaciones':          '/images/productos/graduaciones.png',
  'primera-comunion':      '/images/productos/primera-comunion.png',
  'cenas':                 '/images/productos/cenas.png',
  'comidas':               '/images/productos/comidas.png',
  'desayunos':             '/images/productos/desayunos.png',
  'lanzamientos':          '/images/productos/lanzamientos.png',
  'silla-tiffany':         '/images/mesas/silla-tiffany.jpg',
  'silla-tiffany-infantil':'/images/mesas/silla-tiffany-infantil.jpg',
  'silla-ghost':           '/images/mesas/silla-ghost.jpg',
  'silla-smith':           '/images/mesas/silla-smith.jpg',
  'silla-camila':          '/images/mesas/silla-camila.jpg',
  'silla-basket':          '/images/mesas/silla-basket.jpg',
  'silla-antonella':       '/images/mesas/silla-antonella.jpg',
  'silla-cabos':           '/images/instagram/ig44.jpg',
  'silla-caroline':        '/images/instagram/ig88.jpg',
  'silla-maria':           '/images/instagram/ig90.jpg',
  'silla-tolix':           '/images/mesas/silla-tolix.jpg',
  'silla-avant-garde':     '/images/mesas/silla-avant-garde.jpg',
  'silla-crossback':       '/images/mesas/silla-crossback.jpg',
  'silla-wishbone':        '/images/mesas/silla-wishbone.jpg',
  'silla-louis-xv':        '/images/mesas/silla-louis-xv.jpg',
  'silla-mariantonieta':   '/images/mesas/silla-mariantonieta.jpg',
  'silla-sillon-novios':   '/images/mesas/sillon-novios.jpg',
  'silla-gamma':           '/images/instagram/ig104.jpg',
  'mesa-redonda':          '/images/mesas/mesa-redonda-caoba.jpg',
  'mesa-cuadrada':         '/images/mesas/mesa-cuadrada-marmol-blanca.jpg',
  'mesa-tablon':           '/images/mesas/tablon-caoba-natural.jpg',
  'mesa-serpentina':       '/images/mesas/mesa-serpentina.jpg',
  'mesa-picnic':           '/images/mesas/mesa-picnic.jpg',
  'mesa-tablon-infantil':  '/images/mesas/tablon-infantil.jpg',
};

// ── Per-product gallery images (30 photos each, unique blocks per product) ────
const PRODUCT_GALLERY: Record<string, string[]> = {
  'banquetes': ['/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg'],
  'banquete-kosher': ['/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig33.jpg','/images/instagram/ig34.jpg','/images/instagram/ig35.jpg','/images/instagram/ig36.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig40.jpg','/images/instagram/ig41.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig55.jpg','/images/instagram/ig56.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig59.jpg','/images/instagram/ig60.jpg'],
  'banquete-mexicano': ['/images/instagram/ig61.jpg','/images/instagram/ig62.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig66.jpg','/images/instagram/ig67.jpg','/images/instagram/ig68.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig75.jpg','/images/instagram/ig76.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig80.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig84.jpg','/images/instagram/ig85.jpg','/images/instagram/ig86.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig89.jpg','/images/instagram/ig90.jpg'],
  'banquete-navideno': ['/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig93.jpg','/images/instagram/ig94.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig99.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig102.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig110.jpg','/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg'],
  'paella': ['/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg','/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg'],
  'pozole-tostadas': ['/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg'],
  'parrillada-argentina': ['/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig188.jpg','/images/instagram/ig189.jpg','/images/instagram/ig190.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig195.jpg','/images/instagram/ig196.jpg','/images/instagram/ig197.jpg','/images/instagram/ig198.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg'],
  'parrillada-tradicional': ['/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg'],
  'coffee-break': ['/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig33.jpg','/images/instagram/ig34.jpg','/images/instagram/ig35.jpg','/images/instagram/ig36.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig40.jpg','/images/instagram/ig41.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig55.jpg','/images/instagram/ig56.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig59.jpg','/images/instagram/ig60.jpg'],
  'comida-corrida': ['/images/instagram/ig61.jpg','/images/instagram/ig62.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig66.jpg','/images/instagram/ig67.jpg','/images/instagram/ig68.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig75.jpg','/images/instagram/ig76.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig80.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig84.jpg','/images/instagram/ig85.jpg','/images/instagram/ig86.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig89.jpg','/images/instagram/ig90.jpg'],
  'desayuno-social': ['/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig93.jpg','/images/instagram/ig94.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig99.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig102.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig110.jpg','/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg'],
  'bocadillos': ['/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg'],
  'canapes-premium': ['/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg'],
  'alimentos-empresas': ['/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig188.jpg','/images/instagram/ig189.jpg','/images/instagram/ig190.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig195.jpg','/images/instagram/ig196.jpg','/images/instagram/ig197.jpg','/images/instagram/ig198.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg'],
  'mesa-dulces': ['/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig33.jpg','/images/instagram/ig34.jpg','/images/instagram/ig35.jpg','/images/instagram/ig36.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig40.jpg'],
  'mesa-postres': ['/images/instagram/ig41.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig55.jpg','/images/instagram/ig56.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig59.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig62.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig66.jpg','/images/instagram/ig67.jpg','/images/instagram/ig68.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg'],
  'mesa-quesos': ['/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig75.jpg','/images/instagram/ig76.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig80.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig84.jpg','/images/instagram/ig85.jpg','/images/instagram/ig86.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig89.jpg','/images/instagram/ig90.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig93.jpg','/images/instagram/ig94.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig99.jpg','/images/instagram/ig100.jpg'],
  'cupcakes-gourmet': ['/images/instagram/ig101.jpg','/images/instagram/ig102.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig110.jpg','/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg','/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg'],
  'reposteria': ['/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg'],
  'wedding-planner': ['/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig188.jpg','/images/instagram/ig189.jpg','/images/instagram/ig190.jpg'],
  'floreria-decoracion': ['/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig195.jpg','/images/instagram/ig196.jpg','/images/instagram/ig197.jpg','/images/instagram/ig198.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg'],
  'fotografia-video': ['/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig33.jpg','/images/instagram/ig34.jpg','/images/instagram/ig35.jpg','/images/instagram/ig36.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig40.jpg','/images/instagram/ig41.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg'],
  'musica': ['/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig55.jpg','/images/instagram/ig56.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig59.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig62.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig66.jpg','/images/instagram/ig67.jpg','/images/instagram/ig68.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig75.jpg','/images/instagram/ig76.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig80.jpg'],
  'shows': ['/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig84.jpg','/images/instagram/ig85.jpg','/images/instagram/ig86.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig89.jpg','/images/instagram/ig90.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig93.jpg','/images/instagram/ig94.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig99.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig102.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig110.jpg'],
  'inflables': ['/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg','/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg'],
  'espacios-eventos': ['/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg'],
  'barra-bebidas': ['/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig188.jpg','/images/instagram/ig189.jpg','/images/instagram/ig190.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig195.jpg','/images/instagram/ig196.jpg','/images/instagram/ig197.jpg','/images/instagram/ig198.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg'],
  'barra-sushi': ['/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg'],
  'cocteles-mixologia': ['/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig33.jpg','/images/instagram/ig34.jpg','/images/instagram/ig35.jpg','/images/instagram/ig36.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig40.jpg','/images/instagram/ig41.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig55.jpg','/images/instagram/ig56.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig59.jpg','/images/instagram/ig60.jpg'],
  'barra-cafe-premium': ['/images/instagram/ig61.jpg','/images/instagram/ig62.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig66.jpg','/images/instagram/ig67.jpg','/images/instagram/ig68.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig75.jpg','/images/instagram/ig76.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig80.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig84.jpg','/images/instagram/ig85.jpg','/images/instagram/ig86.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig89.jpg','/images/instagram/ig90.jpg'],
  'barra-mocteles': ['/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig93.jpg','/images/instagram/ig94.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig99.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig102.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig110.jpg','/images/instagram/ig111.jpg','/images/instagram/ig112.jpg','/images/instagram/ig113.jpg','/images/instagram/ig114.jpg','/images/instagram/ig115.jpg','/images/instagram/ig116.jpg','/images/instagram/ig117.jpg','/images/instagram/ig118.jpg','/images/instagram/ig119.jpg','/images/instagram/ig120.jpg'],
  'mesas-sillas': ['/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg'],
  'paletas-helados': ['/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg'],
  'silla-tiffany': ['/images/mesas/silla-tiffany.jpg','/images/mesas/conj-redonda-mantel-tiffany.jpg','/images/instagram/ig1.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg'],
  'silla-tiffany-infantil': ['/images/mesas/silla-tiffany-infantil.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig67.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg'],
  'silla-ghost': ['/images/mesas/silla-ghost.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig85.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig90.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig111.jpg','/images/instagram/ig113.jpg','/images/instagram/ig116.jpg','/images/instagram/ig118.jpg'],
  'silla-smith': ['/images/mesas/silla-smith.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg'],
  'silla-camila': ['/images/mesas/silla-camila.jpg','/images/mesas/conj-marmol-blanca-camila.jpg','/images/mesas/conj-marmol-negra-camila.jpg','/images/mesas/conj-black-shine-camila.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig178.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig189.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig197.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg'],
  'silla-basket': ['/images/mesas/silla-basket.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig34.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig42.jpg'],
  'silla-antonella': ['/images/mesas/silla-antonella.jpg','/images/mesas/conj-marmol-antonella-blanca.jpg','/images/mesas/conj-marmol-antonella-negra.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig67.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg'],
  'silla-cabos': ['/images/instagram/ig83.jpg','/images/instagram/ig85.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig90.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig111.jpg','/images/instagram/ig113.jpg','/images/instagram/ig116.jpg','/images/instagram/ig118.jpg','/images/instagram/ig120.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg'],
  'silla-caroline': ['/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg'],
  'silla-maria': ['/images/instagram/ig171.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig178.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig189.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig197.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg'],
  'silla-tolix': ['/images/mesas/silla-tolix.jpg','/images/instagram/ig12.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig34.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg'],
  'silla-avant-garde': ['/images/mesas/silla-avant-garde.jpg','/images/mesas/conj-cuad-avant-garden.jpg','/images/mesas/conj-rect-avant-garden.jpg','/images/mesas/conj-redonda-mantel-avant-garden.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg','/images/instagram/ig52.jpg','/images/instagram/ig53.jpg','/images/instagram/ig54.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig67.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg'],
  'silla-crossback': ['/images/mesas/silla-crossback.jpg','/images/mesas/conj-redonda-crossback-caoba.jpg','/images/mesas/conj-redonda-mantel-crossback-caoba.jpg','/images/mesas/conj-redonda-mantel-crossback-natural.jpg','/images/mesas/conj-rect-crossback-caoba.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg','/images/instagram/ig97.jpg','/images/instagram/ig98.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig111.jpg','/images/instagram/ig113.jpg','/images/instagram/ig116.jpg','/images/instagram/ig118.jpg','/images/instagram/ig120.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg'],
  'silla-wishbone': ['/images/mesas/silla-wishbone.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg'],
  'silla-louis-xv': ['/images/mesas/silla-louis-xv.jpg','/images/mesas/conj-espejo-luis-xv.jpg','/images/mesas/conj-redonda-mantel-luis-xv.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig189.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig197.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig14.jpg'],
  'silla-mariantonieta': ['/images/mesas/silla-mariantonieta.jpg','/images/mesas/conj-rect-mariantonieta-caoba.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg','/images/instagram/ig31.jpg','/images/instagram/ig32.jpg','/images/instagram/ig34.jpg','/images/instagram/ig37.jpg','/images/instagram/ig38.jpg','/images/instagram/ig39.jpg','/images/instagram/ig42.jpg','/images/instagram/ig43.jpg','/images/instagram/ig44.jpg','/images/instagram/ig45.jpg','/images/instagram/ig46.jpg','/images/instagram/ig47.jpg','/images/instagram/ig48.jpg','/images/instagram/ig49.jpg','/images/instagram/ig50.jpg','/images/instagram/ig51.jpg'],
  'silla-sillon-novios': ['/images/mesas/sillon-novios.jpg','/images/instagram/ig54.jpg','/images/instagram/ig57.jpg','/images/instagram/ig58.jpg','/images/instagram/ig60.jpg','/images/instagram/ig61.jpg','/images/instagram/ig63.jpg','/images/instagram/ig64.jpg','/images/instagram/ig65.jpg','/images/instagram/ig67.jpg','/images/instagram/ig69.jpg','/images/instagram/ig70.jpg','/images/instagram/ig71.jpg','/images/instagram/ig72.jpg','/images/instagram/ig73.jpg','/images/instagram/ig74.jpg','/images/instagram/ig77.jpg','/images/instagram/ig78.jpg','/images/instagram/ig79.jpg','/images/instagram/ig81.jpg','/images/instagram/ig82.jpg','/images/instagram/ig83.jpg','/images/instagram/ig85.jpg','/images/instagram/ig87.jpg','/images/instagram/ig88.jpg','/images/instagram/ig90.jpg','/images/instagram/ig91.jpg','/images/instagram/ig92.jpg','/images/instagram/ig95.jpg','/images/instagram/ig96.jpg'],
  'silla-gamma': ['/images/instagram/ig98.jpg','/images/instagram/ig100.jpg','/images/instagram/ig101.jpg','/images/instagram/ig103.jpg','/images/instagram/ig104.jpg','/images/instagram/ig105.jpg','/images/instagram/ig106.jpg','/images/instagram/ig107.jpg','/images/instagram/ig108.jpg','/images/instagram/ig109.jpg','/images/instagram/ig111.jpg','/images/instagram/ig113.jpg','/images/instagram/ig116.jpg','/images/instagram/ig118.jpg','/images/instagram/ig120.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig131.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg'],
  'mesa-redonda': ['/images/mesas/mesa-redonda-caoba.jpg','/images/mesas/mesa-redonda-marmol.jpg','/images/mesas/conj-redonda-mantel-tiffany.jpg','/images/mesas/conj-redonda-mantel-luis-xv.jpg','/images/mesas/conj-redonda-mantel-crossback-caoba.jpg','/images/mesas/conj-redonda-mantel-crossback-natural.jpg','/images/mesas/conj-redonda-mantel-antonella-blanca.jpg','/images/mesas/conj-redonda-mantel-avant-garden.jpg','/images/mesas/conj-redonda-crossback-caoba.jpg','/images/instagram/ig121.jpg','/images/instagram/ig122.jpg','/images/instagram/ig123.jpg','/images/instagram/ig124.jpg','/images/instagram/ig125.jpg','/images/instagram/ig126.jpg','/images/instagram/ig127.jpg','/images/instagram/ig128.jpg','/images/instagram/ig129.jpg','/images/instagram/ig130.jpg','/images/instagram/ig131.jpg'],
  'mesa-cuadrada': ['/images/mesas/mesa-cuadrada-marmol-blanca.jpg','/images/mesas/mesa-cuadrada-black-trendy.jpg','/images/mesas/mesa-cuadrada-caoba.jpg','/images/mesas/mesa-cuadrada-marmol-black.jpg','/images/mesas/mesa-cuadrada-vintage.jpg','/images/mesas/conj-cuad-avant-garden.jpg','/images/mesas/conj-black-shine-camila.jpg','/images/mesas/conj-marmol-antonella-blanca.jpg','/images/mesas/conj-marmol-antonella-negra.jpg','/images/mesas/conj-marmol-blanca-camila.jpg','/images/mesas/conj-marmol-negra-camila.jpg','/images/mesas/conj-espejo-luis-xv.jpg','/images/instagram/ig132.jpg','/images/instagram/ig133.jpg','/images/instagram/ig134.jpg','/images/instagram/ig135.jpg','/images/instagram/ig136.jpg','/images/instagram/ig137.jpg','/images/instagram/ig138.jpg','/images/instagram/ig139.jpg'],
  'mesa-tablon': ['/images/mesas/tablon-caoba-natural.jpg','/images/mesas/tablon-marmol-blanco.jpg','/images/mesas/tablon-marmol-black.jpg','/images/mesas/tablon-vintage.jpg','/images/mesas/tablon-novios-caoba.jpg','/images/mesas/tablon-picnic-caoba.jpg','/images/mesas/tablon-picnic-vintage.jpg','/images/mesas/conj-rect-crossback-caoba.jpg','/images/mesas/conj-rect-mariantonieta-caoba.jpg','/images/mesas/conj-rect-avant-garden.jpg','/images/instagram/ig140.jpg','/images/instagram/ig141.jpg','/images/instagram/ig142.jpg','/images/instagram/ig143.jpg','/images/instagram/ig144.jpg','/images/instagram/ig145.jpg','/images/instagram/ig146.jpg','/images/instagram/ig147.jpg','/images/instagram/ig148.jpg','/images/instagram/ig149.jpg'],
  'mesa-serpentina': ['/images/mesas/mesa-serpentina.jpg','/images/instagram/ig150.jpg','/images/instagram/ig151.jpg','/images/instagram/ig152.jpg','/images/instagram/ig153.jpg','/images/instagram/ig154.jpg','/images/instagram/ig155.jpg','/images/instagram/ig156.jpg','/images/instagram/ig157.jpg','/images/instagram/ig158.jpg','/images/instagram/ig159.jpg','/images/instagram/ig160.jpg','/images/instagram/ig161.jpg','/images/instagram/ig162.jpg','/images/instagram/ig163.jpg','/images/instagram/ig164.jpg','/images/instagram/ig165.jpg','/images/instagram/ig166.jpg','/images/instagram/ig167.jpg','/images/instagram/ig168.jpg'],
  'mesa-picnic': ['/images/mesas/mesa-picnic.jpg','/images/mesas/tablon-picnic-caoba.jpg','/images/mesas/tablon-picnic-vintage.jpg','/images/instagram/ig169.jpg','/images/instagram/ig170.jpg','/images/instagram/ig171.jpg','/images/instagram/ig172.jpg','/images/instagram/ig173.jpg','/images/instagram/ig174.jpg','/images/instagram/ig175.jpg','/images/instagram/ig176.jpg','/images/instagram/ig177.jpg','/images/instagram/ig178.jpg','/images/instagram/ig179.jpg','/images/instagram/ig180.jpg','/images/instagram/ig181.jpg','/images/instagram/ig182.jpg','/images/instagram/ig183.jpg','/images/instagram/ig184.jpg','/images/instagram/ig185.jpg'],
  'mesa-tablon-infantil': ['/images/mesas/tablon-infantil.jpg','/images/instagram/ig186.jpg','/images/instagram/ig187.jpg','/images/instagram/ig188.jpg','/images/instagram/ig189.jpg','/images/instagram/ig190.jpg','/images/instagram/ig191.jpg','/images/instagram/ig192.jpg','/images/instagram/ig193.jpg','/images/instagram/ig194.jpg','/images/instagram/ig195.jpg','/images/instagram/ig196.jpg','/images/instagram/ig197.jpg','/images/instagram/ig198.jpg','/images/instagram/ig199.jpg','/images/instagram/ig200.jpg','/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg'],
};
const DEFAULT_GALLERY = ['/images/instagram/ig1.jpg','/images/instagram/ig2.jpg','/images/instagram/ig3.jpg','/images/instagram/ig4.jpg','/images/instagram/ig5.jpg','/images/instagram/ig6.jpg','/images/instagram/ig7.jpg','/images/instagram/ig8.jpg','/images/instagram/ig9.jpg','/images/instagram/ig10.jpg','/images/instagram/ig11.jpg','/images/instagram/ig12.jpg','/images/instagram/ig13.jpg','/images/instagram/ig14.jpg','/images/instagram/ig15.jpg','/images/instagram/ig16.jpg','/images/instagram/ig17.jpg','/images/instagram/ig18.jpg','/images/instagram/ig19.jpg','/images/instagram/ig20.jpg','/images/instagram/ig21.jpg','/images/instagram/ig22.jpg','/images/instagram/ig23.jpg','/images/instagram/ig24.jpg','/images/instagram/ig25.jpg','/images/instagram/ig26.jpg','/images/instagram/ig27.jpg','/images/instagram/ig28.jpg','/images/instagram/ig29.jpg','/images/instagram/ig30.jpg'];

function ProductGalleryCarousel({ slug }: { slug: string }) {
  const gallery = PRODUCT_GALLERY[slug] ?? DEFAULT_GALLERY;
  const heroImg = HERO_IMAGES[slug];
  // Always show the AI-generated product image as the first carousel photo
  const images = heroImg && gallery[0] !== heroImg ? [heroImg, ...gallery] : gallery;
  const [idx, setIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div
          className="relative h-80 md:h-96 cursor-zoom-in group"
          onClick={() => setLightboxIdx(idx)}
        >
          <img
            src={images[idx]}
            alt={`Evento real Bodasesor ${idx + 1}`}
            className="w-full h-full object-contain bg-[#f5efe8] transition-opacity duration-300"
            onError={e => { (e.target as HTMLImageElement).src = '/images/galeria/g1.jpg'; }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#162040] p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#162040] p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 right-3 bg-[#162040]/70 text-white text-xs font-serif px-2 py-1 rounded-full pointer-events-none">
            {idx + 1} / {images.length}
          </div>
        </div>
        <div className="flex justify-center gap-1.5 py-3 bg-white">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-[#162040]' : 'w-2 bg-gray-300 hover:bg-[#162040]/50'}`}
            />
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => ((i ?? 0) - 1 + images.length) % images.length)}
          onNext={() => setLightboxIdx(i => ((i ?? 0) + 1) % images.length)}
        />
      )}
    </>
  );
}

// ── WhatsApp SVG icon ────────────────────────────────────────────────────────
const WaSvg = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ── Emoji → Lucide icon mapping ──────────────────────────────────────────────
const EMOJI_MAP: Record<string, LucideIcon> = {
  // Food & drink
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
  '🌽': Wheat, '🌾': Wheat, '🥑': Leaf, '🥒': Leaf,
  // Drinks
  '💦': Droplets, '❄️': Snowflake, '🌫️': Cloud,
  // Events & entertainment
  '🎤': Mic, '🎵': Music, '🎶': Music2, '🎧': Headphones, '🔊': Volume2,
  '🎭': Theater, '🎪': Tent, '🎬': Camera, '📸': Camera, '📷': Camera,
  '🎨': Palette, '👩‍🎨': Brush, '🖼️': Image,
  // Party & celebrations
  '🎊': PartyPopper, '🎈': PartyPopper, '🎀': Ribbon, '🎁': Gift,
  '🎄': Sprout, '🏆': Trophy, '👑': Crown, '💫': Sparkles, '✨': Sparkles,
  '⭐': Star, '🌟': Star,
  // Business & services
  '💰': DollarSign, '📋': ClipboardList, '📝': FileText, '📊': BarChart3,
  '💡': Lightbulb, '🔧': Wrench, '⚙️': Wrench, '📅': Calendar,
  '⏱️': Timer, '⏰': Clock, '🔄': RefreshCw, '🚀': Rocket,
  '💻': Laptop, '📦': Package, '🛒': ShoppingCart, '📞': Phone,
  '💬': MessageCircle, '💌': Mail, '🤝': Handshake, '🛡️': Shield,
  '⚡': Zap, '💪': Dumbbell, '🌐': Globe, '📏': Ruler, '📐': Ruler,
  '🎓': GraduationCap, '👨‍⚕️': Stethoscope,
  // Spaces & places
  '🏛️': Landmark, '🏢': Building2, '🏭': Factory, '🏰': Castle,
  '🏗️': Building2, '🏺': Layers, '🗺️': Map, '📍': MapPin,
  '🛋️': Sofa, '🪑': Armchair,
  // People
  '👰': Heart, '🤵': UserCheck, '👨‍🍳': ChefHat, '💆': Heart,
  '👥': Users,
  // Nature & decor
  '🌱': Sprout, '🌿': Leaf, '🌸': Flower2, '🌹': Flower2, '💐': Flower2,
  '🌶️': Flame, '🔥': Flame,
  // Travel
  '🚚': Truck, '🚗': Car, '🚁': Rocket, '🚫': Ban,
  // Misc
  '✅': CheckCircle2, '✝️': Star, '✡️': Star, '🎛️': Wrench,
  '🥄': Utensils, '🌍': Globe, '💎': Sparkles,
};

function IconFromEmoji({ emoji, className = "w-6 h-6" }: { emoji: string; className?: string }) {
  const Icon = EMOJI_MAP[emoji] ?? Star;
  return <Icon className={className} />;
}

// ── Catálogo completo de mobiliario ───────────────────────────────────────────
const SILLAS_CATALOG: { name: string; img: string | null; href: string }[] = [
  { name: 'Silla Tiffany', img: '/images/mesas/silla-tiffany.jpg', href: '/sillas/tiffany' },
  { name: 'Silla Ghost', img: '/images/mesas/silla-ghost.jpg', href: '/sillas/ghost' },
  { name: 'Silla Smith', img: '/images/mesas/silla-smith.jpg', href: '/sillas/smith' },
  { name: 'Silla Camila', img: '/images/mesas/silla-camila.jpg', href: '/sillas/camila' },
  { name: 'Silla Basket', img: '/images/mesas/silla-basket.jpg', href: '/sillas/basket' },
  { name: 'Silla Antonella', img: '/images/mesas/silla-antonella.jpg', href: '/sillas/antonella' },
  { name: 'Silla Crossback', img: '/images/mesas/silla-crossback.jpg', href: '/sillas/crossback' },
  { name: 'Silla Wishbone', img: '/images/mesas/silla-wishbone.jpg', href: '/sillas/wishbone' },
  { name: 'Silla Louis XV', img: '/images/mesas/silla-louis-xv.jpg', href: '/sillas/louis-xv' },
  { name: 'Silla Mariantonieta', img: '/images/mesas/silla-mariantonieta.jpg', href: '/sillas/mariantonieta' },
  { name: 'Silla Avant Garde', img: '/images/mesas/silla-avant-garde.jpg', href: '/sillas/avant-garde' },
  { name: 'Silla Tolix', img: '/images/mesas/silla-tolix.jpg', href: '/sillas/tolix' },
  { name: 'Sillón de Novios', img: '/images/mesas/sillon-novios.jpg', href: '/sillas/sillon-novios' },
  { name: 'Silla Tiffany Infantil', img: '/images/mesas/silla-tiffany-infantil.jpg', href: '/sillas/tiffany-infantil' },
  { name: 'Silla Cabos', img: null, href: '/sillas/cabos' },
  { name: 'Silla Caroline', img: null, href: '/sillas/caroline' },
  { name: 'Silla María', img: null, href: '/sillas/maria' },
  { name: 'Silla Gamma', img: null, href: '/sillas/gamma' },
];

const MESAS_CATALOG = [
  { name: 'Mesa Redonda', img: '/images/mesas/mesa-redonda-caoba.jpg', href: '/mesas/redonda' },
  { name: 'Mesa Cuadrada', img: '/images/mesas/mesa-cuadrada-marmol-blanca.jpg', href: '/mesas/cuadrada' },
  { name: 'Tablón', img: '/images/mesas/tablon-caoba-natural.jpg', href: '/mesas/tablon' },
  { name: 'Mesa Serpentina', img: '/images/mesas/mesa-serpentina.jpg', href: '/mesas/serpentina' },
  { name: 'Mesa de Picnic', img: '/images/mesas/mesa-picnic.jpg', href: '/mesas/picnic' },
  { name: 'Tablón Infantil', img: '/images/mesas/tablon-infantil.jpg', href: '/mesas/tablon-infantil' },
];

const COMBINACIONES_CATALOG = [
  { label: 'Mesa Redonda + Silla Tiffany', img: '/images/mesas/conj-redonda-mantel-tiffany.jpg' },
  { label: 'Mesa Redonda + Silla Luis XV', img: '/images/mesas/conj-redonda-mantel-luis-xv.jpg' },
  { label: 'Mesa Redonda + Crossback Caoba', img: '/images/mesas/conj-redonda-mantel-crossback-caoba.jpg' },
  { label: 'Mesa Redonda + Crossback Natural', img: '/images/mesas/conj-redonda-mantel-crossback-natural.jpg' },
  { label: 'Mesa Redonda + Antonella Blanca', img: '/images/mesas/conj-redonda-mantel-antonella-blanca.jpg' },
  { label: 'Mesa Redonda + Avant Garde', img: '/images/mesas/conj-redonda-mantel-avant-garden.jpg' },
  { label: 'Mesa Redonda Crossback (sin mantel)', img: '/images/mesas/conj-redonda-crossback-caoba.jpg' },
  { label: 'Mesa Mármol Blanca + Camila', img: '/images/mesas/conj-marmol-blanca-camila.jpg' },
  { label: 'Mesa Mármol Negra + Camila', img: '/images/mesas/conj-marmol-negra-camila.jpg' },
  { label: 'Mesa Black Shine + Camila', img: '/images/mesas/conj-black-shine-camila.jpg' },
  { label: 'Mesa Mármol + Antonella Blanca', img: '/images/mesas/conj-marmol-antonella-blanca.jpg' },
  { label: 'Mesa Mármol + Antonella Negra', img: '/images/mesas/conj-marmol-antonella-negra.jpg' },
  { label: 'Mesa Cuadrada + Avant Garde', img: '/images/mesas/conj-cuad-avant-garden.jpg' },
  { label: 'Tablón + Avant Garde', img: '/images/mesas/conj-rect-avant-garden.jpg' },
  { label: 'Tablón + Crossback Caoba', img: '/images/mesas/conj-rect-crossback-caoba.jpg' },
  { label: 'Tablón + Mariantonieta Caoba', img: '/images/mesas/conj-rect-mariantonieta-caoba.jpg' },
  { label: 'Mesa Espejo + Luis XV', img: '/images/mesas/conj-espejo-luis-xv.jpg' },
];

function MesasSillasCatalog({ waUrl }: { waUrl: string }) {
  return (
    <>
      {/* Catálogo de Sillas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Sillas</h2>
          <p className="text-gray-500 font-serif mb-10">Todas las sillas disponibles — haz clic en cualquiera para ver detalles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SILLAS_CATALOG.map(s => (
              <Link key={s.href} href={s.href} className="group block bg-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-[#162040]/5">
                <div className="aspect-[3/4] bg-white flex items-center justify-center p-3">
                  {s.img ? (
                    <img src={s.img} alt={s.name} className="h-full w-full object-contain" />
                  ) : (
                    <Armchair className="w-10 h-10 text-[#162040]/30" />
                  )}
                </div>
                <div className="px-2 py-2.5 text-center">
                  <p className="font-serif font-semibold text-[#162040] text-xs leading-tight">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Mesas */}
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Mesas</h2>
          <p className="text-gray-500 font-serif mb-10">Todos los tipos de mesas disponibles — haz clic para ver variedades y detalles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MESAS_CATALOG.map(m => (
              <Link key={m.href} href={m.href} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-[#162040]/5">
                <div className="aspect-square bg-[#f5efe8] flex items-center justify-center p-4">
                  <img src={m.img} alt={m.name} className="h-full w-full object-contain" />
                </div>
                <div className="px-2 py-2.5 text-center">
                  <p className="font-serif font-semibold text-[#162040] text-xs leading-tight">{m.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Combinaciones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Combinaciones</h2>
          <p className="text-gray-500 font-serif mb-10">Mesas y sillas en las combinaciones más elegantes del catálogo — cotiza la que más te guste</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {COMBINACIONES_CATALOG.map((c, i) => (
              <div key={i} className="group bg-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#162040]/5">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={c.img}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="font-serif font-semibold text-[#162040] text-sm leading-snug mb-3">{c.label}</p>
                  <a
                    href={waUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#25D366] font-serif font-bold hover:underline"
                  >
                    <WaSvg /> Cotizar esta combinación
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface ServicePageProps {
  params: { slug: string; chairSlug?: string; mesaSlug?: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const rawSlug = params.chairSlug
    ? `silla-${params.chairSlug}`
    : params.mesaSlug
    ? `mesa-${params.mesaSlug}`
    : params.slug;

  const slug = stripCityFromSlug(rawSlug);
  const product = getProductBySlug(rawSlug) ?? getProductBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { city } = useCity();
  useEffect(() => {
    if (!product) return;
    document.title = city
      ? `${product.seoTitle} ${city.short} | Bodasesor Eventos`
      : `${product.seoTitle} | Bodasesor Eventos`;
  }, [product?.seoTitle, city]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5efe8] text-[#162040]">
        <h1 className="text-4xl font-serif font-bold mb-4">Servicio no encontrado</h1>
        <p className="text-lg mb-8 text-gray-600">Aún estamos preparando esta página.</p>
        <a
          href={WA_MSG("información de servicios")}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold font-serif hover:bg-green-600 transition-colors"
        >
          <WaSvg /> Cotizar por WhatsApp
        </a>
        <Link href="/" className="mt-4 text-[#162040] underline font-serif">← Volver al inicio</Link>
      </div>
    );
  }

  if (product.category === 'eventos') {
    return <EventTypePage product={product} />;
  }

  const waUrl = WA_MSG(product.title);
  const hasCatalogImage = HERO_IMAGES[slug]?.startsWith('/images/mesas/') ?? false;

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. HERO BANNER ── */}
      {hasCatalogImage ? (
        /* Mobiliario individual: imagen nítida a la derecha sobre fondo beige */
        <section className="overflow-hidden bg-[#162040]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 px-4 sm:px-6 lg:px-12 py-10 md:py-16 flex flex-col justify-center min-h-[260px]">
                <nav className="flex items-center gap-2 text-sm text-white/60 mb-5 font-serif flex-wrap">
                  <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                  <span>/</span>
                  <Link href={product.categoryHref} className="hover:text-white transition-colors">{product.categoryLabel}</Link>
                  <span>/</span>
                  <span className="text-white/80">{product.title}</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 text-white">
                  {city ? `${product.title} en ${city.name}` : product.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-serif mb-8 leading-relaxed max-w-xl">
                  {product.headline}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <WaSvg /> Cotizar por WhatsApp
                  </a>
                  <a href="tel:5215540080373"
                     className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    Llamar ahora
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2 flex items-center justify-center bg-[#f5efe8] min-h-[260px] py-8 px-8">
                <img
                  src={HERO_IMAGES[slug]!}
                  alt={product.title}
                  className="max-h-72 w-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Hero estándar con imagen de fondo */
        <section className="relative overflow-hidden bg-[#162040]" style={{ minHeight: '280px' }}>
          <img
            src={HERO_IMAGES[slug] ?? '/images/galeria/g3.jpg'}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-60"
          />
          <div className="absolute inset-0 bg-[#162040]/55" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-5 font-serif flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href={product.categoryHref} className="hover:text-white transition-colors">{product.categoryLabel}</Link>
              <span>/</span>
              <span className="text-white/80">{product.title}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold leading-tight mb-4 text-white">
              {city ? `${product.title} en ${city.name}` : product.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-serif mb-8 leading-relaxed max-w-2xl">
              {product.headline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a href="tel:5215540080373"
                 className="flex items-center gap-2 bg-[#162040] hover:bg-[#0f1830] border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105">
                <Phone className="w-5 h-5 flex-shrink-0" />
                Llamar ahora
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. OTROS SERVICIOS EN ESTA CATEGORÍA ── */}
      {product.related.length > 0 && (
        <section className="bg-[#162040] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-white/60 font-serif mr-2 shrink-0">
                {product.categoryLabel}:
              </span>
              {product.related.map(r => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="px-3 py-1.5 bg-white border border-white rounded-full text-sm font-serif text-[#162040] hover:bg-[#162040] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. DESCRIPCIÓN + GALERÍA ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#162040] mb-6">
                {city ? `${product.title} en ${city.name}` : product.title}
              </h2>
              <div className="space-y-4">
                {product.description.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed font-serif text-lg">
                    {para}
                  </p>
                ))}
                {city && (
                  <p className="text-gray-600 leading-relaxed font-serif text-lg">
                    Servicio disponible en {city.name} y área metropolitana. Cotiza sin compromiso.
                  </p>
                )}
              </div>
              <div className="mt-8 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10">
                <p className="text-sm text-gray-500 font-serif italic">
                  {city ? `${product.seoDescription} Disponible en ${city.name}.` : product.seoDescription}
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ProductGalleryCarousel slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3b. BANNER CTA HORIZONTAL ── */}
      <section className="bg-[#162040] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <WaSvg />
              </div>
              <div>
                <p className="font-bold font-serif text-white text-lg">¿Listo para cotizar?</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/60 font-serif mt-1">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Cotización sin compromiso</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> +1,000 eventos realizados</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Garantía Bodasesor</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a
                href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] hover:border-white transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                55 4008 0373
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. QUÉ INCLUYE ── */}
      {product.included && product.included.length > 0 && (
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              ¿Qué incluye nuestro servicio?
            </h2>
            <p className="text-gray-500 mt-3 font-serif">Todo lo que necesitas para un evento impecable, en un solo paquete</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.included.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#162040]/5">
                <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center mb-3 text-[#162040]">
                  <IconFromEmoji emoji={item.icon} className="w-5 h-5" />
                </div>
                {item.title ? (
                  <>
                    <h3 className="font-serif font-bold text-[#162040] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-serif">{item.desc ?? item.text ?? ''}</p>
                  </>
                ) : (
                  <p className="text-[#162040] text-sm leading-relaxed font-serif">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 5. VARIEDADES ── */}
      {product.varieties && product.varieties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                Variedades y opciones
              </h2>
              <p className="text-gray-500 mt-3 font-serif">Elige la que mejor se adapte a tu evento y tus invitados</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.varieties.map((v, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#f5efe8]/50 rounded-2xl border border-[#162040]/10 hover:border-[#162040]/30 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#162040] text-white rounded-full flex items-center justify-center text-sm font-bold font-serif mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#162040] text-lg mb-1">{v.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-serif">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors"
              >
                <WaSvg /> Consultar disponibilidad
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EJEMPLO DE MENÚ ── */}
      {product.menuExample && product.menuExample.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">Ejemplo de menú</h2>
              <p className="text-gray-500 mt-3 font-serif">Propuesta referencial — adaptamos el menú a tus gustos y preferencias</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.menuExample.map((item, i) => {
                const [label, ...rest] = item.split(": ");
                const content = rest.join(": ");
                return (
                  <div key={i} className="flex gap-4 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10 hover:bg-[#f5efe8] transition-colors">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#162040] text-white rounded-full flex items-center justify-center text-xs font-bold font-serif mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      {content ? (
                        <>
                          <span className="text-[#162040]/60 text-xs font-bold uppercase tracking-wide font-serif">{label}</span>
                          <p className="text-[#162040] font-serif mt-0.5">{content}</p>
                        </>
                      ) : (
                        <p className="text-[#162040] font-serif">{label}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm font-serif mb-4">¿Quieres un menú diferente? Diseñamos el tuyo desde cero.</p>
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors"
              >
                <WaSvg /> Personalizar mi menú
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. NIVELES DE SERVICIO ── */}
      {product.serviceTiers && product.serviceTiers.length > 0 && (
        <section className="py-16 bg-[#f5efe8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                Niveles de Servicio Incluidos
              </h2>
              <p className="text-gray-500 mt-3 font-serif">Elige el nivel que mejor se adapte a tu evento</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {product.serviceTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border transition-shadow ${
                    tier.popular
                      ? 'bg-white text-[#162040] border-[#162040] shadow-2xl scale-[1.02]'
                      : 'bg-white text-[#162040] border-[#162040]/15 shadow-sm hover:shadow-md'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#162040] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full font-serif whitespace-nowrap">
                        Más Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-serif font-bold mb-5 text-center text-[#162040]">
                    {tier.name}
                  </h3>
                  <ul className="space-y-3">
                    {tier.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#162040]" />
                        <span className="text-sm font-serif leading-snug text-gray-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <a
                      href={waUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold font-serif text-sm transition-colors bg-[#25D366] hover:bg-green-500 text-white"
                    >
                      <WaSvg /> Cotizar nivel {tier.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. POR QUÉ ELEGIRNOS ── */}
      {product.whyUs && product.whyUs.length > 0 && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              ¿Por qué elegir Bodasesor?
            </h2>
            <p className="text-gray-500 mt-3 font-serif">Más de 1,000 eventos nos respaldan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.whyUs.map((item, i) => (
              <div key={i} className="group text-center p-6 rounded-2xl border border-[#162040]/10 bg-white hover:border-[#162040] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-[#162040]/8 group-hover:bg-[#162040] flex items-center justify-center mx-auto mb-4 text-[#162040] group-hover:text-white transition-colors duration-300">
                  <IconFromEmoji emoji={item.icon} className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-[#162040] text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-serif">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              {[
                { num: '1,000+', label: 'Eventos realizados' },
                { num: '10,000+', label: 'Personas atendidas' },
                { num: '4.6/5', label: 'Calificación promedio' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 bg-[#f5efe8] rounded-2xl">
                  <p className="text-2xl font-serif font-bold text-[#162040]">{s.num}</p>
                  <p className="text-xs text-gray-500 font-serif mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <img
              src="/images/sello-garantia-transparent.png"
              alt="Garantía de Felicidad Bodasesor"
              className="h-24 w-auto drop-shadow-lg"
              onError={e => { (e.target as HTMLImageElement).src = '/images/sello-garantia.png'; }}
            />
          </div>
        </div>
      </section>
      )}

      {/* ── 8. SERVICIOS INTEGRALES ── */}
      {product.integralServices && product.integralServices.length > 0 && (
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              Servicios integrales
            </h2>
            <p className="text-gray-500 mt-3 font-serif">Combina {product.title} con estos servicios para un evento completo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {product.integralServices.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-[#162040]/10 hover:border-[#162040] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center text-[#162040] group-hover:bg-[#162040] group-hover:text-white transition-colors">
                  <IconFromEmoji emoji={s.icon} className="w-5 h-5" />
                </div>
                <span className="text-xs font-serif font-semibold text-[#162040] text-center leading-tight">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 10. FINAL CTA ── */}
      <section className="py-16 bg-[#162040] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            ¿Listo para organizar tu evento?
          </h2>
          <p className="text-white/70 text-lg font-serif mb-8 max-w-2xl mx-auto">
            Contáctanos ahora y recibe una cotización personalizada sin compromiso. Respondemos en menos de 1 hora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-8 py-4 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 text-lg"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold font-serif hover:bg-white/10 transition-colors text-lg"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              55 4008 0373
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/60 font-serif">
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> Sin costo de asesoría
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> Cotización en 60 minutos
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> +1,000 clientes satisfechos
            </span>
          </div>
        </div>
      </section>

      {/* SEO text — para motores de búsqueda */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-xs text-gray-300 font-serif leading-relaxed">{product.seoDescription}</p>
      </div>

      {/* ── CATÁLOGO COMPLETO DE MESAS Y SILLAS ── */}
      {slug === 'mesas-sillas' && <MesasSillasCatalog waUrl={waUrl} />}

    </div>
  );
}
