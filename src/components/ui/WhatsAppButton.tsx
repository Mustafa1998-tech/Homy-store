import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "+201157374628";
  const welcomeMessage = "مرحباً! أرغب في الاستفسار عن منتجات Homey Store";
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(welcomeMessage)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 z-50 flex items-center justify-center group"
      aria-label="تواصل معنا على واتساب"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        تواصل معنا
      </span>
    </a>
  );
} 