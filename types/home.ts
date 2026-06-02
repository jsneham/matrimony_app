export type MemberCardProps = {
  name: string;
  matriId: string;
  age: string;
  height: string;
  religion: string;
  caste: string;
  education: string;
  location: string;
  photoUri?: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const RECENTLY_LOGGED_IN: MemberCardProps[] = [
  {
    name: "Sumit Gaikwad",
    matriId: "JJ125604",
    age: "32 years",
    height: `5' 10"`,
    religion: "Marathi",
    caste: "Buddhist",
    education: "10th / Upto S.S.C, General H...",
    location: "Vasai-Virar, Maharashtra",
    photoUri:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=400&fit=crop",
  },
  {
    name: "Male Demo login",
    matriId: "JJ12",
    age: "26 years",
    height: "Above 7'",
    religion: "Hindi",
    caste: "Follows No Religion o...",
    education: "MBBS, Doctor",
    location: "Union Territory Of Lakshadwe...",
    photoUri: undefined,
  },
];

export const NEWLY_JOINED: MemberCardProps[] = [
  {
    name: "Shekhar Gawade",
    matriId: "JJ125580",
    age: "28 years",
    height: `5' 8"`,
    religion: "Marathi",
    caste: "Hindu",
    education: "B.E, Engineer",
    location: "Pune, Maharashtra",
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {
    name: "Ajay Ghanekar",
    matriId: "JJ125512",
    age: "30 years",
    height: `5' 9"`,
    religion: "Marathi",
    caste: "Buddhist",
    education: "MBA, Business",
    location: "Mumbai, Maharashtra",
    photoUri:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
];
