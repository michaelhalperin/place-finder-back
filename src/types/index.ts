export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface BasePlace {
    id: string;
    name: string;
    rating: number;
    image: string;
    description: string;
    distance?: string;
    website?: string | null;
  }
  
  export interface Activity extends BasePlace {
    address: string;
    openingHours: string;
    features: string[];
    tags: string[];
    difficulty: string;
    duration: string;
    timeOfDay: string;
    phone: string | null;
  }
  
  export interface QuestionOption {
    id: string;
    label: string;
    icon?: string;
    nextQuestions?: Record<string, Question>;
  }
  
  export interface Question {
    id: string;
    question: string;
    options: QuestionOption[];
  }
  
  export interface UserSettings {
    [key: string]: string;
  }
  
  export interface UserDocument extends Document {
    email: string;
    password: string;
    settings: UserSettings;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
  
  export interface PlaceDetails {
    place_id: string;
    name: string;
    formatted_address: string;
    formatted_phone_number?: string;
    website?: string;
    rating?: number;
    reviews?: Array<{
      author_name: string;
      rating: number;
      text: string;
      time: number;
    }>;
  }
  
  export interface GPTResponse {
    questions: Question[];
  }