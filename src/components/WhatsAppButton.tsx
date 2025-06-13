import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'card';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  text?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  message, 
  className = '', 
  variant = 'inline',
  size = 'md',
  iconOnly = false,
  text = 'WhatsApp'
}) => {
  const phoneNumber = '6285124776840'; // WhatsApp number without + sign
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
  
  const variantClasses = {
    floating: "fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl",
    inline: "bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg",
    card: "bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200 hover:border-green-300 rounded-lg"
  };

  const sizeClasses = {
    sm: variant === 'floating' ? 'w-12 h-12' : 'px-4 py-2 text-sm',
    md: variant === 'floating' ? 'w-14 h-14' : 'px-6 py-3 text-base',
    lg: variant === 'floating' ? 'w-16 h-16' : 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className={`${iconSizes[size]} ${!iconOnly && variant !== 'floating' ? 'mr-2' : ''}`} />
      {!iconOnly && variant !== 'floating' && (
        <span>{text}</span>
      )}
    </a>
  );
};

export default WhatsAppButton;