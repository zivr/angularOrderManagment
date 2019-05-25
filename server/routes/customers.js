const Routers = require('../routers');
const Customers = require('../db/customers');
const error = require('debug')('routes:error');

class CustomersRoute extends Routers {
    constructor() {
        super();

        this.apiRouter.post('/new', (req, res) => {
            const customersModel = new Customers(req.body);
            customersModel.save().then(customers => {
                res.status(200).json({ success: true });
            }).catch(err => {
                res.status(400).send({ success: false, err });
            });
        });

        this.apiRouter.get('/', (req, res) => {
            Customers.find((err, customers) => {
                if (err) {
                    error(err);
                } else {
                    res.json(customers);
                }
            });
        });

        this.apiRouter.post('/:id', (req, res) => {
            Customers.findById(req.params.id, (err, customers) => {
                if (!customers)
                    return res.json({ success: false, msg: 'Could not load Document' });
                else {
                    customers.name = req.body.name;
                    customers.type = req.body.type;

                    customers.save().then(() => {
                        res.json({ success: true });
                    }).catch(err => {
                        res.status(400).send({ success: false, err });
                    });
                }
            });
        });

        this.apiRouter.delete('/:id', (req, res) => {
            Customers.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) {
                    res.json({ success: false, err });
                } else {
                    res.json({ success: true });
                }
            });
        });
    }
}

module.exports = CustomersRoute;