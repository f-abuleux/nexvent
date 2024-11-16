import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { EventRouter } from './routers/event.router';
import path from 'path'
import { CategoryRouter } from './routers/category.router';
import { DiscountRouter } from './routers/discount.router';
import { CartRouter } from './routers/cart.router';
import { OrderRouter } from './routers/order.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public', express.static(path.join(__dirname, '../public')))
  }

  private handleError(): void {

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });
    
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
  
    const authRouter = new AuthRouter()
    const eventRouter = new EventRouter()
    const categoryRouter = new CategoryRouter()
    const discountRouter = new DiscountRouter()
    const cartRouter = new CartRouter()
    const orderRouter = new OrderRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, FARRAOS API!`);
    });


    this.app.use('/api/auth', authRouter.getRouter())
    this.app.use('/api/event', eventRouter.getRouter())
    this.app.use('/api/category', categoryRouter.getRouter())
    this.app.use('/api/discount', discountRouter.getRouter())
    this.app.use('/api/cart', cartRouter.getRouter())
    this.app.use('/api/order', orderRouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);  
    });
  }
}
