import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const AboutUs = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()


  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/tabs?fields=title,heading,body,images.directus_files_id.data.full_url`)
      .then((response) => {


        if (response?.data?.data?.length > 0) {
          console.log(response.data);
          setdata(response.data.data[0])
          // response?.data?.data[0].map((data1,i)=>{
          //     setdata(data1) 
          //     console.log(data1);
          // })
          //   setdata(response) 
        }

      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  return (
    <Layout header_data={data_header}>
      <div
        className="mx-3 "
      >
        <img
          className="w-full "
          src="https://rosemarydn.com/images/upper.png"
        />
        <div className="leading-[ 22.5px] font-normal">
          <h5 className="text-center">
            {/* {data?.heading || "About School"} */}
            About us

          </h5>
          <p className="mb-0">
          Vidhya Bharti Hr.Sec. School is a Higher secondary school for both girls and boys managed by Vidhya Bharti Group. Vidhya Bharti Group was established in 1991 and run by Mr Devendra Singh Ji. Our institution is recogniged by the Madhya Pradesh Board of education. Vidya Bharti Hr. Sec. School, Chandbarh endeavours to provide the finest education encompassed within state-of-the-art infrastructure. Artistic and academic pursuits are encouraged equally and students have ready exposure to global heritage and cultures. The school’s curriculum lays emphasis on concepts and skills, rather than on textbooks. Tagoreans gain a clear sense of direction paved by their analytical approach, critical thinking skills and creative sagacity. Effective interpersonal and collaborative communication shapes these global citizens and leaders. The School's philosophy is well illustrated in Rabindranath Tagore's words:
<br/>
"I was brought up in an atmosphere of aspiration, aspiration for the expansion of the human spirit. Such an opportunity has given me confidence in the We in our home sought freedom of power in our language, freedom of imagination in our literature, freedom of soul in our religious creeds, and that of mind in our social environment. power of education which is one with life and only which can give us real freedom, the highest that is claimed for man, his freedom of moral communion in the human world
          </p>
        </div>
        <img
          className="w-full"
          src="https://rosemarydn.com/images/under.png"
        />
      </div>
    </Layout>
  );

}

export default AboutUs;


export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
