import React from 'react';
import IntroCarousel from "./IntroCarousel";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';


export default function intro() {

    const categories = [
        { name: "Stories",
        pic:'stories.jpg',
        description:"Adventure, Power and challenges 😁",
        id:1
        },
        { name: "Life",
        pic:'life.jpg',
        description:"Life improvement 😀",
        id:2
        },
        { name: "Romantic Stories",
        pic:'roma.jpg',
        description:"Stories of love 😍	",
        id:3
        },
        { 
            name: "Others",
            pic:'others.jpg',
            description:"A lot for you 😉",
            id:4
        }
    ]

    return (
        <div>
            <IntroCarousel />
            <MDBRow className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4'>
                {categories.map((data, index) => (
                    <MDBCol key={data.id}>
                        <MDBCard className="h-100 d-flex flex-column" style={{ cursor: 'pointer' }}>
                            <MDBCardImage
                                src={data.pic}
                                alt='Y.webp'
                                position='top'
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <MDBCardBody className="d-flex flex-column">
                                <MDBCardTitle style={{ fontSize: '1.2rem' }}>{data.name}</MDBCardTitle>
                                <MDBCardText className="flex-grow-1" style={{ fontSize: '0.8rem' }}>
                                    {data.description}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </div>
    );
}
