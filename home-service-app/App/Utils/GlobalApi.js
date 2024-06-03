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



export default{
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory
}