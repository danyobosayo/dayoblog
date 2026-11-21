/* The public board talks directly to the hosted service. LAN rehearsals use Node. */
const captainApi = location.hostname === "dayoblog.pages.dev"
  ? "https://adkwvwgphzegckohvoxp.supabase.co/functions/v1/captain-api/"
  : "/captain-api/";
