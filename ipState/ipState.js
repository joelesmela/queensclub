import axios from "axios";

 const URL=process.env.NEXT_PUBLIC_IP;

export const getState= async()=>{
  
    try{
         const get= await axios.get(URL)
         const data= get.data;
         return data;
    }
    catch(err){
      return err
    }

}
export const getGeolocalization= async(latitude,longitude)=>{
  
  try{
       const get= await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=es&key=${process.env.NEXT_PUBLIC_API_KEY}`)
       const data= get;
       return data;
  }
  catch(err){
    return err
  }

}