// DUMMY DATA
export const dataSources = {
  userRows: [
    {
      _id: 1,
      username: 'Dan',
      fullName: 'Dan',
      phoneNumber: '012345678',
      email: '1snow@gmail.com',
      isAdmin: true,
    },
    {
      _id: 2,
      username: 'John',
      fullName: 'John',
      phoneNumber: '012345678',
      email: '2snow@gmail.com',
      isAdmin: false,
    },
    {
      _id: 3,
      username: 'David',
      fullName: 'David',
      phoneNumber: '012345678',
      email: '3snow@gmail.com',
      isAdmin: false,
    },
    {
      _id: 4,
      username: 'Stark',
      fullName: 'Stark',
      phoneNumber: '012345678',
      email: '4snow@gmail.com',
      isAdmin: true,
    },
    {
      _id: 5,
      username: 'JamieLan',
      fullName: 'Jamie Lan',

      phoneNumber: '012345678',
      email: '5snow@gmail.com',
      isAdmin: false,
    },
    {
      _id: 6,
      username: 'Melisandre',
      fullName: 'Melisandre',

      phoneNumber: '012345678',
      email: '6snow@gmail.com',
      isAdmin: true,
    },
    {
      _id: 7,
      username: 'Clifford',
      fullName: 'Clifford',

      phoneNumber: '012345678',
      email: '7snow@gmail.com',
      isAdmin: false,
    },
    {
      _id: 8,
      username: 'Frances',
      fullName: 'Frances',

      phoneNumber: '012345678',
      email: '8snow@gmail.com',
      isAdmin: true,
    },
    {
      _id: 9,
      username: 'Roxie',
      fullName: 'Roxie',

      phoneNumber: '012345678',
      email: 'snow@gmail.com',
      isAdmin: false,
    },
    {
      _id: 10,
      username: 'Roxie',
      fullName: 'Roxie',

      phoneNumber: '012345678',
      email: 'snow@gmail.com',
      isAdmin: true,
    },
  ],
  hotelRows: [
    {
      _id: 1,
      name: 'HANOI ROYAL PALACE HOTEL 2',
      type: 'hotel',
      title: 'HANOI ROYAL PALACE HOTEL 2',
      city: 'Ha Noi',
    },
    {
      _id: 2,
      name: 'La Sinfonia del Rey Hotel and Spa',
      type: 'hotel',
      title: 'La Sinfonia del Rey Hotel and Spa',
      city: 'Ha Noi',
    },
    {
      _id: 3,
      name: 'May De Vile Legend Hotel & Spa',
      type: 'hotel',
      title: 'May De Vile Legend Hotel & Spa',
      city: 'Ha Noi',
    },
    {
      _id: 4,
      name: 'Alagon Saigon Hotel & Spa',
      type: 'hotel',
      title: 'Alagon Saigon Hotel & Spa',
      city: 'Ho Chi Minh',
    },
  ],
  roomRows: [
    {
      _id: 1,
      title: '2 Bed Room',
      desc: 'King size bed',
      price: 200,
      maxPeople: 2,
    },
    {
      _id: 2,
      title: '1 Bed Room',
      desc: '1 Bathroom',
      price: 150,
      maxPeople: 2,
    },
    {
      _id: 3,
      title: 'Basement Double Room',
      desc: 'Welcome drink, Coffee & tea, Express check-in, Free Premium blah blah blah blah blah blah',
      price: 600,
      maxPeople: 2,
    },
    {
      _id: 4,
      title: 'Superior basement room',
      desc: 'Free breakfast for 2',
      price: 700,
      maxPeople: 2,
    },
    {
      _id: 5,
      title: 'Deluxe Room',
      desc: 'Welcome drink, Coffee & tea, Express check-in, Free Premium blah blah blah blah blah blah',
      price: 700,
      maxPeople: 2,
    },
    {
      _id: 6,
      title: 'Deluxe Window',
      desc: 'Welcome drink, Coffee & tea, Express check-in, Free WiFi blah blah blah blah blah blah',
      price: 300,
      maxPeople: 2,
    },
    {
      _id: 7,
      title: 'Premier City View Room',
      desc: 'Extra low price (non-refundable)',
      price: 425,
      maxPeople: 2,
    },
    {
      _id: 8,
      title: 'Budget Double Room',
      desc: 'Pay nothing until September 04, 2022',
      price: 350,
      maxPeople: 2,
    },
    {
      _id: 9,
      title: 'Budget Twin Room',
      desc: 'Free cancellation before September 06, 2022',
      price: 350,
      maxPeople: 2,
    },
    {
      _id: 10,
      title: 'Premier City View Room',
      desc: 'Extra low price (non-refundable)',
      price: 425,
      maxPeople: 2,
    },
  ],
  transRows: [
    {
      _id: 1,
      user: 'Dan',
      hotel: 'May De Vile Legend Hotel & Spa',
      room: [303, 304],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Credit Card',
      status: 'Booked',
    },
    {
      _id: 2,
      user: 'John',
      hotel: 'Alagon Saigon Hotel & Spa',
      room: [101, 201],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Credit Card',
      status: 'Booked',
    },
    {
      _id: 3,
      user: 'John',
      hotel: 'La Sinfonia del Rey Hotel and Spa',
      room: [801],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Cash',
      status: 'Checkin',
    },
    {
      _id: 4,
      user: 'David',
      hotel: 'Alagon Saigon Hotel & Spa',
      room: [201],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Cash',
      status: 'Checkin',
    },
    {
      _id: 5,
      user: 'John',
      hotel: 'Alagon Saigon Hotel & Spa',
      room: [201],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Cash',
      status: 'Checkout',
    },
    {
      _id: 6,
      user: 'John',
      hotel: 'HANOI ROYAL PALACE HOTEL 2',
      room: [101, 103],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Credit Card',
      status: 'Checkout',
    },
    {
      _id: 7,
      user: 'Peter',
      hotel: 'HANOI ROYAL PALACE HOTEL 2',
      room: [201],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Credit Card',
      status: 'Checkout',
    },
    {
      _id: 8,
      user: 'David',
      hotel: 'Alagon Saigon Hotel & Spa',
      room: [201],
      dateStart: '09/01/2023',
      dateEnd: '10/01/2023',
      price: 700,
      payment: 'Credit Card',
      status: 'Checkout',
    },
  ],
};
