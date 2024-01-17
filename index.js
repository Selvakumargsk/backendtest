const express = require('express');
const User = require('./model/usermodel');
const sequelize = require('./utilsfunction');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('project created')
});


const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    // Extract the token from the "Bearer <token>" format
    const token = tokenHeader.split(' ')[1];

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token to the request object for further use
        req.decodedToken = decodedToken;

        // Continue to the next middleware or route
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

app.post('/login', (req, res) => {
    const { username, password, jwtToken , csrfToken } = req.body;


    if (username === 'admin' && password === 'admin') {
        try {

            console.log(req.body);
            // Decode the existing token
            const decodedToken = jwt.verify(jwtToken , process.env.JWT_SECRET);

            console.log("this is decoded token here", decodedToken);

            // // Update the expiry time to 2 minutes from now
            const updatedExpiry = Math.floor(Date.now() / 1000) + 120;

            console.log("this is expiry time" , updatedExpiry);

            // // Update the payload with the new expiry time
            const updatedPayload = { ...decodedToken, exp: updatedExpiry };

            console.log("this is payload " , updatedPayload);

            // // Sign the updated payload with the secret key
            const updatedToken = jwt.sign(updatedPayload, process.env.JWT_SECRET);

            console.log( " token must be here ", updatedToken);


            // Send the updated token in the response or save it on the server as needed
            res.json({ token: updatedToken  , csrfToken });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }

})


app.get('/userDetails' , async(req , res)=>{
    
    const user = await User.findAll();

    res.json(user);
    
})

app.post('/addUser' , verifyToken , async(req , res)=>{
    const { email , username , phone , name , website } = req.body;
    const user = await User.create({ email , username , phone , name , website });
    res.json({user});
})

app.put('/editUser/:id' , verifyToken , async(req , res)=>{
    const { id } = req.params;
    const { email , username , number , name , website } = req.body;
    const user = await User.findByPk(id);
    user.email = email;
    user.username = username;
    user.number = number;
    user.name = name;
    user.website = website;
    
    await user.save();

    res.json({user});

})

app.delete('/deleteUser/:id' , verifyToken , async(req , res)=>{
    const { id } = req.params;
    const user = await User.destroy({where: {id}});
    res.json('deleted');
})

app.get('/getUser/:id' , verifyToken , async(req , res)=>{
    const { id } = req.params ;
    const user = await User.findByPk(id);
    res.json({user});
})

sequelize.sync({force : false}).then(() => {
    console.log('tables created successfully!');
 }).catch((error) => {
    console.error('Unable to create tables : ', error);
 });

//  const usersData = [
//     {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       username: 'johndoe',
//       phone: '123-456-7890',
//       website: 'https://johndoe.com',
//     },
//     {
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       username: 'janesmith',
//       phone: '987-654-3210',
//       website: 'https://janesmith.com',
//     },
//     {
//       name: 'Alice Johnson',
//       email: 'alice.johnson@example.com',
//       username: 'alicejohnson',
//       phone: '555-123-4567',
//       website: 'https://alicejohnson.com',
//     },
//     {
//       name: 'Bob Anderson',
//       email: 'bob.anderson@example.com',
//       username: 'bobanderson',
//       phone: '777-888-9999',
//       website: 'https://bobanderson.com',
//     },
//     {
//       name: 'Eva Williams',
//       email: 'eva.williams@example.com',
//       username: 'evawilliams',
//       phone: '111-222-3333',
//       website: 'https://evawilliams.com',
//     },
//     {
//       name: 'Michael Brown',
//       email: 'michael.brown@example.com',
//       username: 'michaelbrown',
//       phone: '444-555-6666',
//       website: 'https://michaelbrown.com',
//     },
//   ];

// User.bulkCreate(usersData).then(()=>{
//     console.log('ok');
// })


app.listen(4000, console.log('server run at 4000'));
