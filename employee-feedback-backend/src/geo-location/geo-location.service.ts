import { Injectable } from '@nestjs/common';
import axios from 'axios'



@Injectable()
export class GeoLocationService {


    async getGeolocation(ip: string): Promise<any> {
        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            console.log(response.data);
            return response
          } catch (error) {
            console.error('Error fetching geolocation:', error);
          }      }



}
