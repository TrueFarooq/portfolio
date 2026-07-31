import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Replace these with your actual Supabase Project URL and Anon Key
const  SUPABASE_URL = 'https://cwlswhzmdtksndqlhnsr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BYCL8P_ZWfUkCGMdiJXkg_Zloat74wa';

const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

// Fetch and display existing messages
async function fetchMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select'*'
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return;
  }

  console.log('Messages:', data);
  // Optional: add logic here to render messages into your HTML page
}

// Send a new message
async function sendMessage(senderText, messageText) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { sender: senderText, message: messageText }
    ]);

  if (error) {
    console.error('Error sending message:', error);
  } else {
    console.log('Message sent:', data);
    fetchMessages(); // Refresh message list after sending
  }
}

// Call fetchMessages when the script loads
fetchMessages();
