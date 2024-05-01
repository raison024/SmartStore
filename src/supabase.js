const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://hmxguflicvneitwlnqnc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhteGd1ZmxpY3ZuZWl0d2xucW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTY5NzQsImV4cCI6MjAxNzkzMjk3NH0.uEGXO2LVN1Lnoa8HieMzzXtKzKoMeYVUbgEVkbTkrDc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check if Supabase client is connected
const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1); // You can adjust the limit as per your need
    if (error) {
      throw error;
    }
    console.log('Supabase connection successful:', data);
    return true;
  } catch (error) {
    console.error('Error connecting to Supabase:', error.message);
    return false;
  }
};

export { supabase, checkSupabaseConnection };
