import {
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios'
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class TokenService {

  
  private openaiUrl: string = 'https://api.openai.com/v1/completions';
  
  constructor(private config: ConfigService, 
    private http: HttpService,
    private prisma: PrismaService) {
  }

        
  openaiHeaderDict = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.config.get('OPEN_API_KEY'),
    };

  async createToken(
    userId: number,
    dto: CreateTokenDto,
  ) {
     
    const data = {
      "model": "ada",             
      "prompt": dto.prompt,
      "max_tokens": 50,
      "temperature": 0.4
    }
  
    var response = '';


    this.http.post(this.openaiUrl, data, { headers: this.openaiHeaderDict }).subscribe({
      next: async (res) => {
        console.log(res.data["choices"]);
        //console.log(res.data["choices"][0]["text"]);
        //console.log(typeof(res.data["choices"][0]["text"]))
        response = res.data["choices"][0]["text"];
        dto.response = response;
        console.log('Create dto: ', dto);
        console.log('Response: ', response);
        console.log('dto ended');


        const token = await this.prisma.token.create({
          data: {
            userId,
            ...dto,
          },
        });

         return token;

      },
      error: (err) => {

      }
    })

    
  }

  async getTokenById(
    userId: number,
    tokenId: number,
  ) {
    return this.prisma.token.findFirst({
      where: {
        id: tokenId,
        userId,
      },
    });
  }

  async getMostRecentToken(userId: number) {
    return this.prisma.token.findMany({
      where: {
        userId,
      },
      take: -1,
    });
  }

  async getTokens(userId: number) {
    return this.prisma.token.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteTokenById(
    userId: number,
    tokenId: number,
  ) {
    const token =
      await this.prisma.token.findUnique({
        where: {
          id: tokenId,
        },
      });

    if (!token || token.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource is denied',
      );
    }

    await this.prisma.token.delete({
      where: {
        id: tokenId,
      },
    });
  }
}
