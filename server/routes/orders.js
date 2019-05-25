const Routers = require('../routers');
const Orders = require('../db/orders');
const error = require('debug')('routes:error');
const Customers = require('../db/customers');

class OrdersRoute extends Routers {
    constructor() {
        super();

        this.apiRouter.post('/new', (req, res) => {
            const ordersModel = new Orders(req.body);
            ordersModel.save().then(orders => {
                res.status(200).json({ success: true });
            }).catch(err => {
                res.status(400).send({ success: false, err });
            });
        });

        this.apiRouter.get('/', (req, res) => {
            Promise.all([Orders.find().exec(), Customers.find().exec()]).then(([orders, customers]) => {
                orders.forEach(order => {
                    order.customer = customers.find(c => c._id.toString() === order.customer.toString())
                })
                res.json(orders);
            });
        });

        this.apiRouter.post('/:id', (req, res) => {
            Orders.findById(req.params.id, (err, orders) => {
                if (!orders)
                    return res.json({ success: false, msg: 'Could not load Document' });
                else {
                    orders.name = req.body.name;
                    orders.description = req.body.description;
                    orders.amount = req.body.amount;

                    orders.save().then(() => {
                        res.json({ success: true });
                    }).catch(err => {
                        res.status(400).send({ success: false, err });
                    });
                }
            });
        });

        this.apiRouter.delete('/:id', (req, res) => {
            Orders.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) {
                    res.json({ success: false, err });
                } else {
                    res.json({ success: true });
                }
            });
        });
    }
}

module.exports = OrdersRoute;