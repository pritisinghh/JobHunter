import { Body, Controller, Param, Post } from '@nestjs/common';
import AuthService from 'src/auth/auth.service';
import { axiosInstance } from 'src/main';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AxiosResponse } from 'axios';

dotenv.config({ path: path.resolve(__dirname, '../../../../', '.env') });
const adzunaEndpoint = 'https://api.adzuna.com/v1/api/jobs/us/search/1/';

@Controller('/api/adzuna')
export class AdzunaController {
  constructor(private readonly authservice: AuthService) {}

  @Post(':id/search')
  async search(
    @Param('id') id: string,
    @Body() adzunaSearchDto: AdzunaSearchDto,
  ): Promise<any> {
    const user = await this.authservice.findOne(id);
    const jobPreferences = user.jobPreferences || [''];
    adzunaSearchDto.what = `${adzunaSearchDto.what.trim()} ${jobPreferences
      .join(' ')
      .trim()}`;
    console.log(adzunaSearchDto);

    const response = await axiosInstance.get(adzunaEndpoint, {
      params: {
        ...adzunaSearchDto,
        app_key: process.env.ADZUNA_APP_KEY,
        app_id: process.env.ADZUNA_APP_ID,
      },
    });
    return await this.mapResponseToDto(response);
  }

  async mapResponseToDto(
    adzunaResponse: AxiosResponse<any, any>,
  ): Promise<AdzunaResponseDto[]> {
    const mappedResponses: AdzunaResponseDto[] = [];

    adzunaResponse.data.results.forEach((result) => {
      mappedResponses.push({
        requisitonId: <string>result.id,
        location: <string>result.location.display_name,
        role: <string>result.title,
        label: <string>result.category.label,
        url: <string>result.redirect_url,
        contractType: <string>result.contract_type,
        companyName: <string>result.company.display_name,
        averageSalary:
          <number>(result.salary_min || 0 + <number>result.salary_max || 0) / 2,
      });
    });

    return mappedResponses;
  }
}

export interface AdzunaSearchDto {
  id: string;
  what?: string; // space separated.
  where?: string;
  max_days_old?: string;
  results_per_page?: string;
  company?: string;
}

export interface AdzunaResponseDto {
  requisitonId?: string;
  location?: string;
  role?: string;
  label?: string;
  url?: string;
  contractType?: string;
  companyName?: string;
  averageSalary?: number;
}
