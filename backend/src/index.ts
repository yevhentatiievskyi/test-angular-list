import * as express from "express";
import { connect } from "mongoose";
import * as seeds from "./seeds";
import router from "./router";
import * as path from 'path';
const app = express();
const { PORT, MONGO_URL, MONGO_USER, MONGO_PASS } = process.env;


app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../../frontend/dist/test-angular-list/')));

app.use( "/API/", router);


app.listen( PORT, async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      user: MONGO_USER,
      pass: MONGO_PASS
    });
    await Promise.all(Object.values(seeds).map((Seed: any) => new Seed().run()));
    console.log( `Server started at http://localhost:${ PORT }` );
  } catch (e) {
    console.log('Error - ', e);
  }
} );

