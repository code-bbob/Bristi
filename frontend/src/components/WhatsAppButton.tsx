import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/9779851412678";

export default function WhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bristi Educational Consultancy on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 shadow-xl shadow-black/25 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.386.63 4.638 1.723 6.568L4 28l6.601-1.686A11.93 11.93 0 0 0 16.003 28c6.62 0 12-5.383 12-11.997C28.003 8.383 22.623 3 16.003 3zm0 21.637c-1.862 0-3.66-.506-5.226-1.458l-.375-.22-3.867.988.992-3.77-.244-.376a9.868 9.868 0 0 1-1.51-5.24c0-5.43 4.42-9.85 9.85-9.85s9.85 4.42 9.85 9.85-4.42 9.856-9.47 9.076zm5.424-7.354c-.297-.148-1.758-.868-2.03-.967-.272-.1-.47-.148-.669.148-.198.297-.768.967-.942 1.166-.174.198-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.474-.884-.788-1.48-1.76-1.654-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.297.297-.497.1-.198.05-.372-.025-.52-.074-.148-.668-1.613-.916-2.208-.241-.58-.485-.502-.669-.51l-.57-.01c-.197 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.48 0 1.462 1.065 2.875 1.214 3.074.148.198 2.097 3.201 5.08 4.488.71.306 1.264.49 1.695.626.713.226 1.36.194 1.873.118.57-.085 1.758-.72 2.006-1.413.248-.694.248-1.288.173-1.412-.074-.124-.272-.199-.57-.347z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.875rem] font-semibold text-white transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[10rem]">
        Chat on WhatsApp
      </span>
    </Link>
  );
}