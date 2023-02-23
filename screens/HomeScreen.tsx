import MasonryList from "../components/MasonryList";
import {useEffect, useState} from 'react'
import { useNhostClient } from "@nhost/react";



export default function HomeScreen() {
  const [pins, setPins] = useState([])
  const nhost = useNhostClient()
  const fetchPins = async() => {
    const {data, error} = await nhost.graphql.request(`
    query MyQuery {
      pins {
        created_at
        id
        image
        title
        user_id
      }
    }
    `);

    if(error){
      console.log(error);
    }else{

      setPins(data.pins)
    }
   
    

  } 

  useEffect(() => {
    fetchPins()
  }, [])
  return <MasonryList pins={pins} />;
}
