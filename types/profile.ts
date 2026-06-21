// ============ ENUMS ============

export enum AdminRole {
  SUPER_ADMIN = "1",
  ADMIN = "2",
  STAFF = "3",
}

export enum ApprovalStatus {
  APPROVED = "APPROVED",
  UNAPPROVED = "UNAPPROVED",
}

export enum VerificationStatus {
  YES = "Yes",
  NO = "No",
  VERIFIED = "Verify",
  NOT_VERIFIED = "Not-Verify",
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum MaritalStatus {
  NEVER_MARRIED = "Never Married",
  DIVORCED = "Divorced",
  WIDOWED = "Widowed",
  SEPARATED = "Separated",
  ANNULLED = "Annulled",
}

export enum FamilyStatus {
  RICH = "Rich",
  MIDDLE_CLASS = "Middle Class",
  POOR = "Poor",
  UPPER_MIDDLE = "Upper Middle Class",
}

export enum FamilyType {
  SEPARATE_FAMILY = "Separate Family",
  JOINT_FAMILY = "Joint Family",
  EXTENDED_FAMILY = "Extended Family",
}

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export enum ComplexionType {
  VERY_FAIR = "Very Fair",
  FAIR = "Fair",
  WHEATISH = "Wheatish",
  WHEATISH_BROWN = "Wheatish Brown",
  BROWN = "Brown",
  DARK = "Dark",
}

export enum BodyType {
  SLIM = "Slim",
  ATHLETIC = "Athletic",
  AVERAGE = "Average",
  HEAVY = "Heavy",
  MUSCULAR = "Muscular",
}

export enum DietType {
  VEG = "Veg",
  NON_VEG = "Non-Veg",
  EGGETARIAN = "Eggetarian",
  OCCASIONALLY_NON_VEG = "Occasionally Non-Veg",
}

export enum DrinkingHabit {
  YES = "Yes",
  NO = "No",
  OCCASIONALLY = "Occasionally",
}

export enum SmokingHabit {
  YES = "Yes",
  NO = "No",
  OCCASIONALLY = "Occasionally",
}

export enum EmploymentType {
  GOVERNMENT = "Government",
  PRIVATE = "Private",
  BUSINESS = "Business",
  SELF_EMPLOYED = "Self Employed",
}

export enum Religion {
  HINDU = "Hindu",
  MUSLIM = "Muslim",
  CHRISTIAN = "Christian",
  SIKH = "Sikh",
  BUDDHIST = "Buddhist",
  JAIN = "Jain",
  ZOROASTRIAN = "Zoroastrian",
  JEWISH = "Jewish",
}

export enum ManglikStatus {
  MANGLIK = "Manglik",
  NON_MANGLIK = "Non-Manglik",
  DO_NOT_KNOW = "Do not know",
}

export enum FeatureStatus {
  FEATURED = "Featured",
  UNFEATURED = "Unfeatured",
}

export enum Residence {
  CITIZEN = "Citizen",
  PERMANENT_RESIDENT = "Permanent Resident",
  WORKING_PERMIT = "Working Permit",
}

export enum PlanStatus {
  PAID = "Paid",
  UNPAID = "Unpaid",
  EXPIRED = "Expired",
}

export enum AgentApprovalStatus {
  APPROVED = "APPROVED",
  UNAPPROVED = "UNAPPROVED",
}

export enum ViewStatus {
  APPROVED_VIEW = "1",
  NOT_APPROVED = "0",
}

export enum DeleteStatus {
  ACTIVE = "No",
  DELETED = "Yes",
}

export enum LoginStatus {
  LOGGED_IN = "1",
  LOGGED_OUT = "0",
}

// ============ TYPES & INTERFACES ============

export type ProfileRequest = {
  memberId: string;
  matriId?: string;
};

export type ProfileField = {
  name: string;
  value: string;
  required: boolean;
};

export type PartnerPreference = {
  field: string;
  value: string;
};

export type Address = {
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
};

export type PhysicalInfo = {
  height: string; // e.g., "48"
  heightStr: string; // e.g., "Below 4ft"
  weight: string; // e.g., "45"
  weightStr: string; // e.g., "45 kg"
  bodytype: BodyType;
  complexion: ComplexionType;
  bloodGroup: BloodGroup;
};

export type EducationInfo = {
  educationDetail: string; // ID
  educationDetailStr: string; // e.g., "10th / Upto S.S.C"
  educationName: string;
};

export type OccupationInfo = {
  occupation: string; // ID
  occupationName: string;
  employeeIn: EmploymentType;
  designation: string;
  designationName: string;
  professionalAdditionalInfo: string;
};

export type FamilyInfo = {
  familyStatus: FamilyStatus;
  familyType: FamilyType;
  noOfBrothers: string;
  noOfMarriedBrother: string;
  noOfSisters: string;
  noOfMarriedSister: string;
  fatherName: string;
  fatherOccupation: string;
  fatherLivingStatus: string;
  motherName: string;
  motherOccupation: string;
  motherLivingStatus: string;
  totalChildren: string;
  statusChildren: string;
};

export type ReligionInfo = {
  religion: Religion;
  religionName: string;
  caste: string; // ID
  casteName: string;
  subcaste: string;
  motherTongue: string; // ID
  mtongeName: string;
  gothra: string;
};

export type HoroscopeInfo = {
  horoscope: string | "Yes" | "No";
  horoscopePhoto: string;
  horoscopePhotoApprove: ApprovalStatus;
  horoscopePhotoUploadedOn: string;
  manglik: ManglikStatus;
  star: string; // ID
  starStr: string;
  moonsign: string; // ID
  moonsignStr: string;
  birthtime: string;
  birthplace: string;
};

export type PhotoInfo = {
  photoUrl: string;
  photoApprove: ApprovalStatus;
  photoUploadedOn: string;
};

export type ProfilePhotos = {
  photo1: PhotoInfo;
  photo2: PhotoInfo;
  photo3: PhotoInfo;
  photo4: PhotoInfo;
  photo5: PhotoInfo;
  photo6: PhotoInfo;
  photo7: PhotoInfo;
  photo8: PhotoInfo;
  coverPhoto: PhotoInfo;
  photoPassword: string;
  photoProtect: string | "Yes" | "No";
  photoViewStatus: ViewStatus;
  idProof: PhotoInfo;
  video: string;
  videoUrl: string;
  videoApproval: ApprovalStatus;
  videoViewStatus: ViewStatus;
};

export type PartnerPreferences = {
  partReligion: string;
  partReligionStr: string;
  partCaste: string;
  partCasteStr: string;
  partMotherTongue: string;
  partMotherTongueStr: string;
  partCountryLiving: string;
  partCountryLivingStr: string;
  partState: string;
  partStateStr: string;
  partCity: string;
  partCityStr: string;
  partFrmAge: string;
  partToAge: string;
  partHeight: string;
  partHeightStr: string;
  partHeightTo: string;
  partHeightToStr: string;
  partBodytype: string;
  partComplexion: string;
  partDiet: string;
  partDrink: string;
  partSmoke: string;
  partEducation: string;
  partEducationStr: string;
  partEmployeeIn: string;
  partDesignation: string;
  partDesignationStr: string;
  partOccupation: string;
  partOccupationStr: string;
  partIncome: string;
  partManglik: string;
  partStar: string;
  partStarStr: string;
  partResiStatus: string;
  partExpect: string;
  partnersField: ProfileField[];
};

export type PlanInfo = {
  planId: string;
  planName: string;
  planStatus: PlanStatus;
  planExpiredOn: string; // YYYY-MM-DD
};

export type DeviceInfo = {
  androidDeviceId: string;
  iosDeviceId: string;
  webDeviceId: string;
  ip: string;
};

export type ProfileStats = {
  myProfileViewByOther: number;
  memberLikes: number;
  memberMatchCount: number;
  interestSentCount: number;
  interestReceivedCount: number;
  shortlistCount: number;
  myMatchesListCount: number;
  commentedCount: number;
  notificationMessageCount: number;
  unreadMessageCount: number;
};

export type AuthenticationInfo = {
  password: string;
  cpassword: string;
  cpassStatus: VerificationStatus;
  fbId: string;
};

export type UserRole = {
  adminroleId: string;
  adminroleViewStatus: string | "Yes" | "No";
  staffAssignId: string;
  staffAssignDate: string;
  assignToStaff: string;
  assignToFranchise: string;
};

export type FranchiseInfo = {
  franchiseAssignId: string;
  franchiseAssignDate: string;
  franchisedBy: string;
};

export type UserProfile = {
  // Basic Information
  member_id: string;
  id: string;
  matri_id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  phone: string;
  gender: Gender;
  birthdate: string; // YYYY-MM-DD
  age: string;
  marital_status: MaritalStatus;
  profileText: string;
  description: string;
  keyword: string;
  prefix: string;
  title: string;

  // Contact & Security
  address: string;
  latitude: string;
  longitude: string;
  country_id: string;
  country_name: string;
  state_id: string;
  state_name: string;
  city: string;
  city_name: string;
  contactViewSecurity: ViewStatus;
  photoViewStatus: ViewStatus;

  // Personal Information
  physicalInfo: PhysicalInfo;
  complexion: ComplexionType;
  bodytype: BodyType;
  height: string;
  height_str: string;
  weight: string;
  weightStr: string;
  diet: DietType;
  drink: DrinkingHabit;
  smoke: SmokingHabit;
  hobby: string;
  languagesKnown: string; // comma-separated IDs
  languagesKnownStr: string;

  // Religion & Culture
  religion: string;
  religion_name: string;
  caste: string;
  caste_name: string;
  subcaste: string;
  mother_tongue: string;
  mtongue_name: string;
  gothra: string;
  horoscope: string | "Yes" | "No";
  horoscopePhoto: string;
  horoscopePhotoApprove: ApprovalStatus;
  horoscopePhotoUploadedOn: string;
  manglik: ManglikStatus;
  star: string;
  starStr: string;
  moonsign: string;
  moonsignStr: string;
  birthtime: string;
  birthplace: string;

  // Education & Profession
  education_detail: string;
  educationDetailStr: string;
  education_name: string;
  occupation: string;
  occupation_name: string;
  designation: string;
  designationName: string;
  employeeIn: EmploymentType;
  professionalAdditionalInfo: string;
  income: string;

  // Family Information
  familyDetails: string;
  familyStatus: FamilyStatus;
  familyType: FamilyType;
  noOfBrothers: string;
  noOfMarriedBrother: string;
  noOfSisters: string;
  noOfMarriedSister: string;
  fatherName: string;
  fatherOccupation: string;
  fatherLivingStatus: string;
  motherName: string;
  motherOccupation: string;
  motherLivingStatus: string;
  totalChildren: string;
  statusChildren: string;

  // Photos & Media
  photo1: string;
  photo1Approve: ApprovalStatus;
  photo1UploadedOn: string;
  photo2: string;
  photo2Approve: ApprovalStatus;
  photo2UploadedOn: string;
  photo3: string;
  photo3Approve: ApprovalStatus;
  photo3UploadedOn: string;
  photo4: string;
  photo4Approve: ApprovalStatus;
  photo4UploadedOn: string;
  photo5: string;
  photo5Approve: ApprovalStatus;
  photo5UploadedOn: string;
  photo6: string;
  photo6Approve: ApprovalStatus;
  photo6UploadedOn: string;
  photo7: string;
  photo7Approve: ApprovalStatus;
  photo7UploadedOn: string;
  photo8: string;
  photo8Approve: ApprovalStatus;
  photo8UploadedOn: string;
  coverPhoto: string;
  coverPhotoApprove: ApprovalStatus;
  coverPhotoUploadedOn: string;
  photoPassword: string;
  photoProtect: string;
  //   photoViewStatus: ViewStatus;
  idProof: string;
  idProofApprove: ApprovalStatus;
  idProofUploadedOn: string;
  video: string;
  videoUrl: string;
  videoApproval: ApprovalStatus;
  videoViewStatus: ViewStatus;

  // Partner Preferences
  partReligion: string;
  partCaste: string;
  partCasteStr: string;
  partMotherTongue: string;
  partMotherTongueStr: string;
  partCountryLiving: string;
  partCountryLivingStr: string;
  partState: string;
  partStateStr: string;
  partCity: string;
  partCityStr: string;
  partFrmAge: string;
  partToAge: string;
  partHeight: string;
  partHeightStr: string;
  partHeightTo: string;
  partHeightToStr: string;
  partBodytype: string;
  partComplexion: string;
  partDiet: string;
  partDrink: string;
  partSmoke: string;
  partEducation: string;
  partEducationStr: string;
  partEmployeeIn: string;
  partDesignation: string;
  partDesignationStr: string;
  partOccupation: string;
  partOccupationStr: string;
  partIncome: string;
  partManglik: string;
  partStar: string;
  partStarStr: string;
  partResiStatus: string;
  partExpect: string;
  lookingFor: string;
  partnersField: ProfileField[];

  // Plan & Membership
  plan_Id: string;
  plan_name: string;
  plan_status: PlanStatus;
  plan_expired_on: string;

  // Account Status
  status: ApprovalStatus;
  fstatus: FeatureStatus;
  isDeleted: DeleteStatus;
  percentage: number;
  terms: string | "Yes" | "No";

  // Device & Authentication
  androidDeviceId: string;
  iosDeviceId: string;
  webDeviceId: string;
  ip: string;
  password: string;
  cpassword: string;
  cpassStatus: VerificationStatus;
  fbId: string;

  // Mobile & Email Verification
  mobileVerifyStatus: VerificationStatus;
  isSendConfirmationEmail: string | "Yes" | "No";

  // Profile Statistics
  myProfileViewByOther: number;
  memberLikes: number;
  memberMatchCount: number;
  interestSentCount: number;
  interestReceivedCount: number;
  shortlistCount: number;
  myMatchesListCount: number;
  commentedCount: number;
  notificationMessageCount: number;
  unreadMessageCount: number;

  // Administrative
  adminroleId: string;
  adminroleViewStatus: string;
  staffAssignId: string;
  staffAssignDate: string;
  assignToStaff: string;
  assignToFranchise: string;
  franchiseAssignId: string;
  franchiseAssignDate: string;
  franchisedBy: string;
  agent: string;
  agentApprove: AgentApprovalStatus;
  reference: string;

  // System & Metadata
  registeredFrom: string;
  registeredOn: string;
  lastLogin: string;
  loggedIn: LoginStatus;
  residence: Residence;
  profileby: string;
  timeToCall: string;
  //   physicalInfo: string;

  // Additional Fields
  fileds: ProfileField[];
};

export type ApiResponse<UserProfile> = {
  data: UserProfile;
  status: "success" | "error";
  token: string;
  tocken: string; // Note: API has this typo
};

export type UserProfileResponse = ApiResponse<UserProfile>;

export type TabConfig = {
  id: string;
  label: string;
};

export type FormField = {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  isEditable?: boolean;
  actionLabel?: string;
};

export type FormSection = {
  sectionId: string;
  title: string;
  tabId: string;
  fields: FormField[];
};

export type SectionRef = {
  [key: string]: { y: number; height: number };
};
