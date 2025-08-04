// /src/services/apiService.js
import { supabase } from "../superBaseClient.js";


export const getProfileForUser = async (userId) => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role, full_name") // We only need the role and name
    .eq("id", userId)
    .single(); // .single() returns one object instead of an array

  if (error) {
    console.error("Error fetching user profile:", error);
    // It's okay if a profile doesn't exist yet, so we don't throw the error
    return null;
  }
  return data;
};
// =================================================================
// --- CARS API ---
// =================================================================
export const getCars = async () => {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
  return data;
};

export const addCar = async (carData) => {
  const { data, error } = await supabase
    .from("cars")
    .insert([carData])
    .select();
  if (error) {
    console.error("Error adding car:", error);
    throw error;
  }
  return data;
};

export const updateCar = async (carId, updates) => {
  const { data, error } = await supabase
    .from("cars")
    .update(updates)
    .eq("id", carId);
  if (error) {
    console.error("Error updating car:", error);
    throw error;
  }
  return data;
};

export const deleteCar = async (carId) => {
  const { error } = await supabase.from("cars").delete().eq("id", carId);
  if (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

// =================================================================
// --- QUOTES API ---
// =================================================================

export const createQuoteRequest = async (request) => {
  const { data, error } = await supabase.from("quotes").insert([request]);
  if (error) {
    console.error("Error creating quote request:", error);
    throw error;
  }
  return data;
};

export const respondToQuote = async (quoteId, response) => {
  const { data, error } = await supabase
    .from("quotes")
    .update(response)
    .eq("id", quoteId);
  if (error) {
    console.error("Error responding to quote:", error);
    throw error;
  }
  return data;
};

export const acceptQuote = async (quoteId) => {
  const updates = { status: "Accepted by User" };
  const { data, error } = await supabase
    .from("quotes")
    .update(updates)
    .eq("id", quoteId);
  if (error) {
    console.error("Error accepting quote:", error);
    throw error;
  }
  return data;
};

export const confirmBooking = async (quoteId) => {
  const updates = { status: "Booked" };
  const { data, error } = await supabase
    .from("quotes")
    .update(updates)
    .eq("id", quoteId);
  if (error) {
    console.error("Error confirming booking:", error);
    throw error;
  }
  return data;
};

// =================================================================
// --- Data Fetching API ---
// =================================================================

export const getQuotesForUser = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // Show newest first
  if (error) {
    console.error("Error fetching user quotes:", error);
    throw error;
  }
  return data;
};

export const getQuotesForAdmin = async () => {
  const { data, error } = await supabase
    .from("quotes")
    .select("*, profiles ( full_name, email )") // Example of fetching related data
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching admin quotes:", error);
    throw error;
  }
  return data;
};
