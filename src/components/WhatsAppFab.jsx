const WHATSAPP_NUMBER = "5215540080373";

export default function WhatsAppFloat() {
  const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20interesa%20cotizar%20un%20servicio`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
      data-testid="whatsapp-float"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.3.6 4.5 1.7 6.4L3 29l7.2-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.7C28.7 8.7 23 3 16 3zm0 23.2c-2 0-3.9-.5-5.5-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7 0-6 4.9-10.9 10.9-10.9s10.9 4.9 10.9 10.9-4.8 10.8-10.8 10.8zm6-8.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6 0-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5-.2-.1-.4-.2-.7-.4z"
          fill="white"
        />
      </svg>
    </a>
  );
}
