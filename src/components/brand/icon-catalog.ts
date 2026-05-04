// Stay Studio — icon catalog
// Curated set of ~150 lucide icons grouped by category. Each entry maps a
// kebab-case `{icon:NAME}` token (used in headlines / body / CTA copy) to a
// lucide-react component. Backward-compatible: legacy names (heart, star,
// shield, etc.) keep their tokens so existing saved designs render unchanged.
//
// `Component` is the lucide-react component to render; `fill: true` flips it
// to a solid look (used for `star-filled`).

import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import * as L from "lucide-react";

export interface IconDef {
  /** Kebab-case identifier used in `{icon:NAME}` tokens and stored in design content. */
  name: string;
  /** Human-readable label for tooltips and search. */
  label: string;
  /** Lucide component (or null for custom-rendered icons like Stay's clover). */
  Component: ComponentType<LucideProps> | null;
  /** When true, the icon renders as a solid (filled) glyph. */
  fill?: boolean;
  /** Category for the picker UI. */
  category: IconCategory;
  /** Optional extra search terms beyond `label` and `name`. */
  keywords?: string;
}

export type IconCategory =
  | "Brand"
  | "Symbols"
  | "Insurance & Health"
  | "People"
  | "Home & Family"
  | "Money"
  | "Travel"
  | "Communication"
  | "Navigation"
  | "Time"
  | "Documents"
  | "Tech"
  | "Tools"
  | "Status"
  | "Weather"
  | "Misc";

// Order here defines order in the picker.
export const CATEGORIES: IconCategory[] = [
  "Brand",
  "Symbols",
  "Insurance & Health",
  "People",
  "Home & Family",
  "Money",
  "Travel",
  "Communication",
  "Navigation",
  "Time",
  "Documents",
  "Tech",
  "Tools",
  "Status",
  "Weather",
  "Misc",
];

