import { request, gql } from 'graphql-request'

MASTER_URL="https://api-ap-south-1.hygraph.com/v2/clvhzoyhl0ex208w0iqwky26e/master"


const getSlider=async()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
`
const result=await request(MASTER_URL, query)
return result
}

const getCategory=async()=>{
  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  
`
const result=await request(MASTER_URL, query)
return result
}


const getBusinessList=async()=>{
  const query=gql`
  query getBusinessLists {
    businessLists {
      name
      email
      address
      about
      contactPerson
      id
      images {
        url
      }
      categories {
        name
      }
    }
  }
  `

  

  const result=await request(MASTER_URL, query)
  return result
}


const getBusinessListByCategory=async(category)=>{
  const query=gql`
  query getBusinessLists {
    businessLists(where: {categories_every: {name: "`+category+`"}}) {
      name
      email
      address
      about
      contactPerson
      id
      images {
        url
      }
      categories {
        name
      }
    }
  }
  `

  const result=await request(MASTER_URL, query)
  return result
}


const getUserBookings=async(userEmail)=>{
  const query=gql`
  query getUserBookings {
  bookings(
    orderBy: updatedAt_DESC
    where: {userEmail: "`+userEmail+`"}
  ) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
  }
  businessList(where: {id: ""}) {
    id
    name
    images {
      url
    }
    address
    about
    email
    contactPerson
  }
}
`

const result=await request(MASTER_URL, query)
  return result
}
const createBooking = async (data) => {
  const mutationQuery = gql`
    mutation createBooking($bookingData: BookingCreateInput!) {
      createBooking(data: $bookingData) {
        id
      }
      publishManyBookings {
        count
      }
    }
  `;
  
  const variables = {
    bookingData: {
      bookingStatus: "Booked",
      businessList: { connect: { id: data.businessId } },
      date: data.date.toISOString().split('T')[0], // Ensuring date format is correct
      time: data.time,
      userEmail: data.userEmail,
      userName: data.userName,
    }
  };

  const result = await request(MASTER_URL, mutationQuery, variables);
  return result;
};

  



export default{
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings
}