import { gateway as MoltinGateway } from '@moltin/sdk';


export class MoltinService {
    constructor() {
        this.Moltin = MoltinGateway({
            client_id: 'SBRaOzBmVdyu8wQ0hQiUKCVeiqjqX8BaJgKMe6tUKQ'
        });
    }

    static retrieveProducts() { () => {
        // const products = Moltin.Products.All().then((products) => {
        //     console.log(products);
        // });
        // return products;

        const products = this.Moltin.Products.All();
        console.log("retrieved");
    }

    }

}