export const ICON_CATALOG: IconDef[] = [
  // Brand
  { name: "clover", label: "Stay clover", Component: null, category: "Brand", keywords: "stay logo mark" },

  // Symbols
  { name: "heart", label: "Heart", Component: L.Heart, category: "Symbols", keywords: "love favorite like" },
  { name: "heart-filled", label: "Heart (filled)", Component: L.Heart, fill: true, category: "Symbols", keywords: "love favorite like solid" },
  { name: "star", label: "Star", Component: L.Star, category: "Symbols", keywords: "rating favorite" },
  { name: "star-filled", label: "Star (filled)", Component: L.Star, fill: true, category: "Symbols", keywords: "rating favorite solid" },
  { name: "check", label: "Check", Component: L.Check, category: "Symbols", keywords: "tick yes correct done" },
  { name: "check-circle", label: "Check (circle)", Component: L.CheckCircle2, category: "Symbols", keywords: "tick yes done" },
  { name: "cross", label: "Cross", Component: L.X, category: "Symbols", keywords: "close no wrong cancel" },
  { name: "cross-circle", label: "Cross (circle)", Component: L.XCircle, category: "Symbols", keywords: "close error" },
  { name: "plus", label: "Plus", Component: L.Plus, category: "Symbols", keywords: "add more" },
  { name: "minus", label: "Minus", Component: L.Minus, category: "Symbols", keywords: "subtract less" },
  { name: "thumbs-up", label: "Thumbs up", Component: L.ThumbsUp, category: "Symbols", keywords: "like good" },
  { name: "thumbs-down", label: "Thumbs down", Component: L.ThumbsDown, category: "Symbols", keywords: "dislike bad" },
  { name: "sparkles", label: "Sparkles", Component: L.Sparkles, category: "Symbols", keywords: "shine magic ai" },
  { name: "zap", label: "Zap", Component: L.Zap, category: "Symbols", keywords: "fast lightning bolt" },
  { name: "flame", label: "Flame", Component: L.Flame, category: "Symbols", keywords: "fire hot trending" },
  { name: "trophy", label: "Trophy", Component: L.Trophy, category: "Symbols", keywords: "award winner" },
  { name: "medal", label: "Medal", Component: L.Medal, category: "Symbols", keywords: "award winner" },
  { name: "crown", label: "Crown", Component: L.Crown, category: "Symbols", keywords: "premium royal" },
  { name: "gift", label: "Gift", Component: L.Gift, category: "Symbols", keywords: "present bonus" },
  { name: "party-popper", label: "Party popper", Component: L.PartyPopper, category: "Symbols", keywords: "celebrate confetti" },

  // Insurance & Health
  { name: "shield", label: "Shield", Component: L.Shield, category: "Insurance & Health", keywords: "protection security" },
  { name: "shield-check", label: "Shield (check)", Component: L.ShieldCheck, category: "Insurance & Health", keywords: "protected covered" },
  { name: "shield-alert", label: "Shield (alert)", Component: L.ShieldAlert, category: "Insurance & Health", keywords: "warning risk" },
  { name: "shield-x", label: "Shield (x)", Component: L.ShieldX, category: "Insurance & Health", keywords: "unprotected gap" },
  { name: "heart-pulse", label: "Heart pulse", Component: L.HeartPulse, category: "Insurance & Health", keywords: "ekg heartbeat health vitals" },
  { name: "stethoscope", label: "Stethoscope", Component: L.Stethoscope, category: "Insurance & Health", keywords: "doctor medical" },
  { name: "syringe", label: "Syringe", Component: L.Syringe, category: "Insurance & Health", keywords: "vaccine injection shot" },
  { name: "pill", label: "Pill", Component: L.Pill, category: "Insurance & Health", keywords: "medication drug" },
  { name: "first-aid", label: "First aid kit", Component: L.BriefcaseMedical, category: "Insurance & Health", keywords: "medical kit emergency" },
  { name: "ambulance", label: "Ambulance", Component: L.Ambulance, category: "Insurance & Health", keywords: "emergency hospital" },
  { name: "hospital", label: "Hospital", Component: L.Hospital, category: "Insurance & Health", keywords: "clinic" },
  { name: "tooth", label: "Tooth", Component: L.Bone, category: "Insurance & Health", keywords: "dental dentist" }, // closest in lucide
  { name: "eye", label: "Eye", Component: L.Eye, category: "Insurance & Health", keywords: "vision view" },
  { name: "brain", label: "Brain", Component: L.Brain, category: "Insurance & Health", keywords: "mental mind" },
  { name: "activity", label: "Activity", Component: L.Activity, category: "Insurance & Health", keywords: "pulse fitness vitals" },
  { name: "dumbbell", label: "Dumbbell", Component: L.Dumbbell, category: "Insurance & Health", keywords: "fitness gym" },
  { name: "leaf", label: "Leaf", Component: L.Leaf, category: "Insurance & Health", keywords: "wellness nature" },

  // People
  { name: "person", label: "Person", Component: L.User, category: "People", keywords: "user profile customer" },
  { name: "users", label: "Group", Component: L.Users, category: "People", keywords: "people team customers" },
  { name: "user-plus", label: "Add person", Component: L.UserPlus, category: "People", keywords: "new customer signup" },
  { name: "user-check", label: "Verified person", Component: L.UserCheck, category: "People", keywords: "verified approved" },
  { name: "user-circle", label: "Profile", Component: L.UserCircle2, category: "People", keywords: "avatar profile" },
  { name: "handshake", label: "Handshake", Component: L.Handshake, category: "People", keywords: "deal partnership trust" },
  { name: "smile", label: "Smile", Component: L.Smile, category: "People", keywords: "happy positive" },
  { name: "headset", label: "Support agent", Component: L.Headset, category: "People", keywords: "support service human help" },
  { name: "baby", label: "Baby", Component: L.Baby, category: "People", keywords: "child infant family" },

  // Home & Family
  { name: "house", label: "House", Component: L.Home, category: "Home & Family", keywords: "home property" },
  { name: "building", label: "Building", Component: L.Building, category: "Home & Family", keywords: "office company" },
  { name: "building-2", label: "Apartment", Component: L.Building2, category: "Home & Family", keywords: "apartment office" },
  { name: "key", label: "Key", Component: L.Key, category: "Home & Family", keywords: "access lock" },
  { name: "bed", label: "Bed", Component: L.Bed, category: "Home & Family", keywords: "bedroom rest hotel" },
  { name: "sofa", label: "Sofa", Component: L.Sofa, category: "Home & Family", keywords: "couch furniture living" },
  { name: "armchair", label: "Armchair", Component: L.Armchair, category: "Home & Family", keywords: "furniture chair" },
  { name: "dog", label: "Dog", Component: L.Dog, category: "Home & Family", keywords: "pet animal" },
  { name: "cat", label: "Cat", Component: L.Cat, category: "Home & Family", keywords: "pet animal" },

  // Money
  { name: "euro", label: "Euro", Component: L.Euro, category: "Money", keywords: "currency eur money" },
  { name: "dollar", label: "Dollar", Component: L.DollarSign, category: "Money", keywords: "currency usd money" },
  { name: "banknote", label: "Banknote", Component: L.Banknote, category: "Money", keywords: "cash money bill" },
  { name: "coins", label: "Coins", Component: L.Coins, category: "Money", keywords: "money cash savings" },
  { name: "credit-card", label: "Credit card", Component: L.CreditCard, category: "Money", keywords: "payment card" },
  { name: "wallet", label: "Wallet", Component: L.Wallet, category: "Money", keywords: "money savings" },
  { name: "piggy-bank", label: "Piggy bank", Component: L.PiggyBank, category: "Money", keywords: "savings save" },
  { name: "percent", label: "Percent", Component: L.Percent, category: "Money", keywords: "discount rate interest" },
  { name: "receipt", label: "Receipt", Component: L.Receipt, category: "Money", keywords: "bill invoice" },
  { name: "calculator", label: "Calculator", Component: L.Calculator, category: "Money", keywords: "math compute price" },
  { name: "trending-up", label: "Trending up", Component: L.TrendingUp, category: "Money", keywords: "growth increase chart" },
  { name: "trending-down", label: "Trending down", Component: L.TrendingDown, category: "Money", keywords: "decrease loss chart" },
  { name: "bar-chart", label: "Bar chart", Component: L.BarChart3, category: "Money", keywords: "stats graph chart" },
  { name: "line-chart", label: "Line chart", Component: L.LineChart, category: "Money", keywords: "stats graph trend" },

  // Travel
  { name: "plane", label: "Plane", Component: L.Plane, category: "Travel", keywords: "flight airplane" },
  { name: "plane-takeoff", label: "Plane takeoff", Component: L.PlaneTakeoff, category: "Travel", keywords: "flight depart" },
  { name: "plane-landing", label: "Plane landing", Component: L.PlaneLanding, category: "Travel", keywords: "flight arrive" },
  { name: "car", label: "Car", Component: L.Car, category: "Travel", keywords: "auto vehicle" },
  { name: "bus", label: "Bus", Component: L.Bus, category: "Travel", keywords: "transit transport" },
  { name: "train", label: "Train", Component: L.TrainFront, category: "Travel", keywords: "rail transport" },
  { name: "ship", label: "Ship", Component: L.Ship, category: "Travel", keywords: "boat cruise" },
  { name: "bike", label: "Bike", Component: L.Bike, category: "Travel", keywords: "bicycle cycling" },
  { name: "luggage", label: "Luggage", Component: L.Luggage, category: "Travel", keywords: "suitcase travel" },
  { name: "map", label: "Map", Component: L.Map, category: "Travel", keywords: "location navigation" },
  { name: "map-pin", label: "Map pin", Component: L.MapPin, category: "Travel", keywords: "location address marker" },
  { name: "navigation", label: "Navigation", Component: L.Navigation, category: "Travel", keywords: "compass direction gps" },
  { name: "compass", label: "Compass", Component: L.Compass, category: "Travel", keywords: "direction explore" },
  { name: "globe", label: "Globe", Component: L.Globe, category: "Travel", keywords: "world international" },
  { name: "globe-2", label: "Globe (continents)", Component: L.Globe2, category: "Travel", keywords: "world international" },
  { name: "languages", label: "Languages", Component: L.Languages, category: "Travel", keywords: "translate multilingual" },
  { name: "passport", label: "Passport", Component: L.BookUser, category: "Travel", keywords: "id travel document" },

  // Communication
  { name: "mail", label: "Mail", Component: L.Mail, category: "Communication", keywords: "email message" },
  { name: "send", label: "Send", Component: L.Send, category: "Communication", keywords: "submit deliver" },
  { name: "phone", label: "Phone", Component: L.Phone, category: "Communication", keywords: "call telephone" },
  { name: "phone-call", label: "Phone call", Component: L.PhoneCall, category: "Communication", keywords: "call ring" },
  { name: "message", label: "Message", Component: L.MessageSquare, category: "Communication", keywords: "chat sms" },
  { name: "message-circle", label: "Message (circle)", Component: L.MessageCircle, category: "Communication", keywords: "chat speak" },
  { name: "speech", label: "Speech bubbles", Component: L.MessagesSquare, category: "Communication", keywords: "discussion chat" },
  { name: "bell", label: "Bell", Component: L.Bell, category: "Communication", keywords: "notification alert" },
  { name: "megaphone", label: "Megaphone", Component: L.Megaphone, category: "Communication", keywords: "announcement broadcast" },
  { name: "share", label: "Share", Component: L.Share2, category: "Communication", keywords: "send forward" },
  { name: "at-sign", label: "At sign", Component: L.AtSign, category: "Communication", keywords: "email handle mention" },

  // Navigation
  { name: "arrow-right", label: "Arrow right", Component: L.ArrowRight, category: "Navigation" },
  { name: "arrow-left", label: "Arrow left", Component: L.ArrowLeft, category: "Navigation" },
  { name: "arrow-up", label: "Arrow up", Component: L.ArrowUp, category: "Navigation" },
  { name: "arrow-down", label: "Arrow down", Component: L.ArrowDown, category: "Navigation" },
  { name: "arrow-up-right", label: "Arrow up-right", Component: L.ArrowUpRight, category: "Navigation" },
  { name: "arrow-down-right", label: "Arrow down-right", Component: L.ArrowDownRight, category: "Navigation" },
  { name: "chevron-right", label: "Chevron right", Component: L.ChevronRight, category: "Navigation" },
  { name: "chevron-left", label: "Chevron left", Component: L.ChevronLeft, category: "Navigation" },
  { name: "chevron-up", label: "Chevron up", Component: L.ChevronUp, category: "Navigation" },
  { name: "chevron-down", label: "Chevron down", Component: L.ChevronDown, category: "Navigation" },
  { name: "chevrons-right", label: "Chevrons right", Component: L.ChevronsRight, category: "Navigation", keywords: "double arrow" },
  { name: "external-link", label: "External link", Component: L.ExternalLink, category: "Navigation", keywords: "open new tab" },
  { name: "move-right", label: "Move right (long)", Component: L.MoveRight, category: "Navigation" },
  { name: "corner-down-right", label: "Corner down-right", Component: L.CornerDownRight, category: "Navigation" },

  // Time
  { name: "clock", label: "Clock", Component: L.Clock, category: "Time", keywords: "time hour" },
  { name: "calendar", label: "Calendar", Component: L.Calendar, category: "Time", keywords: "date schedule" },
  { name: "calendar-check", label: "Calendar (check)", Component: L.CalendarCheck, category: "Time", keywords: "scheduled booked" },
  { name: "calendar-clock", label: "Calendar (clock)", Component: L.CalendarClock, category: "Time", keywords: "appointment date time" },
  { name: "hourglass", label: "Hourglass", Component: L.Hourglass, category: "Time", keywords: "wait time" },
  { name: "timer", label: "Timer", Component: L.Timer, category: "Time", keywords: "stopwatch countdown" },
  { name: "history", label: "History", Component: L.History, category: "Time", keywords: "recent past" },

  // Documents
  { name: "file", label: "File", Component: L.File, category: "Documents", keywords: "document" },
  { name: "file-text", label: "File (text)", Component: L.FileText, category: "Documents", keywords: "document text" },
  { name: "file-check", label: "File (check)", Component: L.FileCheck, category: "Documents", keywords: "approved signed" },
  { name: "file-x", label: "File (x)", Component: L.FileX, category: "Documents", keywords: "rejected" },
  { name: "files", label: "Files", Component: L.Files, category: "Documents", keywords: "documents copies" },
  { name: "folder", label: "Folder", Component: L.Folder, category: "Documents", keywords: "directory" },
  { name: "clipboard", label: "Clipboard", Component: L.Clipboard, category: "Documents", keywords: "list" },
  { name: "clipboard-check", label: "Clipboard (check)", Component: L.ClipboardCheck, category: "Documents", keywords: "checklist done" },
  { name: "book", label: "Book", Component: L.Book, category: "Documents", keywords: "read manual" },
  { name: "book-open", label: "Book (open)", Component: L.BookOpen, category: "Documents", keywords: "read learn" },
  { name: "newspaper", label: "Newspaper", Component: L.Newspaper, category: "Documents", keywords: "news article" },
  { name: "graduation-cap", label: "Graduation cap", Component: L.GraduationCap, category: "Documents", keywords: "education student" },
  { name: "scroll", label: "Scroll", Component: L.Scroll, category: "Documents", keywords: "policy contract" },

  // Tech
  { name: "smartphone", label: "Smartphone", Component: L.Smartphone, category: "Tech", keywords: "mobile phone" },
  { name: "laptop", label: "Laptop", Component: L.Laptop, category: "Tech", keywords: "computer" },
  { name: "monitor", label: "Monitor", Component: L.Monitor, category: "Tech", keywords: "screen desktop" },
  { name: "wifi", label: "Wifi", Component: L.Wifi, category: "Tech", keywords: "internet wireless" },
  { name: "lock", label: "Lock", Component: L.Lock, category: "Tech", keywords: "secure private" },
  { name: "unlock", label: "Unlock", Component: L.Unlock, category: "Tech", keywords: "open access" },
  { name: "fingerprint", label: "Fingerprint", Component: L.Fingerprint, category: "Tech", keywords: "biometric secure" },
  { name: "qr-code", label: "QR code", Component: L.QrCode, category: "Tech", keywords: "scan code" },
  { name: "search", label: "Search", Component: L.Search, category: "Tech", keywords: "find magnifier" },
  { name: "filter", label: "Filter", Component: L.Filter, category: "Tech", keywords: "sort sieve" },
  { name: "cloud", label: "Cloud", Component: L.Cloud, category: "Tech", keywords: "online storage" },
  { name: "download", label: "Download", Component: L.Download, category: "Tech", keywords: "save get" },
  { name: "upload", label: "Upload", Component: L.Upload, category: "Tech", keywords: "send up" },
  { name: "link", label: "Link", Component: L.Link, category: "Tech", keywords: "url chain" },

  // Tools
  { name: "settings", label: "Settings", Component: L.Settings, category: "Tools", keywords: "gear preferences" },
  { name: "sliders", label: "Sliders", Component: L.SlidersHorizontal, category: "Tools", keywords: "adjust customize" },
  { name: "wrench", label: "Wrench", Component: L.Wrench, category: "Tools", keywords: "tool fix repair" },
  { name: "edit", label: "Edit", Component: L.Pencil, category: "Tools", keywords: "pencil write" },
  { name: "trash", label: "Trash", Component: L.Trash2, category: "Tools", keywords: "delete remove" },
  { name: "copy", label: "Copy", Component: L.Copy, category: "Tools", keywords: "duplicate" },
  { name: "save", label: "Save", Component: L.Save, category: "Tools", keywords: "store keep" },
  { name: "refresh", label: "Refresh", Component: L.RefreshCw, category: "Tools", keywords: "reload retry" },
  { name: "rotate", label: "Rotate", Component: L.RotateCw, category: "Tools", keywords: "redo refresh" },

  // Status
  { name: "info", label: "Info", Component: L.Info, category: "Status", keywords: "information note" },
  { name: "alert-circle", label: "Alert (circle)", Component: L.AlertCircle, category: "Status", keywords: "warning error" },
  { name: "alert-triangle", label: "Alert (triangle)", Component: L.AlertTriangle, category: "Status", keywords: "warning danger" },
  { name: "ban", label: "Ban", Component: L.Ban, category: "Status", keywords: "forbidden no blocked" },
  { name: "help-circle", label: "Help", Component: L.HelpCircle, category: "Status", keywords: "question support" },
  { name: "question", label: "Question", Component: L.CircleHelp, category: "Status", keywords: "help unknown" },
  { name: "check-square", label: "Check (square)", Component: L.SquareCheck, category: "Status", keywords: "tick done todo" },
  { name: "lightbulb", label: "Lightbulb", Component: L.Lightbulb, category: "Status", keywords: "idea tip insight" },
  { name: "target", label: "Target", Component: L.Target, category: "Status", keywords: "goal aim focus" },

  // Weather
  { name: "sun", label: "Sun", Component: L.Sun, category: "Weather", keywords: "sunny bright day" },
  { name: "moon", label: "Moon", Component: L.Moon, category: "Weather", keywords: "night dark" },
  { name: "cloud-sun", label: "Cloud (sun)", Component: L.CloudSun, category: "Weather", keywords: "partly cloudy" },
  { name: "cloud-rain", label: "Cloud (rain)", Component: L.CloudRain, category: "Weather", keywords: "rain weather" },
  { name: "snowflake", label: "Snowflake", Component: L.Snowflake, category: "Weather", keywords: "snow winter" },
  { name: "umbrella", label: "Umbrella", Component: L.Umbrella, category: "Weather", keywords: "rain protection" },
  { name: "tree", label: "Tree", Component: L.Trees, category: "Weather", keywords: "nature forest" },

  // Misc
  { name: "briefcase", label: "Briefcase", Component: L.Briefcase, category: "Misc", keywords: "work job business" },
  { name: "coffee", label: "Coffee", Component: L.Coffee, category: "Misc", keywords: "cafe morning" },
  { name: "shopping-cart", label: "Shopping cart", Component: L.ShoppingCart, category: "Misc", keywords: "buy purchase store" },
  { name: "shopping-bag", label: "Shopping bag", Component: L.ShoppingBag, category: "Misc", keywords: "buy retail" },
  { name: "tag", label: "Tag", Component: L.Tag, category: "Misc", keywords: "label price" },
  { name: "bookmark", label: "Bookmark", Component: L.Bookmark, category: "Misc", keywords: "save reference" },
  { name: "flag", label: "Flag", Component: L.Flag, category: "Misc", keywords: "mark report" },
  { name: "anchor", label: "Anchor", Component: L.Anchor, category: "Misc", keywords: "pin stay" },
];

/** All known icon names — mirrors the catalog. Used for token validation in RichText. */
export const ICON_NAMES = ICON_CATALOG.map((i) => i.name);

/** Lookup map for fast `name → IconDef` access at render time. */
export const ICON_BY_NAME: Map<string, IconDef> = new Map(ICON_CATALOG.map((i) => [i.name, i]));

/** Catalog grouped by category, preserving the order defined by `CATEGORIES`. */
export const ICON_BY_CATEGORY: Array<{ category: IconCategory; icons: IconDef[] }> = CATEGORIES.map(
  (cat) => ({ category: cat, icons: ICON_CATALOG.filter((i) => i.category === cat) })
);
