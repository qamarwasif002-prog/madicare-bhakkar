export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  category: string;
  gender: 'female' | 'male';
  description: string;
  availability: string;
  image: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  doctorAssigned?: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  comment: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  doctor: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
}

export interface SubmittedAppointment extends AppointmentFormData {
  id: string;
  submittedAt: string;
  status: 'Pending Review' | 'Received';
}
