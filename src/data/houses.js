export const category = {
    Residential: 1,
    Commercial: 2
}

export const propertyType = {
    Apartment: 1,
    Villa: 2,
    IndependentHouse: 3,
    Land: 4
}

export const timeFrame = {
    Monthly: 1,
    Yearly: 2
}

export const propertySizeType = {
    sqm: 1,
    acer: 2
}

export const houses = [
    {
        id:1,
        timeFrame:timeFrame.Monthly,
        subsciptionDate: '08/11/2022',
        currentlySubscribed: true,
        country:'USA',
        state:'Newyork',
        location:'Arlington Heights',
        pincode:'100001',
        category: category.Residential,
        propertySize: '500',
        propertySizeType: propertySizeType.sqm,
        propertyType: propertyType.Appartment,
        price: 500,
        bedrooms: 2,
        bathrooms: 3,
        parking: 2,
        contactName: 'Elise',
        contactNumber: '479359374839',
        contactEmail: 'elise@gmail.com',
        overview: 'sdhsdkf',
        img1:'https://i.pinimg.com/originals/55/26/39/55263941306910ab943af5e25b13b031.jpg',
        img2:'https://i.pinimg.com/originals/55/26/39/55263941306910ab943af5e25b13b031.jpg',
        img3:'https://i.pinimg.com/originals/55/26/39/55263941306910ab943af5e25b13b031.jpg',
        img4:'https://i.pinimg.com/originals/55/26/39/55263941306910ab943af5e25b13b031.jpg',
        img5:'https://i.pinimg.com/originals/55/26/39/55263941306910ab943af5e25b13b031.jpg'
    }
]

