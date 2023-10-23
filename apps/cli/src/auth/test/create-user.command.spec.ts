import { HttpService } from '@nestjs/axios';

import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { InquirerService } from 'nest-commander';
import { of } from 'rxjs';

import { CreateAdminUserCommand, CreateStandardUserCommand } from '../create-user.command';

describe('Test CreateAdminUserCommand', () => {
  let targetService: CreateAdminUserCommand;
  let httpClient: jest.Mocked<HttpService>;
  let inquirerService: jest.Mocked<InquirerService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CreateAdminUserCommand)
      .mock(HttpService)
      .using({
        post: jest.fn(),
      })
      .mock(InquirerService)
      .using({
        prompt: jest.fn(),
      })
      .compile();

    targetService = unit;

    httpClient = unitRef.get(HttpService);
    inquirerService = unitRef.get(InquirerService);
  });

  it('send request to create admin user', async () => {
    const mockData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.userName(),
    };

    inquirerService.prompt.mockResolvedValue(mockData);
    httpClient.post.mockReturnValue(
      of({
        data: { message: 'success' },
      } as any),
    );

    await targetService.run([]);

    expect(httpClient.post).toBeCalledTimes(1);
    expect(httpClient.post).toBeCalledWith('/accounts/create-admin-account', mockData);
  });
});

describe('Test CreateStandardUserCommand', () => {
  let targetService: CreateStandardUserCommand;
  let httpClient: jest.Mocked<HttpService>;
  let inquirerService: jest.Mocked<InquirerService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CreateStandardUserCommand)
      .mock(HttpService)
      .using({
        post: jest.fn(),
      })
      .mock(InquirerService)
      .using({
        prompt: jest.fn(),
      })
      .compile();

    targetService = unit;

    httpClient = unitRef.get(HttpService);
    inquirerService = unitRef.get(InquirerService);
  });

  it('send request to create standard user', async () => {
    const mockData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.userName(),
    };

    inquirerService.prompt.mockResolvedValue(mockData);
    httpClient.post.mockReturnValue(
      of({
        data: { message: 'success' },
      } as any),
    );

    await targetService.run([]);
    expect(httpClient.post).toBeCalledTimes(1);
    expect(httpClient.post).toBeCalledWith('/accounts/create-standard-account', mockData);
  });
});
