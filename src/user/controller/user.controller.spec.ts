import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { dataSource } from '../../database.provider';
import { UserFactory } from '../user.factory';
import { generateUserToken } from '../../';

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    //delete db ici
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    // close app
    await app.close();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const factory = new UserFactory();
      const user = await factory.make();
      return request(app.getHttpServer())
        .post('/users')
        .send({
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .set('Content-type', 'application/json')
        .expect(({ statusCode, body }) => {
          expect(statusCode).toStrictEqual(201);
          expect(body).toMatchObject({
            id: 1,
            username: user.username,
            email: user.email,
            password: expect.any(String),
          });
        });
    });
  });

  describe('findAll', () => {
    it('should require authorization', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(({ statusCode }) => {
          expect(statusCode).toStrictEqual(401);
        });
    });

    it('should find all users', async () => {
      const factory = new UserFactory();
      const users = await factory.createMany(5);
      const token = generateUserToken(users[0]);
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + token)
        .expect(({ statusCode, body }) => {
          expect(statusCode).toStrictEqual(200);
          expect(body.length).toStrictEqual(5);
        });
    });
  });

  describe('search', () => {
    it('should require authorization', () => {
      return request(app.getHttpServer())
        .get('/users/search')
        .expect(({ statusCode }) => {
          expect(statusCode).toStrictEqual(401);
        });
    });

    it('should return one user', async () => {
      const factory = new UserFactory();
      const user = await factory.create();
      const token = generateUserToken(user);
      return request(app.getHttpServer())
        .get('/users/search?searchreq=' + user.username)
        .set('Authorization', 'Bearer ' + token)
        .expect(({ statusCode, body }) => {
          expect(statusCode).toStrictEqual(200);
          expect(body.length).toStrictEqual(1);
        });
    });
  });

  describe('findOne', () => {
    it('should require authorization', () => {
      return request(app.getHttpServer())
        .get('/users/search') // mettre /users/1 <- innattention
        .expect(({ statusCode }) => {
          expect(statusCode).toStrictEqual(401);
        });
    });

    it('should return a user by his id', async () => {
      const factory = new UserFactory();
      const user = await factory.create();
      const token = generateUserToken(user);
      return request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(({ statusCode, body }) => {
          expect(statusCode).toStrictEqual(200);
          expect(body).toMatchObject({
            id: 1,
            username: user.username,
            email: user.email,
          });
        });
    });
  });
});
