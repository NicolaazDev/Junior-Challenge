import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AnelService } from './anel.service';
import { CreateAnelDto, UpdateAnelDto } from './anel.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('aneis')
export class AnelController {
  constructor(private readonly anelService: AnelService) {}

  @Post()
  create(@Body() createAnelDto: CreateAnelDto) {
    return this.anelService.create(createAnelDto);
  }

  @Get()
  findAll() {
    return this.anelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnelDto: UpdateAnelDto) {
    return this.anelService.update(id, updateAnelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anelService.remove(id);
  }
}
