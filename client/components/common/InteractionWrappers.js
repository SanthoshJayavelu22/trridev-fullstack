"use client";

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });
const WhatsAppFloating = dynamic(() => import('@/components/common/WhatsAppFloating'), { ssr: false });

export default function InteractionWrappers() {
  return (
    <>
      <ChatWidget />
      <WhatsAppFloating />
    </>
  );
}
