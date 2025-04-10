export interface BookingProps {
  rentalStartDate?: string
  rentalEndDate: string
  carId?: string
  customerId?: string
  carStatus?: string
  bookingStatus?: string 
  totalPrice?: number
  updateBookingDate?: string
  createBookingDate?: string
  id: string
  customerDto:  CustomerDto 
  carDto: CarDto 
  }

export interface CustomerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface CarDto {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  fuelType: string;
  transmissionType: string;
  isActive: boolean;
  carStatus: string;
  dayRentalPrice: number;
  carImage: string;
}